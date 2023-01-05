import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import XYChartParams from "./XYChartParams";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import CircleCanvasAnimation from "../../simple/circle/CircleCanvasAnimation";
import {Point} from "../../../common/Point";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";
import Params from "../../Params";
import ArrowCanvasAnimation from "../arrow/ArrowCanvasAnimation";
import p5Types from "p5";

export default class XYChartCanvasAnimation extends ComplexCanvasAnimation<XYChartParams> {

    protected calculateIncludedObjects(
        params: paramsType<XYChartParams, "uniform", "uniform">,
        p5: p5Types
    ): CanvasAnimation<Params, string, string>[] {
        const {object} = params
        const weight = object.weight || 1
        const {origin} = object
        const {height} = object
        const {width} = object
        const xScale = object.xScale || []
        const yScale = object.yScale || []
        const chartPoints = object.chartPoints || []
        const chartLines = object.chartLines || []
        const axisPointsDiameter = 2 * weight
        const chartPointsDiameter = 2 * weight
        return [
            new ArrowCanvasAnimation(
                {object: {startPoint: origin, endPoint: {x: origin.x + width, y: origin.y}, endType: "Arrow"}},
                p5
            ),
            new ArrowCanvasAnimation(
                {object: {startPoint: origin, endPoint: {x: origin.x, y: origin.y - height}, endType: "Arrow"}},
                p5
            ),
            ...xScale.map(value => new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: {x: this.getXForValue(value), y: origin.y}, diameter: axisPointsDiameter}
            })),
            ...yScale.map(value => new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: {x: origin.x, y: this.getYForValue(value)}, diameter: axisPointsDiameter}
            })),
            ...chartPoints.map(point => new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: this.convertScalePointToCoordinate(point), diameter: chartPointsDiameter}
            })),
            ...chartLines.map(line => new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: this.convertScalePointToCoordinate(line[0]),
                    endPoint: this.convertScalePointToCoordinate(line[1])
                }
            }))
        ]
    }

    private getXForValue(value: number): number {
        return this.convertScalePointToCoordinate({x: value, y: 0}).x
    }

    private getYForValue(value: number): number {
        return this.convertScalePointToCoordinate({x: 0, y: value}).y
    }

    private convertScalePointToCoordinate(scalePoint: Point): Point {
        const object = this.getObject()
        const xScale = object.xScale || []
        const yScale = object.yScale || []
        const xScaleMax = xScale.length > 0 ? xScale[xScale.length - 1] + xScale[0] : 0
        const yScaleMax = yScale.length > 0 ? yScale[yScale.length - 1] + yScale[0] : 0
        return {
            x: object.origin.x + scalePoint.x * object.width / xScaleMax,
            y: object.origin.y - scalePoint.y * object.height / yScaleMax
        }
    }


}