import CanvasAnimation, {objectParamsType, paramsType, selectionType} from "../CanvasAnimation";
import p5Types from "p5";
import SimpleCanvasAnimation from "../simple/SimpleCanvasAnimation";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type?: "together" | "sequentially",
    selector?: T
}

export type includedAnimationsType = Map<string, SimpleCanvasAnimation<{}>>
type animationSourceToTargetType = { source: SimpleCanvasAnimation<{}>, target: SimpleCanvasAnimation<{}> }

export default abstract class ComplexCanvasAnimation<T extends {}, U> extends CanvasAnimation<T, complexCanvasAnimationSelectionType<U>> {

    public readonly p5: p5Types

    private readonly simpleAmimations: includedAnimationsType

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
        this.simpleAmimations = this.calculateIncludedSimpleAnimations()
    }

    protected doDraw(p5: p5Types, time: number): void {
        this.simpleAmimations.forEach(a => a.draw(p5, time))
    }

    private calculateIncludedSimpleAnimations(): includedAnimationsType {
        const result = new Map<string, SimpleCanvasAnimation<{}>>()
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, this.p5)
        const animationsOnAppearance = this.getIncludedAnimationsByParameters(objectOnAppearance)
        const appearedObjectAppearDuration = appearDuration / animationsOnAppearance.size
        let appearedObjectAppearTime = appearTime

        animationsOnAppearance.forEach((value, key) => {
            value.setAppearanceParam({
                appearTime: appearedObjectAppearTime,
                appearDuration: appearedObjectAppearDuration
            })
            appearedObjectAppearTime += appearedObjectAppearDuration
            result.set(key, value)
        })
        let prevAnimationSet = animationsOnAppearance
        this.getTransformations().sort((l, r) => l.appearTime - r.appearTime).forEach(t => {
            const objectOnTransform = this.calculateObjectParamsInTime(t.appearTime, this.p5, 1)
            const animationsOnTransform = this.getIncludedAnimationsByParameters(objectOnTransform)
            const transformDuration = t.appearDuration
            const {
                added,
                deleted,
                changedSourceToTarget
            } = this.getAnimationsSetDifference(prevAnimationSet, animationsOnTransform)

            if (added.size > 0) {
                const addedAppearDuration = transformDuration / added.size
                let addedAppearTime = t.appearTime
                added.forEach((value, key) => {
                    value.setAppearanceParam({appearTime: addedAppearTime, appearDuration: addedAppearDuration})
                    addedAppearTime += addedAppearDuration
                    result.set(key, value)
                })
            }
            if (deleted.size > 0) {
                const deletedDisappearDuration = transformDuration / deleted.size
                let deletedDisappearTime = t.appearTime
                deleted.forEach(d => {
                    d.setAppearanceParam({
                        disappearTime: deletedDisappearTime,
                        disappearDuration: deletedDisappearDuration
                    })
                    deletedDisappearTime += deletedDisappearDuration
                })
            }

            let sourceToTargetAppearTime = t.appearTime
            const sourceToTargetAppearDuration = transformDuration / (changedSourceToTarget.size * 2)
            changedSourceToTarget.forEach((value, key) => {
                value.source.appendTransformation({
                    appearTime: sourceToTargetAppearTime,
                    appearDuration: sourceToTargetAppearDuration,
                    object: value.target.getObject()
                })
                sourceToTargetAppearTime += 2 * sourceToTargetAppearDuration
                animationsOnTransform.set(key, value.source)
            })
            prevAnimationSet = animationsOnTransform
        })
        const disappearedObjectDisappearDuration = disappearDuration / prevAnimationSet.size
        let disappearedObjectDisappearTime = disappearTime

        prevAnimationSet.forEach(o => {
            o.setAppearanceParam({
                disappearTime: disappearedObjectDisappearTime,
                disappearDuration: disappearedObjectDisappearDuration
            })
            disappearedObjectDisappearTime += disappearTime
        })
        this.setAnimationSelections(result)
        return result
    }

    private setAnimationSelections(animations: includedAnimationsType): void {
        this.getSelections().forEach(selection => {
            const {type, selector, time, duration} = selection
            const animationsToBeSelected: SimpleCanvasAnimation<{}>[] = []
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

    private getAnimationsSetDifference(left: includedAnimationsType, right: includedAnimationsType): {
        added: Map<string, SimpleCanvasAnimation<{}>>,
        deleted: Map<string, SimpleCanvasAnimation<{}>>,
        changedSourceToTarget: Map<string, animationSourceToTargetType>
    } {
        const added = new Map<string, SimpleCanvasAnimation<{}>>()
        const deleted = new Map<string, SimpleCanvasAnimation<{}>>()
        const changedSourceToTarget: Map<string, animationSourceToTargetType> = new Map<string, animationSourceToTargetType>()

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

    public abstract getIncludedAnimationsByParameters(object: objectParamsType<T>): includedAnimationsType

    protected convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return /.*/
    }

}