import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import LineCanvasAnimation from './LineCanvasAnimation'

export interface onlyLineParamsType {
    endPoint: Point
}

export interface lineParamsType extends ObjectParams, onlyLineParamsType {
}

export default class LineCanvasAnimationParams extends SimpleCanvasAnimationParams<lineParamsType> {

    mergeWithTransformation(obj: lineParamsType, trans: Partial<lineParamsType>, perc: number): onlyLineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): LineCanvasAnimation {
        return new LineCanvasAnimation(this, animationStyle)
    }

}
