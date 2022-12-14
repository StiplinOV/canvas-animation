import CanvasAnimation from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";
import {convertPercentToFadeInFadeOut} from "../../common/Utils";

export default abstract class SimpleCanvasAnimation<T extends Params>
    extends CanvasAnimation<T> {

    public doDraw(p5: p5Types, time: number, selectedPercent: number): void {
        const disappearTime = this.getDisappearTime() || Number.POSITIVE_INFINITY
        const disappearDuration = this.getDisappearDuration()
        const rotationAxis = this.getOrigin()
        const fadeInFadeOutPercent = convertPercentToFadeInFadeOut(selectedPercent)
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
        let percent = 1
        if (this.getAppearDuration() && this.getAppearDuration() >= (time - this.getAppearTime())) {
            percent = (time - this.getAppearTime()) / this.getAppearDuration()
        } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
            percent = 1 - ((time - disappearTime) / disappearDuration)
        }
        p5.fill(p5.color(255 + (200 - 255) * fadeInFadeOutPercent))
        this.drawObject(p5, percent, fadeInFadeOutPercent)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, percent: number, selectedPercent: number): void

    public getIncludedObjects(): CanvasAnimation<Params>[] {
        return [this];
    }

}