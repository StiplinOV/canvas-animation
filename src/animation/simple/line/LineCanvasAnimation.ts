import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {ObjectParams} from '../../CanvasAnimationParams'
import LineCanvasAnimationParams from "./LineCanvasAnimationParams";

export interface onlyLineParamsType {
    endPoint: Point
}

interface lineParamsType extends ObjectParams, onlyLineParamsType {
}

export default class LineCanvasAnimation extends SimpleCanvasAnimation<lineParamsType, LineCanvasAnimationParams> {

    public drawObject(p5: p5Types, object: lineParamsType, percent: number, selectedPercent: number): void {
        const {origin, endPoint} = object
        const endX = (endPoint.x - origin.x) * percent
        const endY = (endPoint.y - origin.y) * percent
        p5.line(0, 0, endX, endY)
    }

}
