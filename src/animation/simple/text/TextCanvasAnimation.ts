import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {textParamsType} from './TextCanvasAnimationParams'
import {calculateColorPercentValue, calculatePercentValue, convertPercentToFadeInFadeOut} from '../../../common/Utils'
import CanvasAnimation from '../../CanvasAnimation'

export default class TextCanvasAnimation extends CanvasAnimation<textParamsType> {

    public drawObject(p5: p5Types, o: textParamsType, perc: number, selectedPerc: number, style: AnimationStyle): void {
        const {boxHeight, boxWidth, fontSize, value, horizontalAlign, verticalAlign, textStyle} = o
        let textSize = fontSize ?? p5.textSize()
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPerc)
        textSize = calculatePercentValue(textSize, textSize * 1.5, selectedPercent)

        p5.strokeWeight(style.fontWeight)
        p5.textFont(o.font ?? style.font)
        p5.fill(calculateColorPercentValue(style.fontColor, style.selectedColor, selectedPercent))
        p5.textSize(textSize)
        p5.textStyle(textStyle ?? style.textStyle)
        p5.textAlign(horizontalAlign ?? p5.LEFT, verticalAlign ?? p5.BOTTOM)
        p5.text(value.substring(0, (value.length + 1) * perc), 0, 0, boxWidth, boxHeight)
    }

}
