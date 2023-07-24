import p5Types from 'p5'
import {RectangleAnimationParamsType} from './RectangleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import AnimationStyle, {getFillColor} from '../../../AnimationStyles'
import {weightToNumber} from '../../CanvasAnimationParams'

export default class RectangleCanvasAnimation extends CanvasAnimation<RectangleAnimationParamsType> {

    drawObject(p5: p5Types, object: RectangleAnimationParamsType, style: AnimationStyle): void {
        const {
            width,
            height,
            cornerRadius
        } = object
        const weight = weightToNumber(style, object.weight)
        p5.strokeWeight(weight)
        p5.fill(getFillColor(style, object.fillColor))
        p5.rect(0, 0, width, height, cornerRadius)
    }

}
