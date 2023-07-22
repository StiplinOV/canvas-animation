import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints, render2DArrayType } from '../../../common/Utils'
import ComplexCanvasAnimationParams, {
    CanvasAnimationParamsType,
    TransformOptions
} from '../ComplexCanvasAnimationParams'

export interface TableParamsType extends ObjectParams {
    values: string[][]
    width: number
    height: number
    fontSize?: number
    verticalTitles?: boolean
    horizontalTitles?: boolean
    columnWidthProportions?: number[] | number[][]
    boldHorizontalLines?: (number | [number, number])[]
    boldVerticalLines?: (number | [number, number])[]
    markedCells?: number[][]
}

export type TableSelectorType = {
    rowTitles?: 'all' | number[]
    colTitles?: 'all' | number[]
    values?: 'all' | [number, number][]
}

export interface TableTransformOptionsType extends TransformOptions {
    renderValues?: {
        direction?: render2DArrayType
        immediacy?: boolean
    }
}

export default class TableCanvasAnimationParams extends ComplexCanvasAnimationParams<TableParamsType, TableSelectorType, TableTransformOptionsType> {

    protected getZeroParams (): Omit<TableParamsType, keyof ObjectParams> {
        return {
            values: [],
            width: 0,
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: TableParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            values,
            height,
            horizontalTitles,
            verticalTitles,
            origin,
            rotations
        } = object
        const rowHeight = height / values.length
        const rowColumnsWidths = this.calculateRowColumnsWidths(object)
        const markedCells = object.markedCells ?? []
        let title = true

        for (let i = 0; i < values.length; i++) {
            let accumulatedWidth = 0
            const columnWidths = rowColumnsWidths[i]
            for (let j = 0; j < columnWidths.length; j++) {
                title = (Boolean(verticalTitles) && j === 0) || (Boolean(horizontalTitles) && i === 0)
                const textStyle = title ? 'bold' : 'normal'
                const columnWidth = columnWidths[j]

                if (i !== values.length - 1) {
                    result.set(`horizontal line ${i} ${j}`, {
                        type: 'line',
                        objectParams: {
                            origin: addPoints(origin, {
                                x: accumulatedWidth,
                                y: rowHeight * (i + 1)
                            }),
                            endPoint: addPoints(origin, {
                                x: accumulatedWidth + columnWidth,
                                y: rowHeight * (i + 1)
                            }),
                            weight: this.isBoldHorizontalLine(object, i, j) ? 'bold' : 'normal',
                            rotations
                        }
                    })
                }
                accumulatedWidth += columnWidth
                if (j < columnWidths.length - 1) {
                    result.set(`vertical line ${i} ${j}`, {
                        type: 'line',
                        objectParams: {
                            origin: addPoints(origin, {
                                x: accumulatedWidth,
                                y: i * rowHeight
                            }),
                            endPoint: addPoints(origin, {
                                x: accumulatedWidth,
                                y: (i + 1) * rowHeight
                            }),
                            weight: this.isBoldVerticalLine(object, i, j) ? 'bold' : 'normal',
                            rotations
                        }
                    })
                }
                markedCells.forEach(markedCell => {
                    if (markedCell[0] === i && markedCell[1] === j) {
                        result.set(`markedCell ${i} ${j}`, {
                            type: 'ellipse',
                            objectParams: {
                                origin: addPoints(origin, {
                                    x: accumulatedWidth - columnWidth / 2,
                                    y: rowHeight * i + (rowHeight / 2)
                                }),
                                width: columnWidth * 0.8,
                                height: rowHeight * 0.8,
                                weight: 'bold',
                                zIndex: -1,
                                strokeColor: 'secondary',
                                rotations
                            }
                        })
                    }
                })
                result.set(title ? `title ${i} ${j}` : `value ${i} ${j}`, {
                    type: 'text',
                    objectParams: {
                        fontSize: object.fontSize,
                        origin: addPoints(origin, {
                            x: accumulatedWidth - columnWidth / 2,
                            y: rowHeight * i + (rowHeight / 2)
                        }),
                        value: values[i][j],
                        horizontalAlign: 'center',
                        verticalAlign: 'center',
                        textStyle,
                        rotations
                    }
                })
            }
        }
        return result
    }

    private calculateRowColumnsWidths (object: TableParamsType): number[][] {
        const result: number[][] = []
        const {
            values,
            width,
            columnWidthProportions
        } = object
        if (columnWidthProportions) {
            return this.calculateRowColumnsWidthsFromParam(object)
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

    private calculateRowColumnsWidthsFromParam (object: TableParamsType): number[][] {
        const {
            width,
            columnWidthProportions
        } = object
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

    private calculateVerticalTitleWidth (object: TableParamsType): number {
        const {
            verticalTitles,
            values,
            width
        } = object
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

    private getStringWithMaximumWidth (strings: string[]): string {
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

    private stringsToWidths (strings: string[], width: number): number[] {
        return this.calculateWidthsByProportions(strings.map(s => this.p5.textWidth(s)), width)
    }

    private calculateWidthsByProportions (proportions: number[], width: number): number[] {
        const result = [...proportions]
        const proportionsSum = proportions.reduce((l, r) => l + r, 0)
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i] * width / proportionsSum
        }
        return result
    }

    private isBoldHorizontalLine (object: TableParamsType, i: number, j: number): boolean {
        const {
            horizontalTitles,
            boldHorizontalLines
        } = object
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

    private isBoldVerticalLine (object: TableParamsType, i: number, j: number): boolean {
        const {
            verticalTitles,
            boldVerticalLines
        } = object
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

}
