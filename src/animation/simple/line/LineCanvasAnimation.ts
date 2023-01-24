import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {ObjectParams} from '../../CanvasAnimation'

export interface onlyLineParamsType {
    endPoint: Point
}

interface lineParamsType extends ObjectParams, onlyLineParamsType {
}

export default class LineCanvasAnimation extends SimpleCanvasAnimation<lineParamsType> {

    public drawObject(p5: p5Types, object: lineParamsType, percent: number, selectedPercent: number): void {
        const {origin, endPoint} = object
        const endX = (endPoint.x - origin.x) * percent
        const endY = (endPoint.y - origin.y) * percent
        p5.line(0, 0, endX, endY)
    }

    mergeWithTransformation(obj: lineParamsType, trans: Partial<lineParamsType>, perc: number): onlyLineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint
        }
    }

}
