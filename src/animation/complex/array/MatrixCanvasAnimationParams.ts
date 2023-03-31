import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import { Point } from '../../../common/Point'
import ArrayElement, { ElementStyle, ElementType } from './ArrayElement'

export interface MatrixParamsType extends ObjectParams {
    values: (ElementType | string | boolean | number)[][]
    height: number
    width?: number
    title?: string
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
}

export type MatrixSelectorType = {
    elements: Point[] | 'all'
}

export default class MatrixCanvasAnimationParams extends ComplexCanvasAnimationParams<MatrixParamsType, MatrixSelectorType> {

    protected getIncludedAnimationParamsByParameter (object: MatrixParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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
            result.set('title', new TextCanvasAnimationParams({
                object: {
                    origin: addPoints(origin, {
                        x: matrixWidth / 2,
                        y: rowGap + valueHeight / 2
                    }),
                    value: title,
                    horizontalAlign: 'center',
                    verticalAlign: 'center',
                    fontSize
                }
            }))
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
                            label: element.label ?? ''
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
                }, this.p5, animationStyle).getIncludedAnimationParams().forEach((v, k) => {
                    result.set(`${k} [${i}][${j}]`, v)
                })
            }
        }

        return result
    }

    private getNumberOfRows (object: MatrixParamsType): number {
        let result = object.values.length
        object.title && result++

        return result
    }

    private getNumberOfCols (object: MatrixParamsType): number {
        return object.values.map(v => v.length).reduce((l, r) => Math.max(l, r), 0)
    }

    protected convertSelectorToDiscriminatorRegexps (selector: MatrixSelectorType): RegExp[] {
        if (!selector.elements) {
            return [/.*/]
        }
        const result = []
        if (selector.elements === 'all') {
            result.push(/square.*/)
        } else if (Array.isArray(selector.elements)) {
            selector.elements.forEach(e => {
                result.push(new RegExp(`square \\[${e.x}\\]\\[${e.y}\\]`))
            })
        }
        return result
    }

}
