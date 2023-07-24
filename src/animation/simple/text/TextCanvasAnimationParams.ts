import {HORIZ_ALIGN, THE_STYLE, VERT_ALIGN} from 'p5'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, {WebSafeFontsType} from '../../../AnimationStyles'
import TextCanvasAnimation from './TextCanvasAnimation'
import {ObjectParamsObject} from '../../ObjectParamsObject'

interface OnlyTextParamsType {
    value: string
}

export interface TextJsonParamsType extends JsonObjectParams, OnlyTextParamsType {
    fontSize?: number
    boxWidth?: number
    boxHeight?: number
    textStyle?: THE_STYLE
    font?: WebSafeFontsType
    horizontalAlign?: HORIZ_ALIGN
    verticalAlign?: VERT_ALIGN
}

export interface TextAnimationParamsType extends AnimationObjectParams, OnlyTextParamsType {
    fontSize: number
    boxWidth: number | null
    boxHeight: number | null
    textStyle: THE_STYLE
    font: WebSafeFontsType
    horizontalAlign: HORIZ_ALIGN
    verticalAlign: VERT_ALIGN
}

export default class TextCanvasAnimationParams extends SimpleCanvasAnimationParams<TextJsonParamsType, TextAnimationParamsType> {

    // mergeWithTransformation(obj: TextJsonParamsType, trans: Partial<TextJsonParamsType>, perc: number, style: AnimationStyle): OnlyTextParamsType {
    //     let {fontSize, boxWidth, boxHeight} = obj
    //     fontSize ??= style.fontSize
    //     boxHeight = boxHeight && trans.boxHeight ? calculatePercentValue(boxHeight, trans.boxHeight, perc) : boxHeight
    //     return {
    //         value: typeof trans.value === 'string' ? calculateTextPercentValue(obj.value, trans.value, perc) : obj.value,
    //         fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
    //         boxWidth: boxWidth && trans.boxWidth ? calculatePercentValue(boxWidth, trans.boxWidth, perc) : boxWidth,
    //         boxHeight,
    //         horizontalAlign: (trans.horizontalAlign && perc >= 0.5) ? trans.horizontalAlign : obj.horizontalAlign,
    //         verticalAlign: (trans.verticalAlign && perc >= 0.5) ? trans.verticalAlign : obj.verticalAlign,
    //         font: (trans.font && perc >= 0.5) ? trans.font : obj.font
    //     }
    // }

    protected toCanvasAnimation(animationStyle: AnimationStyle): TextCanvasAnimation {
        return new TextCanvasAnimation(this, animationStyle)
    }

    getZeroParams(): Partial<TextAnimationParamsType> {
        return {
            value: ''
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<TextAnimationParamsType>): void {
        params.value !== undefined && objectParamsObject.setStringParam('value', params.value)
        params.fontSize !== undefined && objectParamsObject.setNumberParam('fontSize', params.fontSize)
        params.boxWidth !== undefined && objectParamsObject.setNumberParam('boxWidth', params.boxWidth ?? 0)
        params.boxHeight !== undefined && objectParamsObject.setNumberParam('boxHeight', params.boxHeight ?? 0)
        params.textStyle !== undefined && objectParamsObject.setStringLiteralParam('textStyle', params.textStyle)
        params.font !== undefined && objectParamsObject.setStringLiteralParam('font', params.font)
        params.horizontalAlign !== undefined && objectParamsObject.setStringLiteralParam('horizontalAlign', params.horizontalAlign)
        params.verticalAlign !== undefined && objectParamsObject.setStringLiteralParam('verticalAlign', params.verticalAlign)
    }

    protected convertJsonObjectToAnimationObject(jsonObject: TextJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): TextAnimationParamsType {
        const animationStyle = this.getAnimationStyle()
        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            fillColor: jsonObject.fillColor ?? animationStyle.fontColor,
            fontSize: jsonObject.fontSize ?? animationStyle.fontSize,
            boxWidth: jsonObject.boxWidth ?? null,
            boxHeight: jsonObject.boxHeight ?? null,
            textStyle: jsonObject.textStyle ?? animationStyle.textStyle,
            font: jsonObject.font ?? animationStyle.font,
            horizontalAlign: jsonObject.horizontalAlign ?? 'center',
            verticalAlign: jsonObject.verticalAlign ?? 'center'
        }
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): TextAnimationParamsType {
        return {
            ...initialDefaultParams,
            value: objectParamsObject.getStringParam('value'),
            fontSize: objectParamsObject.getNumberParam('fontSize'),
            boxWidth: objectParamsObject.getNumberParam('boxWidth'),
            boxHeight: objectParamsObject.getNumberParam('boxHeight'),
            textStyle: objectParamsObject.getStringLiteralParam('textStyle'),
            font: objectParamsObject.getStringLiteralParam('font'),
            horizontalAlign: objectParamsObject.getStringLiteralParam('horizontalAlign'),
            verticalAlign: objectParamsObject.getStringLiteralParam('verticalAlign')
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<TextJsonParamsType>): Partial<TextAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

}
