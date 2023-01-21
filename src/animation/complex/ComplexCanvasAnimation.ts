import CanvasAnimation, {objectParamsType, paramsType, selectionType} from "../CanvasAnimation";
import p5Types from "p5";
import SimpleCanvasAnimation from "../simple/SimpleCanvasAnimation";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type?: "together" | "sequentially",
    selector?: T
}

type animationS2TType = { source: SimpleCanvasAnimation<{}>, target: SimpleCanvasAnimation<{}> }

export default abstract class ComplexCanvasAnimation<T extends {}, U> extends CanvasAnimation<T, complexCanvasAnimationSelectionType<U>> {

    public readonly p5: p5Types

    private readonly simpleAmimations: Map<string, CanvasAnimation<{}>>

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
        //TODO нахуя симпл димпл?
        this.simpleAmimations = this.calculateIncludedSimpleAnimations()
    }

    protected doDraw(p5: p5Types, time: number): void {
        this.simpleAmimations.forEach(a => a.draw(p5, time))
    }

    private calculateIncludedSimpleAnimations(): Map<string, SimpleCanvasAnimation<{}>> {
        const result = new Map<string, SimpleCanvasAnimation<{}>>()
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, this.p5)
        const animationsOnAppearance = this.getIncludedSimpleAnimationsByParameters(objectOnAppearance)
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
            const animationsOnTransform = this.getIncludedSimpleAnimationsByParameters(objectOnTransform)
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
            console.log("changedSourceToTarget", changedSourceToTarget)
            changedSourceToTarget.forEach((value, key) => {
                result.get(key)?.appendTransformation({
                    appearTime: sourceToTargetAppearTime,
                    appearDuration: sourceToTargetAppearDuration,
                    object: value.target.getObject()
                })
                sourceToTargetAppearTime += 2 * sourceToTargetAppearDuration
                //animationsOnTransform.set(key, value.source)
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

    private setAnimationSelections(animations: Map<string, SimpleCanvasAnimation<{}>>): void {
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

    private getAnimationsSetDifference(left: Map<string, SimpleCanvasAnimation<{}>>, right: Map<string, SimpleCanvasAnimation<{}>>): {
        added: Map<string, SimpleCanvasAnimation<{}>>,
        deleted: Map<string, SimpleCanvasAnimation<{}>>,
        changedSourceToTarget: Map<string, animationS2TType>
    } {
        const added = new Map<string, SimpleCanvasAnimation<{}>>()
        const deleted = new Map<string, SimpleCanvasAnimation<{}>>()
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

    private getIncludedSimpleAnimationsByParameters(object: objectParamsType<T>): Map<string, SimpleCanvasAnimation<{}>> {
        //Флаг isComplex
        //Выглядит как искуственная херь поебень
        //Поле order
        //Очень усложнит код
        //set offset
        //Тоже как то искуственно
        //Можно еще поработать с offset но тогда возможно будет проблема с вращениями, поскольку rotation это вращение вокруг offset
        //Что?
        //А почему если мы стрелке назначаем origin она не работает?
        const result = new Map<string, SimpleCanvasAnimation<{}>>()
        const includedAnimations = this.getIncludedAnimationsByParameters(object)
        includedAnimations.complexAnimations.forEach((value, key) => value
            .getIncludedSimpleAnimationsByParameters(value.getObject())
            .forEach((simpleAnimation, simpleAnimationKey) => {
                simpleAnimation.getObject().offset = value.getObject().origin
                result.set(key + " " + simpleAnimationKey, simpleAnimation)
            }))
        includedAnimations.simpleAnimations.forEach((value, key) => result.set(key, value))
        return result
    }

    public abstract getIncludedAnimationsByParameters(object: objectParamsType<T>): {
        complexAnimations: Map<string, ComplexCanvasAnimation<{}, {}>>
        simpleAnimations: Map<string, SimpleCanvasAnimation<{}>>
    }

    protected convertSelectorToDiscriminatorRegexp(selector: U): RegExp {
        return /.*/
    }

}