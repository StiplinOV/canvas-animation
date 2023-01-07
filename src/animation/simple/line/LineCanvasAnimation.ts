import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams, "fromStartToEnd", "fromStartToEnd"> {

    public drawObject(p5: p5Types): void {
        p5.line(0, 0, this.endX(), this.endY())
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        let newEndX = this.endX() * percent
        let newEndY = this.endY() * percent
        p5.line(0, 0, newEndX, newEndY)
    }

    protected drawDisappearedObject(p5: p5Types, percent: number): void {
        let newEndX = this.endX() * (1 - percent)
        let newEndY = this.endY() * (1 - percent)
        p5.line(0, 0, newEndX, newEndY)
    }

    public getDefaultAppearType(): "fromStartToEnd" {
        return "fromStartToEnd";
    }

    public getDefaultDisappearType(): "fromStartToEnd" {
        return "fromStartToEnd";
    }

    private endX(): number {
        return this.getObject().endPoint.x - this.getObject().startPoint.x
    }

    private endY(): number {
        return this.getObject().endPoint.y - this.getObject().startPoint.y
    }

    getRotationAxis(): Point {
        return this.getObject().startPoint;
    }

}