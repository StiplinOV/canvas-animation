import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {lineParamsType} from './LineCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'

export default class LineCanvasAnimation extends SimpleCanvasAnimation<lineParamsType> {

    public drawObject(p5: p5Types, o: lineParamsType, perc: number, selectedPerc: number, style: AnimationStyle): void {
        const {origin, endPoint} = o
        const endX = (endPoint.x - origin.x) * perc
        const endY = (endPoint.y - origin.y) * perc
        o.bold && p5.strokeWeight(o.bold === 'normal' ? style.strokeWeight : style.strokeBoldWeight)
        p5.line(0, 0, endX, endY)
    }

}
