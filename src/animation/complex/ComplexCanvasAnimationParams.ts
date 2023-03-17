import CanvasAnimationParams, {ObjectParams, Params, Selection, Transformation} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import SimpleCanvasAnimationParams from '../simple/SimpleCanvasAnimationParams'
import {requireValueFromMap} from '../../common/Utils'
import CanvasAnimation from '../CanvasAnimation'

export interface ComplexCanvasAnimationSelection<T = unknown> extends Selection {
    type?: 'together' | 'sequentially'
    selector?: T
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

    constructor(params: Params<T, V, ComplexCanvasAnimationSelection<U>>, p5: p5Types, animationStyle: AnimationStyle) {
        super(params)
        this.p5 = p5
        this.animationStyle = animationStyle
    }

    protected toSimpleCanvasAnimationParams(): SimpleCanvasAnimationParams[] {
        const object = this.getObject()
        const appearanceParam = this.getAppearanceParam()
        const initialIncludedAnimationParams = this.getIncludedAnimationParamsByParameter(object)

        let containedObjectAppearTime = appearanceParam.appearTime
        const containedObjectAppearDuration = appearanceParam.appearDuration / initialIncludedAnimationParams.size

        initialIncludedAnimationParams.forEach(p => {
            p.setAppearanceParam({
                appearTime: containedObjectAppearTime,
                appearDuration: containedObjectAppearDuration
            })
            containedObjectAppearTime += containedObjectAppearDuration
        })
        let previousObject = object
        let prevObjectParams = initialIncludedAnimationParams
        this.getTransformations().forEach(t => {
            const nextObject = {...previousObject, ...t.object}
            const nextObjectParams = this.getIncludedAnimationParamsByParameter(nextObject)

            const transformSimpleAnimationsDifference = this.getAnimationsSetDifference(prevObjectParams, nextObjectParams)
            this.applySimpleTransformAnimations(initialIncludedAnimationParams, t, transformSimpleAnimationsDifference)

            previousObject = nextObject
            prevObjectParams = nextObjectParams
        })

        const disappearedObjectDisappearDuration = appearanceParam.disappearDuration / prevObjectParams.size
        let disappearedObjectDisappearTime = appearanceParam.disappearTime

        prevObjectParams.forEach(o => {
            o.setDisappearTime(disappearedObjectDisappearTime)
            o.setDisappearDuration(disappearedObjectDisappearDuration)
            disappearedObjectDisappearTime += disappearedObjectDisappearDuration
        })
        this.setAnimationSelections(initialIncludedAnimationParams)
        return Array.from(initialIncludedAnimationParams.values())
    }

    protected applySimpleTransformAnimations(
        animations: Map<string, SimpleCanvasAnimationParams>,
        transformation: Transformation<T, V>,
        diff: AnimationsSetDifferenceType
    ): void {
        const {added, deleted, changed} = diff
        const {time, duration, options} = transformation
        this.calculateAddedTransformAnimationsAppearParams(added, time, duration, options).forEach((value, key) => {
            const {params} = value
            params.setAppearTime(value.appearTime)
            params.setAppearDuration(value.appearDuration)
            animations.set(key, params)
        })
        this.calculateDeletedTransformAnimationsDisappearParams(new Set(deleted.keys()), time, duration, options)
            .forEach((value, key) => {
                const deletedAnimation = requireValueFromMap(animations, key)
                deletedAnimation.setDisappearTime(value.disappearTime)
                deletedAnimation.setDisappearDuration(value.disappearDuration)
            })
        this.calculateChangedTransformAnimationsTransformParams(changed, time, duration, options)
            .forEach((value, key) => animations.get(key)?.appendTransformation({
                time: value.time,
                duration: value.duration,
                object: value.s2t.target.getObject()
            }))
    }

    protected calculateAddedTransformAnimationsAppearParams(
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

    protected calculateDeletedTransformAnimationsDisappearParams(
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

    protected calculateChangedTransformAnimationsTransformParams(
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

    public getIncludedAnimationParams(): Map<string, SimpleCanvasAnimationParams> {
        return this.getIncludedAnimationParamsByParameter(this.getObject())
    }

    protected abstract getIncludedAnimationParamsByParameter(object: T): Map<string, SimpleCanvasAnimationParams>

    private setAnimationSelections(animations: Map<string, CanvasAnimationParams>): void {
        this.getSelections().forEach(selection => {
            const {type, selector, time, duration} = selection
            const animationsToBeSelected: CanvasAnimationParams[] = []
            animations.forEach((value, key) => {
                const {appearTime, disappearTime} = value.getAppearanceParam()
                if (time < appearTime || time > disappearTime) {
                    return
                }
                if (selector) {
                    this.convertSelectorToDiscriminatorRegexp(selector).test(key) && animationsToBeSelected.push(value)
                } else {
                    animationsToBeSelected.push(value)
                }
            })
            if (type === 'sequentially') {
                let selectionTime = time
                const selectionDuration = (duration ?? 0) / animationsToBeSelected.length
                animationsToBeSelected.forEach(animation => {
                    animation.addSelection({
                        time: selectionTime,
                        duration: selectionDuration
                    })
                    selectionTime += selectionDuration
                })
            } else {
                animationsToBeSelected.forEach(animation => {
                    animation.addSelection({time, duration})
                })
            }
        })
    }

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
                    changedSourceToTarget.set(key, {source: value, target: rightValue})
                }
            } else {
                deleted.set(key, value)
            }
        })
        return {added, deleted, changed: changedSourceToTarget}
    }

    private convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return new RegExp(this.convertSelectorToDiscriminatorRegexps(selector).map(r => `(${r.source})`).join('|'))
    }

    protected convertSelectorToDiscriminatorRegexps(selector: U): RegExp[] {
        return [/.*/]
    }

    toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[] {
        return this.toSimpleCanvasAnimationParams().flatMap(p => p.toCanvasAnimations(animationStyle))
    }

    protected getAnimationStyle(): AnimationStyle {
        return this.animationStyle
    }

}
