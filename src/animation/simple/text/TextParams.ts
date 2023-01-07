import Params from "../../Params";
import {Point} from "../../../common/Point";
import { HORIZ_ALIGN, VERT_ALIGN } from "p5";

export default interface TextParams extends Params {
    position: Point
    value: string
    fontSize?: number
    boxWidth?: number,
    boxHeight?: number,
    horizontalAlign?: HORIZ_ALIGN,
    verticalAlign?: VERT_ALIGN
}
