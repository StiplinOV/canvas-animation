import CanvasAnimation, {selectionType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type: "together" | "sequentially",
    selector?: T
}

export default abstract class ComplexCanvasAnimation<T extends Params, U> extends CanvasAnimation<T, complexCanvasAnimationSelectionType<U>> {

    private initialized: boolean = false

    private initialize(): void {
        const includedObjects = this.getFlattenIncludedObjects()
        const objectAppearDuration = this.getAppearDuration() / includedObjects.length
        const objectDisappearDuration = this.getDisappearDuration() / includedObjects.length
        let appearTime = this.getAppearTime()
        let disappearTime = this.getDisappearTime()

        includedObjects.forEach(object => {
            object.setAppearTime(appearTime)
            object.setAppearDuration(objectAppearDuration)
            appearTime += objectAppearDuration
        })
        includedObjects.reverse().forEach(object => {
            object.setDisappearTime(disappearTime)
            object.setDisappearDuration(objectDisappearDuration)
            disappearTime += objectDisappearDuration
        })
        this.initialized = true
    }

    doDraw(p5: p5Types, time: number, selectedPercent: number, selection: complexCanvasAnimationSelectionType<U>): void {
        if (!this.initialized) {
            this.initialize()
        }
        const rotationAxis = this.getOrigin()
        const flattenIncludedObjects = this.getFlattenIncludedObjects()
        const selectionType = selection?.type || "together"
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(this.getObject().rotation || 0)

        if (selectionType === "together") {
            flattenIncludedObjects.forEach(o => o.doDraw(p5, time, selectedPercent, null))
        } else {
            const currentObjectWithPercent = flattenIncludedObjects.length * selectedPercent
            const nearerLowerIndexOfObject = Math.floor(currentObjectWithPercent)
            const percentOfDrawing = currentObjectWithPercent - nearerLowerIndexOfObject
            flattenIncludedObjects.forEach((object, index) => {
                const percent = index === nearerLowerIndexOfObject ? percentOfDrawing : 1
                object.doDraw(p5, time, percent, null)
            })
        }

        p5.pop()
    }

    private getFlattenIncludedObjects(): CanvasAnimation<Params>[] {
        let includedObjects: CanvasAnimation<Params>[] = []
        let flattenIncludedObject = this.getIncludedObjects()
        while (includedObjects.length !== flattenIncludedObject.length) {
            includedObjects = flattenIncludedObject
            flattenIncludedObject = includedObjects.flatMap(o => o.getIncludedObjects())
        }
        return includedObjects
    }

    public abstract getIncludedObjects(): CanvasAnimation<Params>[]

}