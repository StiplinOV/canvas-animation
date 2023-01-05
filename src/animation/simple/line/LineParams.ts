import Params from "../../Params";
import {Point} from "../../../common/Point";

export default interface LineParams  extends Params {
    startPoint: Point
    endPoint: Point
}
