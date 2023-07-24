import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {CircleAnimationParamsType} from './CircleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class CircleCanvasAnimation extends CanvasAnimation<CircleAnimationParamsType> {

    public drawObject (p5: p5Types, object: CircleAnimationParamsType, style: AnimationStyle): void {
        p5.arc(0, 0, object.diameter, object.diameter, 0, p5.PI * 2)
    }

}
