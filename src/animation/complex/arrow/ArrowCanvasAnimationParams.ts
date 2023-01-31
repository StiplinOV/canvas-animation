import {calculatePointPercentValue, getVectorAngle, rotateVector, subtractPoints} from '../../../common/Utils'
import CanvasAnimationParams, {ObjectParams} from '../../CanvasAnimationParams'
import {ZeroPoint} from '../../../common/Point'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams, {onlyLineParamsType} from '../../simple/line/LineCanvasAnimationParams'

const arrowBaseLength = 10
const arrowBaseWidth = 10

export interface onlyArrowParamsType extends onlyLineParamsType {
    startType?: 'Arrow' | 'None'
    endType?: 'Arrow' | 'None'
}

interface arrowParamsType extends onlyArrowParamsType, ObjectParams {
}

export default class ArrowCanvasAnimationParams extends ComplexCanvasAnimationParams<arrowParamsType> {

    public getIncludedAnimationsByParameters(object: arrowParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const relativeEndPoint = subtractPoints(object.endPoint, object.origin)

        result.set('shaft', new LineCanvasAnimationParams({
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
            result.set('left half arrowhead', new LineCanvasAnimationParams({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            result.set('right half arrowhead', new LineCanvasAnimationParams({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, rightArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
        }
        if (object.startType === 'Arrow') {
            result.set('left half arrow tail', new LineCanvasAnimationParams({
                object: {
                    origin: ZeroPoint,
                    endPoint: leftArrowSide,
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            result.set('right half arrow tail', new LineCanvasAnimationParams({
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

    mergeWithTransformation(obj: arrowParamsType, trans: Partial<arrowParamsType>, perc: number): onlyArrowParamsType {
        const {endPoint, startType, endType} = obj
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(endPoint, trans.endPoint, perc) : endPoint,
            startType: trans.startType ? (perc >= 0.5 ? trans.startType : startType) : startType,
            endType: trans.endType ? (perc >= 0.5 ? trans.endType : endType) : endType
        }
    }

}
