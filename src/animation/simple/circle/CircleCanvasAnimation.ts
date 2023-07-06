import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import { CircleParamsType } from './CircleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class CircleCanvasAnimation extends CanvasAnimation<CircleParamsType> {

    public drawObject (p5: p5Types, object: CircleParamsType, style: AnimationStyle): void {
        p5.arc(0, 0, object.diameter, object.diameter, 0, p5.PI * 2)
    }

}
