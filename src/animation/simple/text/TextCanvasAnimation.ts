import p5Types, {HORIZ_ALIGN, VERT_ALIGN} from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import TextCanvasAnimationParams from "./TextCanvasAnimationParams";
import AnimationStyle from "../../../AnimationStyles";

interface onlyTextParamsType {
    value: string
    fontSize?: number
    boxWidth?: number
    boxHeight?: number
    horizontalAlign?: HORIZ_ALIGN
    verticalAlign?: VERT_ALIGN
}
interface textParamsType extends ObjectParams, onlyTextParamsType {}

export default class TextCanvasAnimation extends SimpleCanvasAnimation<textParamsType, TextCanvasAnimationParams> {

    public drawObject(p5: p5Types, object: textParamsType, percent: number, selectedPercent: number, style: AnimationStyle): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = object
        const textSize = fontSize ?? p5.textSize()
        p5.strokeWeight(style.fontWeight)
        p5.textFont(style.font)
        p5.fill(style.fontColor)
        p5.textSize(textSize)
        p5.textAlign(horizontalAlign ?? p5.LEFT, verticalAlign ?? p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxWidth, boxHeight)
    }

}
