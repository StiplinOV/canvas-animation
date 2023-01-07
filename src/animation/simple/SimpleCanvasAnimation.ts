import CanvasAnimation from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";
import {Point} from "../../common/Point";

export default abstract class SimpleCanvasAnimation<T extends Params, S extends string, U extends string>
    extends CanvasAnimation<T, S, U> {

    public draw(p5: p5Types, time: number): void {
        const disappearTime = this.getDisappearTime() || Number.POSITIVE_INFINITY
        const disappearDuration = this.getDisappearDuration()
        const rotationAxis = this.getRotationAxis()
        if (this.getAppearTime() >= time) {
            return
        }
        if ((disappearTime + (disappearDuration || 0)) <= time) {
            return
        }
        p5.strokeWeight(this.getObject().weight || 1)

        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(this.getObject().rotation || 0)
        if (this.getAppearDuration() && this.getAppearDuration() >= (time - this.getAppearTime())) {
            let percent = (time - this.getAppearTime()) / this.getAppearDuration()
            this.drawAppearedObject(p5, percent, this.getAppearType() || this.getDefaultAppearType())
        } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
            let percent = (time - disappearTime) / disappearDuration
            this.drawDisappearedObject(p5, percent, this.getDisappearType() || this.getDefaultDisappearType())
        } else {
            this.drawObject(p5)
        }
        p5.pop()
    }

    protected abstract drawAppearedObject(p5: p5Types, percent: number, appearType: S): void

    protected abstract drawDisappearedObject(p5: p5Types, percent: number, disappearType: U): void

    public abstract drawObject(p5: p5Types): void

    public getIncludedObjects(): CanvasAnimation<Params, string, string>[] {
        return [this];
    }

    public getRotationAxis(): Point {
        return {x: 0, y: 0}
    }

}