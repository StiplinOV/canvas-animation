import Params from "../../Params";
import {Point} from "../../../common/Point";

export type scaleType = { position: number, value: string }
export type chartPointType = { point: Point, text: string }

export const toScaleType = (value: scaleType | number): scaleType =>
    typeof value === "number" ? {position: value, value: String(value)} : value
export const toChartPointType = (value: chartPointType | Point): chartPointType =>
    "point" in value ? value : {point: value, text: ""}

export default interface XYChartParams extends Params {
    width: number
    height: number
    xScale?: (scaleType | number)[]
    yScale?: (scaleType | number)[]
    xAxisName?: string
    yAxisName?: string
    chartPoints?: (chartPointType | Point)[]
    chartLines?: [Point, Point][]
}
