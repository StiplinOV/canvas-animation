import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CircleCanvasAnimation from './CircleCanvasAnimation'
import {ObjectParamsObject} from '../../ObjectParamsObject'
import {removeUndefinedKeys} from '../../../common/Utils'

export interface CircleJsonParamsType extends JsonObjectParams {
    diameter: number
}

export interface CircleAnimationParamsType extends AnimationObjectParams {
    diameter: number
}

export default class CircleCanvasAnimationParams extends SimpleCanvasAnimationParams<CircleJsonParamsType, CircleAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: CircleJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): CircleAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject)
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<CircleJsonParamsType>): Partial<CircleAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<CircleAnimationParamsType>): void {
        params.diameter !== undefined && objectParamsObject.setNumberParam('diameter', params.diameter)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): CircleAnimationParamsType {
        return {
            ...initialDefaultParams,
            diameter: objectParamsObject.getNumberParam('diameter')
        }
    }

    protected getZeroParams(): Omit<CircleJsonParamsType, keyof JsonObjectParams> {
        return {
            diameter: 0
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): CircleCanvasAnimation {
        return new CircleCanvasAnimation(this, animationStyle)
    }

}
