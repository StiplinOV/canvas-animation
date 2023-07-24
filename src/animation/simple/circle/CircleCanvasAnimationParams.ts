import {calculatePercentValue} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CircleCanvasAnimation from './CircleCanvasAnimation'
import { ObjectParamsObject } from '../../ObjectParamsObject'

interface onlyCircleParamsType {
    diameter: number
}

export interface CircleJsonParamsType extends onlyCircleParamsType, JsonObjectParams {
}

export interface CircleAnimationParamsType extends onlyCircleParamsType, AnimationObjectParams {
}

export default class CircleCanvasAnimationParams extends SimpleCanvasAnimationParams<CircleJsonParamsType, CircleAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: CircleJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): CircleAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<CircleJsonParamsType>): Partial<CircleAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<CircleAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): CircleAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected getZeroParams (): Omit<CircleJsonParamsType, keyof JsonObjectParams> {
        return {
            diameter: 0
        }
    }

    mergeWithTransformation(obj: CircleJsonParamsType, trans: CircleJsonParamsType, perc: number): onlyCircleParamsType {
        return {
            diameter: trans.diameter ? calculatePercentValue(obj.diameter, trans.diameter, perc) : obj.diameter
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): CircleCanvasAnimation {
        return new CircleCanvasAnimation(this, animationStyle)
    }

}
