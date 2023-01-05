import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams, "fromStartToEnd", "fromStartToEnd"> {

    public drawObject(p5: p5Types): void {
        p5.line(this.startX(), this.startY(), this.endX(), this.endY())
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        let newEndX = this.startX() + (this.endX() - this.startX()) * percent
        let newEndY = this.startY() + (this.endY() - this.startY()) * percent
        p5.line(this.startX(), this.startY(), newEndX, newEndY)
    }

    protected drawDisappearedObject(p5: p5Types, percent: number): void {
        let newStartX = this.startX() + (this.endX() - this.startX()) * percent
        let newStartY = this.startY() + (this.endY() - this.startY()) * percent
        p5.line(newStartX, newStartY, this.endX(), this.endY())
    }

    public getDefaultAppearType(): "fromStartToEnd" {
        return "fromStartToEnd";
    }

    public getDefaultDisappearType(): "fromStartToEnd" {
        return "fromStartToEnd";
    }

    private startX(): number {
        return this.getObject().startPoint.x
    }

    private startY(): number {
        return this.getObject().startPoint.y
    }

    private endX(): number {
        return this.getObject().endPoint.x
    }

    private endY(): number {
        return this.getObject().endPoint.y
    }

}