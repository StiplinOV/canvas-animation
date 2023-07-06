import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import { EllipseParamsType } from './EllipseCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class EllipseCanvasAnimation extends CanvasAnimation<EllipseParamsType> {

    public drawObject (p5: p5Types, object: EllipseParamsType, style: AnimationStyle): void {
        p5.ellipse(0, 0, object.width, object.height)
    }

}
