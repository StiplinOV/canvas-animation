import CircleParams from "./CircleParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<CircleParams, "clock", "clock"> {

    public drawObject(p5: p5Types): void {
        p5.arc(0, 0, this.diameter(), this.diameter(), 0, p5.PI * 2)
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        p5.arc(0, 0, this.diameter(), this.diameter(), 0, p5.PI * 2 * percent)
    }

    protected drawDisappearedObject(p5: p5Types, percent: number) {
        p5.arc(0, 0, this.diameter(), this.diameter(), 0, p5.PI * 2 * (1 - percent))
    }

    public getDefaultAppearType(): "clock" {
        return "clock";
    }

    public getDefaultDisappearType(): "clock" {
        return "clock";
    }

    private diameter(): number {
        return this.getObject().diameter
    }

    getRotationAxis(): Point {
        return this.getObject().centerPoint;
    }

}