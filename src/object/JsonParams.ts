import {PresenceParamType, RotationType} from "../common/Utils";
import {ColorType} from "../AnimationStyles";
import {Point} from "../common/Point";

export type WeightType = number | 'normal' | 'bold'

export interface JsonObjectParams {
    weight?: WeightType
    zIndex?: number
    dashed?: number[]
    strokeColor?: ColorType
    fillColor?: ColorType
    origin: Point
    rotations?: RotationType[]
}

export interface SelectionType<T = unknown> {
    time: number
    duration: number
    type?: T
    //selectionAlgorithm?: SelectionAlgorithm
}

export type LayoutType = 'absolute' | 'fixed'

export type TransformationParam<T, U> = {
    object: Partial<T>
    appearTime?: number
    appearDuration?: number
    disappearTime?: number
    disappearDuration?: number
    options?: U
}

export type JsonParams<T extends JsonObjectParams, U = unknown, V extends SelectionType = SelectionType> = {
    transformations?: TransformationParam<T, U>[]
    selections?: V[]
    object: T
    presenceParameters?: Partial<PresenceParamType>[]
    layout?: LayoutType
}