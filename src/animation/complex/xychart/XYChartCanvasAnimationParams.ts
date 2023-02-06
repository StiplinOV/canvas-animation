import {Point, ZeroPoint} from '../../../common/Point'
import {calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import CanvasAnimationParams, {ObjectParams} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import CircleCanvasAnimationParams from '../../simple/circle/CircleCanvasAnimationParams'

const coordinateDashWidth = 20
const toScaleType = (value: scaleType | number): scaleType =>
    typeof value === 'number' ? {position: value, value: String(value)} : value
const toChartPointType = (value: chartPointType | Point): chartPointType =>
    'point' in value ? value : {point: value, text: ''}

type scaleType = { position: number, value: string }
type chartPointType = { point: Point, text: string }
type chartYRangeType = { yCoords: [number, number], value: string }

interface onlyXyChartParamsType {
    width: number
    height: number
    xScale?: (scaleType | number)[]
    yScale?: (scaleType | number)[]
    xAxisName?: string
    yAxisName?: string
    chartPoints?: (chartPointType | Point)[]
    chartLines?: [Point, Point][]
    chartYRanges?: chartYRangeType[]
}

interface xyChartParamsType extends onlyXyChartParamsType, ObjectParams {
}

type selectorType = { points?: 'all' | number[], lines?: 'all', yScaleValues?: 'all' | number[] }

export default class XYChartCanvasAnimationParams extends ComplexCanvasAnimationParams<xyChartParamsType, selectorType> {

    getIncludedAnimationsByParameters(object: xyChartParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const {height, width} = object
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        const xAxisName = object.xAxisName ?? ''
        const yAxisName = object.yAxisName ?? ''
        const objChartPoints = object.chartPoints?.map(value => toChartPointType(value)) ?? []
        const objChartLines = object.chartLines ?? []
        const objChartYRanges = object.chartYRanges ?? []
        const chartPointsDiameter = coordinateDashWidth / 2
        result.set('xArrow', new ArrowCanvasAnimationParams({
            object: {
                origin: ZeroPoint,
                endPoint: {x: width, y: 0},
                endType: 'Arrow',
                weight: 2
            }
        }, this.p5))
        result.set('yArrow', new ArrowCanvasAnimationParams({
            object: {
                origin: ZeroPoint,
                endPoint: {x: 0, y: -height},
                endType: 'Arrow',
                weight: 2
            }
        }, this.p5))
        result.set('xText', new TextCanvasAnimationParams({
            object: {
                origin: {x: width / 2, y: coordinateDashWidth * 2},
                value: xAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'top'
            }
        }))
        result.set('yText', new TextCanvasAnimationParams({
            object: {
                origin: {x: -coordinateDashWidth * 2, y: -height / 2},
                rotation: -Math.PI / 2,
                value: yAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'bottom'
            }
        }))

        xScale.forEach((value, index) => {
            const x = this.getXForValue(object, value)
            result.set(`xScaleLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x, y: -coordinateDashWidth / 2},
                    endPoint: {x, y: coordinateDashWidth / 2}
                }
            }))
            result.set(`xScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x, y: Number(coordinateDashWidth)},
                    value: value.value,
                    verticalAlign: 'top',
                    horizontalAlign: 'center'
                }
            }))
        })
        yScale.forEach((value, index) => {
            const y = this.getYForValue(object, value.position)
            result.set(`yScaleLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: -coordinateDashWidth / 2, y},
                    endPoint: {x: coordinateDashWidth / 2, y}
                }
            }))
            result.set(`yScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x: -Number(coordinateDashWidth), y},
                    value: value.value,
                    verticalAlign: 'center',
                    horizontalAlign: 'center'
                }
            }))
        })
        objChartPoints.forEach((value, index) => {
            const curPoint = value.point
            const prevPoint = index > 0 ? objChartPoints[index - 1].point : curPoint
            const nextPoint = index < objChartPoints.length - 1 ? objChartPoints[index + 1].point : curPoint
            let textPosition: 'above' | 'below' = 'below'
            if (curPoint.y >= prevPoint.y && curPoint.y >= nextPoint.y) {
                textPosition = 'above'
            }
            const pointCoordinate = this.convertPointToCoordinate(object, curPoint)
            result.set(`chartPoint ${index}`, new CircleCanvasAnimationParams({
                object: {origin: pointCoordinate, diameter: chartPointsDiameter, weight: 2, zIndex: 2}
            }))
            result.set(`chartPointValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x: pointCoordinate.x, y: pointCoordinate.y + (textPosition === 'below' ? 10 : -10)},
                    value: value.text,
                    horizontalAlign: 'center',
                    verticalAlign: textPosition === 'below' ? 'top' : 'bottom',
                    fontSize: 15
                }
            }))
        })
        objChartLines.forEach((line, index) => result.set(`chartLine ${index}`, new LineCanvasAnimationParams({
            object: {
                origin: this.convertPointToCoordinate(object, line[0]),
                endPoint: this.convertPointToCoordinate(object, line[1]),
                weight: 3
            }
        })))
        objChartYRanges.sort((l, r) => {
            const [firstLeft, firstRight] = l.yCoords.sort()
            const [secondLeft, secondRight] = r.yCoords.sort()
            if (firstLeft <= secondLeft && firstRight >= secondRight) {
                return 1
            }
            if (secondLeft <= firstLeft && secondRight >= firstRight) {
                return -1
            }
            if (firstRight < secondLeft) {
                return 1
            }
            if (secondRight < firstRight) {
                return -1
            }
            return 0
        }).forEach((objChartRange, index) => {
            const firstPointY = this.getYForValue(object, objChartRange.yCoords[0])
            const secondPointY = this.getYForValue(object, objChartRange.yCoords[1])
            const endXCoord = width + index * 20
            result.set(`objectChartRangeFirstLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: 0, y: firstPointY},
                    endPoint: {x: endXCoord + 20, y: firstPointY},
                    dashed: [5, 10, 30, 10]
                }
            }))
            result.set(`objectChartRangeSecondLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: 0, y: secondPointY},
                    endPoint: {x: endXCoord + 20, y: secondPointY},
                    dashed: [5, 10, 30, 10]
                }
            }))
            result.set(`objectChartRangeArrow ${index}`, new ArrowCanvasAnimationParams(
                {
                    object: {
                        origin: {x: endXCoord, y: firstPointY},
                        endPoint: {x: endXCoord, y: secondPointY},
                        startType: 'Arrow',
                        endType: 'Arrow',
                        weight: 2
                    }
                }, this.p5)
            )
            result.set(`objectChartRangeValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x: endXCoord, y: (firstPointY + secondPointY) / 2},
                    value: objChartRange.value,
                    rotation: -Math.PI / 2,
                    horizontalAlign: 'center',
                    fontSize: 20
                }
            }))
        })
        return result
    }

    private getXForValue(object: xyChartParamsType, scaleValue: scaleType): number {
        return this.convertPointToCoordinate(object, {x: scaleValue.position, y: 0}).x
    }

    private getYForValue(object: xyChartParamsType, yValue: number): number {
        return this.convertPointToCoordinate(object, {x: 0, y: yValue}).y
    }

    private convertPointToCoordinate(object: xyChartParamsType, point: Point): Point {
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        const lastXScaleValue = xScale[xScale.length - 1].position
        const lastYScaleValue = yScale[yScale.length - 1].position
        const averageXGap = lastXScaleValue / xScale.length
        const averageYGap = lastYScaleValue / yScale.length
        const xScaleMax = xScale.length > 0 ? (lastXScaleValue + averageXGap) : 0
        const yScaleMax = yScale.length > 0 ? (lastYScaleValue + averageYGap) : 0
        return {
            x: point.x * object.width / xScaleMax,
            y: -point.y * object.height / yScaleMax
        }
    }

    mergeWithTransformation(obj: xyChartParamsType, t: Partial<xyChartParamsType>, p: number): onlyXyChartParamsType {
        let {width, height, xScale, yScale, xAxisName, yAxisName, chartPoints, chartLines, chartYRanges} = obj
        xScale ??= []
        yScale ??= []
        xAxisName ??= ''
        yAxisName ??= ''
        chartPoints ??= []
        chartLines ??= []
        chartYRanges ??= []
        return {
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            xScale: t.xScale ? calculateArrayPercentValue(xScale, t.xScale, p) : xScale,
            yScale: t.yScale ? calculateArrayPercentValue(yScale, t.yScale, p) : yScale,
            xAxisName: t.xAxisName ? calculateTextPercentValue(xAxisName, t.xAxisName, p) : xAxisName,
            yAxisName: t.yAxisName ? calculateTextPercentValue(yAxisName, t.yAxisName, p) : yAxisName,
            chartPoints: t.chartPoints ? calculateArrayPercentValue(chartPoints, t.chartPoints, p) : chartPoints,
            chartLines: t.chartLines ? calculateArrayPercentValue(chartLines, t.chartLines, p) : chartLines,
            chartYRanges: t.chartYRanges ? calculateArrayPercentValue(chartYRanges, t.chartYRanges, p) : chartYRanges
        }
    }

    protected convertSelectorToDiscriminatorRegexp(selector: selectorType): RegExp[] {
        if (!selector.lines && !selector.points && !selector.yScaleValues) {
            return [/.*/]
        }
        const result = []
        if (selector.lines === 'all') {
            result.push(/chartLine.*/)
        }
        if (selector.points === 'all') {
            result.push(/chartPoint.*/)
        } else if (Array.isArray(selector.points)) {
            selector.points.forEach(p => result.push(new RegExp(`chartPoint ${p}`)))
        }
        if (selector.yScaleValues === 'all') {
            result.push(/yScaleValue.*/)
        } else if (Array.isArray(selector.yScaleValues)) {
            selector.yScaleValues.forEach(p => result.push(new RegExp(`yScaleValue ${p}`)))
        }
        return result
    }

}
