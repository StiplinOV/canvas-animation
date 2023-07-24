import p5Types from 'p5'
import {LineAnimationParamsType} from './LineCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CanvasAnimation from '../../CanvasAnimation'

export default class LineCanvasAnimation extends CanvasAnimation<LineAnimationParamsType> {

    public drawObject(p5: p5Types, o: LineAnimationParamsType, style: AnimationStyle): void {
        const {origin, endPoint} = o
        const endX = endPoint.x - origin.x
        const endY = endPoint.y - origin.y
        p5.line(0, 0, endX, endY)
    }

}
