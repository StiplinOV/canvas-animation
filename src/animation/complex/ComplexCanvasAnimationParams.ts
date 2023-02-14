import CanvasAnimationParams, {ObjectParams, Params, Selection} from '../CanvasAnimationParams'
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
            const transformDuration = t.presenceParameters.appearDuration
            const transformationType = t.options?.type
            const nextObject = {...previousObject, ...t.object}
            const nextObjectParams = this.getIncludedAnimationParamsByParameter(nextObject)
            const {added, deleted, changed} = this.getAnimationsSetDifference(prevObjectParams, nextObjectParams)
            if (added.size) {
                let addedAppearTime = t.presenceParameters.appearTime
                added.forEach((value, key) => {
                    let addedAppearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        addedAppearDuration = (transformDuration / added.size)
                    }
                    value.setAppearTime(addedAppearTime)
                    value.setAppearDuration(addedAppearDuration)
                    if (transformationType === 'sequentially') {
                        addedAppearTime += addedAppearDuration
                    }
                    initialIncludedAnimationParams.set(key, value)
                })
            }
            if (deleted.size) {
                let deletedDisappearTime = t.presenceParameters.appearTime
                deleted.forEach((_, k) => {
                    const deletedAnimation = requireValueFromMap(initialIncludedAnimationParams, k)
                    let deletedDisappearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        deletedDisappearDuration = (transformDuration / deleted.size)
                    }
                    deletedAnimation.setDisappearTime(deletedDisappearTime)
                    deletedAnimation.setDisappearDuration(deletedDisappearDuration)
                    if (transformationType === 'sequentially') {
                        deletedDisappearTime += deletedDisappearDuration
                    }
                })
            }

            let sourceToTargetAppearTime = t.presenceParameters.appearTime
            changed.forEach((value, key) => {
                let sourceToTargetAppearDuration = transformDuration
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearDuration /= changed.size
                }
                initialIncludedAnimationParams.get(key)?.appendTransformation({
                    presenceParameters: {
                        appearTime: sourceToTargetAppearTime,
                        appearDuration: sourceToTargetAppearDuration
                    },
                    object: value.target.getObject()
                })
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearTime += sourceToTargetAppearDuration
                }
            })

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
    ):
        {
            added: Map<string, SimpleCanvasAnimationParams>
            deleted: Map<string, SimpleCanvasAnimationParams>
            changed: Map<string, AnimationS2T>
        } {
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
