import Params from "../../Params";

export default interface ArrayParams extends Params {
    value: string[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
    firstIndex?: number
}
