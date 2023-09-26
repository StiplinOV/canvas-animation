import {Point} from '../../../common/Point'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import LineCanvasAnimation from './LineCanvasAnimation'
import { ObjectParamsObject } from '../../ObjectParamsObject'
import {removeUndefinedKeys} from '../../../common/Utils'

export interface LineJsonParamsType extends JsonObjectParams {
    endPoint: Point
}

export interface LineAnimationParamsType extends AnimationObjectParams {
    endPoint: Point
}

export default class LineCanvasAnimationParams extends SimpleCanvasAnimationParams<LineJsonParamsType, LineAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: LineJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): LineAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject)
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<LineJsonParamsType>): Partial<LineAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<LineAnimationParamsType>): void {
        params.endPoint !== undefined && objectParamsObject.setPointParam('endPoint', params.endPoint)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): LineAnimationParamsType {
        return {
            ...initialDefaultParams,
            endPoint: objectParamsObject.getPointParam('endPoint')
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): LineCanvasAnimation {
        return new LineCanvasAnimation(this, animationStyle)
    }

    getZeroParams(obj: LineAnimationParamsType): Omit<LineAnimationParamsType, keyof JsonObjectParams> {
        return {
            endPoint: obj.origin
        }
    }

}
