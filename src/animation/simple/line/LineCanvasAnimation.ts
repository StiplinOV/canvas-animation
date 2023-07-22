import p5Types from 'p5'
import {LineParamsType} from './LineCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CanvasAnimation from '../../CanvasAnimation'

export default class LineCanvasAnimation extends CanvasAnimation<LineParamsType> {

    public drawObject(p5: p5Types, o: LineParamsType, style: AnimationStyle): void {
        const {origin, endPoint} = o
        const endX = endPoint.x - origin.x
        const endY = endPoint.y - origin.y
        p5.line(0, 0, endX, endY)
    }

}
