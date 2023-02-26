import {calculateArrayPercentValue, calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, {WebSafeFontsType} from '../../../AnimationStyles'
import HighlightedTextCanvasAnimation from './HighlightedTextCanvasAnimation'
import {THE_STYLE} from 'p5'

export type highlightedTextValueSegmentType = {
    value: string
    textStyle: THE_STYLE
    textWeight?: number
    textColor: string
    backgroundTextColor?: string
} | 'newline'

interface onlyTextParamsType {
    value: highlightedTextValueSegmentType[]
    fontSize?: number
    font?: WebSafeFontsType | 'monospace'
    backgroundColor?: string
}

export interface highlightedTextParamsType extends ObjectParams, onlyTextParamsType {
}

export default class HighlightedTextCanvasAnimationParams extends SimpleCanvasAnimationParams<highlightedTextParamsType> {

    mergeWithTransformation(
        obj: highlightedTextParamsType,
        trans: Partial<highlightedTextParamsType>,
        perc: number,
        style: AnimationStyle
    ): onlyTextParamsType {
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
        fromParam: highlightedTextValueSegmentType[],
        toParam: highlightedTextValueSegmentType[],
        percent: number
    ): highlightedTextValueSegmentType[] {
        const from = fromParam.flatMap(f => this.splitTextValueSegmentType(f))
        const to = toParam.flatMap(f => this.splitTextValueSegmentType(f))

        return calculateArrayPercentValue(from, to, percent)
    }

    private splitTextValueSegmentType(param: highlightedTextValueSegmentType): highlightedTextValueSegmentType[] {
        const result: highlightedTextValueSegmentType[] = []
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
