import p5Types from 'p5'
import { rectangleParamsType } from './RectangleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import AnimationStyle, { getFillColor } from '../../../AnimationStyles'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'
import { calculateColorPercentValue, calculatePercentValue, convertPercentToFadeInFadeOut } from '../../../common/Utils'
import { weightToNumber } from '../../CanvasAnimationParams'

export default class RectangleCanvasAnimation extends CanvasAnimation<rectangleParamsType> {

    drawObject (p5: p5Types, object: rectangleParamsType, percent: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const {
            width,
            height,
            cornerRadius
        } = object
        const selectedPercent = convertPercentToFadeInFadeOut(selectionInfo.percent)
        const weight = calculatePercentValue(
            weightToNumber(style, object.weight),
            weightToNumber(style, object.weight) * 2,
            selectedPercent
        )
        p5.strokeWeight(weight)
        p5.fill(
            calculateColorPercentValue(
                getFillColor(style, object.fillColor),
                style.selectedColor,
                selectedPercent
            )
        )
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

}
