import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import p5Types from 'p5'
import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import SimpleCanvasAnimationParams from "../SimpleCanvasAnimationParams";
import RectangleCanvasAnimation from "./RectangleCanvasAnimation";
import CanvasAnimation from "../../CanvasAnimation";

interface onlyRectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}
export interface rectangleParamsType extends onlyRectangleParamsType, ObjectParams {}

export default class RectangleCanvasAnimationParams extends SimpleCanvasAnimationParams<rectangleParamsType> {

    mergeWithTransformation(obj: rectangleParamsType, trans: Partial<rectangleParamsType>, perc: number, style: AnimationStyle): onlyRectangleParamsType {
        let cornerRadius = obj.cornerRadius ?? style.cornerRadius
        if (trans.cornerRadius) {
            cornerRadius = calculatePercentValue(cornerRadius, trans.cornerRadius, perc)
        }
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height,
            cornerRadius
        }
    }

    toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation {
        return new RectangleCanvasAnimation(this, animationStyle);
    }

}
