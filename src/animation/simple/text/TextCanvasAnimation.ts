import p5Types, {HORIZ_ALIGN, VERT_ALIGN} from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {calculatePercentValue, calculateTextPercentValue} from "../../../common/Utils";
import {objectParamsType} from "../../CanvasAnimation";

type textParamsType = {
    value: string
    fontSize?: number
    boxWidth?: number,
    boxHeight?: number,
    horizontalAlign?: HORIZ_ALIGN,
    verticalAlign?: VERT_ALIGN
}

export default class TextCanvasAnimation extends SimpleCanvasAnimation<textParamsType> {

    public drawObject(p5: p5Types, object: objectParamsType<textParamsType>, percent: number, selectedPercent: number): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = object
        const textSize = fontSize || p5.textSize()
        p5.textSize(textSize)
        p5.textAlign(horizontalAlign || p5.LEFT, verticalAlign || p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxWidth || undefined, boxHeight || undefined)
    }

    mergeWithTransformation(obj: textParamsType, trans: Partial<textParamsType>, perc: number, p5: p5Types): textParamsType {
        let {fontSize, boxWidth, boxHeight} = obj
        fontSize ||= p5.textSize()
        boxHeight = boxHeight && trans.boxHeight ? calculatePercentValue(boxHeight, trans.boxHeight, perc) : boxHeight
        return {
            value: trans.value ? calculateTextPercentValue(obj.value, trans.value, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
            boxWidth: boxWidth && trans.boxWidth ? calculatePercentValue(boxWidth, trans.boxWidth, perc) : boxWidth,
            boxHeight,
            horizontalAlign: (trans.horizontalAlign && perc >= 0.5) ? trans.horizontalAlign : obj.horizontalAlign,
            verticalAlign: (trans.verticalAlign && perc >= 0.5) ? trans.verticalAlign : obj.verticalAlign
        }
    }
}