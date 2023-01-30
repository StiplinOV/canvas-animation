import {HORIZ_ALIGN, VERT_ALIGN} from 'p5'
import {calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import TextCanvasAnimation from './TextCanvasAnimation'
import CanvasAnimation from '../../CanvasAnimation'

interface onlyTextParamsType {
    value: string
    fontSize?: number
    boxWidth?: number
    boxHeight?: number
    horizontalAlign?: HORIZ_ALIGN
    verticalAlign?: VERT_ALIGN
}

export interface textParamsType extends ObjectParams, onlyTextParamsType {
}

export default class TextCanvasAnimationParams extends SimpleCanvasAnimationParams<textParamsType> {

    mergeWithTransformation(obj: textParamsType, trans: Partial<textParamsType>, perc: number, style: AnimationStyle): onlyTextParamsType {
        let {fontSize, boxWidth, boxHeight} = obj
        fontSize ??= style.fontSize
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

    toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation {
        return new TextCanvasAnimation(this, animationStyle)
    }

}
