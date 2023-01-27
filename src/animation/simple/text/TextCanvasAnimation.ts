import p5Types, {HORIZ_ALIGN, VERT_ALIGN} from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimation'

interface onlyTextParamsType {
    value: string
    fontSize?: number
    boxWidth?: number
    boxHeight?: number
    horizontalAlign?: HORIZ_ALIGN
    verticalAlign?: VERT_ALIGN
}
interface textParamsType extends ObjectParams, onlyTextParamsType {}

export default class TextCanvasAnimation extends SimpleCanvasAnimation<textParamsType> {

    public drawObject(p5: p5Types, object: textParamsType, percent: number, selectedPercent: number): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign} = object
        const textSize = fontSize ?? p5.textSize()
        p5.fill(this.getAnimationStyle().fontColor)
        p5.textSize(textSize)
        p5.textAlign(horizontalAlign ?? p5.LEFT, verticalAlign ?? p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * percent), 0, 0, boxWidth, boxHeight)
    }

    mergeWithTransformation(obj: textParamsType, trans: Partial<textParamsType>, perc: number): onlyTextParamsType {
        let {fontSize, boxWidth, boxHeight} = obj
        fontSize ??= this.getAnimationStyle().fontSize
        boxHeight = boxHeight && trans.boxHeight ? calculatePercentValue(boxHeight, trans.boxHeight, perc) : boxHeight
        return {
            value: typeof trans.value === 'string' ? calculateTextPercentValue(obj.value, trans.value, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
            boxWidth: boxWidth && trans.boxWidth ? calculatePercentValue(boxWidth, trans.boxWidth, perc) : boxWidth,
            boxHeight,
            horizontalAlign: (trans.horizontalAlign && perc >= 0.5) ? trans.horizontalAlign : obj.horizontalAlign,
            verticalAlign: (trans.verticalAlign && perc >= 0.5) ? trans.verticalAlign : obj.verticalAlign
        }
    }
}
