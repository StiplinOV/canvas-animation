import Params from "../Params";
import {Point} from "../../common/Point";

export default interface XYChartParams extends Params {
    origin: Point
    width: number
    height: number
    xScale?: number[]
    yScale?: number[]
    xAxisName?: string
    yAxisName?: string
    chartPoints?: Point[]
    chartLines?: [Point, Point][]
}
