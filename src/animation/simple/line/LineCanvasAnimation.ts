import p5Types from 'p5'
import {lineParamsType} from './LineCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CanvasAnimation from '../../CanvasAnimation'

export default class LineCanvasAnimation extends CanvasAnimation<lineParamsType> {

    public drawObject(p5: p5Types, o: lineParamsType, perc: number, selectedPerc: number, style: AnimationStyle): void {
        const {origin, endPoint} = o
        const endX = (endPoint.x - origin.x) * perc
        const endY = (endPoint.y - origin.y) * perc
        p5.line(0, 0, endX, endY)
    }

}
