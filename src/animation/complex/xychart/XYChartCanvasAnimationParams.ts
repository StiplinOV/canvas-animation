import {Point} from '../../../common/Point'
import {addPoints} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import CircleCanvasAnimationParams from '../../simple/circle/CircleCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'

const coordinateDashWidth = 20
const toScaleType = (value: scaleType | number): scaleType =>
    typeof value === 'number' ? {position: value, value: String(value)} : value
const toChartPointType = (value: chartPointType | Point): chartPointType =>
    'point' in value ? value : {point: value, text: ''}

type scaleType = { position: number, value: string }
type chartPointType = { point: Point, text: string }
type chartYRangeType = { yCoords: [number, number], value: string }

export interface xyChartParamsType extends ObjectParams {
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

export type xyChartSelectorType = { points?: 'all' | number[], lines?: 'all', xScaleValues?: 'all' | number[], yScaleValues?: 'all' | number[] }

export default class XYChartCanvasAnimationParams extends ComplexCanvasAnimationParams<xyChartParamsType, xyChartSelectorType> {

    protected getIncludedAnimationParamsByParameter(object: xyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const {height, width, origin} = object
        const rotations = object.rotations ?? []
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        const xAxisName = object.xAxisName ?? ''
        const yAxisName = object.yAxisName ?? ''
        const objChartPoints = object.chartPoints?.map(value => toChartPointType(value)) ?? []
        const objChartLines = object.chartLines ?? []
        const objChartYRanges = object.chartYRanges ?? []
        const chartPointsDiameter = coordinateDashWidth / 2
        new ArrowCanvasAnimationParams({
            object: {
                origin,
                endPoint: addPoints(origin, {x: width, y: 0}),
                endType: 'Arrow',
                weight: 2,
                rotations
            }
        }, this.p5).getIncludedAnimationParams().forEach((v, k) => {
            result.set('xArrow ' + k, v)
        })
        new ArrowCanvasAnimationParams({
            object: {
                origin,
                endPoint: addPoints(origin, {x: 0, y: -height}),
                endType: 'Arrow',
                weight: 2,
                rotations
            }
        }, this.p5).getIncludedAnimationParams().forEach((v, k) => {
            result.set('yArrow ' + k, v)
        })
        result.set('xText', new TextCanvasAnimationParams({
            object: {
                origin: addPoints(origin, {x: width / 2, y: coordinateDashWidth * 2}),
                value: xAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'top',
                rotations
            }
        }))
        const yTextOrigin = addPoints(origin, {x: -coordinateDashWidth * 2, y: -height / 2})
        result.set('yText', new TextCanvasAnimationParams({
            object: {
                origin: yTextOrigin,
                value: yAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'bottom',
                rotations: [...rotations, {axis: yTextOrigin, angle: -Math.PI / 2}]
            }
        }))

        xScale.forEach((value, index) => {
            const x = this.getXForValue(object, value)
            result.set(`xScaleLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x, y: -coordinateDashWidth / 2 + origin.y},
                    endPoint: {x, y: coordinateDashWidth / 2 + origin.y},
                    rotations
                }
            }))
            result.set(`xScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x, y: Number(coordinateDashWidth) + origin.y},
                    value: value.value,
                    verticalAlign: 'top',
                    horizontalAlign: 'center',
                    rotations
                }
            }))
        })
        yScale.forEach((value, index) => {
            const y = this.getYForValue(object, value.position)
            result.set(`yScaleLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: -coordinateDashWidth / 2 + origin.x, y},
                    endPoint: {x: coordinateDashWidth / 2 + origin.x, y},
                    rotations
                }
            }))
            result.set(`yScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {x: -Number(coordinateDashWidth) + origin.x, y},
                    value: value.value,
                    verticalAlign: 'center',
                    horizontalAlign: 'center',
                    rotations
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
                object: {
                    origin: pointCoordinate,
                    diameter: chartPointsDiameter,
                    weight: 2,
                    zIndex: 2,
                    rotations
                }
            }))
            result.set(`chartPointValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {
                        x: pointCoordinate.x,
                        y: pointCoordinate.y + (textPosition === 'below' ? 10 : -10)
                    },
                    value: value.text,
                    horizontalAlign: 'center',
                    verticalAlign: textPosition === 'below' ? 'top' : 'bottom',
                    fontSize: 15,
                    rotations
                }
            }))
        })
        objChartLines.forEach((line, index) => result.set(`chartLine ${index}`, new LineCanvasAnimationParams({
            object: {
                origin: this.convertPointToCoordinate(object, line[0]),
                endPoint: this.convertPointToCoordinate(object, line[1]),
                weight: 3,
                rotations
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
            const endXCoord = width + index * 20 + origin.x
            result.set(`objectChartRangeFirstLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: origin.x, y: firstPointY},
                    endPoint: {x: endXCoord + 20, y: firstPointY},
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            }))
            result.set(`objectChartRangeSecondLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: origin.x, y: secondPointY},
                    endPoint: {x: endXCoord + 20, y: secondPointY},
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            }))
            new ArrowCanvasAnimationParams(
                {
                    object: {
                        origin: {x: endXCoord, y: firstPointY},
                        endPoint: {x: endXCoord, y: secondPointY},
                        startType: 'Arrow',
                        endType: 'Arrow',
                        weight: 2,
                        rotations
                    }
                }, this.p5).getIncludedAnimationParams().forEach((v, k) => {
                result.set(`objectChartRangeArrow ${index} ${k}`, v)
            })
            const objChartRangeValueOrigin = {x: endXCoord, y: (firstPointY + secondPointY) / 2}
            result.set(`objectChartRangeValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: objChartRangeValueOrigin,
                    value: objChartRange.value,
                    horizontalAlign: 'center',
                    fontSize: 20,
                    rotations: [...rotations, {axis: objChartRangeValueOrigin, angle: -Math.PI / 2}]
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
            x: object.origin.x + (point.x * object.width / xScaleMax),
            y: object.origin.y + (-point.y * object.height / yScaleMax)
        }
    }

    protected convertSelectorToDiscriminatorRegexps(selector: xyChartSelectorType): RegExp[] {
        if (!selector.lines && !selector.points && !selector.yScaleValues && !selector.xScaleValues) {
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
        if (selector.xScaleValues === 'all') {
            result.push(/xScaleValue.*/)
        } else if (Array.isArray(selector.xScaleValues)) {
            selector.xScaleValues.forEach(p => result.push(new RegExp(`xScaleValue ${p}`)))
        }
        if (selector.yScaleValues === 'all') {
            result.push(/yScaleValue.*/)
        } else if (Array.isArray(selector.yScaleValues)) {
            selector.yScaleValues.forEach(p => result.push(new RegExp(`yScaleValue ${p}`)))
        }
        return result
    }

}
