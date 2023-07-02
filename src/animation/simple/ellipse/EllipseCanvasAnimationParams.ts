import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import EllipseCanvasAnimation from './EllipseCanvasAnimation'

interface onlyEllipseParamsType {
    width: number
    height: number
}

export interface EllipseParamsType extends onlyEllipseParamsType, ObjectParams {
}

export default class EllipseCanvasAnimationParams extends SimpleCanvasAnimationParams<EllipseParamsType> {

    mergeWithTransformation(obj: EllipseParamsType, trans: EllipseParamsType, perc: number): onlyEllipseParamsType {
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): EllipseCanvasAnimation {
        return new EllipseCanvasAnimation(this, animationStyle)
    }

}
