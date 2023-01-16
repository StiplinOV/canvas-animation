import CanvasAnimation from "../../CanvasAnimation";
import XYChartParams, {scaleType, toChartPointType, toScaleType} from "./XYChartParams";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import CircleCanvasAnimation from "../../simple/circle/CircleCanvasAnimation";
import {Point} from "../../../common/Point";
import ComplexCanvasAnimation, {objectInfo} from "../ComplexCanvasAnimation";
import ArrowCanvasAnimation from "../arrow/ArrowCanvasAnimation";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import Params from "../../Params";
import p5Types from "p5";
import {calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue} from "../../../common/Utils";

const coordinateDashWidth = 20
type selectorType = { points?: "all" | number[], lines?: "all" }

export default class XYChartCanvasAnimation extends ComplexCanvasAnimation<XYChartParams, selectorType> {

    getIncludedObjects(object: XYChartParams, selector?: selectorType | boolean): objectInfo[] {
        const {height, width} = object
        const xScale = object.xScale?.map(value => toScaleType(value)) || []
        const yScale = object.yScale?.map(value => toScaleType(value)) || []
        const xAxisName = object.xAxisName || ""
        const yAxisName = object.yAxisName || ""
        const objChartPoints = object.chartPoints?.map(value => toChartPointType(value)) || []
        const objChartLines = object.chartLines || []
        const chartPointsDiameter = coordinateDashWidth / 2
        const geometryHelper = this.getGeometryHelper()

        const xArrow = new ArrowCanvasAnimation(
            {object: {origin: {x: 0, y: 0}, endPoint: {x: width, y: 0}, endType: "Arrow", weight: 2}},
            geometryHelper
        )
        const yArrow = new ArrowCanvasAnimation(
            {object: {origin: {x: 0, y: 0}, endPoint: {x: 0, y: -height}, endType: "Arrow", weight: 2}},
            geometryHelper
        )
        const xText = new TextCanvasAnimation({
            object: {
                origin: {x: width / 2, y: coordinateDashWidth * 2},
                value: xAxisName,
                fontSize: 20,
                horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP
            }
        })
        const yText = new TextCanvasAnimation({
            object: {
                origin: {x: -coordinateDashWidth * 2, y: -height / 2},
                rotation: -Math.PI / 2,
                value: yAxisName,
                fontSize: 20,
                horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                verticalAlign: geometryHelper.VERTICAL_ALIGN_BOTTOM
            }
        })

        const xScaleLines: LineCanvasAnimation[] = []
        const yScaleLines: LineCanvasAnimation[] = []
        const xScaleAxisValues: TextCanvasAnimation[] = []
        const yScaleAxisValues: TextCanvasAnimation[] = []
        const chartPoints: CircleCanvasAnimation[] = []
        const chartPointsValues: TextCanvasAnimation[] = []
        const chartLines: LineCanvasAnimation[] = []

        xScale.forEach(value => {
            const x = this.getXForValue(object, value)
            xScaleLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: x, y: -coordinateDashWidth / 2},
                    endPoint: {x: x, y: coordinateDashWidth / 2}
                }
            }))
            xScaleAxisValues.push(new TextCanvasAnimation({
                object: {
                    origin: {x: x, y: Number(coordinateDashWidth)},
                    value: value.value,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER
                }
            }))
        })
        yScale.forEach(value => {
            const y = this.getYForValue(object, value)
            yScaleLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: -coordinateDashWidth / 2, y: y},
                    endPoint: {x: coordinateDashWidth / 2, y: y}
                }
            }))
            yScaleAxisValues.push(new TextCanvasAnimation({
                object: {
                    origin: {x: -Number(coordinateDashWidth), y: y},
                    value: value.value,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_CENTER,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER
                }
            }))
        })
        objChartPoints.forEach((value, index) => {
            const curPoint = value.point
            const prevPoint = index > 0 ? objChartPoints[index - 1].point : curPoint
            const nextPoint = index < objChartPoints.length - 1 ? objChartPoints[index + 1].point : curPoint
            let textPosition: "above" | "below" = "below"
            if (curPoint.y >= prevPoint.y && curPoint.y >= nextPoint.y) {
                textPosition = "above"
            }
            const pointCoordinate = this.convertPointToCoordinate(object, curPoint)
            chartPoints.push(new CircleCanvasAnimation({
                object: {origin: pointCoordinate, diameter: chartPointsDiameter, weight: 2, zIndex: 2}
            }))
            chartPointsValues.push(new TextCanvasAnimation({
                object: {
                    origin: {x: pointCoordinate.x, y: pointCoordinate.y + (textPosition === "below" ? 10 : -10)},
                    value: value.text,
                    horizontalAlign: "center",
                    verticalAlign: textPosition === "below" ? "top" : "bottom",
                    fontSize: 15
                }
            }))
        })
        objChartLines.forEach(line => chartLines.push(new LineCanvasAnimation({
            object: {
                origin: this.convertPointToCoordinate(object, line[0]),
                endPoint: this.convertPointToCoordinate(object, line[1]),
                weight: 3
            }
        })))

        // if (selector) {
        //     const result: CanvasAnimation<Params>[] = []
        //     selector.lines === "all" && result.push(...chartLines)
        //     if (selector.points) {
        //         if (selector.points === "all") {
        //             result.push(...chartPoints)
        //         } else {
        //             selector.points.forEach(pointIndex => result.push(chartPoints[pointIndex]))
        //         }
        //     }
        //     return result
        // }
        const result: objectInfo[] = [
            xArrow,
            yArrow,
            xText,
            yText,
            ...xScaleLines,
            ...yScaleLines,
            ...xScaleAxisValues,
            ...yScaleAxisValues,
            ...chartPointsValues,
        ].map(r => ({object: r, selected: false}))
        chartPoints.forEach((p, i) => {
            let selected = false
            if (selector) {
                if (typeof selector === "boolean") {
                    selected = selector
                } else if (selector.points) {
                    if (selector.points === "all" || selector.points.includes(i))
                    selected = true
                }
            }
            result.push({object: p, selected})
        })
        chartLines.forEach((p) => {
            let selected = false
            if (selector) {
                if (typeof selector === "boolean") {
                    selected = selector
                } else if (selector.lines) {
                    if (selector.lines === "all") {
                        selected = true
                    }
                }
            }
            result.push({object: p, selected})
        })

        return result
    }

    private getXForValue(object: XYChartParams, scaleValue: scaleType): number {
        return this.convertPointToCoordinate(object, {x: scaleValue.position, y: 0}).x
    }

    private getYForValue(object: XYChartParams, scaleValue: scaleType): number {
        return this.convertPointToCoordinate(object, {x: 0, y: scaleValue.position}).y
    }

    private convertPointToCoordinate(object: XYChartParams, point: Point): Point {
        const xScale = object.xScale?.map(value => toScaleType(value)) || []
        const yScale = object.yScale?.map(value => toScaleType(value)) || []
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

    mergeWithTransformation(obj: XYChartParams, t: Partial<XYChartParams>, p: number, p5: p5Types): XYChartParams {
        let {width, height, xScale, yScale, xAxisName, yAxisName, chartPoints, chartLines} = obj
        xScale ||= []
        yScale ||= []
        xAxisName ||= ""
        yAxisName ||= ""
        chartPoints ||= []
        chartLines ||= []
        return {
            ...obj,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            xScale: t.xScale ? calculateArrayPercentValue(xScale, t.xScale, p) : xScale,
            yScale: t.yScale ? calculateArrayPercentValue(yScale, t.yScale, p) : yScale,
            xAxisName: t.xAxisName ? calculateTextPercentValue(xAxisName, t.xAxisName, p) : xAxisName,
            yAxisName: t.yAxisName ? calculateTextPercentValue(yAxisName, t.yAxisName, p) : yAxisName,
            chartPoints: t.chartPoints ? calculateArrayPercentValue(chartPoints, t.chartPoints, p) : chartPoints,
            chartLines: t.chartLines ? calculateArrayPercentValue(chartLines, t.chartLines, p) : chartLines,
        };
    }

}