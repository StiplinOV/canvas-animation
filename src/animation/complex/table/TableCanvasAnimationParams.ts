import {ObjectParams} from '../../CanvasAnimationParams'
import {addPoints, render2DArrayType, requireValueFromMap} from '../../../common/Utils'
import ComplexCanvasAnimationParams, {
    AddedAppearParamType,
    AnimationS2T, AnimationSelectedInfo,
    ChangedTransformParamType,
    DeletedDisappearParamType,
    TransformOptions
} from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import EllipseCanvasAnimationParams from '../../simple/ellipse/EllipseCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'

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

const cellValueRegexp = /title|value (\d+) (\d+)/

export default class TableCanvasAnimationParams extends ComplexCanvasAnimationParams<TableParamsType, TableSelectorType, TableTransformOptionsType> {

    protected getIncludedAnimationParamsByParameter(object: TableParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const {values, height, horizontalTitles, verticalTitles, origin, rotations} = object
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
                    result.set(`horizontal line ${i} ${j}`, new LineCanvasAnimationParams({
                        object: {
                            origin: addPoints(origin, {x: accumulatedWidth, y: rowHeight * (i + 1)}),
                            endPoint: addPoints(origin, {x: accumulatedWidth + columnWidth, y: rowHeight * (i + 1)}),
                            weight: this.isBoldHorizontalLine(object, i, j) ? 'bold' : 'normal',
                            rotations
                        }
                    }, this.getAnimationStyle()))
                }
                accumulatedWidth += columnWidth
                if (j < columnWidths.length - 1) {
                    result.set(`vertical line ${i} ${j}`, new LineCanvasAnimationParams({
                        object: {
                            origin: addPoints(origin, {x: accumulatedWidth, y: i * rowHeight}),
                            endPoint: addPoints(origin, {x: accumulatedWidth, y: (i + 1) * rowHeight}),
                            weight: this.isBoldVerticalLine(object, i, j) ? 'bold' : 'normal',
                            rotations
                        }
                    }, this.getAnimationStyle()))
                }
                markedCells.forEach(markedCell => {
                    if (markedCell[0] === i && markedCell[1] === j) {
                        result.set(`markedCell ${i} ${j}`, new EllipseCanvasAnimationParams({
                            object: {
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
                        }, this.getAnimationStyle()))
                    }
                })
                result.set(title ? `title ${i} ${j}` : `value ${i} ${j}`, new TextCanvasAnimationParams({
                    object: {
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
                }, this.getAnimationStyle()))
            }
        }
        return result
    }

    private calculateRowColumnsWidths(object: TableParamsType): number[][] {
        const result: number[][] = []
        const {values, width, columnWidthProportions} = object
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

    private calculateRowColumnsWidthsFromParam(object: TableParamsType): number[][] {
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

    private calculateVerticalTitleWidth(object: TableParamsType): number {
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

    private isBoldHorizontalLine(object: TableParamsType, i: number, j: number): boolean {
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

    private isBoldVerticalLine(object: TableParamsType, i: number, j: number): boolean {
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

    protected getAnimationsToBeSelectedInfo (animationsCanBeSelected: Set<string>, selectionType: TableSelectorType): AnimationSelectedInfo[] {
        return this.createAnimationSelectedInfoByRegexpSelector(
            animationsCanBeSelected,
            selectionType,
            selector => this.convertSelectorToDiscriminatorRegexps(selector)
        )
    }

    private convertSelectorToDiscriminatorRegexps(selector: TableSelectorType): RegExp[] {
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

    protected calculateAddedTransformAnimationsAppearParams(
        added: Map<string, SimpleCanvasAnimationParams>,
        time: number,
        duration: number,
        options?: TableTransformOptionsType
    ): Map<string, AddedAppearParamType> {
        if (!options?.renderValues || options.type === 'together') {
            return super.calculateAddedTransformAnimationsAppearParams(added, time, duration, options)
        }
        const immediacy = options.renderValues?.immediacy
        const result = new Map<string, AddedAppearParamType>()
        let addedAppearTime = time
        this.sortKeysAccordingToOption(options, new Set(added.keys())).forEach(key => {
            const value = requireValueFromMap(added, key)
            const addedAppearDuration = duration / added.size
            result.set(key, {
                appearTime: addedAppearTime,
                appearDuration: immediacy ? 0 : addedAppearDuration,
                params: value
            })
            addedAppearTime += addedAppearDuration
        })
        return result
    }

    protected calculateDeletedTransformAnimationsDisappearParams(
        deleted: Set<string>,
        time: number,
        duration: number,
        options?: TableTransformOptionsType
    ): Map<string, DeletedDisappearParamType> {
        if (!options?.renderValues || options.type === 'together') {
            return super.calculateDeletedTransformAnimationsDisappearParams(deleted, time, duration, options)
        }
        const immediacy = options.renderValues?.immediacy
        const result = new Map<string, DeletedDisappearParamType>()
        let deletedDisappearTime = time
        this.sortKeysAccordingToOption(options, deleted).reverse().forEach(k => {
            const deletedDisappearDuration = duration / deleted.size
            result.set(k, {
                disappearTime: deletedDisappearTime,
                disappearDuration: immediacy ? 0 : deletedDisappearDuration
            })
            deletedDisappearTime += deletedDisappearDuration
        })
        return result
    }

    protected calculateChangedTransformAnimationsTransformParams(
        changed: Map<string, AnimationS2T>,
        time: number,
        duration: number,
        options?: TableTransformOptionsType
    ): Map<string, ChangedTransformParamType> {
        if (!options?.renderValues || options.type === 'together') {
            return super.calculateChangedTransformAnimationsTransformParams(changed, time, duration, options)
        }
        const immediacy = options.renderValues?.immediacy
        const result = new Map<string, ChangedTransformParamType>()
        let s2tAppearTime = time

        this.sortKeysAccordingToOption(options, new Set(changed.keys())).forEach(key => {
            const value = requireValueFromMap(changed, key)
            const s2tAppearDuration = duration / changed.size
            result.set(key, {
                time: s2tAppearTime,
                duration: immediacy ? 0 : s2tAppearDuration,
                s2t: value
            })
            s2tAppearTime += s2tAppearDuration
        })
        return result
    }

    private sortKeysAccordingToOption(options: TableTransformOptionsType, keysParam: Set<string>): string[] {
        const keys = Array.from(keysParam.keys())
        const direction = options.renderValues?.direction
        if (!direction) {
            return keys
        }
        return keys.sort((l, r) => {
            if (!cellValueRegexp.test(l) && !cellValueRegexp.test(r)) {
                return 0
            }
            const lRegexpExtractArray = cellValueRegexp.exec(l)
            const rRegexpExtractArray = cellValueRegexp.exec(r)
            if (!lRegexpExtractArray || !rRegexpExtractArray) {
                return 0
            }
            const [, lRowStr, lColStr] = lRegexpExtractArray
            const [, rRowStr, rColStr] = rRegexpExtractArray
            const lRow = Number(lRowStr)
            const lCol = Number(lColStr)
            const rRow = Number(rRowStr)
            const rCol = Number(rColStr)
            if (direction === 'leftToRight') {
                if (lRow > rRow) {
                    return 1
                }
                if (lRow < rRow) {
                    return -1
                }
                if (lCol > rCol) {
                    return 1
                }
                if (lCol < rCol) {
                    return -1
                }
            }
            if (direction === 'upToDown') {
                if (lCol > rCol) {
                    return 1
                }
                if (lCol < rCol) {
                    return -1
                }
                if (lRow > rRow) {
                    return 1
                }
                if (lRow < rRow) {
                    return -1
                }
            }
            return 0
        })
    }

}
