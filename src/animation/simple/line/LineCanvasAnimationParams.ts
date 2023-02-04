import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {ObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import LineCanvasAnimation from './LineCanvasAnimation'
import CanvasAnimation from '../../CanvasAnimation'

export interface onlyLineParamsType {
    endPoint: Point
    bold?: 'normal' | 'bold'
}

export interface lineParamsType extends ObjectParams, onlyLineParamsType {
}

export default class LineCanvasAnimationParams extends SimpleCanvasAnimationParams<lineParamsType> {

    mergeWithTransformation(obj: lineParamsType, trans: Partial<lineParamsType>, perc: number): onlyLineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint,
            bold: trans.bold && perc >= 0.5 ? trans.bold : obj.bold
        }
    }

    toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation {
        return new LineCanvasAnimation(this, animationStyle)
    }

}
