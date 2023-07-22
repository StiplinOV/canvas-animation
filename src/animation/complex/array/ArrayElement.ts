import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import { ColorType } from '../../../AnimationStyles'
import { THE_STYLE } from 'p5'

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

export interface ArrayElementParamsType extends ObjectParams {
    value: ElementType | string | boolean | number
    height: number
    width?: number
}

export default class ArrayElement extends ComplexCanvasAnimationParams<ArrayElementParamsType> {

    protected getZeroParams (): Omit<ArrayElementParamsType, keyof ObjectParams> {
        return {
            value: '',
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: ArrayElementParamsType): Map<string, CanvasAnimationParamsType> {
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
