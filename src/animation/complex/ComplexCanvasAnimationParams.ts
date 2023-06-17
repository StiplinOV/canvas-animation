import CanvasAnimationParams, { ObjectParams, Params, Selection, Transformation } from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import SimpleCanvasAnimationParams from '../simple/SimpleCanvasAnimationParams'
import { needAppearObject, requireValueFromMap } from '../../common/Utils'
import CanvasAnimation from '../CanvasAnimation'

export interface AnimationSelectedInfo {
    key: string,
    startSelectionPercent?: number,
    endSelectionPercent?: number
}

export interface ComplexCanvasAnimationSelection<T = unknown> extends Selection<'together' | 'sequentially' | T> {}

export type AnimationS2T = { source: SimpleCanvasAnimationParams, target: SimpleCanvasAnimationParams }

export interface TransformOptions {
    type: 'together' | 'sequentially'
}

export type AnimationsSetDifferenceType = {
    added: Map<string, SimpleCanvasAnimationParams>
    deleted: Map<string, SimpleCanvasAnimationParams>
    changed: Map<string, AnimationS2T>
}

export type AddedAppearParamType = {
    appearTime: number
    appearDuration: number
    params: SimpleCanvasAnimationParams
}

export type DeletedDisappearParamType = {
    disappearTime: number
    disappearDuration: number
}

export type ChangedTransformParamType = {
    time: number
    duration: number
    s2t: AnimationS2T
}

export default abstract class ComplexCanvasAnimationParams<T extends ObjectParams = ObjectParams, U = unknown, V extends TransformOptions = TransformOptions>
    extends CanvasAnimationParams<T, V, ComplexCanvasAnimationSelection<U>> {

    public readonly p5: p5Types

    private readonly animationStyle: AnimationStyle

    constructor (params: Params<T, V, ComplexCanvasAnimationSelection<U>>, p5: p5Types, animationStyle: AnimationStyle) {
        super(params)
        this.p5 = p5
        this.animationStyle = animationStyle
    }

    protected toSimpleCanvasAnimationParams (): SimpleCanvasAnimationParams[] {
        const object = this.getObject()
        const appearanceParam = this.getAppearanceParam()
        const initialIncludedAnimationParams = this.getIncludedAnimationParamsByParameter(object)

        appearanceParam.appears.forEach(appear => {
            //TODO add type
            let containedObjectAppearTime = appear.time
            const containedObjectAppearDuration = appear.duration / initialIncludedAnimationParams.size

            initialIncludedAnimationParams.forEach(p => {
                p.appendAppearTime(containedObjectAppearTime, containedObjectAppearDuration)
                containedObjectAppearTime += containedObjectAppearDuration
            })
        })
        let previousObject = object
        let prevObjectParams = initialIncludedAnimationParams
        this.getTransformations().forEach(t => {
            const nextObject = { ...previousObject, ...t.object }
            const nextObjectParams = this.getIncludedAnimationParamsByParameter(nextObject)

            const transformSimpleAnimationsDifference = this.getAnimationsSetDifference(prevObjectParams, nextObjectParams)
            this.applySimpleTransformAnimations(initialIncludedAnimationParams, t, transformSimpleAnimationsDifference)

            previousObject = nextObject
            prevObjectParams = nextObjectParams
        })
        appearanceParam.disappears.forEach(disappear => {
            const disappearedObjectDisappearDuration = disappear.duration / prevObjectParams.size
            let disappearedObjectDisappearTime = disappear.time

            initialIncludedAnimationParams.forEach((o) => {
                o.appendDisappearTime(disappearedObjectDisappearTime, disappearedObjectDisappearDuration)
                disappearedObjectDisappearTime += disappearedObjectDisappearDuration
            })
        })
        this.setAnimationSelections(initialIncludedAnimationParams)
        return Array.from(initialIncludedAnimationParams.values())
    }

    protected applySimpleTransformAnimations (
        animations: Map<string, SimpleCanvasAnimationParams>,
        transformation: Transformation<T, V>,
        diff: AnimationsSetDifferenceType
    ): void {
        const {
            added,
            deleted,
            changed
        } = diff
        const {
            time,
            duration,
            options
        } = transformation
        this.calculateAddedTransformAnimationsAppearParams(added, time, duration, options).forEach((value, key) => {
            const params = value.params
            const pastParams = animations.get(key)

            if (pastParams) {
                pastParams.appendAppearTime(value.appearTime, value.appearDuration)
                pastParams.appendTransformation({
                    time: value.appearTime,
                    duration: value.appearDuration,
                    object: params.getObject()
                })
            } else {
                params.appendAppearTime(value.appearTime, value.appearDuration)
                animations.set(key, params)
            }
        })
        this.calculateDeletedTransformAnimationsDisappearParams(new Set(deleted.keys()), time, duration, options)
            .forEach((value, key) => {
                const deletedAnimation = requireValueFromMap(animations, key)
                deletedAnimation.appendDisappearTime(value.disappearTime, value.disappearDuration)
            })
        this.calculateChangedTransformAnimationsTransformParams(changed, time, duration, options)
            .forEach((value, key) => animations.get(key)?.appendTransformation({
                time: value.time,
                duration: value.duration,
                object: value.s2t.target.getObject()
            }))
    }

    protected calculateAddedTransformAnimationsAppearParams (
        added: Map<string, SimpleCanvasAnimationParams>,
        time: number,
        duration: number,
        options?: V
    ): Map<string, AddedAppearParamType> {
        const type = options?.type
        const result = new Map<string, AddedAppearParamType>()
        let addedAppearTime = time
        added.forEach((value, key) => {
            let addedAppearDuration = duration
            if (type === 'sequentially') {
                addedAppearDuration = (duration / added.size)
            }
            result.set(key, {
                appearTime: addedAppearTime,
                appearDuration: addedAppearDuration,
                params: value
            })
            if (type === 'sequentially') {
                addedAppearTime += addedAppearDuration
            }
        })
        return result
    }

    protected calculateDeletedTransformAnimationsDisappearParams (
        deleted: Set<string>,
        time: number,
        duration: number,
        options?: V
    ): Map<string, DeletedDisappearParamType> {
        const type = options?.type
        const result = new Map<string, DeletedDisappearParamType>()
        let deletedDisappearTime = time
        deleted.forEach(k => {
            let deletedDisappearDuration = duration
            if (type === 'sequentially') {
                deletedDisappearDuration = (duration / deleted.size)
            }
            result.set(k, {
                disappearTime: deletedDisappearTime,
                disappearDuration: deletedDisappearDuration
            })
            if (type === 'sequentially') {
                deletedDisappearTime += deletedDisappearDuration
            }
        })
        return result
    }

    protected calculateChangedTransformAnimationsTransformParams (
        changed: Map<string, AnimationS2T>,
        time: number,
        duration: number,
        options?: V
    ): Map<string, ChangedTransformParamType> {
        const type = options?.type
        const result = new Map<string, ChangedTransformParamType>()
        let s2tAppearTime = time
        changed.forEach((value, key) => {
            let s2tAppearDuration = duration
            if (type === 'sequentially') {
                s2tAppearDuration /= changed.size
            }
            result.set(key, {
                time: s2tAppearTime,
                duration: s2tAppearDuration,
                s2t: value
            })
            if (type === 'sequentially') {
                s2tAppearTime += s2tAppearDuration
            }
        })
        return result
    }

    public getIncludedAnimationParams (): Map<string, SimpleCanvasAnimationParams> {
        return this.getIncludedAnimationParamsByParameter(this.getObject())
    }

    protected abstract getIncludedAnimationParamsByParameter (object: T): Map<string, SimpleCanvasAnimationParams>

    private setAnimationSelections (animations: Map<string, CanvasAnimationParams>): void {
        this.getSelections().forEach(selection => {
            const {
                type,
                time,
                duration
            } = selection
            const animationsCanBeSelected = new Set<string>()
            animations.forEach((value, key) => {
                if (!needAppearObject(time, value.getAppearanceParam())) {
                    return
                }
                animationsCanBeSelected.add(key)
            })
            if (type === 'sequentially') {
                let selectionTime = time
                const selectionDuration = (duration) / animationsCanBeSelected.size
                animationsCanBeSelected.forEach(key => {
                    animations.get(key)?.addSelection({
                        time: selectionTime,
                        duration: selectionDuration
                    })
                    selectionTime += selectionDuration
                })
            } else if (type === 'together') {
                animationsCanBeSelected.forEach(key => {
                    animations.get(key)?.addSelection({
                        time,
                        duration
                    })
                })
            } else {
                this.getAnimationsToBeSelectedInfo(animationsCanBeSelected, type).forEach(info =>
                    animations.get(info.key)?.addSelection({
                        time: time + (duration * (info.startSelectionPercent ?? 0)),
                        duration: ((info.endSelectionPercent ?? 1) - (info.startSelectionPercent ?? 0)) * duration
                    })
                )
            }
        })
    }

    protected getAnimationsToBeSelectedInfo (animationsCanBeSelected: Set<string>, selectionType?: U): AnimationSelectedInfo[] {
        return []
    }

    protected createAnimationSelectedInfoByRegexpSelector (
        animationsCanBeSelected: Set<string>,
        selectionType: U,
        selectorToDiscriminatorRegexpFunction: (selector: U) => RegExp[]
    ): AnimationSelectedInfo[] {
        const result: AnimationSelectedInfo[] = []
        const discriminatorRegexps = selectorToDiscriminatorRegexpFunction(selectionType)
        animationsCanBeSelected.forEach(a => {
            for (let i = 0; i < discriminatorRegexps.length; i++) {
                if (discriminatorRegexps[i].test(a)) {
                    result.push({ key: a })
                    break
                }
            }
        })

        return result
    }

    getAnimationsSetDifference (
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

    toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[] {
        return this.toSimpleCanvasAnimationParams().flatMap(p => p.toCanvasAnimations(animationStyle))
    }

    protected getAnimationStyle (): AnimationStyle {
        return this.animationStyle
    }

}
