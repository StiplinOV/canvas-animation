import TextParams from "./TextParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {Point} from "../../../common/Point";

export default class TextCanvasAnimation extends SimpleCanvasAnimation<TextParams, "letterByLetter", "letterByLetter"> {

    public drawObject(p5: p5Types): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = this.getObject()
        fontSize && p5.textSize(fontSize)
        // p5.push()
        // p5.translate(x, y)
        // p5.rotate(rotation || 0)
        p5.textAlign(horizontalAlign || p5.LEFT, verticalAlign || p5.BOTTOM)
        p5.text(value, 0, 0, boxHeight || undefined, boxWidth || undefined)
//        p5.pop()
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = this.getObject()
        fontSize && p5.textSize(fontSize)
        // p5.push()
        // p5.translate(x, y)
        // p5.rotate(rotation || 0)
        p5.textAlign(horizontalAlign || p5.LEFT, verticalAlign || p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxHeight || undefined, boxWidth || undefined)
//        p5.pop()
    }

    protected drawDisappearedObject(p5: p5Types, percent: number): void {
        const {boxHeight, boxWidth, fontSize, position: {x, y}, value} = this.getObject()
        fontSize && p5.textSize(fontSize)
        // p5.push()
        // p5.translate(x, y)
        // p5.rotate(Math.PI)
        p5.text(value.substring(0, (value.length + 1) * (1 - percent)), x, y, boxHeight || undefined, boxWidth || undefined)
        //p5.pop()
    }

    public getDefaultAppearType(): "letterByLetter" {
        return "letterByLetter";
    }

    public getDefaultDisappearType(): "letterByLetter" {
        return "letterByLetter";
    }

    getRotationAxis(): Point {
        return this.getObject().position;
    }

}