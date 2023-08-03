import p5Types from 'p5'
import {ImageAnimationParamsType} from './ImageCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CanvasAnimation from '../../CanvasAnimation'

export default class ImageCanvasAnimation extends CanvasAnimation<ImageAnimationParamsType> {

    public drawObject(p5: p5Types, o: ImageAnimationParamsType, style: AnimationStyle): void {
        o.image && p5.image(o.image, o.origin.x, o.origin.y)
    }

}
