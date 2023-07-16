import { Point } from '../../../common/Point'
import { addPoints } from '../../../common/Utils'
import { ObjectParams } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {
    CanvasAnimationParamsType
} from '../ComplexCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
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
const toChartPointType = (value: ChartPointType | Point): ChartPointType => {
    if ('point' in value) {
        return value
    }
    return {
        point: value,
        text: ''
    }
}
const chartRangesCoordsComparator = (l: ChartRangeType, r: ChartRangeType): number => {
    const [firstLeft, firstRight] = l.coords.sort()
    const [secondLeft, secondRight] = r.coords.sort()
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
}

type scaleType = { position: number, value: string }
type ChartPointType = { point: Point, text: string }
type ChartRangeType = { coords: [number, number], value: string }
type Bar = {
    x: number
    y: number
    width?: number
    pointer?: boolean
    type?: 'selected' | 'transparent'
    zIndex?: number
}

export interface XyChartParamsType extends ObjectParams {
    width: number
    height: number
    xScale?: (scaleType | number)[]
    yScale?: (scaleType | number)[]
    hideXAxis?: boolean
    hideYAxis?: boolean
    xAxisName?: string
    yAxisName?: string
    chartPoints?: (ChartPointType | Point)[]
    chartLines?: [Point, Point][]
    chartYRanges?: ChartRangeType[]
    chartXRanges?: ChartRangeType[]
    bars?: Bar[]
    barWidth?: number
    barColor?: ColorType
    backgroundSelectedRectangleAreas?: {
        cornerPoints: [Point, Point]
        color?: ColorType
        zIndex?: number
    }[]
}

export type XyChartSelectorType = {
    points?: 'all' | number[]
    lines?: 'all'
    xScaleValues?: 'all' | number[]
    yScaleValues?: 'all' | number[]
    bars?: 'all' | 'allPairsInSequence' | number[]
}

export default class XYChartCanvasAnimationParams extends ComplexCanvasAnimationParams<XyChartParamsType, XyChartSelectorType> {

    protected getZeroParams (): Omit<XyChartParamsType, keyof ObjectParams> {
        return {
            width: 0,
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: XyChartParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            height,
            width
        } = object
        const rotations = object.rotations ?? []
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        let objChartPoints: ChartPointType[] = []
        let objChartLines: [Point, Point][] = []
        if (object.xScale && object.yScale) {
            objChartPoints = object.chartPoints?.map(value => toChartPointType(value)) ?? []
            objChartLines = object.chartLines ?? []
        }
        const chartPointsDiameter = coordinateDashWidth / 2
        const bars = object.bars ?? []
        const barWidth = (width / (xScale.length + 1)) / 3
        const backgroundSelectedRectangleAreas = object.backgroundSelectedRectangleAreas ?? []

        this.getXCoordinateAxisParams(object).forEach((v, k) => result.set(k, v))
        this.getYCoordinateAxisParams(object).forEach((v, k) => result.set(k, v))

        bars.forEach((value, index) => {
            const x = this.getXForValue(object, value.x)
            const y = this.getYForValue(object, value.y)
            const zeroY = this.getYForValue(object, 0)
            const width = value.width ?? object.barWidth ?? barWidth
            const yStepHeight = yScale.length ? height / yScale.length : 0
            let fillColor = object.barColor ?? 'primary'
            if (value.type === 'selected') {
                fillColor = 'secondary'
            } else if (value.type === 'transparent') {
                fillColor = 'background'
            }

            result.set(`chartBar ${index}`, {
                type: "rectangle",
                objectParams: {
                    origin: {
                        x: x - width / 2,
                        y
                    },
                    width,
                    height: zeroY - y,
                    fillColor,
                    zIndex: value.zIndex ?? 1
                }
            })
            if (value.pointer) {
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
                        strokeColor: 'secondary',
                        zIndex: value.zIndex
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
            result.set(`chartPoint ${index}`, {
                type: "circle",
                objectParams: {
                    origin: pointCoordinate,
                    diameter: chartPointsDiameter,
                    weight: 2,
                    zIndex: 2,
                    rotations
                }
            })
            result.set(`chartPointValue ${index}`, {
                type: "text",
                objectParams: {
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
            })
        })
        objChartLines.forEach((line, index) => result.set(`chartLine ${index}`, {
            type: "line",
            objectParams: {
                origin: this.convertPointToCoordinate(object, line[0]),
                endPoint: this.convertPointToCoordinate(object, line[1]),
                weight: 3,
                rotations
            }
        }))

        this.getChartYRangeParams(object).forEach((v, k) => result.set(k, v))
        this.getChartXRangeParams(object).forEach((v, k) => result.set(k, v))

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
            result.set(`backgroundSelectedRectangleArea ${index}`, {
                type: "rectangle",
                objectParams: {
                    origin: leftUpCornerPoint,
                    width,
                    height,
                    fillColor: value.color,
                    zIndex: value.zIndex ?? -1
                }
            })
        })
        return result
    }

    private getXCoordinateAxisParams (object: XyChartParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            width,
            origin
        } = object
        const rotations = object.rotations ?? []
        const xScale = object.xScale?.map(value => toScaleType(value)) ?? []
        const xAxisName = object.xAxisName ?? ''

        if (!object.hideXAxis) {
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
        }

        result.set('xText', {
            type: "text",
            objectParams: {
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
        })
        xScale.forEach((value, index) => {
            const x = this.getXForValue(object, value.position)
            if (!object.hideXAxis) {
                result.set(`xScaleLine ${index}`, {
                    type: "line",
                    objectParams: {
                        origin: {
                            x,
                            y: -coordinateDashWidth / 2 + origin.y
                        },
                        endPoint: {
                            x,
                            y: coordinateDashWidth / 2 + origin.y
                        },
                        zIndex: -1,
                        rotations
                    }
                })
            }
            result.set(`xScaleValue ${index}`, {
                type: "text",
                objectParams: {
                    origin: {
                        x,
                        y: Number(coordinateDashWidth) + origin.y
                    },
                    value: value.value,
                    verticalAlign: 'top',
                    horizontalAlign: 'center',
                    rotations
                }
            })
        })

        return result
    }

    private getYCoordinateAxisParams (object: XyChartParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            height,
            origin
        } = object
        const rotations = object.rotations ?? []
        const yScale = object.yScale?.map(value => toScaleType(value)) ?? []
        const yAxisName = object.yAxisName ?? ''

        if (!object.hideYAxis) {
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
        }

        const yTextOrigin = addPoints(origin, {
            x: -coordinateDashWidth * 2,
            y: -height / 2
        })
        result.set('yText', {
            type: "text",
            objectParams: {
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
        })

        yScale.forEach((value, index) => {
            const y = this.getYForValue(object, value.position)
            if (!object.hideYAxis) {
                result.set(`yScaleLine ${index}`, {
                    type: "line",
                    objectParams: {
                        origin: {
                            x: -coordinateDashWidth / 2 + origin.x,
                            y
                        },
                        endPoint: {
                            x: coordinateDashWidth / 2 + origin.x,
                            y
                        },
                        zIndex: -1,
                        rotations
                    }
                })
            }
            result.set(`yScaleValue ${index}`, {
                type: "text",
                objectParams: {
                    origin: {
                        x: -Number(coordinateDashWidth) + origin.x,
                        y
                    },
                    value: value.value,
                    verticalAlign: 'center',
                    horizontalAlign: 'center',
                    rotations
                }
            })
        })
        return result
    }

    private getChartYRangeParams (object: XyChartParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            width,
            origin
        } = object
        const rotations = object.rotations ?? []
        let objChartYRanges: ChartRangeType[] = []
        if (object.xScale && object.yScale) {
            objChartYRanges = object.chartYRanges ?? []
        }

        objChartYRanges.sort(chartRangesCoordsComparator).forEach((objChartRange, index) => {
            const firstPointY = this.getYForValue(object, objChartRange.coords[0])
            const secondPointY = this.getYForValue(object, objChartRange.coords[1])
            const endXCoord = width + index * 20 + origin.x + 60
            result.set(`objectChartYRangeFirstLine ${index}`, {
                type: "line",
                objectParams: {
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
            })
            result.set(`objectChartYRangeSecondLine ${index}`, {
                type: "line",
                objectParams: {
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
            })
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
                result.set(`objectChartYRangeArrow ${index} ${k}`, v)
            })
            const objChartRangeValueOrigin = {
                x: endXCoord,
                y: (firstPointY + secondPointY) / 2
            }
            result.set(`objectChartYRangeValue ${index}`, {
                type: "text",
                objectParams: {
                    origin: objChartRangeValueOrigin,
                    value: objChartRange.value,
                    horizontalAlign: 'center',
                    fontSize: 20,
                    rotations: [...rotations, {
                        axis: objChartRangeValueOrigin,
                        angle: -Math.PI / 2
                    }]
                }
            })
        })

        return result
    }

    private getChartXRangeParams (object: XyChartParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const { origin } = object
        const rotations = object.rotations ?? []
        let objChartXRanges: ChartRangeType[] = []
        if (object.xScale && object.yScale) {
            objChartXRanges = object.chartXRanges ?? []
        }

        objChartXRanges.sort(chartRangesCoordsComparator).forEach((objChartRange, index) => {
            const firstPointX = this.getXForValue(object, objChartRange.coords[0])
            const secondPointX = this.getXForValue(object, objChartRange.coords[1])
            const startYCoord = index * 20 + origin.y + 60
            result.set(`objectChartXRangeFirstLine ${index}`, {
                type: "line",
                objectParams: {
                    origin: {
                        x: firstPointX,
                        y: origin.y
                    },
                    endPoint: {
                        x: firstPointX,
                        y: startYCoord + 20
                    },
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            })
            result.set(`objectChartXRangeSecondLine ${index}`, {
                type: "line",
                objectParams: {
                    origin: {
                        x: secondPointX,
                        y: origin.y
                    },
                    endPoint: {
                        x: secondPointX,
                        y: startYCoord + 20
                    },
                    dashed: [5, 10, 30, 10],
                    rotations
                }
            })
            new ArrowCanvasAnimationParams(
                {
                    object: {
                        origin: {
                            x: firstPointX,
                            y: startYCoord
                        },
                        endPoint: {
                            x: secondPointX,
                            y: startYCoord
                        },
                        startType: 'Arrow',
                        endType: 'Arrow',
                        weight: 2,
                        rotations
                    }
                }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
                result.set(`objectChartXRangeArrow ${index} ${k}`, v)
            })
            const objChartRangeValueOrigin = {
                x: (firstPointX + secondPointX) / 2,
                y: startYCoord
            }
            result.set(`objectChartXRangeValue ${index}`, {
                type: "text",
                objectParams: {
                    origin: objChartRangeValueOrigin,
                    value: objChartRange.value,
                    horizontalAlign: 'center',
                    fontSize: 20,
                    rotations
                }
            })
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
        return {
            x: this.scaleCoordinateValue(object.width, object.xScale ?? [], object.origin.x, point.x),
            y: this.scaleCoordinateValue(object.height, object.yScale ?? [], object.origin.y, -point.y)
        }
    }

    private scaleCoordinateValue (length: number, scaleParam: (scaleType | number)[], originCoord: number, coord: number): number {
        if (scaleParam.length === 0) {
            return 0
        }
        const scale = scaleParam.map(value => toScaleType(value))
        const lastScaleValue = scale[scale.length - 1].position
        const averageGap = lastScaleValue / scale.length
        const scaleMax = scale.length > 0 ? (lastScaleValue + averageGap) : 0
        return originCoord + (coord * length / scaleMax)
    }

}
