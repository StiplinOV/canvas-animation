import CircleParams from "./CircleParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<CircleParams> {

    public drawObject(p5: p5Types, percent: number): void {
        p5.arc(0, 0, this.diameter(), this.diameter(), 0, p5.PI * 2 * percent)
    }

    private diameter(): number {
        return this.getObject().diameter
    }

    getOrigin(): Point {
        return this.getObject().centerPoint;
    }

}