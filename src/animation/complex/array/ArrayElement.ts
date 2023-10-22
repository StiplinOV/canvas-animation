import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import {addPoints} from '../../../common/Utils'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import {ColorType} from '../../../AnimationStyles'
import {THE_STYLE} from 'p5'
import {ObjectParamsObject} from '../../ObjectParamsObject'

type ArrayElementValueType = string | boolean | number

export type ElementStyle = {
    backgroundColor?: ColorType
    strokeColor?: ColorType
    fontColor?: ColorType
    fontSize?: number
    textStyle?: THE_STYLE
}

export type ElementType = {
    id?: string
    value?: ArrayElementValueType
    style?: ElementStyle
}

export interface ArrayElementJsonParamsType extends JsonObjectParams {
    value: ElementType | ArrayElementValueType
    height: number
    width?: number
}

export interface ArrayElementAnimationParamsType extends AnimationObjectParams {
    id: string | null
    backgroundColor: ColorType,
    strokeColor: ColorType,
    fontColor: ColorType,
    fontSize: number,
    textStyle: THE_STYLE,
    value: string,
    type: "boolean" | "text"
    height: number
    width: number
}

export default class ArrayElement extends ComplexCanvasAnimationParams<ArrayElementJsonParamsType, ArrayElementAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: ArrayElementJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): ArrayElementAnimationParamsType {
        const animationStyle = this.getAnimationStyle()
        let id: string | null = null
        if (typeof jsonObject.value === "object") {
            id = jsonObject.value.id ?? null
        }
        let backgroundColor: ColorType | undefined
        let strokeColor = animationStyle.strokeColor
        let fontColor = animationStyle.fontColor
        let fontSize = jsonObject.height / 2
        let textStyle: THE_STYLE = "normal"
        let value: ArrayElementValueType | undefined
        if (typeof jsonObject.value === 'object') {
            value = jsonObject.value.value
            backgroundColor = jsonObject.value.style?.backgroundColor
            strokeColor = jsonObject.value.style?.strokeColor ?? strokeColor
            fontColor = jsonObject.value.style?.fontColor ?? fontColor
            fontSize = jsonObject.value.style?.fontSize ?? fontSize
            textStyle = jsonObject.value.style?.textStyle ?? textStyle
        } else {
            value = jsonObject.value
        }
        if (typeof value === "boolean" && value && backgroundColor === undefined) {
            backgroundColor = "primary"
        }

        return {
            ...animationObjectDefaultParams,
            id,
            backgroundColor: backgroundColor ?? animationStyle.backgroundColor,
            strokeColor,
            fontColor,
            fontSize,
            textStyle,
            value: String(value),
            type: typeof value === "boolean" ? "boolean" : "text",
            height: jsonObject.height,
            width: jsonObject.width ?? jsonObject.height
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ArrayElementJsonParamsType>): Partial<ArrayElementAnimationParamsType> {
        let id = undefined
        let backgroundColor = undefined
        let strokeColor = undefined
        let fontColor = undefined
        let fontSize = undefined
        let textStyle = undefined
        let value
        if (typeof jsonObject.value === "object") {
            id = jsonObject.value.id
            backgroundColor = jsonObject.value.style?.backgroundColor
            strokeColor = jsonObject.value.style?.strokeColor
            fontColor = jsonObject.value.style?.fontColor
            fontSize = jsonObject.value.style?.fontSize
            textStyle = jsonObject.value.style?.textStyle
            value = jsonObject.value.value
        } else {
            value = jsonObject.value
        }

        return {
            id,
            backgroundColor,
            strokeColor,
            fontColor,
            fontSize,
            textStyle,
            value: value === undefined ? undefined : String(value),
            type: typeof value === "boolean" ? "boolean" : "text",
            height: jsonObject.height,
            width: jsonObject.width ?? jsonObject.height
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ArrayElementAnimationParamsType>): void {
        params.id !== undefined && objectParamsObject.setObjectParam('id', params.id)
        params.backgroundColor !== undefined && objectParamsObject.setColorParam('backgroundColor', params.backgroundColor)
        params.strokeColor !== undefined && objectParamsObject.setColorParam('strokeColor', params.strokeColor)
        params.fontColor !== undefined && objectParamsObject.setColorParam('fontColor', params.fontColor)
        params.fontSize !== undefined && objectParamsObject.setNumberParam('fontSize', params.fontSize)
        params.textStyle !== undefined && objectParamsObject.setStringLiteralParam('textStyle', params.textStyle)
        params.value !== undefined && objectParamsObject.setStringParam('value', params.value)
        params.type !== undefined && objectParamsObject.setStringLiteralParam('type', params.type)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ArrayElementAnimationParamsType {
        return {
            ...initialDefaultParams,
            id: objectParamsObject.getObjectParam('id'),
            backgroundColor: objectParamsObject.getColorParam('backgroundColor'),
            strokeColor: objectParamsObject.getColorParam('strokeColor'),
            fontColor: objectParamsObject.getColorParam('fontColor'),
            fontSize: objectParamsObject.getNumberParam('fontSize'),
            textStyle: objectParamsObject.getStringLiteralParam('textStyle'),
            value: objectParamsObject.getStringParam('value'),
            type: objectParamsObject.getStringLiteralParam('type'),
            height: objectParamsObject.getNumberParam('height'),
            width: objectParamsObject.getNumberParam('width'),
        }
    }

    protected getZeroParams(obj: ArrayElementAnimationParamsType): Omit<ArrayElementAnimationParamsType, keyof AnimationObjectParams> {
        return {
            ...obj,
            value: '',
            height: 0,
            width: 0,
            id: obj.id,
        }
    }

    protected getIncludedAnimationParamsByParameter(object: ArrayElementAnimationParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        result.set('square', {
            type: 'rectangle',
            objectParams: {
                origin: object.origin,
                width: object.width,
                height: object.height,
                fillColor: object.backgroundColor,
                strokeColor: object.strokeColor,
                weight: object.weight
            }
        })
        object.type === "text" && result.set('label', {
            type: 'text',
            objectParams: {
                origin: addPoints(object.origin, {
                    x: object.width / 2,
                    y: object.height / 2
                }),
                horizontalAlign: 'center',
                verticalAlign: 'center',
                fontSize: object.fontSize,
                fillColor: object.fontColor,
                textStyle: object.textStyle,
                value: object.value
            }
        })

        return result
    }

}
