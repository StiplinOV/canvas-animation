import p5Types from 'p5'
import AnimationStyle, { getFontColor } from '../../../AnimationStyles'
import {
    HighlightedTextCanvasAnimationSelection,
    HighlightedTextParamsType
} from './HighlightedTextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import { calculateArrayPercentValue, calculateColorPercentValue } from '../../../common/Utils'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

type rectParams = {
    x: number
    y: number
    width: number
    height: number
}

export default class HighlightedTextCanvasAnimation extends CanvasAnimation<HighlightedTextParamsType> {

    public drawObject (p5: p5Types, o: HighlightedTextParamsType, perc: number, selectionInfo: SelectionInfo<HighlightedTextCanvasAnimationSelection>, animationStyle: AnimationStyle): void {
        const fontSize = o.fontSize ?? animationStyle.fontSize
        const widthParam = o.width ?? 0
        const heightParam = (o.height ?? 0)
        const rectWithoutBorder = this.process(p5, o, perc, selectionInfo, animationStyle, 0, 0, true)
        const borderX = widthParam > rectWithoutBorder.width ? (widthParam - rectWithoutBorder.width) / 2 : fontSize / 2
        const borderY = heightParam > rectWithoutBorder.height ? (heightParam - rectWithoutBorder.height) / 2 : fontSize / 2
        let {
            x,
            y,
            width,
            height
        } = this.process(p5, o, perc, selectionInfo, animationStyle, borderX, borderY, true)
        o.backgroundColor && p5.fill(o.backgroundColor)
        const rectX = x + borderX * (1 - perc)
        const rectY = y + borderY * (1 - perc)
        const rectWidth = width - 2 * borderX * (1 - perc)
        const rectHeight = height - 2 * borderY * (1 - perc)
        p5.rect(rectX, rectY, rectWidth, rectHeight)
        this.process(p5, o, perc, selectionInfo, animationStyle, borderX, borderY)
    }

    public process (
        p5: p5Types,
        o: HighlightedTextParamsType,
        perc: number,
        selectionInfo: SelectionInfo<HighlightedTextCanvasAnimationSelection>,
        animationStyle: AnimationStyle,
        borderX: number,
        borderY: number,
        dry?: boolean
    ): rectParams {
        const textArray = calculateArrayPercentValue([], o.value, perc)
        const fontSize = o.fontSize ?? animationStyle.fontSize

        let x = borderX
        let y = 0.8 * fontSize + borderY
        let width = 0
        for (let i = 0; i < textArray.length; i++) {
            const part = textArray[i]
            if (part === 'newline') {
                y += fontSize * 1.2
                width = Math.max(width, x)
                x = borderX
                continue
            }
            let {
                value,
                textStyle,
                textWeight,
                textColor,
                backgroundTextColor
            } = part
            textColor = getFontColor(animationStyle, textColor)
            if (selectionInfo.selection?.segmentIndex === i) {
                textColor = calculateColorPercentValue(
                    textColor,
                    animationStyle.selectedColor,
                    selectionInfo.percent
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
            x: 0,
            y: 0,
            width: width + borderX,
            height: y + 0.2 * fontSize + borderY
        }
    }

}
