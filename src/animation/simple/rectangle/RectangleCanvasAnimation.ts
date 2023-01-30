import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import p5Types from 'p5'
import {calculatePercentValue} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import RectangleCanvasAnimationParams from "./RectangleCanvasAnimationParams";

interface onlyRectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}
interface rectangleParamsType extends onlyRectangleParamsType, ObjectParams {}

export default class RectangleCanvasAnimation extends SimpleCanvasAnimation<rectangleParamsType, RectangleCanvasAnimationParams> {

    drawObject(p5: p5Types, object: rectangleParamsType, percent: number): void {
        const {width, height, cornerRadius} = object
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

}
