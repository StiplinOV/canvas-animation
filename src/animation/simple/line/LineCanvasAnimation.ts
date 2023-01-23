import p5Types from 'p5'
import SimpleCanvasAnimation from '../SimpleCanvasAnimation'
import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {objectParamsType} from '../../CanvasAnimation'

export type lineParamsType = { endPoint: Point }

export default class LineCanvasAnimation extends SimpleCanvasAnimation<lineParamsType> {

    public drawObject(
        p5: p5Types,
        object: objectParamsType<lineParamsType>,
        percent: number,
        selectedPercent: number
    ): void {
        const {origin, endPoint} = object
        const endX = (endPoint.x - origin.x) * percent
        const endY = (endPoint.y - origin.y) * percent
        p5.line(0, 0, endX, endY)
    }

    mergeWithTransformation(obj: objectParamsType<lineParamsType>, trans: Partial<lineParamsType>, perc: number): lineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint
        }
    }

}
