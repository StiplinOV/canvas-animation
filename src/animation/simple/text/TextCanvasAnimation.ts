import p5Types from 'p5'
import AnimationStyle, { getFontColor } from '../../../AnimationStyles'
import { textParamsType } from './TextCanvasAnimationParams'
import { calculateColorPercentValue, calculatePercentValue } from '../../../common/Utils'
import CanvasAnimation from '../../CanvasAnimation'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class TextCanvasAnimation extends CanvasAnimation<textParamsType> {

    public drawObject (p5: p5Types, o: textParamsType, perc: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const {
            boxHeight,
            boxWidth,
            fontSize,
            value,
            horizontalAlign,
            verticalAlign,
            textStyle
        } = o
        let textSize = fontSize ?? style.fontSize
        textSize = calculatePercentValue(textSize, textSize * 1.5, selectionInfo.percent)

        p5.strokeWeight(style.fontWeight)
        p5.stroke('#FFFFFF')
        p5.textFont(o.font ?? style.font)
        p5.fill(
            calculateColorPercentValue(
                getFontColor(style, o.fillColor),
                style.selectedColor,
                selectionInfo.percent
            )
        )
        p5.textSize(textSize)
        p5.textStyle(textStyle ?? style.textStyle)
        p5.textAlign(horizontalAlign ?? p5.LEFT, verticalAlign ?? p5.BOTTOM)
        p5.text(
            value.substring(0, (value.length + 1) * perc),
            0,
            0,
            boxWidth,
            boxHeight
        )
    }

}
