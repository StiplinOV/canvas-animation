import CanvasAnimation, {objectParamsType} from "../CanvasAnimation";
import p5Types from "p5";
import {needAppearObject, toAppearancePercent} from "../../common/Utils";

export default abstract class SimpleCanvasAnimation<T extends {}> extends CanvasAnimation<T> {

    public doDraw(p5: p5Types, object: objectParamsType<T>, time: number, selectedPercent: number): void {
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
        this.drawObject(p5, object, toAppearancePercent(time, this.getAppearanceParam()), selectedPercent)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, object: objectParamsType<T>, percent: number, selectedPercent: number): void

    public getIncludedObjects(object: objectParamsType<T>, selected?: boolean): { object: CanvasAnimation<{}>, selected: boolean }[] {
        return [{object: this, selected: selected || false}];
    }

}