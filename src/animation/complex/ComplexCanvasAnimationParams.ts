import CanvasAnimationParams, {ObjectParams, Params, Selection, Transformation} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import SimpleCanvasAnimationParams from '../simple/SimpleCanvasAnimationParams'
import {requireValueFromMap} from '../../common/Utils'
import CanvasAnimation from '../CanvasAnimation'

export interface ComplexCanvasAnimationSelection<T> extends Selection {
    type?: 'together' | 'sequentially'
    selector?: T
}

type AnimationS2T = { source: SimpleCanvasAnimationParams, target: SimpleCanvasAnimationParams }

export interface TransformOptions {
    type: 'together' | 'sequentially'
}

export type AnimationsSetDifferenceType = {
    added: Map<string, SimpleCanvasAnimationParams>
    deleted: Map<string, SimpleCanvasAnimationParams>
    changed: Map<string, AnimationS2T>
}

export default abstract class ComplexCanvasAnimationParams<T extends ObjectParams = ObjectParams, U = unknown, V extends TransformOptions = TransformOptions>
    extends CanvasAnimationParams<T, V, ComplexCanvasAnimationSelection<U>> {

    public readonly p5: p5Types

    constructor(params: Params<T, V, ComplexCanvasAnimationSelection<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
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
            //TODO start
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
        const type = options?.type
        if (added.size) {
            let addedAppearTime = time
            added.forEach((value, key) => {
                let addedAppearDuration = duration
                if (type === 'sequentially') {
                    addedAppearDuration = (duration / added.size)
                }
                value.setAppearTime(addedAppearTime)
                value.setAppearDuration(addedAppearDuration)
                if (type === 'sequentially') {
                    addedAppearTime += addedAppearDuration
                }

                animations.set(key, value)
            })
        }
        if (deleted.size) {
            let deletedDisappearTime = time
            deleted.forEach((_, k) => {
                const deletedAnimation = requireValueFromMap(animations, k)
                let deletedDisappearDuration = duration
                if (type === 'sequentially') {
                    deletedDisappearDuration = (duration / deleted.size)
                }
                deletedAnimation.setDisappearTime(deletedDisappearTime)
                deletedAnimation.setDisappearDuration(deletedDisappearDuration)
                if (type === 'sequentially') {
                    deletedDisappearTime += deletedDisappearDuration
                }
            })
        }

        let sourceToTargetAppearTime = time
        changed.forEach((value, key) => {
            let sourceToTargetAppearDuration = duration
            if (type === 'sequentially') {
                sourceToTargetAppearDuration /= changed.size
            }
            animations.get(key)?.appendTransformation({
                time: sourceToTargetAppearTime,
                duration: sourceToTargetAppearDuration,
                object: value.target.getObject()
            })
            if (type === 'sequentially') {
                sourceToTargetAppearTime += sourceToTargetAppearDuration
            }
        })
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

}
