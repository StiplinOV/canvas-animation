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
    verticalTitles?: boolean
    horizontalTitles?: boolean
    columnWidthProportions?: number[] | number[][]
    boldHorizontalLines?: (number | [number, number])[]
    boldVerticalLines?: (number | [number, number])[]
}

interface tableParamsType extends onlyTableParamsType, ObjectParams {
}

type selectorType = { rowTitles?: 'all' | number[], colTitles?: 'all' | number[], values?: 'all' | [number, number][] }

export default class TableCanvasAnimationParams extends ComplexCanvasAnimationParams<tableParamsType, selectorType> {

    getIncludedAnimationsByParameters(object: tableParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const {values, height, horizontalTitles, verticalTitles} = object
        const stepHeight = height / values.length
        const rowsWidths = this.calculateRowsWidths(object)
        let title = true

        for (let i = 0; i < values.length; i++) {
            let accumulatedWidth = 0
            const rowWidths = rowsWidths[i]
            for (let j = 0; j < rowWidths.length; j++) {
                title = (Boolean(verticalTitles) && j === 0) || (Boolean(horizontalTitles) && i === 0)
                const textStyle = title ? 'bold' : 'normal'

                if (i !== values.length - 1) {
                    result.set(`horizontal line ${i} ${j}`, new LineCanvasAnimationParams({
                        object: {
                            origin: {x: accumulatedWidth, y: stepHeight * (i + 1)},
                            endPoint: {x: accumulatedWidth + rowWidths[j], y: stepHeight * (i + 1)},
                            bold: this.isBoldHorizontalLine(object, i, j) ? 'bold' : 'normal'
                        }
                    }))
                }
                accumulatedWidth += rowWidths[j]
                if (j < rowWidths.length - 1) {
                    result.set(`vertical line ${i} ${j}`, new LineCanvasAnimationParams({
                        object: {
                            origin: {x: accumulatedWidth, y: i * stepHeight},
                            endPoint: {x: accumulatedWidth, y: (i + 1) * stepHeight},
                            bold: this.isBoldVerticalLine(object, i, j) ? 'bold' : 'normal'
                        }
                    }))
                }
                result.set(title ? `title ${i} ${j}` : `value ${i} ${j}`, new TextCanvasAnimationParams({
                    object: {
                        fontSize: object.fontSize,
                        origin: {x: accumulatedWidth - rowWidths[j] / 2, y: stepHeight * i + (stepHeight / 2)},
                        value: values[i][j],
                        horizontalAlign: 'center',
                        verticalAlign: 'center',
                        textStyle
                    }
                }))
            }
        }
        return result
    }

    private calculateRowsWidths(object: tableParamsType): number[][] {
        const result: number[][] = []
        const {values, width, columnWidthProportions} = object
        if (columnWidthProportions) {
            return this.calculateRowsWidthsFromParam(object)
        }
        const mergedWidthsMap: Map<number, number[]> = new Map<number, number[]>()
        const verticalTitleWidth = this.calculateVerticalTitleWidth(object)
        for (let i = 0; i < values.length; i++) {
            const row = values[i]
            const widths = mergedWidthsMap.get(row.length) ?? []
            let rowIndex = 0
            let numberOfWidths = row.length
            if (object.verticalTitles) {
                rowIndex = 1
                numberOfWidths -= 1
            }
            for (let widthIndex = 0; widthIndex < numberOfWidths; widthIndex++) {
                if (widths.length === widthIndex) {
                    widths.push(0)
                }
                widths[widthIndex] = Math.max(widths[widthIndex], this.p5.textWidth(row[rowIndex + widthIndex]))
            }
            mergedWidthsMap.set(row.length, widths)
        }
        mergedWidthsMap.forEach((value) => {
            const tempWidthsSum = value.reduce((l, r) => l + r, 0)
            for (let i = 0; i < value.length; i++) {
                value[i] = (value[i] * (width - verticalTitleWidth)) / tempWidthsSum
            }
        })
        values.forEach((row) => {
            const resultRow = [...(mergedWidthsMap.get(row.length) ?? [])]
            if (object.verticalTitles && resultRow) {
                resultRow.splice(0, 0, verticalTitleWidth)
            }
            resultRow && result.push(resultRow)
        })
        return result
    }

    private calculateRowsWidthsFromParam(object: tableParamsType): number[][] {
        const {width, columnWidthProportions} = object
        const result: number[][] = []
        if (!columnWidthProportions || columnWidthProportions.length === 0) {
            return result
        }
        const resultRow: number[] = []
        columnWidthProportions.forEach(cw => {
            if (Array.isArray(cw)) {
                result.push(this.calculateWidthsByProportions(cw, width))
            } else {
                resultRow.push(cw)
            }
        })
        if (resultRow.length > 0) {
            object.values.forEach(() => result.push(this.calculateWidthsByProportions(resultRow, width)))
        }
        return result
    }

    private calculateVerticalTitleWidth(object: tableParamsType): number {
        const {verticalTitles, values, width} = object
        if (!verticalTitles) {
            return 0
        }

        const maxTitle = this.getStringWithMaximumWidth(values.map(v => v[0]))
        let titleWidth = Number.MAX_VALUE
        for (let i = 0; i < values.length; i++) {
            titleWidth = Math.min(
                titleWidth,
                this.stringsToWidths(
                    [maxTitle, ...values[i]],
                    width
                )[0]
            )
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
        return this.calculateWidthsByProportions(strings.map(s => this.p5.textWidth(s)), width)
    }

    private calculateWidthsByProportions(proportions: number[], width: number): number[] {
        const result = [...proportions]
        const proportionsSum = proportions.reduce((l, r) => l + r, 0)
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i] * width / proportionsSum
        }
        return result
    }

    private isBoldHorizontalLine(object: tableParamsType, i: number, j: number): boolean {
        const {horizontalTitles, boldHorizontalLines} = object
        if (Boolean(horizontalTitles) && i === 0) {
            return true
        }
        if (boldHorizontalLines) {
            for (let index = 0; index < boldHorizontalLines.length; index++) {
                const value = boldHorizontalLines[index]
                if (typeof value === 'number') {
                    if (value === i) {
                        return true
                    }
                } else {
                    if (value[0] === i && value[1] === j) {
                        return true
                    }
                }
            }
        }
        return false
    }

    private isBoldVerticalLine(object: tableParamsType, i: number, j: number): boolean {
        const {verticalTitles, boldVerticalLines} = object
        if (Boolean(verticalTitles) && j === 0) {
            return true
        }
        if (boldVerticalLines) {
            for (let index = 0; index < boldVerticalLines.length; index++) {
                const value = boldVerticalLines[index]
                if (typeof value === 'number') {
                    if (value === j) {
                        return true
                    }
                } else {
                    if (value[0] === i && value[1] === j) {
                        return true
                    }
                }
            }
        }
        return false
    }

    public mergeWithTransformation(o: tableParamsType, t: Partial<tableParamsType>, p: number, animationStyle: AnimationStyle): onlyTableParamsType {
        let {
            values,
            width,
            height,
            fontSize,
            verticalTitles,
            horizontalTitles,
            columnWidthProportions,
            boldHorizontalLines,
            boldVerticalLines
        } = o
        fontSize ??= animationStyle.fontSize
        verticalTitles ??= false
        columnWidthProportions ??= this.calculateRowsWidths(o)
        boldHorizontalLines ??= []
        boldVerticalLines ??= []
        const sourceColumnWidthProportions: number[][] = []
        const transformColumnWidthProportions: number[][] = []
        columnWidthProportions.forEach((v) => {
            if (typeof v === 'number') {
                while (sourceColumnWidthProportions.length < values.length) {
                    sourceColumnWidthProportions.push([])
                }
                sourceColumnWidthProportions.forEach(s => s.push(v))
            } else {
                sourceColumnWidthProportions.push(v)
            }
        })
        t.columnWidthProportions?.forEach(v => {
            if (typeof v === 'number') {
                while (transformColumnWidthProportions.length < values.length) {
                    transformColumnWidthProportions.push([])
                }
                transformColumnWidthProportions.forEach(s => s.push(v))
            } else {
                transformColumnWidthProportions.push(v)
            }
        })
        return {
            values: t.values ? calculateArrayPercentValue(values, t.values, p) : values,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            fontSize: t.fontSize ? calculatePercentValue(fontSize, t.fontSize, p) : fontSize,
            verticalTitles: typeof t.verticalTitles === 'boolean' && p >= 0.5 ? t.verticalTitles : verticalTitles,
            horizontalTitles: typeof t.horizontalTitles === 'boolean' && p >= 0.5 ? t.horizontalTitles : horizontalTitles,
            columnWidthProportions: t.columnWidthProportions ? calculateArrayPercentValue(sourceColumnWidthProportions, transformColumnWidthProportions, p) : columnWidthProportions,
            boldHorizontalLines: t.boldHorizontalLines ? calculateArrayPercentValue(boldHorizontalLines, t.boldHorizontalLines, p) : boldHorizontalLines,
            boldVerticalLines: t.boldVerticalLines ? calculateArrayPercentValue(boldVerticalLines, t.boldVerticalLines, p) : boldVerticalLines
        }
    }

    protected convertSelectorToDiscriminatorRegexp(selector: selectorType): RegExp[] {
        if (!selector.rowTitles && !selector.colTitles && !selector.values) {
            return [/.*/]
        }
        const result: RegExp[] = []
        if (selector.colTitles === 'all') {
            result.push(/title 0 [0-9]*/)
        } else if (Array.isArray(selector.colTitles)) {
            selector.colTitles.forEach(p => result.push(new RegExp(`title 0 ${p}`)))
        }
        if (selector.rowTitles === 'all') {
            result.push(/title [0-9]* 0/)
        } else if (Array.isArray(selector.rowTitles)) {
            selector.rowTitles.forEach(p => result.push(new RegExp(`title ${p} 0`)))
        }
        if (selector.values === 'all') {
            result.push(/value .*/)
        } else if (Array.isArray(selector.values)) {
            selector.values.forEach(p => {
                result.push(new RegExp(`value ${p[0]} ${p[1]}`))
            })
        }
        return result
    }

}
