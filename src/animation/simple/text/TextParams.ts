import Params from "../../Params";
import {Point} from "../../../common/Point";

export default interface TextParams extends Params {
    position: Point
    value: string
    fontSize?: number
    boxWidth?: number,
    boxHeight?: number
}
