import CanvasAnimation, {objectParamsType, paramsType, selectionType} from "../CanvasAnimation";
import p5Types from "p5";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type?: "together" | "sequentially",
    selector?: T
}

type animationS2TType = { source: CanvasAnimation<{}>, target: CanvasAnimation<{}> }

export default abstract class ComplexCanvasAnimation<T extends {}, U> extends CanvasAnimation<T, {
    type: "together" | "sequentially"
}, complexCanvasAnimationSelectionType<U>> {

    public readonly p5: p5Types

    private readonly containedAnimations: Map<string, CanvasAnimation<{}>>

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>, complexCanvasAnimationSelectionType<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
        this.containedAnimations = this.calculateContainedAnimations()
    }

    protected doDraw(p5: p5Types, time: number): void {
        this.containedAnimations.forEach(a => a.draw(p5, time))
    }

    protected afterSetAppearanceParam() {
        const appearDuration = this.getAppearanceParam().appearDuration / this.getNumberOfContainedAnimations()
        const disappearDuration = this.getAppearanceParam().disappearDuration / this.getNumberOfContainedAnimations()
        let appearTime = this.getAppearanceParam().appearTime
        let disappearTime = this.getAppearanceParam().disappearTime + disappearDuration * (this.getNumberOfContainedAnimations() - 1)

        this.containedAnimations.forEach(a => {
            const numberOfContainedAnimations = a.getNumberOfContainedAnimations()
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

    public getNumberOfContainedAnimations(): number {
        let result = 0
        this.containedAnimations.forEach(v => result += v.getNumberOfContainedAnimations())
        return result
    }

    private calculateContainedAnimations(): Map<string, CanvasAnimation<{}>> {
        const result = new Map<string, CanvasAnimation<{}>>()
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, this.p5)
        const animationsOnAppearance = this.getIncludedAnimationsByParameters(objectOnAppearance)
        let numberOfAnimationsOnAppearance = 0
        animationsOnAppearance.forEach(a => numberOfAnimationsOnAppearance += a.getNumberOfContainedAnimations())
        const appearedObjectAppearDuration = appearDuration / numberOfAnimationsOnAppearance
        let appearedObjectAppearTime = appearTime

        animationsOnAppearance.forEach((value, key) => {
            value.setAppearanceParam({
                appearTime: appearedObjectAppearTime,
                appearDuration: appearedObjectAppearDuration * value.getNumberOfContainedAnimations()
            })
            appearedObjectAppearTime += appearedObjectAppearDuration * value.getNumberOfContainedAnimations()
            result.set(key, value)
        })
        let prevAnimationSet = animationsOnAppearance
        this.getTransformations().sort((l, r) => l.appearTime - r.appearTime).forEach(t => {
            const objectOnTransform = this.calculateObjectParamsInTime(t.appearTime, this.p5, 1)
            const animationsOnTransform = this.getIncludedAnimationsByParameters(objectOnTransform)
            const transformDuration = t.appearDuration
            const transformationType = t.type
            const {
                added,
                deleted,
                changedSourceToTarget
            } = this.getAnimationsSetDifference(prevAnimationSet, animationsOnTransform)

            if (added.size) {
                let numberOfAdded = 0
                added.forEach(a => numberOfAdded += a.getNumberOfContainedAnimations())
                let addedAppearTime = t.appearTime
                added.forEach((value, key) => {
                    let addedAppearDuration = transformDuration
                    if (transformationType === "sequentially") {
                        addedAppearDuration = (transformDuration / numberOfAdded) * value.getNumberOfContainedAnimations()
                    }
                    value.setAppearanceParam({
                        appearTime: addedAppearTime,
                        appearDuration: addedAppearDuration
                    })
                    if (transformationType === "sequentially") {
                        addedAppearTime += addedAppearDuration * value.getNumberOfContainedAnimations()
                    }
                    result.set(key, value)
                })
            }
            if (deleted.size) {
                let numberOfDeleted = 0
                deleted.forEach(d => numberOfDeleted += d.getNumberOfContainedAnimations())
                let deletedDisappearTime = t.appearTime
                deleted.forEach(d => {
                    let deletedDisappearDuration = transformDuration
                    if (transformationType === "sequentially") {
                        deletedDisappearDuration = (transformDuration / numberOfDeleted)* d.getNumberOfContainedAnimations()
                    }
                    d.setAppearanceParam({
                        disappearTime: deletedDisappearTime,
                        disappearDuration: deletedDisappearDuration
                    })
                    if (transformationType === "sequentially") {
                        deletedDisappearTime += deletedDisappearDuration * d.getNumberOfContainedAnimations()
                    }
                })
            }

            let sourceToTargetAppearTime = t.appearTime
            let numberOfS2T = 0
            changedSourceToTarget.forEach(c => numberOfS2T += c.target.getNumberOfContainedAnimations())
            changedSourceToTarget.forEach((value, key) => {
                let sourceToTargetAppearDuration = transformDuration
                if (transformationType === "sequentially") {
                    sourceToTargetAppearDuration = (transformDuration / numberOfS2T) * value.target.getNumberOfContainedAnimations()
                }
                result.get(key)?.appendTransformation({
                    appearTime: sourceToTargetAppearTime,
                    appearDuration: sourceToTargetAppearDuration,
                    object: value.target.getObject()
                })
                if (transformationType === "sequentially") {
                    sourceToTargetAppearTime += sourceToTargetAppearDuration * value.target.getNumberOfContainedAnimations()
                }
                //animationsOnTransform.set(key, value.source)
            })
            prevAnimationSet = animationsOnTransform
        })
        let numberOfPrevAnimations = 0
        prevAnimationSet.forEach(a => numberOfPrevAnimations += a.getNumberOfContainedAnimations())
        const disappearedObjectDisappearDuration = disappearDuration / numberOfPrevAnimations
        let disappearedObjectDisappearTime = disappearTime

        prevAnimationSet.forEach(o => {
            o.setAppearanceParam({
                disappearTime: disappearedObjectDisappearTime,
                disappearDuration: disappearedObjectDisappearDuration * o.getNumberOfContainedAnimations()
            })
            disappearedObjectDisappearTime += disappearTime * o.getNumberOfContainedAnimations()
        })
        this.setAnimationSelections(result)
        return result
    }

    private setAnimationSelections(animations: Map<string, CanvasAnimation<{}>>): void {
        this.getSelections().forEach(selection => {
            const {type, selector, time, duration} = selection
            const animationsToBeSelected: CanvasAnimation<{}>[] = []
            animations.forEach((value, key) => {
                const {appearTime, disappearTime} = value.getAppearanceParam()
                if (time >= appearTime && time <= disappearTime) {
                    if (!selector || this.convertSelectorToDiscriminatorRegexp(selector).test(key)) {
                        animationsToBeSelected.push(value)
                    }
                }
            })
            if (type === "sequentially") {
                let selectionTime = time
                const selectionDuration = (duration || 0) / animationsToBeSelected.length
                animationsToBeSelected.forEach(animation => {
                    animation.addSelection({
                        time: selectionTime,
                        duration: selectionDuration
                    })
                    selectionTime += selectionDuration
                })
            } else {
                animationsToBeSelected.forEach(animation => animation.addSelection({time, duration}))
            }
        })
    }

    private getAnimationsSetDifference(left: Map<string, CanvasAnimation<{}>>, right: Map<string, CanvasAnimation<{}>>): {
        added: Map<string, CanvasAnimation<{}>>,
        deleted: Map<string, CanvasAnimation<{}>>,
        changedSourceToTarget: Map<string, animationS2TType>
    } {
        const added = new Map<string, CanvasAnimation<{}>>()
        const deleted = new Map<string, CanvasAnimation<{}>>()
        const changedSourceToTarget: Map<string, animationS2TType> = new Map<string, animationS2TType>()

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
        return {added, deleted, changedSourceToTarget}
    }

    public abstract getIncludedAnimationsByParameters(object: objectParamsType<T>): Map<string, CanvasAnimation<{}>>

    protected convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return /.*/
    }

}