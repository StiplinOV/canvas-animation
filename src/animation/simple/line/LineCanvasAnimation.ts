import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams> {

    public drawObject(p5: p5Types, percent: number): void {
        const {startPoint, endPoint} = this.getObject()
        let endX = (endPoint.x - startPoint.x) * percent
        let endY = (endPoint.y - startPoint.y) * percent
        p5.line(0, 0, endX, endY)
    }

    getOrigin(): Point {
        return this.getObject().startPoint;
    }

}