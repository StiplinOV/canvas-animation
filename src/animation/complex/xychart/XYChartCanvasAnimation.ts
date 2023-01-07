import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import XYChartParams from "./XYChartParams";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import CircleCanvasAnimation from "../../simple/circle/CircleCanvasAnimation";
import {Point} from "../../../common/Point";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";
import Params from "../../Params";
import ArrowCanvasAnimation from "../arrow/ArrowCanvasAnimation";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import GeometryHelper from "../../../common/GeometryHelper";

export default class XYChartCanvasAnimation extends ComplexCanvasAnimation<XYChartParams> {

    protected calculateIncludedObjects(params: paramsType<XYChartParams>, geometryHelper: GeometryHelper): CanvasAnimation<Params>[] {
        const {object} = params
        const weight = object.weight || 1
        const {height, width} = object
        const xScale = object.xScale || []
        const yScale = object.yScale || []
        const xAxisName = object.xAxisName || ""
        const yAxisName = object.yAxisName || ""
        const chartPoints = object.chartPoints || []
        const chartLines = object.chartLines || []
        const axisPointsDiameter = 2 * weight
        const chartPointsDiameter = 2 * weight

        return [
            new ArrowCanvasAnimation(
                {object: {startPoint: {x: 0, y: 0}, endPoint: {x: width, y: 0}, endType: "Arrow"}},
                geometryHelper
            ),
            new ArrowCanvasAnimation(
                {object: {startPoint: {x: 0, y: 0}, endPoint: {x: 0, y: -height}, endType: "Arrow"}},
                geometryHelper
            ),
            new TextCanvasAnimation({
                object: {
                    origin: {x: width / 2, y: 10},
                    value: xAxisName,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP
                }
            }),
            new TextCanvasAnimation({
                object: {
                    origin: {x: -5, y: -height / 2},
                    rotation: -Math.PI / 2,
                    value: yAxisName,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_BOTTOM
                }
            }),
            ...xScale.map(value => new CircleCanvasAnimation({
                object: {centerPoint: {x: this.getXForValue(value), y: 0}, diameter: axisPointsDiameter}
            })),
            ...yScale.map(value => new CircleCanvasAnimation({
                object: {centerPoint: {x: 0, y: this.getYForValue(value)}, diameter: axisPointsDiameter}
            })),
            ...chartPoints.map(point => new CircleCanvasAnimation({
                object: {centerPoint: this.convertScalePointToCoordinate(point), diameter: chartPointsDiameter}
            })),
            ...chartLines.map(line => new LineCanvasAnimation({
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
            x: scalePoint.x * object.width / xScaleMax,
            y: -scalePoint.y * object.height / yScaleMax
        }
    }

    getOrigin(): Point {
        return this.getObject().origin;
    }

}