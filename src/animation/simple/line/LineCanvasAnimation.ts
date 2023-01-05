import {paramsType} from "../../CanvasAnimation";
import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams> {

    private readonly appearType?: "fromStartToEnd"
    private readonly disappearType?: "fromStartToEnd"

    constructor(params: paramsType<LineParams> & {
        appearType?: "fromStartToEnd",
        disappearType?: "fromStartToEnd"
    }) {
        super(params)
        this.appearType = params.appearType
        this.disappearType = params.disappearType
    }

    public drawObject(p5: p5Types): void {
        p5.line(this.startX(), this.startY(), this.endX(), this.endY())
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        if (this.appearType === "fromStartToEnd") {
            let newEndX = this.startX() + (this.endX() - this.startX()) * percent
            let newEndY = this.startY() + (this.endY() - this.startY()) * percent
            p5.line(this.startX(), this.startY(), newEndX, newEndY)
        } else {
            throw new Error("wrong appearType " + this.appearType)
        }
    }

    protected drawDisappearedObject(p5: p5Types, percent: number): void {
        if (this.disappearType === "fromStartToEnd") {
            let newStartX = this.startX() + (this.endX() - this.startX()) * percent
            let newStartY = this.startY() + (this.endY() - this.startY()) * percent
            p5.line(newStartX, newStartY, this.endX(), this.endY())
        } else {
            throw new Error("wrong disappearType " + this.disappearType)
        }
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