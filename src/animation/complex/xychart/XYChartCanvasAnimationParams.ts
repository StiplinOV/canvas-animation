import { Point } from '../../../common/Point'
import { addPoints } from '../../../common/Utils'
import { ObjectParams } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, { AnimationSelectedInfo } from '../ComplexCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import CircleCanvasAnimationParams from '../../simple/circle/CircleCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import RectangleCanvasAnimationParams from '../../simple/rectangle/RectangleCanvasAnimationParams'
import { ColorType } from '../../../AnimationStyles'
import { findAllArrayIndexGroupsBy } from '../../../common/Alghoritm'

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

    protected getIncludedAnimationParamsByParameter (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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

            result.set(`chartBar ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: {
                        x: x - width / 2,
                        y
                    },
                    width,
                    height: zeroY - y,
                    fillColor,
                    zIndex: value.zIndex ?? 1
                }
            }, this.getAnimationStyle()))
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
            result.set(`chartPoint ${index}`, new CircleCanvasAnimationParams({
                object: {
                    origin: pointCoordinate,
                    diameter: chartPointsDiameter,
                    weight: 2,
                    zIndex: 2,
                    rotations
                }
            }, this.getAnimationStyle()))
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
            }, this.getAnimationStyle()))
        })
        objChartLines.forEach((line, index) => result.set(`chartLine ${index}`, new LineCanvasAnimationParams({
            object: {
                origin: this.convertPointToCoordinate(object, line[0]),
                endPoint: this.convertPointToCoordinate(object, line[1]),
                weight: 3,
                rotations
            }
        }, this.getAnimationStyle())))

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
            result.set(`backgroundSelectedRectangleArea ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: leftUpCornerPoint,
                    width,
                    height,
                    fillColor: value.color,
                    zIndex: value.zIndex ?? -1
                }
            }, this.getAnimationStyle()))
        })
        return result
    }

    private getXCoordinateAxisParams (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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
        }, this.getAnimationStyle()))
        xScale.forEach((value, index) => {
            const x = this.getXForValue(object, value.position)
            if (!object.hideXAxis) {
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
                        zIndex: -1,
                        rotations
                    }
                }, this.getAnimationStyle()))
            }
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
            }, this.getAnimationStyle()))
        })

        return result
    }

    private getYCoordinateAxisParams (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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
        }, this.getAnimationStyle()))

        yScale.forEach((value, index) => {
            const y = this.getYForValue(object, value.position)
            if (!object.hideYAxis) {
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
                        zIndex: -1,
                        rotations
                    }
                }, this.getAnimationStyle()))
            }
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
            }, this.getAnimationStyle()))
        })
        return result
    }

    private getChartYRangeParams (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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
            result.set(`objectChartYRangeFirstLine ${index}`, new LineCanvasAnimationParams({
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
            }, this.getAnimationStyle()))
            result.set(`objectChartYRangeSecondLine ${index}`, new LineCanvasAnimationParams({
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
            }, this.getAnimationStyle()))
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
            result.set(`objectChartYRangeValue ${index}`, new TextCanvasAnimationParams({
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
            }, this.getAnimationStyle()))
        })

        return result
    }

    private getChartXRangeParams (object: XyChartParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
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
            result.set(`objectChartXRangeFirstLine ${index}`, new LineCanvasAnimationParams({
                object: {
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
            }, this.getAnimationStyle()))
            result.set(`objectChartXRangeSecondLine ${index}`, new LineCanvasAnimationParams({
                object: {
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
            }, this.getAnimationStyle()))
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
            result.set(`objectChartXRangeValue ${index}`, new TextCanvasAnimationParams({
                object: {
                    origin: objChartRangeValueOrigin,
                    value: objChartRange.value,
                    horizontalAlign: 'center',
                    fontSize: 20,
                    rotations
                }
            }, this.getAnimationStyle()))
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

    protected getAnimationsToBeSelectedInfo (animationsCanBeSelected: Set<string>, selectionType: XyChartSelectorType): AnimationSelectedInfo[] {
        const result: AnimationSelectedInfo[] = []
        if (selectionType.bars === 'allPairsInSequence') {
            const barIndices: Set<number> = new Set<number>()
            animationsCanBeSelected.forEach(k => {
                const barRegexp = /chartBar (\d+)/
                if (barRegexp.test(k)) {
                    const extracted = barRegexp.exec(k)
                    if (extracted?.length === 2) {
                        barIndices.add(Number(extracted[1]))
                    }
                }
            })

            const barIndicesArray: number[] = []
            barIndices.forEach(i => barIndicesArray.push(i))
            const allPossiblePairs = findAllArrayIndexGroupsBy(barIndicesArray.length, 2).map(pair => [barIndicesArray[pair[0]], barIndicesArray[pair[1]]])
            const durationStep = 1 / allPossiblePairs.length
            let startSelectionPercent = 0
            let endSelectionPercent = durationStep
            allPossiblePairs.forEach(pair => {
                result.push({
                    key: `chartBar ${pair[0]}`,
                    startSelectionPercent,
                    endSelectionPercent
                })
                result.push({
                    key: `chartBar ${pair[1]}`,
                    startSelectionPercent,
                    endSelectionPercent
                })
                startSelectionPercent = endSelectionPercent
                endSelectionPercent += durationStep
            })
        }
        result.push(...this.createAnimationSelectedInfoByRegexpSelector(
            animationsCanBeSelected,
            selectionType,
            selector => this.convertSelectorToDiscriminatorRegexps(selector)
        ))
        return result
    }

    private convertSelectorToDiscriminatorRegexps (selector: XyChartSelectorType): RegExp[] {
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
