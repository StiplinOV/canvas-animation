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

    private readonly simpleAmimations: SimpleCanvasAnimation<{}>[]

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>>, p5: p5Types) {
        super(params)
        this.p5 = p5
        this.simpleAmimations = this.calculateIncludedSimpleAnimations()
    }

    draw(p5: p5Types, time: number): void {
        const object = this.getObject()
        const rotationAxis = object.origin
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation || 0)

        this.simpleAmimations.forEach(a => a.draw(p5, time))

        p5.pop()
    }

    private calculateIncludedSimpleAnimations(): SimpleCanvasAnimation<{}>[] {
        const result: SimpleCanvasAnimation<{}>[] = []
        const {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectOnAppearance = this.calculateObjectParamsInTime(appearTime, this.p5)
        const animationsOnAppearance = this.getIncludedAnimationsByParameters(objectOnAppearance)
        const appearedObjectAppearDuration = appearDuration / animationsOnAppearance.size
        let appearedObjectAppearTime = appearTime

        animationsOnAppearance.forEach(a => {
            a.setAppearanceParam({appearTime: appearedObjectAppearTime, appearDuration: appearedObjectAppearDuration})
            appearedObjectAppearTime += appearedObjectAppearDuration
            result.push(a)
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

            if (added.length > 0) {
                const addedAppearDuration = transformDuration / added.length
                let addedAppearTime = t.appearTime
                added.forEach(a => {
                    a.setAppearanceParam({appearTime: addedAppearTime, appearDuration: addedAppearDuration})
                    addedAppearTime += addedAppearDuration
                    result.push(a)
                })
            }
            if (deleted.length > 0) {
                const deletedDisappearDuration = transformDuration / deleted.length
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
        return result
    }

    private getAnimationsSetDifference(left: includedAnimationsType, right: includedAnimationsType): {
        added: SimpleCanvasAnimation<{}>[],
        deleted: SimpleCanvasAnimation<{}>[],
        changedSourceToTarget: Map<string, animationSourceToTargetType>
    } {
        const added: SimpleCanvasAnimation<{}>[] = []
        const deleted: SimpleCanvasAnimation<{}>[] = []
        const changedSourceToTarget: Map<string, animationSourceToTargetType> = new Map<string, animationSourceToTargetType>()

        right.forEach((value, key) => !left.has(key) && added.push(value))
        left.forEach((value, key) => {
            const rightValue = right.get(key)
            if (rightValue) {
                if (JSON.stringify(value.getObject()) !== JSON.stringify(rightValue.getObject())) {
                    changedSourceToTarget.set(key, {source: value, target: rightValue})
                }
            } else {
                deleted.push(value)
            }
        })
        return {added, deleted, changedSourceToTarget}
    }

    public abstract getIncludedAnimationsByParameters(object: objectParamsType<T>): includedAnimationsType

}