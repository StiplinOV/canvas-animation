import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import EllipseCanvasAnimation from './EllipseCanvasAnimation'
import {AnimationObjectParams} from "../../../object/AnimationParams";

interface OnlyEllipseParamsType {
    width: number
    height: number
}

export interface EllipseParamsType extends OnlyEllipseParamsType, AnimationObjectParams {
}

export default class EllipseCanvasAnimationParams extends SimpleCanvasAnimationParams<EllipseParamsType> {

    protected getZeroParams(): Omit<EllipseParamsType, keyof ObjectParams> {
        return {
            width: 0,
            height: 0
        }
    }

    mergeWithTransformation(obj: EllipseParamsType, trans: EllipseParamsType, perc: number): OnlyEllipseParamsType {
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): EllipseCanvasAnimation {
        return new EllipseCanvasAnimation(this, animationStyle)
    }

}
