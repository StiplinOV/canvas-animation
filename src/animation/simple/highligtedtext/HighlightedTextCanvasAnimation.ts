import p5Types from 'p5'
import AnimationStyle, {getFontColor} from '../../../AnimationStyles'
import {
    calculateBackgroundColor,
    createHighlightedTextValueSegmentType,
    HighlightedTextParamsType,
    HighlightedTextValueSegmentType
} from './HighlightedTextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import {animationStyle} from "../../../Animations";

type rectParams = {
    x: number
    y: number
    width: number
    height: number
}

export default class HighlightedTextCanvasAnimation extends CanvasAnimation<HighlightedTextParamsType> {

    public drawObject(p5: p5Types, o: HighlightedTextParamsType, animationStyle: AnimationStyle): void {
        const fontSize = o.fontSize ?? animationStyle.fontSize
        const widthParam = o.width ?? 0
        const heightParam = (o.height ?? 0)
        const rectWithoutBorder = this.process(p5, o, animationStyle, 0, 0, true)
        const borderX = widthParam > rectWithoutBorder.width ? (widthParam - rectWithoutBorder.width) / 2 : fontSize / 2
        const borderY = heightParam > rectWithoutBorder.height ? (heightParam - rectWithoutBorder.height) / 2 : fontSize / 2
        let {
            x,
            y,
            width,
            height
        } = this.process(p5, o, animationStyle, borderX, borderY, true)
        p5.fill(calculateBackgroundColor(o, animationStyle))
        p5.rect(x, y, width, height)
        this.process(p5, o, animationStyle, borderX, borderY)
    }

    public process(
        p5: p5Types,
        o: HighlightedTextParamsType,
        animationStyle: AnimationStyle,
        borderX: number,
        borderY: number,
        dry?: boolean
    ): rectParams {
        const segments = this.splitSegmentsAccordingToSelections(createHighlightedTextValueSegmentType(o.value, animationStyle), o)
        const fontSize = o.fontSize ?? animationStyle.fontSize

        let x = borderX
        let y = 0.8 * fontSize + borderY
        let width = x
        for (let i = 0; i < segments.length; i++) {
            const part = segments[i]
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
            value = value.replaceAll('\t', '    ')
            let font = o.font || 'monospace'
            const textFont = font === 'monospace' ? animationStyle.monospaceFont : (font ?? animationStyle.font)

            p5.strokeWeight(textWeight ?? animationStyle.fontWeight)
            p5.textFont(textFont)
            p5.textSize(fontSize)
            p5.textStyle(textStyle)
            const textWidth = p5.textWidth(value)
            if (!dry) {
                let backgroundColor = calculateBackgroundColor(o, animationStyle)
                if (backgroundTextColor) {
                    p5.fill(backgroundTextColor)
                    p5.rect(x, y - fontSize + 4, textWidth, fontSize)
                    backgroundColor = backgroundTextColor
                }
                p5.fill(textColor)
                p5.stroke(backgroundColor)
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

    private splitSegmentsAccordingToSelections(
        segments: HighlightedTextValueSegmentType[],
        o: HighlightedTextParamsType
    ): HighlightedTextValueSegmentType[] {
        const result: HighlightedTextValueSegmentType[] = []
        let selectionIntervals = o.selectedSubstrings ?? []

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
            let segmentEndIndex = segmentStartIndex + segment.value.length

            while (currentSelectionIntervalIndex < selectionIntervals.length && currentSelectionInterval.to <= segmentStartIndex) {
                currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
                currentSelectionIntervalIndex++
            }

            let segmentHasStart = currentSelectionInterval.from >= segmentStartIndex && currentSelectionInterval.from < segmentEndIndex
            let segmentHasEnd = currentSelectionInterval.to > segmentStartIndex && currentSelectionInterval.from <= segmentEndIndex

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

            let segmentHasInterval =
                (currentSelectionInterval.from <= segmentStartIndex && currentSelectionInterval.to >= segmentEndIndex)

            if (segment !== "newline") {
                segment = {
                    ...segment,
                    textColor: segmentHasInterval ? currentSelectionInterval.color ?? animationStyle.selectedColor : segment.textColor,
                    backgroundTextColor: segmentHasInterval ?? currentSelectionInterval.backgroundColor ? currentSelectionInterval.backgroundColor : segment.backgroundTextColor
                }
            }
            result.push(segment)
            segmentStartIndex = segmentEndIndex
        }

        return result
    }

}
