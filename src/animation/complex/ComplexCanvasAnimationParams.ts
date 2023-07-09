import CanvasAnimationParams, {ObjectParams, Params, SelectionType} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import SimpleCanvasAnimationParams from '../simple/SimpleCanvasAnimationParams'
import {requireValueFromMap} from '../../common/Utils'
import CanvasAnimation from '../CanvasAnimation'

export interface AnimationSelectedInfo {
    key: string
    startSelectionPercent?: number
    endSelectionPercent?: number
}

export type AnimationS2T = { source: SimpleCanvasAnimationParams, target: SimpleCanvasAnimationParams }

export interface TransformOptions {
    type: 'together' | 'sequentially'
}

export type AnimationsSetDifferenceType = {
    added: Map<string, SimpleCanvasAnimationParams>
    deleted: Map<string, SimpleCanvasAnimationParams>
    changed: Map<string, AnimationS2T>
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
        const result = this.getIncludedAnimationParamsByParameter(initialObjectParams.objectParams)

        this.getAppearanceParam().appears.forEach(appear => {
            result.forEach(r => {
                r.appendAppearTime(appear.time, appear.duration)
            })
        })

        let previousObject = initialObjectParams.objectParams
        let prevObjectParams = result
        for (let i = 1; i < objectParamsWithTime.length; i++) {
            const nextObject = objectParamsWithTime[i].objectParams
            const nextObjectParams = this.getIncludedAnimationParamsByParameter(nextObject)
            const transformSimpleAnimationsDifference = this.getAnimationsSetDifference(prevObjectParams, nextObjectParams)

            this.applySimpleTransformAnimations(result, objectParamsWithTime[i].time, objectParamsWithTime[i].duration, transformSimpleAnimationsDifference)

            previousObject = nextObject
            prevObjectParams = nextObjectParams
        }

        this.getAppearanceParam().disappears.forEach(disappear => {
            result.forEach(r => {
                r.appendDisappearTime(disappear.time, disappear.duration)
            })
        })

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
                pastParams.appendAppearTime(time, duration)
                pastParams.appendTransformation({
                    appearTime: time,
                    appearDuration: duration,
                    object: value.getObject()
                })
            } else {
                value.appendAppearTime(time, duration)
                animations.set(key, value)
            }
        })
        deleted.forEach((value, key) => {
            const deletedAnimation = requireValueFromMap(animations, key)
            deletedAnimation.appendDisappearTime(time, duration)
        })
        changed.forEach((value, key) => animations.get(key)?.appendTransformation({
            appearTime: time,
            appearDuration: duration,

            object: value.target.getObject()
        }))
    }

    public getIncludedAnimationParams(): Map<string, SimpleCanvasAnimationParams> {
        return this.getIncludedAnimationParamsByParameter(this.getObject())
    }

    protected abstract getIncludedAnimationParamsByParameter(object: T): Map<string, SimpleCanvasAnimationParams>

    getAnimationsSetDifference(
        left: Map<string, SimpleCanvasAnimationParams>,
        right: Map<string, SimpleCanvasAnimationParams>
    ): AnimationsSetDifferenceType {
        const added = new Map<string, SimpleCanvasAnimationParams>()
        const deleted = new Map<string, SimpleCanvasAnimationParams>()
        const changedSourceToTarget: Map<string, AnimationS2T> = new Map<string, AnimationS2T>()

        right.forEach((value, key) => !left.has(key) && added.set(key, value))
        left.forEach((value, key) => {
            const rightValue = right.get(key)
            if (rightValue) {
                if (JSON.stringify(value.getObject()) !== JSON.stringify(rightValue.getObject())) {
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

}
