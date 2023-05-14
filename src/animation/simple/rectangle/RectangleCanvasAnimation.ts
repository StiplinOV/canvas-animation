import p5Types from 'p5'
import { rectangleParamsType } from './RectangleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import AnimationStyle from '../../../AnimationStyles'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class RectangleCanvasAnimation extends CanvasAnimation<rectangleParamsType> {

    drawObject (p5: p5Types, object: rectangleParamsType, percent: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const {
            width,
            height,
            cornerRadius
        } = object
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

}
