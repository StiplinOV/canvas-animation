import {ObjectParamsConverter} from "../../../object/ObjectParamsConverter";
import {AnimationObjectParams} from "../../../object/AnimationParams";
import {ElementStyle, ElementType} from "./ArrayElement";
import {JsonObjectParams, SelectionType} from "../../../object/JsonParams";
import { ObjectParams } from "../../CanvasAnimationParams";
import {MatrixSelectorType} from "./MatrixCanvasAnimationParams";
import {TransformOptions} from "../ComplexCanvasAnimationParams";

export interface MatrixAnimationsObjectParamsType extends AnimationObjectParams {
    values: (ElementType | string | boolean | number)[][]
    height: number
    width?: number
    title?: string
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
}

export interface MatrixJsonObjectParamsType extends JsonObjectParams {
    values: (ElementType | string | boolean | number)[][]
    height: number
    width?: number
    title?: string
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
}


export class MatrixObjectParamsConverter extends ObjectParamsConverter<MatrixJsonObjectParamsType, MatrixAnimationsObjectParamsType, TransformOptions, SelectionType<MatrixSelectorType>> {

    protected convertJsonObjectParamsToAnimationObjectParams(animationObjectParams: AnimationObjectParams, jsonObjectParams: MatrixJsonObjectParamsType): MatrixAnimationsObjectParamsType {
        return {
            ...animationObjectParams,
            ...jsonObjectParams,
        };
    }

    protected convertJsonTransformObjectParamsToAnimationTransformObjectParams(jsonObjectParams: Partial<MatrixJsonObjectParamsType>): Partial<MatrixAnimationsObjectParamsType> {
        return {
            ...jsonObjectParams
        };
    }

    protected convertSelectionToTransformationObject(selection: SelectionType<MatrixSelectorType>): Partial<MatrixAnimationsObjectParamsType> {
        return {}
    }

    protected getZeroParams(): Omit<MatrixJsonObjectParamsType, keyof ObjectParams> {
        return {
            values: [],
            height: 0
        }
    }

}