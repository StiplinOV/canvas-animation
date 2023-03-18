import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import RectangleCanvasAnimationParams from '../../simple/rectangle/RectangleCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import { ColorType } from '../../../AnimationStyles'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import { THE_STYLE } from 'p5'
import { Point } from '../../../common/Point'

type ElementStyle = {
    backgroundColor?: ColorType,
    strokeColor?: ColorType,
    fontColor?: ColorType
    fontSize?: number
    textStyle?: THE_STYLE
}

type ElementType = {
    value?: string
    style?: ElementStyle
}

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
                    fontSize: fontSize
                }
            }))
        }
        for (let i = 0; i < values.length; i++) {
            const row = values[i]
            for (let j = 0; j < row.length; j++) {
                const value = row[j]
                let elementStyle: ElementStyle = {
                    backgroundColor: animationStyle.backgroundColor,
                    strokeColor: animationStyle.strokeColor,
                    fontColor: animationStyle.fontColor,
                }
                elementStyle = {
                    ...elementStyle,
                    ...object.elementStyle
                }
                let label = ''
                if (typeof value === 'string') {
                    label = value
                } else if (typeof value === 'boolean') {
                    if (value) {
                        elementStyle.backgroundColor = 'primary'
                    }
                } else if (typeof value === 'number') {
                    const element = object.valueStyle?.get(value)
                    if (element) {
                        elementStyle = {
                            ...elementStyle,
                            ...element.style
                        }
                        label = element.value ?? label
                    } else {
                        label = String(value)
                    }
                } else {
                    label = value.value ?? label
                    elementStyle = {
                        ...elementStyle,
                        ...value.style
                    }
                }
                result.set(`square [${i}][${j}]`, new RectangleCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, {
                            x: colGap + j * (valueWidth + colGap),
                            y: topX + i * (valueHeight + rowGap)
                        }),
                        width: valueWidth,
                        height: valueHeight,
                        fillColor: elementStyle.backgroundColor,
                        strokeColor: elementStyle.strokeColor
                    }
                }))
                result.set(`label [${i}][${j}]`, new TextCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, {
                            x: colGap + j * (valueWidth + colGap) + valueWidth / 2,
                            y: topX + i * (valueHeight + rowGap) + valueHeight / 2
                        }),
                        horizontalAlign: 'center',
                        verticalAlign: 'center',
                        fontSize: elementStyle.fontSize ?? fontSize,
                        fillColor: elementStyle.fontColor,
                        textStyle: elementStyle.textStyle,
                        value: label
                    }
                }))
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
