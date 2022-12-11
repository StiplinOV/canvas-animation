import Params from "../Params";
import {Point} from "../../common/Point";

export default interface CircleParams extends Params {
    centerPoint: Point
    diameter: number
}
