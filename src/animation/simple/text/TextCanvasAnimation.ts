import p5Types from 'p5'
import AnimationStyle, { getFontColor } from '../../../AnimationStyles'
import {TextAnimationParamsType} from './TextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class TextCanvasAnimation extends CanvasAnimation<TextAnimationParamsType> {

    public drawObject (p5: p5Types, o: TextAnimationParamsType, style: AnimationStyle): void {
        const {
            fontSize,
            value,
            horizontalAlign,
            verticalAlign,
            textStyle
        } = o
        let boxWidth
        let boxHeight
        if (o.boxWidth !== null) {
            boxWidth = o.boxWidth
        }
        if (o.boxHeight !== null) {
            boxHeight = o.boxHeight
        }
        const textSize = fontSize ?? style.fontSize

        p5.strokeWeight(style.fontWeight)
        p5.stroke('#FFFFFF')
        p5.textFont(o.font ?? style.font)
        p5.fill(getFontColor(style, o.fillColor))
        p5.textSize(textSize)
        p5.textStyle(textStyle ?? style.textStyle)
        p5.textAlign(horizontalAlign ?? p5.LEFT, verticalAlign ?? p5.BOTTOM)
        p5.text(
            value.substring(0, (value.length + 1)),
            0,
            0,
            boxWidth,
            boxHeight
        )
    }

}
