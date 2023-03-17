import {HORIZ_ALIGN, VERT_ALIGN, THE_STYLE} from 'p5'
import {calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, {WebSafeFontsType} from '../../../AnimationStyles'
import TextCanvasAnimation from './TextCanvasAnimation'

interface OnlyTextParamsType {
    value: string
    fontSize?: number
    boxWidth?: number
    boxHeight?: number
    textStyle?: THE_STYLE
    font?: WebSafeFontsType
    horizontalAlign?: HORIZ_ALIGN
    verticalAlign?: VERT_ALIGN
}

export interface textParamsType extends ObjectParams, OnlyTextParamsType {
}

export default class TextCanvasAnimationParams extends SimpleCanvasAnimationParams<textParamsType> {

    mergeWithTransformation(obj: textParamsType, trans: Partial<textParamsType>, perc: number, style: AnimationStyle): OnlyTextParamsType {
        let {fontSize, boxWidth, boxHeight} = obj
        fontSize ??= style.fontSize
        boxHeight = boxHeight && trans.boxHeight ? calculatePercentValue(boxHeight, trans.boxHeight, perc) : boxHeight
        return {
            value: typeof trans.value === 'string' ? calculateTextPercentValue(obj.value, trans.value, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
            boxWidth: boxWidth && trans.boxWidth ? calculatePercentValue(boxWidth, trans.boxWidth, perc) : boxWidth,
            boxHeight,
            horizontalAlign: (trans.horizontalAlign && perc >= 0.5) ? trans.horizontalAlign : obj.horizontalAlign,
            verticalAlign: (trans.verticalAlign && perc >= 0.5) ? trans.verticalAlign : obj.verticalAlign,
            font: (trans.font && perc >= 0.5) ? trans.font : obj.font
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): TextCanvasAnimation {
        return new TextCanvasAnimation(this, animationStyle)
    }

}
