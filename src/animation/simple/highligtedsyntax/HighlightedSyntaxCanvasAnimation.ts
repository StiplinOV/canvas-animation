import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {textParamsType} from './HighlightedSyntaxCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class HighlightedSyntaxCanvasAnimation extends CanvasAnimation<textParamsType> {

    public drawObject(p5: p5Types, o: textParamsType, perc: number, selectedPerc: number, style: AnimationStyle): void {
        const textArray = o.value
        const fontSize = o.fontSize || style.fontSize
        const leading = p5.textLeading()
        const startX = o.origin.x

        let x = startX
        let y = o.origin.y
        for (var i = 0; i < textArray.length; i++) {
            const part = textArray[i];
            if (part === 'newline') {
                y += fontSize
                y += leading
                x = startX
                continue;
            }
            const {color, value, textStyle} = part

            p5.strokeWeight(style.fontWeight)
            p5.textFont(style.monospaceFont)
            p5.textSize(fontSize)
            p5.textStyle(textStyle)
            p5.fill(color)
            const textWidth = p5.textWidth(value)
            p5.text(value, x, y)
            x += textWidth
        }
    }

}
