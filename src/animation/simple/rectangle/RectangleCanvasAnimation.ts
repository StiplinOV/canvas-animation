import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import p5Types from 'p5'
import {calculatePercentValue} from '../../../common/Utils'
import {objectParamsType} from '../../CanvasAnimation'

interface rectangleParamsType {
    width: number
    height: number
    cornerRadius?: number
}

export default class RectangleCanvasAnimation extends SimpleCanvasAnimation<rectangleParamsType> {

    drawObject(p5: p5Types, object: objectParamsType<rectangleParamsType>, percent: number): void {
        const {width, height, cornerRadius} = object
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

    mergeWithTransformation(obj: rectangleParamsType, trans: Partial<rectangleParamsType>, perc: number): rectangleParamsType {
        let cornerRadius = obj.cornerRadius ?? 0
        if (trans.cornerRadius) {
            cornerRadius = calculatePercentValue(cornerRadius, trans.cornerRadius, perc)
        }
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height,
            cornerRadius
        }
    }

}
