import CanvasAnimation from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";

export default abstract class SimpleCanvasAnimation<T extends Params> extends CanvasAnimation<T> {

    public doDraw(p5: p5Types, object: T, time: number, selectedPercent: number): void {
        const disappearTime = this.getDisappearTime() || Number.POSITIVE_INFINITY
        const disappearDuration = this.getDisappearDuration()
        const rotationAxis = object.origin
        if (this.getAppearTime() >= time) {
            return
        }
        if ((disappearTime + (disappearDuration || 0)) <= time) {
            return
        }
        p5.strokeWeight(object.weight || 1)
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation || 0)
        let percent = 1
        if (this.getAppearDuration() && this.getAppearDuration() >= (time - this.getAppearTime())) {
            percent = (time - this.getAppearTime()) / this.getAppearDuration()
        } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
            percent = 1 - ((time - disappearTime) / disappearDuration)
        }
        this.drawObject(p5, object, percent, selectedPercent)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, object: T, percent: number, selectedPercent: number): void

    public getIncludedObjects(object: T, selected?: boolean): { object: CanvasAnimation<Params>, selected: boolean }[] {
        return [{object: this, selected: selected || false}];
    }

}