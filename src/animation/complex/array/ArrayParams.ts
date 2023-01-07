import Params from "../../Params";
import {Point} from "../../../common/Point";

export default interface ArrayParams extends Params {
    origin: Point
    value: string[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
}
