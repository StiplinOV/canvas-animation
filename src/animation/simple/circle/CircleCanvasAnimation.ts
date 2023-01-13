import CircleParams from "./CircleParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {convertPercentToFadeInFadeOut} from "../../../common/Utils";

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<CircleParams> {

    public drawObject(p5: p5Types, percent: number, selectedPercentParam: number): void {
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPercentParam)
        const desiredSelectedDiameter = this.diameter() * 2
        const objectWeight = this.getObject().weight || 1
        const desiredSelectedWeight = (this.getObject().weight || 1) * 2
        const diameter = this.diameter() + (desiredSelectedDiameter - this.diameter())*selectedPercent
        const weight = objectWeight + (desiredSelectedWeight - objectWeight)*selectedPercent
        const g = 255*(1 - selectedPercent)
        const b = 255*(1 - selectedPercent)
        p5.strokeWeight(weight)
        p5.fill(p5.color(255, g, b))
        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

    private diameter(): number {
        return this.getObject().diameter
    }

}