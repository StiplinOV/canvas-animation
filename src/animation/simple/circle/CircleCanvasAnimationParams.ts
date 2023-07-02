import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CircleCanvasAnimation from './CircleCanvasAnimation'

interface onlyCircleParamsType {
    diameter: number
}

export interface CircleParamsType extends onlyCircleParamsType, ObjectParams {
}

export default class CircleCanvasAnimationParams extends SimpleCanvasAnimationParams<CircleParamsType> {

    mergeWithTransformation(obj: CircleParamsType, trans: CircleParamsType, perc: number): onlyCircleParamsType {
        return {
            diameter: trans.diameter ? calculatePercentValue(obj.diameter, trans.diameter, perc) : obj.diameter
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): CircleCanvasAnimation {
        return new CircleCanvasAnimation(this, animationStyle)
    }

}
