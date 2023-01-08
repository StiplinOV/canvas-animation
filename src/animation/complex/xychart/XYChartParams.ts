import Params from "../../Params";
import {Point} from "../../../common/Point";

export type scaleType = { position: number, value: string }
export const toScaleType = (value: scaleType | number): scaleType =>
    typeof value === "number" ? {position: value, value: String(value)} : value

export default interface XYChartParams extends Params {
    origin: Point
    width: number
    height: number
    xScale?: (scaleType | number)[]
    yScale?: (scaleType | number)[]
    xAxisName?: string
    yAxisName?: string
    chartPoints?: Point[]
    chartLines?: [Point, Point][]
}
