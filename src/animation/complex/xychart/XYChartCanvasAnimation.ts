import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import XYChartParams, {scaleType, toScaleType} from "./XYChartParams";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import CircleCanvasAnimation from "../../simple/circle/CircleCanvasAnimation";
import {Point} from "../../../common/Point";
import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType} from "../ComplexCanvasAnimation";
import ArrowCanvasAnimation from "../arrow/ArrowCanvasAnimation";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import GeometryHelper from "../../../common/GeometryHelper";
import Params from "../../Params";

const coordinateDashWidth = 20
type selectorType = { points?: "all", lines?: "all" }

export default class XYChartCanvasAnimation extends ComplexCanvasAnimation<XYChartParams, selectorType> {

    private xArrow: ArrowCanvasAnimation
    private yArrow: ArrowCanvasAnimation
    private xText: TextCanvasAnimation
    private yText: TextCanvasAnimation
    private xScaleLines: LineCanvasAnimation[] = []
    private yScaleLines: LineCanvasAnimation[] = []
    private xScaleAxisValues: TextCanvasAnimation[] = []
    private yScaleAxisValues: TextCanvasAnimation[] = []
    private chartPoints: CircleCanvasAnimation[] = []
    private chartLines: LineCanvasAnimation[] = []

    constructor(params: paramsType<XYChartParams, complexCanvasAnimationSelectionType<selectorType>>, geometryHelper: GeometryHelper) {
        super(params);
        const {object} = params
        const {height, width} = object
        const xScale = object.xScale?.map(value => toScaleType(value)) || []
        const yScale = object.yScale?.map(value => toScaleType(value)) || []
        const xAxisName = object.xAxisName || ""
        const yAxisName = object.yAxisName || ""
        const chartPoints = object.chartPoints || []
        const chartLines = object.chartLines || []
        const chartPointsDiameter = coordinateDashWidth / 2

        this.xArrow = new ArrowCanvasAnimation(
            {object: {startPoint: {x: 0, y: 0}, endPoint: {x: width, y: 0}, endType: "Arrow"}},
            geometryHelper
        )
        this.yArrow = new ArrowCanvasAnimation(
            {object: {startPoint: {x: 0, y: 0}, endPoint: {x: 0, y: -height}, endType: "Arrow"}},
            geometryHelper
        )
        this.xText = new TextCanvasAnimation({
            object: {
                origin: {x: width / 2, y: coordinateDashWidth * 2},
                value: xAxisName,
                fontSize: 20,
                horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP
            }
        })
        this.yText = new TextCanvasAnimation({
            object: {
                origin: {x: -coordinateDashWidth * 2, y: -height / 2},
                rotation: -Math.PI / 2,
                value: yAxisName,
                fontSize: 20,
                horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                verticalAlign: geometryHelper.VERTICAL_ALIGN_BOTTOM
            }
        })
        xScale.forEach(value => {
            const x = this.getXForValue(value)
            this.xScaleLines.push(new LineCanvasAnimation({
                object: {
                    startPoint: {x: x, y: -coordinateDashWidth / 2},
                    endPoint: {x: x, y: coordinateDashWidth / 2}
                }
            }))
            this.xScaleAxisValues.push(new TextCanvasAnimation({
                object: {
                    origin: {x: x, y: Number(coordinateDashWidth)},
                    value: value.value,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER
                }
            }))
        })
        yScale.forEach(value => {
            const y = this.getYForValue(value)
            this.yScaleLines.push(new LineCanvasAnimation({
                object: {
                    startPoint: {x: -coordinateDashWidth / 2, y: y},
                    endPoint: {x: coordinateDashWidth / 2, y: y}
                }
            }))
            this.yScaleAxisValues.push(new TextCanvasAnimation({
                object: {
                    origin: {x: -Number(coordinateDashWidth), y: y},
                    value: value.value,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_CENTER,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER
                }
            }))
        })
        chartPoints.forEach(point => this.chartPoints.push(new CircleCanvasAnimation({
            object: {centerPoint: this.convertScalePointToCoordinate(point), diameter: chartPointsDiameter}
        })))
        chartLines.forEach(line => this.chartLines.push(new LineCanvasAnimation({
            object: {
                startPoint: this.convertScalePointToCoordinate(line[0]),
                endPoint: this.convertScalePointToCoordinate(line[1])
            }
        })))
    }

    private getXForValue(scaleValue: scaleType): number {
        return this.convertScalePointToCoordinate({x: scaleValue.position, y: 0}).x
    }

    private getYForValue(scaleValue: scaleType): number {
        return this.convertScalePointToCoordinate({x: 0, y: scaleValue.position}).y
    }

    private convertScalePointToCoordinate(scalePoint: Point): Point {
        const object = this.getObject()
        const xScale = object.xScale?.map(value => toScaleType(value)) || []
        const yScale = object.yScale?.map(value => toScaleType(value)) || []
        const lastXScaleValue = xScale[xScale.length - 1].position
        const lastYScaleValue = yScale[yScale.length - 1].position
        const averageXGap = lastXScaleValue / xScale.length
        const averageYGap = lastYScaleValue / yScale.length
        const xScaleMax = xScale.length > 0 ? (lastXScaleValue + averageXGap) : 0
        const yScaleMax = yScale.length > 0 ? (lastYScaleValue + averageYGap) : 0
        return {
            x: scalePoint.x * object.width / xScaleMax,
            y: -scalePoint.y * object.height / yScaleMax
        }
    }

    getIncludedObjects(selector?: selectorType): CanvasAnimation<Params>[] {
        if (selector) {
            const result: CanvasAnimation<Params>[] = []
            selector.lines === "all" && result.push(...this.chartLines)
            selector.points === "all" && result.push(...this.chartPoints)
            return result
        }
        return [
            this.xArrow,
            this.yArrow,
            this.xText,
            this.yText,
            ...this.xScaleLines,
            ...this.yScaleLines,
            ...this.xScaleAxisValues,
            ...this.yScaleAxisValues,
            ...this.chartPoints,
            ...this.chartLines,
        ]
    }

    getOrigin(): Point {
        return this.getObject().origin;
    }

}