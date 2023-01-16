import TextParams from "./TextParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {calculatePercentValue, calculateTextPercentValue} from "../../../common/Utils";

export default class TextCanvasAnimation extends SimpleCanvasAnimation<TextParams> {

    public drawObject(p5: p5Types, object: TextParams, percent: number, selectedPercent: number): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = object
        const textSize = fontSize || p5.textSize()
        p5.textSize(textSize)
        p5.textAlign(horizontalAlign || p5.LEFT, verticalAlign || p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxWidth || undefined, boxHeight || undefined)
    }

    mergeWithTransformation(object: TextParams, transformObject: Partial<TextParams>, percent: number, p5: p5Types): TextParams {
        let {value, fontSize, boxWidth, boxHeight, horizontalAlign, verticalAlign} = object
        fontSize ||= p5.textSize()
        const toFontSize = transformObject.fontSize
        const toBoxWidth = transformObject.boxWidth
        const toBoxHeight = transformObject.boxHeight
        const toHorizontalAlign = transformObject.horizontalAlign
        const toVerticalAlign = transformObject.verticalAlign
        value = transformObject.value ? calculateTextPercentValue(value, transformObject.value, percent) : value
        fontSize = toFontSize ? calculatePercentValue(fontSize, toFontSize, percent) : fontSize
        boxWidth = boxWidth && toBoxWidth ? calculatePercentValue(boxWidth, toBoxWidth, percent) : boxWidth
        boxHeight = boxHeight && toBoxHeight ? calculatePercentValue(boxHeight, toBoxHeight, percent) : boxHeight
        horizontalAlign = (toHorizontalAlign && percent >= 0.5) ? toHorizontalAlign : horizontalAlign
        verticalAlign = (toVerticalAlign && percent >= 0.5) ? toVerticalAlign : verticalAlign
        return {
            ...object,
            value,
            fontSize,
            boxWidth,
            boxHeight,
            horizontalAlign,
            verticalAlign
        }
    }
}