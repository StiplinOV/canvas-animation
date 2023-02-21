import {THE_STYLE} from 'p5'
import {calculateArrayPercentValue, calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import HighlightedSyntaxCanvasAnimation from "./HighlightedSyntaxCanvasAnimation";

type textValueSegmentType = {
    value: string,
    color: string,
    textStyle: THE_STYLE,
}

type textValueParamType = (textValueSegmentType | "newline")[]

interface onlyTextParamsType {
    value: textValueParamType
    fontSize?: number
}

export interface textParamsType extends ObjectParams, onlyTextParamsType {
}

export default class HighlightedSyntaxCanvasAnimationParams extends SimpleCanvasAnimationParams<textParamsType> {

    mergeWithTransformation(obj: textParamsType, trans: Partial<textParamsType>, perc: number, style: AnimationStyle): onlyTextParamsType {
        let {fontSize} = obj
        fontSize ??= style.fontSize
        return {
            value: trans.value ? this.calculateValuePercentValue(obj.value, trans.value, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): HighlightedSyntaxCanvasAnimation {
        return new HighlightedSyntaxCanvasAnimation(this, animationStyle)
    }

    private calculateValuePercentValue(fromParam: textValueParamType, toParam: textValueParamType, percent: number): textValueParamType {
        const from = fromParam.flatMap(f => this.splitTextValueSegmentType(f))
        const to = toParam.flatMap(f => this.splitTextValueSegmentType(f))

        return calculateArrayPercentValue(from, to, percent)
    }

    private splitTextValueSegmentType(param: (textValueSegmentType | 'newline')): textValueParamType {
        const result: textValueSegmentType[] = []
        if (param === "newline") {
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
