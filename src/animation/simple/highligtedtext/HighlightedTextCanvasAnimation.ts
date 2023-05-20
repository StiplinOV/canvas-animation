import p5Types from 'p5'
import AnimationStyle, { getFontColor } from '../../../AnimationStyles'
import {
    HighlightedTextCanvasAnimationSelection,
    HighlightedTextParamsType
} from './HighlightedTextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import {
    calculateArrayPercentValue,
    calculateColorPercentValue,
    convertPercentToFadeInFadeOut
} from '../../../common/Utils'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

type rectParams = {
    x: number
    y: number
    width: number
    height: number
}

export default class HighlightedTextCanvasAnimation extends CanvasAnimation<HighlightedTextParamsType> {

    public drawObject(p5: p5Types, o: HighlightedTextParamsType, perc: number, selectionInfo: SelectionInfo<HighlightedTextCanvasAnimationSelection>, animationStyle: AnimationStyle): void {
        const {x, y, width, height} = this.process(p5, o, perc, selectionInfo, animationStyle, true)
        o.backgroundColor && p5.fill(o.backgroundColor)
        p5.rect(x, y, width, height)
        this.process(p5, o, perc, selectionInfo, animationStyle)
    }

    public process(
        p5: p5Types,
        o: HighlightedTextParamsType,
        perc: number,
        selectionInfo: SelectionInfo<HighlightedTextCanvasAnimationSelection>,
        animationStyle: AnimationStyle,
        dry?: boolean
    ): rectParams {
        const textArray = calculateArrayPercentValue([], o.value, perc)
        const fontSize = o.fontSize ?? animationStyle.fontSize

        let x = 0
        let y = 0
        let width = 0
        for (let i = 0; i < textArray.length; i++) {
            const part = textArray[i]
            if (part === 'newline') {
                y += fontSize * 1.2
                width = Math.max(width, x)
                x = 0
                continue
            }
            let {value, textStyle, textWeight, textColor, backgroundTextColor} = part
            textColor = getFontColor(animationStyle, textColor)
            if (selectionInfo.selection?.segmentIndex === i) {
                textColor = calculateColorPercentValue(
                    textColor,
                    animationStyle.selectedColor,
                    convertPercentToFadeInFadeOut(selectionInfo.percent)
                )
            }
            value = value.replaceAll('\t', '    ')
            const textFont = o.font === 'monospace' ? animationStyle.monospaceFont : (o.font ?? animationStyle.font)

            p5.strokeWeight(textWeight ?? animationStyle.fontWeight)
            p5.textFont(textFont)
            p5.textSize(fontSize)
            p5.textStyle(textStyle)
            const textWidth = p5.textWidth(value)
            if (!dry && backgroundTextColor) {
                p5.fill(backgroundTextColor)
                p5.rect(x, y - fontSize + 4, textWidth, fontSize)
            }
            if (!dry) {
                p5.fill(textColor)
                p5.stroke(o.backgroundColor ?? animationStyle.backgroundColor)
                p5.text(value, x, y)
            }
            x += textWidth
            width = Math.max(width, x)
        }

        return {
            x: -0.5 * fontSize,
            y: -1.5 * fontSize,
            width: width + fontSize,
            height: y + 2.5 * fontSize
        }
    }

}
