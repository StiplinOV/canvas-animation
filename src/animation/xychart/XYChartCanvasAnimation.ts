import {paramsType} from "../CanvasAnimation";
import XYChartParams from "./XYChartParams";
import LineCanvasAnimation from "../line/LineCanvasAnimation";
import CircleCanvasAnimation from "../circle/CircleCanvasAnimation";
import {Point} from "../../common/Point";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";

export default class XYChartCanvasAnimation extends ComplexCanvasAnimation<XYChartParams> {

    constructor(params: paramsType<XYChartParams>) {
        super(params)
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

        this.addCanvasAnimation(new LineCanvasAnimation({
            appearType: "fromStartToEnd",
            disappearType: "fromStartToEnd",
            object: {startPoint: origin, endPoint: {x: origin.x + width, y: origin.y}}
        }))
        this.addCanvasAnimation(new LineCanvasAnimation({
            appearType: "fromStartToEnd",
            disappearType: "fromStartToEnd",
            object: {startPoint: origin, endPoint: {x: origin.x, y: origin.y - height}}
        }))
        xScale.forEach(value => {
            this.addCanvasAnimation(new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: {x: this.getXForValue(value), y: origin.y}, diameter: axisPointsDiameter}
            }))
        })
        yScale.forEach(value => {
            this.addCanvasAnimation(new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: {x: origin.x, y: this.getYForValue(value)}, diameter: axisPointsDiameter}
            }))
        })
        chartPoints.forEach(point => {
            this.addCanvasAnimation(new CircleCanvasAnimation({
                appearType: "clock",
                disappearType: "clock",
                object: {centerPoint: this.convertScalePointToCoordinate(point), diameter: chartPointsDiameter}
            }))
        })
        chartLines.forEach(line => {
            this.addCanvasAnimation(new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: this.convertScalePointToCoordinate(line[0]),
                    endPoint: this.convertScalePointToCoordinate(line[1])
                }
            }))
        })

        const objectAppearDuration = this.getAppearDuration() / this.getNumberOfAllCanvasAnimations()
        const objectDisappearDuration = this.getDisappearDuration() / this.getNumberOfAllCanvasAnimations()
        let appearTime = this.getAppearTime()
        let disappearTime = this.getDisappearTime()

        this.getAllCanvasAnimations().forEach(object => {
            object.setAppearTime(appearTime)
            object.setDisappearTime(disappearTime)
            object.setAppearDuration(objectAppearDuration)
            object.setDisappearDuration(objectDisappearDuration)
            appearTime += objectAppearDuration
            disappearTime += objectDisappearDuration
            console.log(appearTime, disappearTime, objectAppearDuration, objectDisappearDuration)
        })
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