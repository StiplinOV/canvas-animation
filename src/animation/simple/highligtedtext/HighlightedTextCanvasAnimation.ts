import p5Types from 'p5'
import AnimationStyle, { getFontColor } from '../../../AnimationStyles'
import {
    createHighlightedTextValueSegmentType,
    getStyle,
    HighlightedTextParamsType,
    HighlightedTextValueSegmentType
} from './HighlightedTextCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import { mergeIntervals } from '../../../common/Alghoritm'
import { calculateColorPercentValue } from '../../../common/Utils'

type rectParams = {
    x: number
    y: number
    width: number
    height: number
}

export default class HighlightedTextCanvasAnimation extends CanvasAnimation<HighlightedTextParamsType> {

    public drawObject (p5: p5Types, o: HighlightedTextParamsType, animationStyle: AnimationStyle): void {
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

        p5.fill(this.calculateBackgroundColor(o, animationStyle))
        p5.rect(x, y, width, height)
        this.process(p5, o, animationStyle, borderX, borderY)
    }

    private calculateBackgroundColor (params: HighlightedTextParamsType, animationStyle: AnimationStyle): string {
        if (typeof params.highlightStyle === 'string' || !params.highlightStyle) {
            const style = getStyle(animationStyle, params.highlightStyle)
            return String(style.hljs.background)
        }
        return params.highlightStyle?.backgroundColor ?? animationStyle.backgroundColor
    }

    public process (
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
        let width = 0
        for (let i = 0; i < segments.length; i++) {
            const part = segments[i].segment
            const selected = segments[i].selected
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
            if (selected) {
                textColor = animationStyle.selectedColor
            }
            value = value.replaceAll('\t', '    ')
            let font = o.font || 'monospace'
            const textFont = font === 'monospace' ? animationStyle.monospaceFont : (font ?? animationStyle.font)

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
                p5.stroke(this.calculateBackgroundColor(o, animationStyle))
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

    private splitSegmentsAccordingToSelections (
        segments: HighlightedTextValueSegmentType[],
        o: HighlightedTextParamsType
    ): { segment: HighlightedTextValueSegmentType, selected: boolean }[] {
        const result: { segment: HighlightedTextValueSegmentType, selected: boolean }[] = []
        let selectionIntervals = o.selectedSubstrings?.map(s => ({
            start: s.from,
            end: s.to
        })) ?? []

        if (selectionIntervals.length === 0) {
            return segments.map(s => ({
                segment: s,
                selected: false
            }))
        }
        selectionIntervals = mergeIntervals(selectionIntervals)

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

            while (currentSelectionIntervalIndex < selectionIntervals.length && currentSelectionInterval.end <= segmentStartIndex) {
                currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
                currentSelectionIntervalIndex++
            }

            let segmentHasStart = currentSelectionInterval.start >= segmentStartIndex && currentSelectionInterval.start < segmentEndIndex
            let segmentHasEnd = currentSelectionInterval.end > segmentStartIndex && currentSelectionInterval.start <= segmentEndIndex

            if (segmentHasStart && segmentHasEnd) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.start - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.start - segmentStartIndex, currentSelectionInterval.end - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.end - segmentStartIndex)
                })
            } else if (segmentHasStart) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.start - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.start - segmentStartIndex)
                })
            } else if (segmentHasEnd) {
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(0, currentSelectionInterval.end - segmentStartIndex)
                })
                splitSegments.push({
                    ...segment,
                    value: segment.value.substring(currentSelectionInterval.end - segmentStartIndex)
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
            const segment = splitSegments[i]

            let segmentEndIndex = segmentStartIndex
            if (segment === 'newline') {
                segmentEndIndex++
            } else {
                segmentEndIndex += segment.value.length
            }

            while (currentSelectionIntervalIndex < selectionIntervals.length && currentSelectionInterval.end <= segmentStartIndex) {
                currentSelectionInterval = selectionIntervals[currentSelectionIntervalIndex]
                currentSelectionIntervalIndex++
            }

            let segmentHasInterval =
                (currentSelectionInterval.start <= segmentStartIndex && currentSelectionInterval.end >= segmentEndIndex)

            result.push({
                segment: segment,
                selected: segmentHasInterval
            })
            segmentStartIndex = segmentEndIndex
        }

        return result
    }

}
