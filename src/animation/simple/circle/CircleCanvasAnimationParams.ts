import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CircleCanvasAnimation from './CircleCanvasAnimation'

interface onlyCircleParamsType {
    diameter: number
}

export interface circleParamsType extends onlyCircleParamsType, ObjectParams {
}

export default class CircleCanvasAnimationParams extends SimpleCanvasAnimationParams<circleParamsType> {

    mergeWithTransformation(obj: circleParamsType, trans: circleParamsType, perc: number): onlyCircleParamsType {
        return {
            diameter: trans.diameter ? calculatePercentValue(obj.diameter, trans.diameter, perc) : obj.diameter
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): CircleCanvasAnimation {
        return new CircleCanvasAnimation(this, animationStyle)
    }

}
