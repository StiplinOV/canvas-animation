import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {lineParamsType} from './LineCanvasAnimationParams'

export default class LineCanvasAnimation extends SimpleCanvasAnimation<lineParamsType> {

    public drawObject(p5: p5Types, object: lineParamsType, percent: number, selectedPercent: number): void {
        const {origin, endPoint} = object
        const endX = (endPoint.x - origin.x) * percent
        const endY = (endPoint.y - origin.y) * percent
        p5.line(0, 0, endX, endY)
    }

}
