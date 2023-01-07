import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams> {

    public drawObject(p5: p5Types, percent: number): void {
        let endX = this.endX() * percent
        let endY = this.endY() * percent
        p5.line(0, 0, endX, endY)
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