import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import { ColorType } from '../../../AnimationStyles'
import { THE_STYLE } from 'p5'
import { ObjectParamsObject } from '../../ObjectParamsObject'

export type ElementStyle = {
    backgroundColor?: ColorType
    strokeColor?: ColorType
    fontColor?: ColorType
    fontSize?: number
    textStyle?: THE_STYLE
}

export type ElementType = {
    label?: string
    style?: ElementStyle
}

export interface OnlyArrayElementParamsType {
    value: ElementType | string | boolean | number
    height: number
    width?: number
}

export interface ArrayElementJsonParamsType extends JsonObjectParams, OnlyArrayElementParamsType {
}

export interface ArrayElementAnimationParamsType extends AnimationObjectParams, OnlyArrayElementParamsType {
}

export default class ArrayElement extends ComplexCanvasAnimationParams<ArrayElementJsonParamsType, ArrayElementAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: ArrayElementJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): ArrayElementAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ArrayElementJsonParamsType>): Partial<ArrayElementAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ArrayElementAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ArrayElementAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected getZeroParams (): Omit<ArrayElementJsonParamsType, keyof JsonObjectParams> {
        return {
            value: '',
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: ArrayElementJsonParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            origin,
            height,
            value
        } = object
        const width = object.width ?? height
        const animationStyle = this.getAnimationStyle()
        const fontSize = height / 2
        let style: ElementStyle = {
            backgroundColor: animationStyle.backgroundColor,
            strokeColor: animationStyle.strokeColor,
            fontColor: animationStyle.fontColor
        }
        let label = ''
        if (typeof value === 'string') {
            label = value
        } else if (typeof value === 'boolean') {
            if (value) {
                style.backgroundColor = 'primary'
            }
        } else if (typeof value === 'number') {
            label = String(value)
        } else {
            label = value.label ?? label
            style = {
                ...style,
                ...value.style
            }
        }
        result.set('square', {
            type: 'rectangle',
            objectParams: {
                origin,
                width,
                height,
                fillColor: style.backgroundColor,
                strokeColor: style.strokeColor
            }
        })
        label && result.set('label', {
            type: 'text',
            objectParams: {
                origin: addPoints(origin, {
                    x: width / 2,
                    y: height / 2
                }),
                horizontalAlign: 'center',
                verticalAlign: 'center',
                fontSize: style.fontSize ?? fontSize,
                fillColor: style.fontColor,
                textStyle: style.textStyle,
                value: label
            }
        })

        return result
    }

}
