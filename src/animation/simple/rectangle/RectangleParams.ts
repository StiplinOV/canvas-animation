import Params from "../../Params";
import {Point} from "../../../common/Point";

export default interface RectangleParams extends Params {
    width: number
    height: number
    cornerRadius?: number
}