import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {BezierAnimationParamsType} from './BezierCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class BezierCanvasAnimation extends CanvasAnimation<BezierAnimationParamsType> {

    public drawObject (p5: p5Types, object: BezierAnimationParamsType, style: AnimationStyle): void {
        const points = object.originRelativePoints

        p5.noFill()
        p5.bezier(
            points[0].x,
            points[0].y,
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
            points[3].x,
            points[3].y
        )
    }

}
