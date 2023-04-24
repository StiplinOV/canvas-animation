import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import RectangleCanvasAnimation from './RectangleCanvasAnimation'

interface onlyRectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}

export interface rectangleParamsType extends onlyRectangleParamsType, ObjectParams {
}

export default class RectangleCanvasAnimationParams extends SimpleCanvasAnimationParams<rectangleParamsType> {

    mergeWithTransformation(obj: rectangleParamsType, trans: Partial<rectangleParamsType>, perc: number, style: AnimationStyle): onlyRectangleParamsType {
        let cornerRadius = obj.cornerRadius ?? style.cornerRadius
        if (trans.cornerRadius !== undefined) {
            cornerRadius = calculatePercentValue(cornerRadius, trans.cornerRadius, perc)
        }
        return {
            width: trans.width === undefined ? obj.width : calculatePercentValue(obj.width, trans.width, perc),
            height: trans.height === undefined ? obj.height : calculatePercentValue(obj.height, trans.height, perc),
            cornerRadius
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): RectangleCanvasAnimation {
        return new RectangleCanvasAnimation(this, animationStyle)
    }

}
