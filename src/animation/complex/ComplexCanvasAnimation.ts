import CanvasAnimation, {objectParamsType, paramsType, selectionType} from "../CanvasAnimation";
import p5Types from "p5";
import SimpleCanvasAnimation from "../simple/SimpleCanvasAnimation";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type?: "together" | "sequentially",
    selector?: T
}

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
        const appearedObjectAppearDuration = appearDuration / animationsOnAppearance.length
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
            const {added, deleted, unchangedSource, unchangedTarget} = this.getAnimationsSetDifference(
                prevAnimationSet,
                animationsOnTransform
            )
            // console.log(this.getAnimationsSetDifference(
            //     prevAnimationSet,
            //     animationsOnTransform
            // ))
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
            const sourceGroups = this.groupSimpleObjectsByType(unchangedSource)
            const targetGroups = this.groupSimpleObjectsByType(unchangedTarget)
            const sources: SimpleCanvasAnimation<{}>[] = []
            const targets: SimpleCanvasAnimation<{}>[] = []

            sourceGroups.forEach((sourceGroup, key) => {
                const targetGroup = targetGroups.get(key)
                targetGroup && sourceGroup.forEach((source, index) => {


                    const target = targetGroup[index]
                    if (JSON.stringify(source.getObject()) !== JSON.stringify(target.getObject())) {
                        sources.push(source)
                        targets.push(target)
                    }
                })
            })

            let sourceToTargetAppearTime = t.appearTime
            const sourceToTargetAppearDuration = transformDuration/(sources.length * 2)
//            console.log(sources.length)
            sources.forEach((source, index) => {
                source.appendTransformation({
                    appearTime: sourceToTargetAppearTime,
                    appearDuration: sourceToTargetAppearDuration,
                    object: targets[index].getObject()
                })
                sourceToTargetAppearTime += 2 * sourceToTargetAppearDuration
                animationsOnTransform[animationsOnTransform.indexOf(targets[index])] = source
            })
            // sourceGroups.forEach((sourceGroup, key) => {
            //     const targetGroup = targetGroups.get(key)
            //     targetGroup && sourceGroup.forEach((source, index) => {
            //         const target = targetGroup[index]
            //        // console.log(source.getObject(), " => ", target.getObject())
            //         source.appendTransformation({
            //             appearTime: sourceToTargetAppearTime,
            //             appearDuration: sourceToTargetAppearDuration,
            //             object: target.getObject()
            //         })
            //         sourceToTargetAppearTime += sourceToTargetAppearDuration
            //         animationsOnTransform[animationsOnTransform.indexOf(target)] = source
            //     })
            // })
            prevAnimationSet = animationsOnTransform
        })
        const disappearedObjectDisappearDuration = disappearDuration / prevAnimationSet.length
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

    private getAnimationsSetDifference(left: SimpleCanvasAnimation<{}>[], right: SimpleCanvasAnimation<{}>[]): {
        added: SimpleCanvasAnimation<{}>[],
        deleted: SimpleCanvasAnimation<{}>[],
        unchangedSource: SimpleCanvasAnimation<{}>[],
        unchangedTarget: SimpleCanvasAnimation<{}>[]
    } {
        const added: SimpleCanvasAnimation<{}>[] = []
        const deleted: SimpleCanvasAnimation<{}>[] = []
        const unchangedSource: SimpleCanvasAnimation<{}>[] = []
        const unchangedTarget: SimpleCanvasAnimation<{}>[] = []

        const leftGroup = this.groupSimpleObjectsByType(left)
        const rightGroup = this.groupSimpleObjectsByType(right)

        leftGroup.forEach((leftValue, key) => {
            const rightValue = rightGroup.get(key)

            const leftValueRemaining: SimpleCanvasAnimation<{}>[] = []
            const rightValueRemaining: SimpleCanvasAnimation<{}>[] = []

            if (rightValue) {
                let i = 0, j = 0;
                while(i < leftValue.length && j < rightValue.length){
                    const leftValueElement = leftValue[i]
                    const rightValueElement = rightValue[j]
                    const leftValueElementString = JSON.stringify(leftValueElement.getObject())
                    const rightValueElementString = JSON.stringify(rightValueElement.getObject())
//                    console.log(leftValueElementString, rightValueElementString, leftValueElementString.localeCompare(rightValueElementString))

                    if (leftValueElementString.localeCompare(rightValueElementString) === 0) {
                        unchangedSource.push(leftValueElement)
                        unchangedTarget.push(rightValueElement)
                        i++; j++
                    } else if (leftValueElementString.localeCompare(rightValueElementString) > 0) {
                        rightValueRemaining.push(rightValueElement)
                        j++;
                    } else {
                        leftValueRemaining.push(leftValueElement)
                        i++;
                    }
                }
                while (i < leftValue.length) {
                    leftValueRemaining.push(leftValue[i])
                    i++;
                }
                while (j < rightValue.length) {
                    rightValueRemaining.push(rightValue[j])
                    j++;
                }
                // console.log(leftValueRemaining)
                // console.log(rightValueRemaining)
                // console.log(unchangedSource)

                if (leftValueRemaining.length === rightValueRemaining.length) {
                    unchangedSource.push(...leftValueRemaining)
                    unchangedTarget.push(...rightValueRemaining)
                } else if (leftValueRemaining.length > rightValueRemaining.length) {
                    unchangedSource.push(...leftValueRemaining.slice(0, rightValueRemaining.length))
                    unchangedTarget.push(...rightValueRemaining)
                    deleted.push(...leftValueRemaining.slice(rightValueRemaining.length, leftValueRemaining.length))
                } else {
                    unchangedSource.push(...leftValueRemaining)
                    unchangedTarget.push(...rightValueRemaining.slice(0, leftValueRemaining.length))
                    added.push(...rightValueRemaining.slice(leftValueRemaining.length, rightValueRemaining.length))
                }
            } else {
                deleted.push(...leftValueRemaining)
            }
        })
        rightGroup.forEach((value, key) => !leftGroup.get(key) && added.push(...value))

        return {
            added, deleted, unchangedSource, unchangedTarget
        }
    }

    private groupSimpleObjectsByType(objs: SimpleCanvasAnimation<{}>[]): Map<string, SimpleCanvasAnimation<{}>[]> {
        const result = new Map<string, SimpleCanvasAnimation<{}>[]>()
        objs.forEach(o => {
            const arr = result.get(o.constructor.name) || []
            arr.push(o)
            result.set(o.constructor.name, arr)
        })
        result.forEach((value, key) => result.set(key, value.sort((l,r) => JSON.stringify(l.getObject()).localeCompare(JSON.stringify(r.getObject())))))
        return result
    }

    public abstract getIncludedAnimationsByParameters(object: objectParamsType<T>): SimpleCanvasAnimation<{}>[]

}