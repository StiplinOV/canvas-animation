import CircleParams from "./CircleParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {calculatePercentValue, convertPercentToFadeInFadeOut} from "../../../common/Utils";

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<CircleParams> {

    public drawObject(p5: p5Types, percent: number, selectedPercentParam: number): void {
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPercentParam)
        const diameter = calculatePercentValue(this.diameter(), this.diameter() * 2, selectedPercent)
        const weight = calculatePercentValue(this.getObjectWeight(), this.getObjectWeight() * 2, selectedPercent)
        const g = calculatePercentValue(255, 0, selectedPercent)
        const b = calculatePercentValue(255, 0, selectedPercent)
        p5.strokeWeight(weight)
        p5.fill(p5.color(255, g, b))
        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

    private diameter(): number {
        return this.getObject().diameter
    }

}