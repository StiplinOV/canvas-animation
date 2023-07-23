import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import LineCanvasAnimation from './LineCanvasAnimation'
import {AnimationObjectParams} from "../../../object/AnimationParams";

export interface OnlyLineParamsType {
    endPoint: Point
}

export interface LineParamsType extends AnimationObjectParams, OnlyLineParamsType {
}

export default class LineCanvasAnimationParams extends SimpleCanvasAnimationParams<LineParamsType> {

    mergeWithTransformation(obj: LineParamsType, trans: Partial<LineParamsType>, perc: number): OnlyLineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): LineCanvasAnimation {
        return new LineCanvasAnimation(this, animationStyle)
    }

    getZeroParams(): Omit<LineParamsType, keyof ObjectParams> {
        return {
            endPoint: this.getObject().origin
        }
    }

}
