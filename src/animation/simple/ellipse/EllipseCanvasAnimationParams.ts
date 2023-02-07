import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import EllipseCanvasAnimation from './EllipseCanvasAnimation'
import CanvasAnimation from '../../CanvasAnimation'

interface onlyEllipseParamsType {
    width: number
    height: number
}

export interface ellipseParamsType extends onlyEllipseParamsType, ObjectParams {
}

export default class EllipseCanvasAnimationParams extends SimpleCanvasAnimationParams<ellipseParamsType> {

    mergeWithTransformation(obj: ellipseParamsType, trans: ellipseParamsType, perc: number): onlyEllipseParamsType {
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height
        }
    }

    toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation {
        return new EllipseCanvasAnimation(this, animationStyle)
    }

}
