import CanvasAnimation, {ObjectParams, Params, Selection} from '../CanvasAnimation'
import p5Types from 'p5'

export interface ComplexCanvasAnimationSelection<T> extends Selection {
    type?: 'together' | 'sequentially'
    selector?: T
}

type AnimationS2T = { source: CanvasAnimation, target: CanvasAnimation }
type TransformOptions = { type: 'together' | 'sequentially' }

export default abstract class ComplexCanvasAnimation<T extends ObjectParams, U = unknown>
    extends CanvasAnimation<T, TransformOptions, ComplexCanvasAnimationSelection<U>> {

    public readonly p5: p5Types

    private readonly containedAnimations: Map<string, CanvasAnimation>

    constructor(params: Params<T, TransformOptions, ComplexCanvasAnimationSelection<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
        this.containedAnimations = this.calculateContainedAnimations()
    }

    protected doDraw(p5: p5Types, time: number): void {
        this.containedAnimations.forEach(a => {
            a.draw(p5, time)
        })
    }

    protected afterSetAppearanceParam(): void {
        const appearDuration = this.getAppearanceParam().appearDuration / this.containedAnimationsLength()
        const disappearDuration = this.getAppearanceParam().disappearDuration / this.containedAnimationsLength()
        let appearTime = this.getAppearanceParam().appearTime
        let disappearTime = this.getAppearanceParam().disappearTime + disappearDuration * (this.containedAnimationsLength() - 1)

        this.containedAnimations.forEach(a => {
            const numberOfContainedAnimations = a.containedAnimationsLength()
            a.setAppearanceParam({
                appearTime,
                appearDuration: appearDuration * numberOfContainedAnimations,
                disappearTime,
                disappearDuration: disappearDuration * numberOfContainedAnimations
            })
            appearTime += appearDuration * numberOfContainedAnimations
            disappearTime -= disappearDuration * numberOfContainedAnimations
        })
    }

    public containedAnimationsLength(): number {
        let result = 0
        this.containedAnimations.forEach(v => {
            result += v.containedAnimationsLength()
        })
        return result
    }

    private calculateContainedAnimations(): Map<string, CanvasAnimation> {
        const result = new Map<string, CanvasAnimation>()
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, this.p5)
        const animationsOnAppearance = this.getIncludedAnimationsByParameters(objectOnAppearance)
        let numberOfAnimationsOnAppearance = 0
        animationsOnAppearance.forEach(a => {
            numberOfAnimationsOnAppearance += a.containedAnimationsLength()
        })
        const appearedObjectAppearDuration = appearDuration / numberOfAnimationsOnAppearance
        let appearedObjectAppearTime = appearTime

        animationsOnAppearance.forEach((value, key) => {
            value.setAppearanceParam({
                appearTime: appearedObjectAppearTime,
                appearDuration: appearedObjectAppearDuration * value.containedAnimationsLength()
            })
            appearedObjectAppearTime += appearedObjectAppearDuration * value.containedAnimationsLength()
            result.set(key, value)
        })
        let prevAnimationSet = animationsOnAppearance
        this.getTransformations().sort((l, r) => l.presenceParameters.appearTime - r.presenceParameters.appearTime).forEach(t => {
            const objectOnTransform = this.calculateObjectParamsInTime(t.presenceParameters.appearTime, this.p5, 1)
            const animationsOnTransform = this.getIncludedAnimationsByParameters(objectOnTransform)
            const transformDuration = t.presenceParameters.appearDuration
            const transformationType = t.options?.type
            const {
                added,
                deleted,
                changed
            } = this.getAnimationsSetDifference(prevAnimationSet, animationsOnTransform)

            if (added.size) {
                const addedLength = Array.from(added.values()).map(v => v.containedAnimationsLength()).reduce((l, r) => l + r)
                let addedAppearTime = t.presenceParameters.appearTime
                added.forEach((value, key) => {
                    let addedAppearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        addedAppearDuration = (transformDuration / addedLength) * value.containedAnimationsLength()
                    }
                    value.setAppearanceParam({
                        appearTime: addedAppearTime,
                        appearDuration: addedAppearDuration
                    })
                    if (transformationType === 'sequentially') {
                        addedAppearTime += addedAppearDuration * value.containedAnimationsLength()
                    }
                    result.set(key, value)
                })
            }
            if (deleted.size) {
                let numberOfDeleted = 0
                deleted.forEach(d => {
                    numberOfDeleted += d.containedAnimationsLength()
                })
                let deletedDisappearTime = t.presenceParameters.appearTime
                deleted.forEach(d => {
                    let deletedDisappearDuration = transformDuration
                    if (transformationType === 'sequentially') {
                        deletedDisappearDuration = (transformDuration / numberOfDeleted) * d.containedAnimationsLength()
                    }
                    d.setAppearanceParam({
                        disappearTime: deletedDisappearTime,
                        disappearDuration: deletedDisappearDuration
                    })
                    if (transformationType === 'sequentially') {
                        deletedDisappearTime += deletedDisappearDuration * d.containedAnimationsLength()
                    }
                })
            }

            let sourceToTargetAppearTime = t.presenceParameters.appearTime
            const s2tLength = Array.from(changed.values())
                .map(v => v.target.containedAnimationsLength())
                .reduce((l, r) => l + r)
            changed.forEach((value, key) => {
                let sourceToTargetAppearDuration = transformDuration
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearDuration = (transformDuration / s2tLength) * value.target.containedAnimationsLength()
                }
                result.get(key)?.appendTransformation({
                    presenceParameters: {
                        appearTime: sourceToTargetAppearTime,
                        appearDuration: sourceToTargetAppearDuration
                    },
                    object: value.target.getObject()
                })
                if (transformationType === 'sequentially') {
                    sourceToTargetAppearTime += sourceToTargetAppearDuration * value.target.containedAnimationsLength()
                }
            })
            prevAnimationSet = animationsOnTransform
        })
        const numberOfPrevAnimations = Array.from(prevAnimationSet.values())
            .map(v => v.containedAnimationsLength())
            .reduce((l, r) => l + r)
        const disappearedObjectDisappearDuration = disappearDuration / numberOfPrevAnimations
        let disappearedObjectDisappearTime = disappearTime

        prevAnimationSet.forEach(o => {
            o.setAppearanceParam({
                disappearTime: disappearedObjectDisappearTime,
                disappearDuration: disappearedObjectDisappearDuration * o.containedAnimationsLength()
            })
            disappearedObjectDisappearTime += disappearTime * o.containedAnimationsLength()
        })
        this.setAnimationSelections(result)
        return result
    }

    private setAnimationSelections(animations: Map<string, CanvasAnimation>): void {
        this.getSelections().forEach(selection => {
            const {type, selector, time, duration} = selection
            const animationsToBeSelected: CanvasAnimation[] = []
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

    private getAnimationsSetDifference(left: Map<string, CanvasAnimation>, right: Map<string, CanvasAnimation>): {
        added: Map<string, CanvasAnimation>
        deleted: Map<string, CanvasAnimation>
        changed: Map<string, AnimationS2T>
    } {
        const added = new Map<string, CanvasAnimation>()
        const deleted = new Map<string, CanvasAnimation>()
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

    public abstract getIncludedAnimationsByParameters(object: T): Map<string, CanvasAnimation>

    protected convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return /.*/
    }

}
