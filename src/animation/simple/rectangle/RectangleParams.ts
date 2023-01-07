import Params from "../../Params";
import {Point} from "../../../common/Point";

export default interface RectangleParams extends Params {
    origin: Point
    width: number
    height: number
    cornerRadius?: number
}