import p5Types from 'p5'
import { calculatePercentValue } from '../../../common/Utils'
import AnimationStyle from '../../../AnimationStyles'
import { circleParamsType } from './CircleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class CircleCanvasAnimation extends CanvasAnimation<circleParamsType> {

    public drawObject (p5: p5Types, object: circleParamsType, percent: number, selectedPercent: number, style: AnimationStyle): void {
        const diameter = calculatePercentValue(object.diameter, object.diameter * 2, selectedPercent)

        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

}
