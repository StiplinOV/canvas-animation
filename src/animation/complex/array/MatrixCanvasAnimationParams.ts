import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams, {
    CanvasAnimationParamsType
} from '../ComplexCanvasAnimationParams'
import { Point } from '../../../common/Point'
import ArrayElement, { ElementStyle, ElementType } from './ArrayElement'
import { ObjectParamsObject } from '../../ObjectParamsObject'

export interface OnlyMatrixParamsType {
    values: (ElementType | string | boolean | number)[][]
    height: number
    width?: number
    title?: string
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
}

export interface MatrixJsonParamsType extends JsonObjectParams, OnlyMatrixParamsType {

}

export interface MatrixAnimationParamsType extends AnimationObjectParams, OnlyMatrixParamsType {

}

export type MatrixSelectorType = {
    elements: Point[] | 'all'
}

export default class MatrixCanvasAnimationParams extends ComplexCanvasAnimationParams<MatrixJsonParamsType, MatrixAnimationParamsType, MatrixSelectorType> {

    protected convertJsonObjectToAnimationObject(jsonObject: MatrixJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): MatrixAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<MatrixJsonParamsType>): Partial<MatrixAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<MatrixAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): MatrixAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected getZeroParams (): Omit<MatrixJsonParamsType, keyof JsonObjectParams> {
        return {
            values: [],
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: MatrixJsonParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            title,
            values,
            origin
        } = object
        const animationStyle = this.getAnimationStyle()
        const numberOfRows = this.getNumberOfRows(object)
        const numberOfCols = this.getNumberOfCols(object)
        const matrixHeight = object.height * object.values.length / numberOfRows
        const matrixWidth = object.width ?? matrixHeight * numberOfCols / object.values.length
        const rowGap = object.height / numberOfRows / 10
        const colGap = matrixWidth / numberOfCols / 10
        const valueHeight = (matrixHeight - rowGap * (object.values.length + 1)) / object.values.length
        const valueWidth = (matrixWidth - colGap * (numberOfCols + 1)) / numberOfCols
        const fontSize = valueHeight / 2
        let topX = rowGap
        if (title) {
            topX = topX + valueHeight + rowGap
        }

        if (title) {
            result.set('title', {
                type: 'text',
                objectParams: {
                    origin: addPoints(origin, {
                        x: matrixWidth / 2,
                        y: rowGap + valueHeight / 2
                    }),
                    value: title,
                    horizontalAlign: 'center',
                    verticalAlign: 'center',
                    fontSize
                }
            })
        }
        for (let i = 0; i < values.length; i++) {
            const row = values[i]
            for (let j = 0; j < row.length; j++) {
                let value = row[j]
                if (typeof value === 'number') {
                    const element = object.valueStyle?.get(value)
                    if (element) {
                        value = {
                            style: element.style,
                            value: element.value ?? ''
                        }
                    }
                }
                new ArrayElement({
                    object: {
                        origin: addPoints(origin, {
                            x: colGap + j * (valueWidth + colGap),
                            y: topX + i * (valueHeight + rowGap)
                        }),
                        value,
                        width: valueWidth,
                        height: valueHeight
                    }
                }, this.getP5(), animationStyle).getIncludedAnimationParams().forEach((v, k) => {
                    result.set(`${k} [${i}][${j}]`, v)
                })
            }
        }

        return result
    }

    private getNumberOfRows (object: MatrixJsonParamsType): number {
        let result = object.values.length
        object.title && result++

        return result
    }

    private getNumberOfCols (object: MatrixJsonParamsType): number {
        return object.values.map(v => v.length).reduce((l, r) => Math.max(l, r), 0)
    }

}
