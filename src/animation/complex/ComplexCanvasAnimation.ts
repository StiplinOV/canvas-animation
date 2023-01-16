import CanvasAnimation, {paramsType, selectionType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";
import GeometryHelper from "../../common/GeometryHelper";

export type objectInfo = { object: CanvasAnimation<Params>, selected: boolean }

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type?: "together" | "sequentially",
    selector?: T
}

export default abstract class ComplexCanvasAnimation<T extends Params, U> extends CanvasAnimation<T, complexCanvasAnimationSelectionType<U>> {

    private readonly geometryHelper: GeometryHelper

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>>, geometryHelper: GeometryHelper) {
        super(params)
        this.geometryHelper = geometryHelper
    }

    getGeometryHelper(): GeometryHelper {
        return this.geometryHelper
    }

    doDraw(p5: p5Types, object: T, time: number, selectedPercentParam: number, selection: complexCanvasAnimationSelectionType<U> | null): void {
        const rotationAxis = object.origin
        const flattenIncludedObjectsInfo = this.getFlattenIncludedObjects(p5, object, time, selection?.selector)
        const flattenIncludedObjects = flattenIncludedObjectsInfo.map(o => o.object).sort((l, r) => l.getZIndex(time, p5) - r.getZIndex(time, p5))
        const flattenIncludedObjectsToBeSelected = flattenIncludedObjectsInfo.filter(o => o.selected).map(o => o.object)
        const selectionType = selection?.type || "together"
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation || 0)

        if (selectionType === "together") {
            flattenIncludedObjects.forEach(o => {
                const selectedPercent = flattenIncludedObjectsToBeSelected.includes(o) ? selectedPercentParam : 0
                o.doDraw(p5, o.calculateObjectToBeDraw(time, p5), time, selectedPercent, null)
            })
        } else {
            const currentObjectWithPercent = flattenIncludedObjectsToBeSelected.length * selectedPercentParam
            const nearerLowerIndexOfObject = Math.floor(currentObjectWithPercent)
            const percentOfDrawing = currentObjectWithPercent - nearerLowerIndexOfObject
            const selectedObject = flattenIncludedObjectsToBeSelected[nearerLowerIndexOfObject]
            flattenIncludedObjects.forEach(o => {
                const selectedPercent = selectedObject === o ? percentOfDrawing : 0
                o.doDraw(p5, o.calculateObjectToBeDraw(time, p5), time, selectedPercent, null)
            })
        }

        p5.pop()
    }

    private getFlattenIncludedObjects(p5: p5Types, object: T, time: number, selector?: U): objectInfo[] {
        let includedObjects: objectInfo[] = []
        let flattenIncludedObject = this.getIncludedObjects(object, selector)
        while (includedObjects.length !== flattenIncludedObject.length) {
            includedObjects = flattenIncludedObject
            flattenIncludedObject = includedObjects.flatMap(o => o.object.getIncludedObjects(o.object.calculateObjectToBeDraw(time, p5), o.selected))
        }
        let {appearTime, appearDuration, disappearTime, disappearDuration} = this.getAppearanceParam()
        const objectAppearDuration = appearDuration / includedObjects.length
        const objectDisappearDuration = disappearDuration / includedObjects.length

        includedObjects.forEach(o => {
            o.object.setAppearanceParam({appearTime, appearDuration: objectAppearDuration})
            appearTime += objectAppearDuration
        })
        includedObjects.reverse().forEach(o => {
            o.object.setAppearanceParam({disappearTime, disappearDuration: objectDisappearDuration})
            disappearTime += objectDisappearDuration
        })
        includedObjects.reverse()
        return includedObjects
    }

    public abstract getIncludedObjects(object: T, selector?: U | boolean): objectInfo[]

}