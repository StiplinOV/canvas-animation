import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {EllipseAnimationParamsType} from './EllipseCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class EllipseCanvasAnimation extends CanvasAnimation<EllipseAnimationParamsType> {

    public drawObject (p5: p5Types, object: EllipseAnimationParamsType, style: AnimationStyle): void {
        p5.ellipse(0, 0, object.width, object.height)
    }

}
