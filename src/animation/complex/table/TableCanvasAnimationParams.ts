import CanvasAnimationParams, {ObjectParams} from '../../CanvasAnimationParams'
import {calculateArrayPercentValue, calculatePercentValue} from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'

interface onlyTableParamsType {
    values: string[][]
    width: number
    height: number
    fontSize?: number
    verticalTitles?: string[]
    horizontalTitles?: string[]
}

interface tableParamsType extends onlyTableParamsType, ObjectParams {
}

export default class TableCanvasAnimationParams extends ComplexCanvasAnimationParams<tableParamsType> {

    getIncludedAnimationsByParameters(object: tableParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const {values, width, height, verticalTitles} = object
        const stepHeight = height / values.length
        const mergedWidthsMap: Map<number, number[]> = new Map<number, number[]>()
        const verticalTitleWidth = this.calculateVerticalTitleWidth(object)

        values.forEach((row, i) => {
            const widths = mergedWidthsMap.get(row.length) ?? new Array<number>(row.length).fill(0)
            row.forEach((value, j) => {
                widths[j] = Math.max(widths[j], this.p5.textWidth(value))
            })
            mergedWidthsMap.set(row.length, widths)
        })

        mergedWidthsMap.forEach((value, key) => {
            const tempWidthsSum = value.reduce((l, r) => l + r, 0)
            for (let i = 0; i < key; i++) {
                value[i] = (value[i] * (width - verticalTitleWidth)) / tempWidthsSum
            }
        })
        for (let i = 0; i < values.length; i++) {
            if (i !== 0) {
                result.set(`horizontal line ${i}`, new LineCanvasAnimationParams({
                    object: {
                        origin: {x: 0, y: stepHeight * i},
                        endPoint: {x: width, y: stepHeight * i}
                    }
                }))
            }
            let accumulatedWidth = verticalTitleWidth
            if (verticalTitleWidth) {
                result.set(`vertical line title ${i}`, new LineCanvasAnimationParams({
                    object: {
                        origin: {x: accumulatedWidth, y: i * stepHeight},
                        endPoint: {x: accumulatedWidth, y: (i + 1) * stepHeight}
                    }
                }))
            }
            const widths = mergedWidthsMap.get(values[i].length) ?? []
            for (let j = 0; j < values[i].length - 1; j++) {
                accumulatedWidth += widths[j]
                result.set(`vertical line ${i} ${j}`, new LineCanvasAnimationParams({
                    object: {
                        origin: {x: accumulatedWidth, y: i * stepHeight},
                        endPoint: {x: accumulatedWidth, y: (i + 1) * stepHeight}
                    }
                }))
            }
        }
        for (let i = 0; i < values.length; i++) {
            let accumulatedWidth = 0
            if (verticalTitles?.length) {
                const x = accumulatedWidth + verticalTitleWidth / 2
                const y = stepHeight * i + (stepHeight / 2)
                result.set(`title ${i}`, new TextCanvasAnimationParams({
                    object: {
                        fontSize: object.fontSize,
                        origin: {x, y},
                        value: verticalTitles.length <= i ? '' : verticalTitles[i],
                        horizontalAlign: 'center',
                        verticalAlign: 'center',
                        textStyle: 'bold'
                    }
                }))
                accumulatedWidth += verticalTitleWidth
            }
            const widths = mergedWidthsMap.get(values[i].length) ?? []
            for (let j = 0; j < values[i].length; j++) {
                const x = accumulatedWidth + widths[j] / 2
                const y = stepHeight * i + (stepHeight / 2)
                result.set(`value ${i} ${j}`, new TextCanvasAnimationParams({
                    object: {
                        fontSize: object.fontSize,
                        origin: {x, y},
                        value: values[i][j],
                        horizontalAlign: 'center',
                        verticalAlign: 'center'
                    }
                }))
                accumulatedWidth += widths[j]
            }
        }

        return result
    }

    private calculateVerticalTitleWidth(object: tableParamsType): number {
        const {verticalTitles, values, width} = object
        let titleWidth = 0
        if (verticalTitles) {
            const maxTitle = this.getStringWithMaximumWidth(verticalTitles)
            titleWidth = Number.MAX_VALUE
            for (let i = 0; i < values.length; i++) {
                const row = [maxTitle, ...values[i]]
                titleWidth = Math.min(titleWidth, this.stringsToWidths(row, width)[0])
            }
        }
        return titleWidth
    }

    private getStringWithMaximumWidth(strings: string[]): string {
        let resultIndex = -1
        let maximumWidth = 0
        for (let i = 0; i < strings.length; i++) {
            const textWidth = this.p5.textWidth(strings[i])
            if (textWidth > maximumWidth) {
                resultIndex = i
                maximumWidth = textWidth
            }
        }
        return strings[resultIndex]
    }

    private stringsToWidths(strings: string[], width: number): number[] {
        const result = strings.map(s => this.p5.textWidth(s))
        const textWidthsSum = result.reduce((l, r) => l + r, 0)
        for (let i = 0; i < result.length; i++) {
            result[i] = (result[i] * width) / textWidthsSum
        }
        return result
    }

    public mergeWithTransformation(o: tableParamsType, t: Partial<tableParamsType>, p: number, animationStyle: AnimationStyle): onlyTableParamsType {
        let {values, width, height, fontSize} = o
        fontSize ??= animationStyle.fontSize
        return {
            values: t.values ? calculateArrayPercentValue(values, t.values, p) : values,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            fontSize: t.fontSize ? calculatePercentValue(fontSize, t.fontSize, p) : fontSize
        }
    }

}
