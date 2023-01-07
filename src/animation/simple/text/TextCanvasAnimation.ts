import TextParams from "./TextParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class TextCanvasAnimation extends SimpleCanvasAnimation<TextParams> {

    public drawObject(p5: p5Types, percent: number): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = this.getObject()
        fontSize && p5.textSize(fontSize)
        p5.textAlign(horizontalAlign || p5.LEFT, verticalAlign || p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxHeight || undefined, boxWidth || undefined)
    }

    getOrigin(): Point {
        return this.getObject().position;
    }

}