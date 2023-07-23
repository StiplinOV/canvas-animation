import {addPoints, calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import RectangleCanvasAnimation from './RectangleCanvasAnimation'
import {Point} from '../../../common/Point'
import {AnimationObjectParams} from "../../../object/AnimationParams";

interface OnlyRectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}

export interface RectangleParamsType extends OnlyRectangleParamsType, AnimationObjectParams {
}

export default class RectangleCanvasAnimationParams extends SimpleCanvasAnimationParams<RectangleParamsType> {

    mergeWithTransformation(obj: RectangleParamsType, trans: Partial<RectangleParamsType>, perc: number, style: AnimationStyle): OnlyRectangleParamsType {
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

    getZeroParams(): Omit<RectangleParamsType, keyof ObjectParams> {
        return {
            width: 0,
            height: 0
        }
    }

    protected getZeroObjectOrigin(): Point {
        return addPoints(this.getObject().origin, {
            x: this.getObject().width / 2,
            y: this.getObject().height / 2
        })
    }

}
