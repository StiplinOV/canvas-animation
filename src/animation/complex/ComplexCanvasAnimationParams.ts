import CanvasAnimationParams, {ObjectParams, Params, SelectionType} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import SimpleCanvasAnimationParams from '../simple/SimpleCanvasAnimationParams'
import {PresenceParamType, requireValueFromMap} from '../../common/Utils'
import CanvasAnimation from '../CanvasAnimation'
import {TextParamsType} from "../simple/text/TextCanvasAnimationParams";
import {RectangleParamsType} from "../simple/rectangle/RectangleCanvasAnimationParams";
import {CircleParamsType} from "../simple/circle/CircleCanvasAnimationParams";
import {EllipseParamsType} from "../simple/ellipse/EllipseCanvasAnimationParams";
import {BezierParamsType} from "../simple/bezier/BezierCanvasAnimationParams";
import {HighlightedTextParamsType} from "../simple/highligtedtext/HighlightedTextCanvasAnimationParams";
import {LineParamsType} from "../simple/line/LineCanvasAnimationParams";
import {TypeToSimpleParamsConstructorMapping} from "../../Animations";

export interface AnimationSelectedInfo {
    key: string
    startSelectionPercent?: number
    endSelectionPercent?: number
}

export type AnimationS2T = { source: CanvasAnimationParamsType, target: CanvasAnimationParamsType }

export interface TransformOptions {
    type: 'together' | 'sequentially'
}

export type AnimationsSetDifferenceType = {
    added: Map<string, CanvasAnimationParamsType>
    deleted: Map<string, CanvasAnimationParamsType>
    changed: Map<string, AnimationS2T>
}

export type TypeToObjectMapping = {
    circle: CircleParamsType
    ellipse: EllipseParamsType
    bezier: BezierParamsType
    highlightedText: HighlightedTextParamsType
    line: LineParamsType
    rectangle: RectangleParamsType
    text: TextParamsType
}

export type CanvasAnimationParamsType<T extends keyof TypeToObjectMapping = keyof TypeToObjectMapping> = {
    appearType?: "immediate"
    disappearType?: "immediate" | "immediateAtTheEnd"
    type: T
    objectParams: TypeToObjectMapping[T]
}

export default abstract class ComplexCanvasAnimationParams<T extends ObjectParams = ObjectParams, U = unknown, V extends TransformOptions = TransformOptions>
    extends CanvasAnimationParams<T, V, SelectionType<U>> {

    public readonly p5: p5Types

    constructor(params: Params<T, V, SelectionType<U>>, p5: p5Types, animationStyle: AnimationStyle) {
        super(params, animationStyle)
        this.p5 = p5
    }

    protected toSimpleCanvasAnimationParams(): SimpleCanvasAnimationParams[] {
        const objectParamsWithTime = this.getObjectParamsWithTime()
        if (objectParamsWithTime.length === 0) {
            return []
        }
        const initialObjectParams = objectParamsWithTime[0]

        const result = new Map<string, SimpleCanvasAnimationParams>
        const includedAnimationParams = this.getIncludedAnimationParamsByParameter(initialObjectParams.objectParams)
        includedAnimationParams.forEach((params, key) => {
            const simpleParamsObject = this.createSimpleParamsObject(
                params,
                this.getPresenceParam().map(p => {
                    let disappearDuration = p.disappearDuration
                    let disappearTime = p.disappearTime
                    if (params.disappearType === "immediate") {
                        disappearDuration = 0
                    }
                    if (params.disappearType === "immediateAtTheEnd") {
                        disappearTime = p.disappearTime + p.disappearDuration
                        disappearDuration = 0
                    }
                    return {
                        ...p,
                        appearDuration: params.appearType === "immediate" ? 0 : p.appearDuration,
                        disappearTime: disappearTime,
                        disappearDuration: disappearDuration
                    }
                })
            )
            result.set(key, simpleParamsObject)
        })

        let previousObject = initialObjectParams.objectParams
        let prevObjectParams = includedAnimationParams
        for (let i = 1; i < objectParamsWithTime.length; i++) {
            const nextObject = objectParamsWithTime[i].objectParams
            const nextObjectParams = this.getIncludedAnimationParamsByParameter(nextObject)
            const transformSimpleAnimationsDifference = this.getAnimationsSetDifference(prevObjectParams, nextObjectParams)

            this.applySimpleTransformAnimations(result, objectParamsWithTime[i].time, objectParamsWithTime[i].duration, transformSimpleAnimationsDifference)

            previousObject = nextObject
            prevObjectParams = nextObjectParams
        }

        return Array.from(result.values())
    }

    protected applySimpleTransformAnimations(
        animations: Map<string, SimpleCanvasAnimationParams>,
        time: number,
        duration: number,
        diff: AnimationsSetDifferenceType
    ): void {
        const {
            added,
            deleted,
            changed
        } = diff
        added.forEach((value, key) => {
            const pastParams = animations.get(key)
            if (pastParams) {
                pastParams.appendPresence({
                    appearTime: time,
                    appearDuration: duration,
                })
                pastParams.appendTransformation({
                    appearTime: time,
                    appearDuration: duration,
                    object: value.objectParams
                })
            } else {
                const simpleParamsObject =  this.createSimpleParamsObject(value)

                simpleParamsObject.appendPresence({
                    appearTime: time,
                    appearDuration: value.appearType === "immediate" ? 0 : duration,
                })
                animations.set(key, simpleParamsObject)
            }
        })
        deleted.forEach((value, key) => {
            const deletedAnimation = requireValueFromMap(animations, key)
            const presenceParam = deletedAnimation.getPresenceParam()
            let disappearDuration = duration
            let disappearTime = time
            if (value.disappearType === "immediate") {
                disappearDuration = 0
            }
            if (value.disappearType === "immediateAtTheEnd") {
                disappearTime = time + duration
                disappearDuration = 0
            }
            presenceParam[presenceParam.length - 1].disappearTime = disappearTime
            presenceParam[presenceParam.length - 1].disappearDuration = disappearDuration
            deletedAnimation.setPresenceParam(presenceParam)
        })
        changed.forEach((value, key) => animations.get(key)?.appendTransformation({
            appearTime: time,
            appearDuration: duration,
            object: value.target.objectParams
        }))
    }

    public getIncludedAnimationParams(): Map<string, CanvasAnimationParamsType> {
        return this.getIncludedAnimationParamsByParameter(this.getObject())
    }

    protected abstract getIncludedAnimationParamsByParameter(object: T): Map<string, CanvasAnimationParamsType>

    getAnimationsSetDifference(
        left: Map<string, CanvasAnimationParamsType>,
        right: Map<string, CanvasAnimationParamsType>
    ): AnimationsSetDifferenceType {
        const added = new Map<string, CanvasAnimationParamsType>()
        const deleted = new Map<string, CanvasAnimationParamsType>()
        const changedSourceToTarget: Map<string, AnimationS2T> = new Map<string, AnimationS2T>()

        right.forEach((value, key) => !left.has(key) && added.set(key, value))
        left.forEach((value, key) => {
            const rightValue = right.get(key)
            if (rightValue) {
                if (JSON.stringify(value.objectParams) !== JSON.stringify(rightValue.objectParams)) {
                    changedSourceToTarget.set(key, {
                        source: value,
                        target: rightValue
                    })
                }
            } else {
                deleted.set(key, value)
            }
        })
        return {
            added,
            deleted,
            changed: changedSourceToTarget
        }
    }

    toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[] {
        return this.toSimpleCanvasAnimationParams().flatMap(p => p.toCanvasAnimations(animationStyle))
    }

    mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, animationStyle: AnimationStyle): Omit<T, keyof ObjectParams> {
        return obj
    }

    createSimpleParamsObject(params: CanvasAnimationParamsType, presenceParameters?: Partial<PresenceParamType>[]): SimpleCanvasAnimationParams {
        const constructor = TypeToSimpleParamsConstructorMapping[params.type]
        return constructor(
            {
                object: params.objectParams as any,
                presenceParameters
            },
            this.p5,
            this.getAnimationStyle()
        )
    }

}
