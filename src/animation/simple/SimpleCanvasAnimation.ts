import CanvasAnimation, {objectParamsType} from "../CanvasAnimation";
import p5Types from "p5";
import {needAppearObject, toAppearancePercent} from "../../common/Utils";

export default abstract class SimpleCanvasAnimation<T extends {}> extends CanvasAnimation<T> {

    public draw(p5: p5Types, time: number): void {
        const selectionInfo = this.calculateSelectionInfo(time)
        const object = this.calculateObjectParamsInTime(time, p5)
        const offset = object.offset || {x: 0, y: 0}
        const rotationAxis = object.origin

        if (!needAppearObject(time, this.getAppearanceParam())) {
            return
        }
        p5.strokeWeight(object.weight || 1)
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation || 0)
        p5.translate(offset.x, offset.y)
        this.drawObject(p5, object, toAppearancePercent(time, this.getAppearanceParam()), selectionInfo.percent)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, obj: objectParamsType<T>, perc: number, selectedPercent: number): void

}