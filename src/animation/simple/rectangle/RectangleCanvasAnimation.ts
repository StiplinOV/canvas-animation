import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import p5Types from 'p5'
import {rectangleParamsType} from "./RectangleCanvasAnimationParams";

export default class RectangleCanvasAnimation extends SimpleCanvasAnimation<rectangleParamsType> {

    drawObject(p5: p5Types, object: rectangleParamsType, percent: number): void {
        const {width, height, cornerRadius} = object
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

}
