import {calculateArrayPercentValue, calculatePercentValue} from '../../../common/Utils'
import { ObjectParams, Selection } from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, {WebSafeFontsType} from '../../../AnimationStyles'
import HighlightedTextCanvasAnimation from './HighlightedTextCanvasAnimation'
import {THE_STYLE} from 'p5'

export type HighlightedTextValueSegmentType = {
    value: string
    textStyle: THE_STYLE
    textWeight?: number
    textColor: string
    backgroundTextColor?: string
} | 'newline'

interface OnlyTextParamsType {
    value: HighlightedTextValueSegmentType[]
    fontSize?: number
    font?: WebSafeFontsType | 'monospace'
    backgroundColor?: string
}

export interface HighlightedTextParamsType extends ObjectParams, OnlyTextParamsType {
}

export interface HighlightedTextCanvasAnimationSelection<T = unknown> extends Selection {
    segmentIndex?: number
}

export default class HighlightedTextCanvasAnimationParams extends SimpleCanvasAnimationParams<HighlightedTextParamsType, HighlightedTextCanvasAnimationSelection> {

    mergeWithTransformation(
        obj: HighlightedTextParamsType,
        trans: Partial<HighlightedTextParamsType>,
        perc: number,
        style: AnimationStyle
    ): OnlyTextParamsType {
        let {fontSize} = obj
        fontSize ??= style.fontSize
        return {
            value: trans.value ? this.calculateValuePercentValue(obj.value, trans.value, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
            font: (trans.font && perc >= 0.5) ? trans.font : obj.font
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): HighlightedTextCanvasAnimation {
        return new HighlightedTextCanvasAnimation(this, animationStyle)
    }

    private calculateValuePercentValue(
        fromParam: HighlightedTextValueSegmentType[],
        toParam: HighlightedTextValueSegmentType[],
        percent: number
    ): HighlightedTextValueSegmentType[] {
        const from = fromParam.flatMap(f => this.splitTextValueSegmentType(f))
        const to = toParam.flatMap(f => this.splitTextValueSegmentType(f))

        return calculateArrayPercentValue(from, to, percent)
    }

    private splitTextValueSegmentType(param: HighlightedTextValueSegmentType): HighlightedTextValueSegmentType[] {
        const result: HighlightedTextValueSegmentType[] = []
        if (param === 'newline') {
            return [param]
        }
        for (let i = 0; i < param.value.length; i++) {
            const char = param.value.charAt(i)
            result.push({
                ...param,
                value: char
            })
        }
        return result
    }

}
