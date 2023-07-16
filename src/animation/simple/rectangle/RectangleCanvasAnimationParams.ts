import {addPoints, calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import RectangleCanvasAnimation from './RectangleCanvasAnimation'
import {Point} from "../../../common/Point";

interface onlyRectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}

export interface RectangleParamsType extends onlyRectangleParamsType, ObjectParams {
}

export default class RectangleCanvasAnimationParams extends SimpleCanvasAnimationParams<RectangleParamsType> {

    mergeWithTransformation(obj: RectangleParamsType, trans: Partial<RectangleParamsType>, perc: number, style: AnimationStyle): onlyRectangleParamsType {
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

    getZeroParams (): Omit<RectangleParamsType, keyof ObjectParams> {
        return {
            width: this.getObject().width,
            height: this.getObject().height,
        }
    }

}
