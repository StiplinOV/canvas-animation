import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams> {

    public drawObject(p5: p5Types, percent: number, selectedPercent: number): void {
        const {origin, endPoint} = this.getObject()
        let endX = (endPoint.x - origin.x) * percent
        let endY = (endPoint.y - origin.y) * percent
        p5.stroke(p5.color(0 + (200 - 0) * selectedPercent))
        p5.line(0, 0, endX, endY)
    }

}