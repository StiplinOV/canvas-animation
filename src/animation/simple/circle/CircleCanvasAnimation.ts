import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePercentValue, convertPercentToFadeInFadeOut} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimation'

interface onlyCircleParamsType { diameter: number }
interface circleParamsType extends onlyCircleParamsType, ObjectParams {}

export default class CircleCanvasAnimation extends SimpleCanvasAnimation<circleParamsType> {

    public drawObject(p5: p5Types, object: circleParamsType, percent: number, selectedPercentParam: number): void {
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPercentParam)
        const diameter = calculatePercentValue(object.diameter, object.diameter * 2, selectedPercent)
        const weight = calculatePercentValue(object.weight ?? 1, (object.weight ?? 1) * 2, selectedPercent)
        const g = calculatePercentValue(255, 0, selectedPercent)
        const b = calculatePercentValue(255, 0, selectedPercent)
        p5.strokeWeight(weight)
        p5.fill(p5.color(255, g, b))
        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

    mergeWithTransformation(obj: circleParamsType, trans: circleParamsType, perc: number): onlyCircleParamsType {
        return {
            diameter: trans.diameter ? calculatePercentValue(obj.diameter, trans.diameter, perc) : obj.diameter
        }
    }

}
