import {ObjectParams} from "../animation/CanvasAnimationParams";
import {PresenceParamType, RotationType} from "../common/Utils";
import {LayoutType, TransformationParam, WeightType} from "./JsonParams";
import {ColorType} from "../AnimationStyles";
import {Point} from "../common/Point";

export interface AnimationObjectParams {
    weight: WeightType | null
    zIndex: number
    dashed: number[] | null
    strokeColor: ColorType | null
    fillColor: ColorType | null
    origin: Point
    rotations: RotationType[] | null
}

export type Transformation<T extends AnimationObjectParams, U> = {
    object: Partial<T>
    presence: PresenceParamType
    options?: U
}

export type AnimationParams<T extends AnimationObjectParams, U = unknown> = {
    transformations: Transformation<T, U>[]
    object: T
    presenceParam: PresenceParamType[]
    layout: LayoutType
    zeroObject: T
}