import {paramsType} from "../../CanvasAnimation";
import TextParams from "./TextParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";

export default class TextCanvasAnimation extends SimpleCanvasAnimation<TextParams> {

    private readonly appearType?: "letterByLetter"
    private readonly disappearType?: "letterByLetter"

    constructor(params: paramsType<TextParams> & {
        appearType?: "letterByLetter",
        disappearType?: "letterByLetter"
    }) {
        super(params)
        this.appearType = params.appearType
        this.disappearType = params.disappearType
    }

    public drawObject(p5: p5Types): void {
        const {boxHeight, boxWidth, fontSize, position: {x, y}, value} = this.getObject()
        fontSize && p5.textSize(fontSize)
        p5.text(value, x, y, boxHeight || undefined, boxWidth || undefined)
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        if (this.appearType === "letterByLetter") {
            const {boxHeight, boxWidth, fontSize, position: {x, y}, value} = this.getObject()
            fontSize && p5.textSize(fontSize)
            p5.text(value.substring(0, (value.length + 1) * percent), x, y, boxHeight || undefined, boxWidth || undefined)
        } else {
            throw new Error("wrong appearType " + this.appearType)
        }
    }

    protected drawDisappearedObject(p5: p5Types, percent: number): void {
        if (this.disappearType === "letterByLetter") {
            const {boxHeight, boxWidth, fontSize, position: {x, y}, value} = this.getObject()
            fontSize && p5.textSize(fontSize)
            p5.text(value.substring(0, (value.length + 1) * (1 - percent)), x, y, boxHeight || undefined, boxWidth || undefined)
        } else {
            throw new Error("wrong disappearType " + this.disappearType)
        }
    }

}