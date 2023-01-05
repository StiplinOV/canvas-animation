import CanvasAnimation, {paramsType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";

export default abstract class SimpleCanvasAnimation<T extends Params> extends CanvasAnimation<T> {

    public draw(p5: p5Types, time: number): void {
        const disappearTime = this.getDisappearTime() || Number.POSITIVE_INFINITY
        const disappearDuration = this.getDisappearDuration()
        if (this.getAppearTime() >= time) {
            return
        }
        if ((disappearTime + (disappearDuration || 0)) <= time) {
            return
        }
        p5.strokeWeight(this.getObject().weight || 1)

        if (this.getAppearDuration() && this.getAppearDuration() >= (time - this.getAppearTime())) {
            let percent = (time - this.getAppearTime()) / this.getAppearDuration()
            this.drawAppearedObject(p5, percent)
        } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
            let percent = (time - disappearTime) / disappearDuration
            this.drawDisappearedObject(p5, percent)
        } else {
            this.drawObject(p5)
        }
    }

    protected abstract drawAppearedObject(p5: p5Types, percent: number): void

    protected abstract drawDisappearedObject(p5: p5Types, percent: number): void

    public abstract drawObject(p5: p5Types): void

    public getIncludedObjects(): CanvasAnimation<Params>[] {
        return [this];
    }

}