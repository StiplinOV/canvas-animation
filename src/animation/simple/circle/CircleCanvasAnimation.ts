import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculateColorPercentValue, calculatePercentValue, convertPercentToFadeInFadeOut} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import CircleCanvasAnimationParams from "./CircleCanvasAnimationParams";
import AnimationStyle from "../../../AnimationStyles";

interface onlyCircleParamsType { diameter: number }
interface circleParamsType extends onlyCircleParamsType, ObjectParams {}

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<circleParamsType, CircleCanvasAnimationParams> {

    public drawObject(p5: p5Types, object: circleParamsType, percent: number, selectedPercentParam: number, style: AnimationStyle): void {
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPercentParam)
        const diameter = calculatePercentValue(object.diameter, object.diameter * 2, selectedPercent)
        p5.fill(calculateColorPercentValue(style.fillColor, style.selectedColor, selectedPercent))
        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

}
