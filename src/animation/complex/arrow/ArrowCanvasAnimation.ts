import ComplexCanvasAnimation from '../ComplexCanvasAnimation'
import LineCanvasAnimation, {lineParamsType} from '../../simple/line/LineCanvasAnimation'
import p5Types from 'p5'
import {calculatePointPercentValue, getVectorAngle, rotateVector, subtractPoints} from '../../../common/Utils'
import CanvasAnimation, {objectParamsType} from '../../CanvasAnimation'
import {ZeroPoint} from '../../../common/Point'

const arrowBaseLength = 10
const arrowBaseWidth = 10

export type arrowParamsType = lineParamsType & {
    startType?: 'Arrow' | 'None'
    endType?: 'Arrow' | 'None'
}

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<arrowParamsType, {}> {

    public getIncludedAnimationsByParameters(object: objectParamsType<arrowParamsType>): Map<string, CanvasAnimation<{}>> {
        const result = new Map<string, CanvasAnimation<{}>>()
        const relativeEndPoint = subtractPoints(object.endPoint, object.origin)

        result.set('shaft', new LineCanvasAnimation({
            object: {
                origin: ZeroPoint,
                endPoint: relativeEndPoint,
                weight: object.weight,
                zIndex: object.zIndex
            }
        }))
        const angle = getVectorAngle(this.p5, relativeEndPoint)
        const leftArrowSide = rotateVector(this.p5, {x: arrowBaseLength, y: arrowBaseWidth / 2}, angle)
        const rightArrowSide = rotateVector(this.p5, {x: arrowBaseLength, y: -arrowBaseWidth / 2}, angle)
        if (object.endType === 'Arrow') {
            result.set('left half arrowhead', new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            result.set('right half arrowhead', new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, rightArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
        }
        if (object.startType === 'Arrow') {
            result.set('left half arrow tail', new LineCanvasAnimation({
                object: {
                    origin: ZeroPoint,
                    endPoint: leftArrowSide,
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            result.set('right half arrow tail', new LineCanvasAnimation({
                object: {
                    origin: ZeroPoint,
                    endPoint: rightArrowSide,
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
        }

        return result
    }

    mergeWithTransformation(obj: objectParamsType<arrowParamsType>, trans: Partial<arrowParamsType>, perc: number, p5: p5Types): arrowParamsType {
        const {endPoint, startType, endType} = obj
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(endPoint, trans.endPoint, perc) : endPoint,
            startType: trans.startType ? (perc >= 0.5 ? trans.startType : startType) : startType,
            endType: trans.endType ? (perc >= 0.5 ? trans.endType : endType) : endType
        }
    }

}
