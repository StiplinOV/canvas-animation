import { Point } from '../../../common/Point'
import { addPoints } from '../../../common/Utils'
import { ObjectParams } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import CircleCanvasAnimationParams from '../../simple/circle/CircleCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import RectangleCanvasAnimationParams from '../../simple/rectangle/RectangleCanvasAnimationParams'
import { ColorType } from '../../../AnimationStyles'

const coordinateDashWidth = 20
const toScaleType = (value: scaleType | number): scaleType => {
    if (typeof value === 'number') {
        return {
            position: value,
            value: String(value)
        }
    }
    return value
}
const toChartPointType = (value: chartPointType | Point): chartPointType => {
    if ('point' in value) {
        return value
    }
    return {
        point: value,
        text: ''
    }
}

type scaleType = { position: number, value: string }
type chartPointType = { point: Point, text: string }
type chartYRangeType = { yCoords: [number, number], value: string }
type bar = {
    x: number
    y: number
    width?: number
    point?: boolean
    selected?: boolean
}

export interface XyChartParamsType extends ObjectParams {
    width: number
    height: number
    xScale?: (scaleType | number)[]
    yScale?: (scaleType | number)[]
    xAxisName?: string
    yAxisName?: string
    chartPoints?: (chartPointType | Point)[]
    chartLines?: [Point, Point][]
    chartYRanges?: chartYRangeType[]
    bars?: bar[]
    barWidth?: number
    barColor?: ColorType
    backgroundSelectedRectangleAreas?: {
        cornerPoints: [Point, Point]
        color?: ColorType
    }[]
}

export type XyChartSelectorType = {
    points?: 'all' | number[]
    lines?: 'all'
    xScaleValues?: 'all' | number[]
    yScaleValues?: 'all' | number[]
    bars?: 'all' | number[]
}

export default class XYChartCanvasAnimationParams extends ComplexCanvasAnimationParams<XyChartParamsType, XyChartSelectorType> {

    protected getIncludedAnimationParamsByParameter (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const {
            height,
            width,
            origin
        } = object
        const rotations = object.rotations ?? []
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        const xAxisName = object.xAxisName ?? ''
        const yAxisName = object.yAxisName ?? ''
        const objChartPoints = object.chartPoints?.map(value => toChartPointType(value)) ?? []
        const objChartLines = object.chartLines ?? []
        const objChartYRanges = object.chartYRanges ?? []
        const chartPointsDiameter = coordinateDashWidth / 2
        const bars = object.bars ?? []
        const barWidth = (width / (xScale.length + 1)) / 3
        const backgroundSelectedRectangleAreas = object.backgroundSelectedRectangleAreas ?? []

        new ArrowCanvasAnimationParams({
            object: {
                origin,
                endPoint: addPoints(origin, {
                    x: width,
                    y: 0
                }),
                endType: 'Arrow',
                weight: 2,
                rotations
            }
        }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
            result.set('xArrow ' + k, v)
        })
        new ArrowCanvasAnimationParams({
            object: {
                origin,
                endPoint: addPoints(origin, {
                    x: 0,
                    y: -height
                }),
                endType: 'Arrow',
                weight: 2,
                rotations
            }
        }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
            result.set('yArrow ' + k, v)
        })
        result.set('xText', new TextCanvasAnimationParams({
            object: {
                origin: addPoints(origin, {
                    x: width / 2,
                    y: coordinateDashWidth * 2
                }),
                value: xAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'top',
                rotations
            }
        }))
        const yTextOrigin = addPoints(origin, {
            x: -coordinateDashWidth * 2,
            y: -height / 2
        })
        result.set('yText', new TextCanvasAnimationParams({
            object: {
                origin: yTextOrigin,
                value: yAxisName,
                fontSize: 20,
                horizontalAlign: 'center',
                verticalAlign: 'bottom',
                rotations: [...rotations, {
                    axis: yTextOrigin,
                    angle: -Math.PI / 2
                }]
            }
        }))

        xScale.forEach((value, index) => {
            const x = this.getXForValue(object, value.position)
            result.set(`xScaleLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {
                        x,
                        y: -coordinateDashWidth / 2 + origin.y
                    },
                    endPoint: {
                        x,
                        y: coordinateDashWidth / 2 + origin.y
                    },
                    rotations
                }
            }))
            result.set(`xScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {
                        x,
                        y: Number(coordinateDashWidth) + origin.y
                    },
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
                    origin: {
                        x: -coordinateDashWidth / 2 + origin.x,
                        y
                    },
                    endPoint: {
                        x: coordinateDashWidth / 2 + origin.x,
                        y
                    },
                    rotations
                }
            }))
            result.set(`yScaleValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: {
                        x: -Number(coordinateDashWidth) + origin.x,
                        y
                    },
                    value: value.value,
                    verticalAlign: 'center',
                    horizontalAlign: 'center',
                    rotations
                }
            }))
        })
        bars.forEach((value, index) => {
            const x = this.getXForValue(object, value.x)
            const y = this.getYForValue(object, value.y)
            const zeroY = this.getYForValue(object, 0)
            const width = value.width ?? object.barWidth ?? barWidth
            const yStepHeight = height / yScale.length

            result.set(`chartBar ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: {
                        x: x - width / 2,
                        y
                    },
                    width,
                    height: zeroY - y,
                    fillColor: value.selected ? 'secondary' : object.barColor ?? 'primary'
                }
            }))
            if (value.point) {
                new ArrowCanvasAnimationParams({
                    object: {
                        origin: {
                            x,
                            y: y - yStepHeight
                        },
                        endPoint: {
                            x,
                            y: y - coordinateDashWidth / 2
                        },
                        endType: 'Arrow',
                        weight: 'bold',
                        strokeColor: 'secondary'
                    }
                }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
                    result.set(`chartBarPoint ${index}` + k, v)
                })
            }
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
                    origin: {
                        x: origin.x,
                        y: firstPointY
                    },
                    endPoint: {
                        x: endXCoord + 20,
                        y: firstPointY
                    },
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            }))
            result.set(`objectChartRangeSecondLine ${index}`, new LineCanvasAnimationParams({
                object: {
                    origin: {
                        x: origin.x,
                        y: secondPointY
                    },
                    endPoint: {
                        x: endXCoord + 20,
                        y: secondPointY
                    },
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            }))
            new ArrowCanvasAnimationParams(
                {
                    object: {
                        origin: {
                            x: endXCoord,
                            y: firstPointY
                        },
                        endPoint: {
                            x: endXCoord,
                            y: secondPointY
                        },
                        startType: 'Arrow',
                        endType: 'Arrow',
                        weight: 2,
                        rotations
                    }
                }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
                result.set(`objectChartRangeArrow ${index} ${k}`, v)
            })
            const objChartRangeValueOrigin = {
                x: endXCoord,
                y: (firstPointY + secondPointY) / 2
            }
            result.set(`objectChartRangeValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: objChartRangeValueOrigin,
                    value: objChartRange.value,
                    horizontalAlign: 'center',
                    fontSize: 20,
                    rotations: [...rotations, {
                        axis: objChartRangeValueOrigin,
                        angle: -Math.PI / 2
                    }]
                }
            }))
        })
        backgroundSelectedRectangleAreas.forEach((value, index) => {
            const x0 = this.getXForValue(object, value.cornerPoints[0].x)
            const x1 = this.getXForValue(object, value.cornerPoints[1].x)
            const y0 = this.getYForValue(object, value.cornerPoints[0].y)
            const y1 = this.getYForValue(object, value.cornerPoints[1].y)

            const leftUpCornerPoint = {
                x: Math.min(x0, x1),
                y: Math.min(y0, y1)
            }
            const width = Math.abs(x0 - x1)
            const height = Math.abs(y0 - y1)
            result.set(`backgroundSelectedRectangleArea ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: leftUpCornerPoint,
                    width,
                    height,
                    fillColor: value.color,
                    zIndex: -1
                }
            }))
        })
        return result
    }

    private getXForValue (object: XyChartParamsType, xValue: number): number {
        return this.convertPointToCoordinate(object, {
            x: xValue,
            y: 0
        }).x
    }

    private getYForValue (object: XyChartParamsType, yValue: number): number {
        return this.convertPointToCoordinate(object, {
            x: 0,
            y: yValue
        }).y
    }

    private convertPointToCoordinate (object: XyChartParamsType, point: Point): Point {
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

    protected convertSelectorToDiscriminatorRegexps (selector: XyChartSelectorType): RegExp[] {
        if (!selector.lines && !selector.points && !selector.yScaleValues && !selector.xScaleValues && !selector.bars) {
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
        if (selector.bars === 'all') {
            result.push(/chartBar.*/)
        } else if (Array.isArray(selector.bars)) {
            selector.bars.forEach(b => result.push(new RegExp(`chartBar ${b}`)))
        }
        return result
    }

}
