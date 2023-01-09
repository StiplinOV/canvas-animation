import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import RectangleParams from "./RectangleParams";
import p5Types from "p5";

export default class RectangleCanvasAnimation extends SimpleCanvasAnimation<RectangleParams> {

    drawObject(p5: p5Types, percent: number): void {
        const {width, height, cornerRadius} = this.getObject()
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

}