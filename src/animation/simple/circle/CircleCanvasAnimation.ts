import CircleParams from "./CircleParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<CircleParams, "clock", "clock"> {

    public drawObject(p5: p5Types): void {
        p5.circle(this.x(), this.y(), this.diameter())
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        p5.arc(this.x(), this.y(), this.diameter(), this.diameter(), 0, p5.PI * 2 * percent)
    }

    protected drawDisappearedObject(p5: p5Types, percent: number) {
        p5.arc(this.x(), this.y(), this.diameter(), this.diameter(), p5.PI * 2 * percent, 0)
    }

    public getDefaultAppearType(): "clock" {
        return "clock";
    }

    public getDefaultDisappearType(): "clock" {
        return "clock";
    }

    private x(): number {
        return this.getObject().centerPoint.x
    }

    private y(): number {
        return this.getObject().centerPoint.y
    }

    private diameter(): number {
        return this.getObject().diameter
    }

}