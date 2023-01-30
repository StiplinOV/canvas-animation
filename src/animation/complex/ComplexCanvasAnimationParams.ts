import CanvasAnimation from '../CanvasAnimation'
import CanvasAnimationParams, {ObjectParams, Params, Selection} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import ComplexCanvasAnimation from './ComplexCanvasAnimation'

export interface ComplexCanvasAnimationSelection<T> extends Selection {
    type?: 'together' | 'sequentially'
    selector?: T
}

type AnimationS2T = { source: CanvasAnimationParams, target: CanvasAnimationParams }
type TransformOptions = { type: 'together' | 'sequentially' }

export default abstract class ComplexCanvasAnimationParams<T extends ObjectParams = ObjectParams, U = unknown>
    extends CanvasAnimationParams<T, TransformOptions, ComplexCanvasAnimationSelection<U>> {

    public readonly p5: p5Types

    constructor(params: Params<T, TransformOptions, ComplexCanvasAnimationSelection<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
    }

    public calculateContainedAnimations(animationStyle: AnimationStyle): CanvasAnimationParams[] {
        const result = new Map<string, CanvasAnimationParams>()
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, animationStyle)
        const animationsOnAppearance = this.getIncludedAnimationsByParameters(objectOnAppearance)
        let numberOfAnimationsOnAppearance = 0
        animationsOnAppearance.forEach(a => {
            numberOfAnimationsOnAppearance += a.calculateContainedAnimationsFlatten(animationStyle).length
        })
        const appearedObjectAppearDuration = appearDuration / numberOfAnimationsOnAppearance
        let appearedObjectAppearTime = appearTime

        animationsOnAppearance.forEach((value, key) => {
            const containedAnimationLength = value.calculateContainedAnimationsFlatten(animationStyle).length
            value.setAppearanceParam({
                appearTime: appearedObjectAppearTime,
                appearDuration: appearedObjectAppearDuration * containedAnimationLength
            })
            appearedObjectAppearTime += appearedObjectAppearDuration * containedAnimationLength
            result.set(key, value)
        })
        let prevAnimationSet = animationsOnAppearance
        this.getTransformations().sort((l, r) => l.presenceParameters.appearTime - r.presenceParameters.appearTime).forEach(t => {
            const objectOnTransform = this.calculateObjectParamsInTime(t.presenceParameters.appearTime, animationStyle, 1)
            const animationsOnTransform = this.getIncludedAnimationsByParameters(objectOnTransform)
            const transformDuration = t.presenceParameters.appearDuration
            const transformationType = t.options?.type
            const {
                added,
                deleted,
                changed
            } = this.getAnimationsSetDifference(prevAnimationSet, animationsOnTransform)

            if (added.size) {
                const addedLength = Array.from(added.values())
                    .map(v => v.calculateContainedAnimationsFlatten(animationStyle).length)
                    .reduce((l, r) => l + r, 0)
                let addedAppearTime = t.presenceParameters.appearTime
                added.forEach((value, key) => {
                    const containedAnimationLength = value.calculateContainedAnimationsFlatten(animationStyle).length
                    let addedAppearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        addedAppearDuration = (transformDuration / addedLength) * containedAnimationLength
                    }
                    value.setAppearanceParam({
                        appearTime: addedAppearTime,
                        appearDuration: addedAppearDuration
                    })
                    if (transformationType === 'sequentially') {
                        addedAppearTime += addedAppearDuration * containedAnimationLength
                    }
                    result.set(key, value)
                })
            }
            if (deleted.size) {
                let numberOfDeleted = 0
                deleted.forEach(d => {
                    numberOfDeleted += d.calculateContainedAnimationsFlatten(animationStyle).length
                })
                let deletedDisappearTime = t.presenceParameters.appearTime
                deleted.forEach(d => {
                    const containedAnimationLength = d.calculateContainedAnimationsFlatten(animationStyle).length
                    let deletedDisappearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        deletedDisappearDuration = (transformDuration / numberOfDeleted) * containedAnimationLength
                    }
                    d.setAppearanceParam({
                        disappearTime: deletedDisappearTime,
                        disappearDuration: deletedDisappearDuration
                    })
                    if (transformationType === 'sequentially') {
                        deletedDisappearTime += deletedDisappearDuration * containedAnimationLength
                    }
                })
            }

            let sourceToTargetAppearTime = t.presenceParameters.appearTime
            const s2tLength = Array.from(changed.values())
                .map(v => v.target.calculateContainedAnimationsFlatten(animationStyle).length)
                .reduce((l, r) => l + r, 0)
            changed.forEach((value, key) => {
                const containedAnimationLength = value.target.calculateContainedAnimationsFlatten(animationStyle).length
                let sourceToTargetAppearDuration = transformDuration
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearDuration = (transformDuration / s2tLength) * containedAnimationLength
                }
                result.get(key)?.appendTransformation({
                    presenceParameters: {
                        appearTime: sourceToTargetAppearTime,
                        appearDuration: sourceToTargetAppearDuration
                    },
                    object: value.target.getObject()
                })
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearTime += sourceToTargetAppearDuration * containedAnimationLength
                }
            })
            prevAnimationSet = animationsOnTransform
        })
        const numberOfPrevAnimations = Array.from(prevAnimationSet.values())
            .map(v => v.calculateContainedAnimationsFlatten(animationStyle).length)
            .reduce((l, r) => l + r, 0)
        const disappearedObjectDisappearDuration = disappearDuration / numberOfPrevAnimations
        let disappearedObjectDisappearTime = disappearTime

        prevAnimationSet.forEach(o => {
            const containedAnimationLength = o.calculateContainedAnimationsFlatten(animationStyle).length
            o.setAppearanceParam({
                disappearTime: disappearedObjectDisappearTime,
                disappearDuration: disappearedObjectDisappearDuration * containedAnimationLength
            })
            disappearedObjectDisappearTime += disappearTime * containedAnimationLength
        })
        this.setAnimationSelections(result)
        return Array.from(result.values())
    }

    private setAnimationSelections(animations: Map<string, CanvasAnimationParams>): void {
        this.getSelections().forEach(selection => {
            const {type, selector, time, duration} = selection
            const animationsToBeSelected: CanvasAnimationParams[] = []
            animations.forEach((value, key) => {
                const {appearTime, disappearTime} = value.getAppearanceParam()
                if (time >= appearTime && time <= disappearTime) {
                    if (!selector || this.convertSelectorToDiscriminatorRegexp(selector).test(key)) {
                        animationsToBeSelected.push(value)
                    }
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

    private getAnimationsSetDifference(left: Map<string, CanvasAnimationParams>, right: Map<string, CanvasAnimationParams>): {
        added: Map<string, CanvasAnimationParams>
        deleted: Map<string, CanvasAnimationParams>
        changed: Map<string, AnimationS2T>
    } {
        const added = new Map<string, CanvasAnimationParams>()
        const deleted = new Map<string, CanvasAnimationParams>()
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

    public abstract getIncludedAnimationsByParameters(object: T): Map<string, CanvasAnimationParams>

    toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation {
        return new ComplexCanvasAnimation(this, animationStyle)
    }

    protected convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return /.*/
    }

}
