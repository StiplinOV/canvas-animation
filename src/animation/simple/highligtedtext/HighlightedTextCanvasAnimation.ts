import p5Types, {THE_STYLE} from 'p5'
import AnimationStyle, {getFontColor, WebSafeFontsType} from '../../../AnimationStyles'
import {
    calculateBackgroundColor,
    createHighlightedTextValueSegmentType,
    HighlightedTextAnimationParamsType,
    HighlightedTextValueSegmentType
} from './HighlightedTextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import {weightToNumber} from '../../CanvasAnimationParams'
import {uniqueArray} from '../../../common/Alghoritm'

type rectParams = {
    x: number
    y: number
    width: number
    height: number
}

type SelectedSubstring = {
    from: number
    to: number
    color?: string
    backgroundColor?: string
    strikethrough?: boolean
}

export default class HighlightedTextCanvasAnimation extends CanvasAnimation<HighlightedTextAnimationParamsType> {

    public drawObject(p5: p5Types, o: HighlightedTextAnimationParamsType, animationStyle: AnimationStyle): void {
        const fontSize = o.fontSize ?? animationStyle.fontSize
        const widthParam = o.width ?? 0
        const heightParam = (o.height ?? 0)
        const rectWithoutBorder = this.process(p5, o, animationStyle, 0, 0, true)
        const borderX = widthParam > rectWithoutBorder.width ? (widthParam - rectWithoutBorder.width) / 2 : fontSize / 2
        const borderY = heightParam > rectWithoutBorder.height ? (heightParam - rectWithoutBorder.height) / 2 : fontSize / 2
        const {
            x,
            y,
            width,
            height
        } = this.process(p5, o, animationStyle, borderX, borderY, true)
        p5.fill(calculateBackgroundColor(o, animationStyle))
        p5.strokeWeight(weightToNumber(animationStyle, o.weight))
        p5.rect(x, y, width, height)
        this.process(p5, o, animationStyle, borderX, borderY)
    }

    public process(
        p5: p5Types,
        o: HighlightedTextAnimationParamsType,
        animationStyle: AnimationStyle,
        borderX: number,
        borderY: number,
        dry?: boolean
    ): rectParams {
        const segments = this.splitSegmentsAccordingToSelections(createHighlightedTextValueSegmentType(o.value, animationStyle), o)
        const fontSize = o.fontSize ?? animationStyle.fontSize
        const font = o.font ?? 'monospace'
        const textFont = font === 'monospace' ? animationStyle.monospaceFont : (font ?? animationStyle.font)

        let rowNumWidth = 0
        if (o.numberOfLines > 0 && o.numberedLines) {
            rowNumWidth = this.textWidth(
                p5,
                '_'.repeat(String(o.numberOfLines).length + 2),
                animationStyle,
                {
                    font: textFont,
                    size: fontSize
                }
            )
        }

        let x = borderX
        let y = 0.8 * fontSize + borderY
        let currentRow = 1

        if (o.numberOfLines > 0) {
            if (!dry && o.numberedLines) {
                const backgroundColor = calculateBackgroundColor(o, animationStyle)
                this.text(
                    p5,
                    currentRow,
                    x,
                    y,
                    animationStyle,
                    {
                        textColor: o.numberingColor,
                        backgroundColor,
                        font: textFont,
                        size: fontSize
                    }
                )
            }
            x += rowNumWidth
            currentRow++
        }

        let width = x

        for (let i = 0; i < segments.length; i++) {
            const part = segments[i]
            if (part === 'newline') {
                y += fontSize * o.lineSpacing
                width = Math.max(width, x)
                x = borderX
                if (!dry && o.numberedLines) {
                    const backgroundColor = calculateBackgroundColor(o, animationStyle)
                    this.text(
                        p5,
                        currentRow,
                        x,
                        y,
                        animationStyle,
                        {
                            textColor: o.numberingColor,
                            backgroundColor,
                            font: textFont,
                            size: fontSize
                        }
                    )
                }
                x += rowNumWidth
                currentRow++
                continue
            }
            let {
                value,
                textStyle,
                textWeight,
                textColor,
                backgroundTextColor,
                strikethrough,
                underlined,
                type
            } = part

            value = value.replaceAll('\t', '    ')
            textStyle = textStyle ?? (type === 'paragraphTitle' ? 'bold' : textStyle)
            textColor = textColor ?? (type === 'paragraphTitle' ? 'secondary' : type === 'link' ? 'link' : type)
            textColor = getFontColor(animationStyle, textColor)
            underlined = underlined ?? (type === 'link' ? true : underlined)
            const textWidth = this.textWidth(
                p5,
                value,
                animationStyle,
                {
                    style: textStyle,
                    font: textFont,
                    size: fontSize
                }
            )
            if (!dry) {
                let backgroundColor = calculateBackgroundColor(o, animationStyle)
                if (backgroundTextColor) {
                    this.rect(p5, x, y - fontSize + 4, textWidth, fontSize + 5, backgroundTextColor, backgroundTextColor)
                    backgroundColor = backgroundTextColor
                }
                this.text(
                    p5,
                    value,
                    x,
                    y,
                    animationStyle,
                    {
                        textColor,
                        backgroundColor,
                        font: textFont,
                        size: fontSize,
                        weight: textWeight
                    }
                )
                if (strikethrough) {
                    this.line(p5, x - 1, y - fontSize / 4, x + textWidth, y - fontSize / 4, textColor, fontSize / 10)
                }
                if (underlined) {
                    this.line(p5, x - 1, y + 3, x + textWidth, y + 3, textColor, fontSize / 10)
                }
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

    private text(
        p5: p5Types,
        text: string | number,
        x: number,
        y: number,
        animationStyle: AnimationStyle,
        textParams?: {
            textColor?: string
            backgroundColor?: string
            style?: THE_STYLE
            font?: WebSafeFontsType | 'monospace'
            size?: number
            weight?: number
        }
    ): void {
        p5.fill(textParams?.textColor ?? animationStyle.fontColor)
            .stroke(textParams?.backgroundColor ?? animationStyle.backgroundColor)
            .textStyle(textParams?.style ?? animationStyle.textStyle)
            .textFont(textParams?.font ?? animationStyle.font)
            .textSize(textParams?.size ?? animationStyle.fontSize)
            .strokeWeight(textParams?.weight ?? animationStyle.fontWeight)
            .text(text, x, y)
    }

    private textWidth(
        p5: p5Types,
        text: string,
        animationStyle: AnimationStyle,
        textParams?: {
            style?: THE_STYLE
            font?: WebSafeFontsType | 'monospace'
            size?: number
            weight?: number
        }
    ): number {
        return p5.textStyle(textParams?.style ?? animationStyle.textStyle)
            .textFont(textParams?.font ?? animationStyle.font)
            .textSize(textParams?.size ?? animationStyle.fontSize)
            .strokeWeight(textParams?.weight ?? animationStyle.fontWeight)
            .textWidth(text)
    }

    private rect(p5: p5Types, x: number, y: number, w: number, h: number, fill: string, stroke: string): void {
        p5.fill(fill)
        p5.stroke(stroke)
        p5.rect(x, y, w, h)
    }

    private line(p5: p5Types, x1: number, y1: number, x2: number, y2: number, color: string, weight: number): void {
        p5.stroke(color)
        p5.strokeWeight(weight)
        p5.line(x1, y1, x2, y2)
    }

    private splitSegmentsAccordingToSelections(
        segments: HighlightedTextValueSegmentType[],
        o: HighlightedTextAnimationParamsType
    ): HighlightedTextValueSegmentType[] {
        const result: HighlightedTextValueSegmentType[] = []
        const selectionIntervals = this.toSelectedIntervals(o)

        if (selectionIntervals.length === 0) {
            return segments
        }

        const splitSegments: HighlightedTextValueSegmentType[] = []

        let currentSelectionIntervalIndex = 0
        let currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
        let segmentStartIndex = 0

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i]

            if (segment === 'newline') {
                segmentStartIndex++
                splitSegments.push(segment)
                continue
            }
            const segmentEndIndex = segmentStartIndex + segment.value.length

            while (currentSelectionIntervalIndex < selectionIntervals.length && currentSelectionInterval.to <= segmentStartIndex) {
                currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
                currentSelectionIntervalIndex++
            }

            const segmentHasStart = currentSelectionInterval.from >= segmentStartIndex && currentSelectionInterval.from < segmentEndIndex
            const segmentHasEnd = currentSelectionInterval.to > segmentStartIndex && currentSelectionInterval.from <= segmentEndIndex

            if (segmentHasStart && segmentHasEnd) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.from - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.from - segmentStartIndex, currentSelectionInterval.to - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.to - segmentStartIndex)
                })
            } else if (segmentHasStart) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.from - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.from - segmentStartIndex)
                })
            } else if (segmentHasEnd) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.to - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.to - segmentStartIndex)
                })
            } else {
                splitSegments.push(segment)
            }
            segmentStartIndex = segmentEndIndex
        }

        currentSelectionIntervalIndex = 0
        currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
        segmentStartIndex = 0

        for (let i = 0; i < splitSegments.length; i++) {
            let segment = splitSegments[i]

            let segmentEndIndex = segmentStartIndex
            if (segment === 'newline') {
                segmentEndIndex++
            } else {
                segmentEndIndex += segment.value.length
            }

            while (currentSelectionIntervalIndex < selectionIntervals.length && currentSelectionInterval.to <= segmentStartIndex) {
                currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
                currentSelectionIntervalIndex++
            }

            const segmentHasInterval =
                (currentSelectionInterval.from <= segmentStartIndex && currentSelectionInterval.to >= segmentEndIndex)

            if (segment !== 'newline') {
                segment = {
                    ...segment,
                    textColor: segmentHasInterval ? currentSelectionInterval.color : segment.textColor,
                    backgroundTextColor: segmentHasInterval ? currentSelectionInterval.backgroundColor : segment.backgroundTextColor,
                    strikethrough: segmentHasInterval ? currentSelectionInterval.strikethrough : segment.strikethrough
                }
            }
            result.push(segment)
            segmentStartIndex = segmentEndIndex
        }

        return result
    }

    private toSelectedIntervals(o: HighlightedTextAnimationParamsType): SelectedSubstring[] {
        const backgroundColorOverridesMap = new Map<number, string>()
        const colorOverridesMap = new Map<number, string>()
        const strikeTroughOverridesMap = new Map<number, boolean>()

        o.backgroundColorOverrides.forEach(o => {
            for (let i = o.from; i < o.to; i++) {
                backgroundColorOverridesMap.set(i, o.backgroundColor)
            }
        })
        o.colorOverrides.forEach(o => {
            for (let i = o.from; i < o.to; i++) {
                colorOverridesMap.set(i, o.color)
            }
        })
        o.strikeTroughOverrides.forEach(o => {
            for (let i = o.from; i < o.to; i++) {
                strikeTroughOverridesMap.set(i, o.strikethrough)
            }
        })

        const numbers = uniqueArray([
            ...Array.from(backgroundColorOverridesMap.keys()),
            ...Array.from(colorOverridesMap.keys()),
            ...Array.from(strikeTroughOverridesMap.keys())
        ]).sort((l, r) => l - r)

        return numbers.map(n => ({
            from: n,
            to: n + 1,
            backgroundColor: backgroundColorOverridesMap.get(n),
            color: colorOverridesMap.get(n),
            strikethrough: strikeTroughOverridesMap.get(n)
        }))
    }

}
