import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CircleCanvasAnimation from './CircleCanvasAnimation'
import {AnimationObjectParams} from "../../../object/AnimationParams";

interface OnlyCircleParamsType {
    diameter: number
}

export interface CircleParamsType extends OnlyCircleParamsType, AnimationObjectParams {
}

export default class CircleCanvasAnimationParams extends SimpleCanvasAnimationParams<CircleParamsType> {

    protected getZeroParams (): Omit<CircleParamsType, keyof ObjectParams> {
        return {
            diameter: 0
        }
    }

    mergeWithTransformation(obj: CircleParamsType, trans: CircleParamsType, perc: number): OnlyCircleParamsType {
        return {
            diameter: trans.diameter ? calculatePercentValue(obj.diameter, trans.diameter, perc) : obj.diameter
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): CircleCanvasAnimation {
        return new CircleCanvasAnimation(this, animationStyle)
    }

}
