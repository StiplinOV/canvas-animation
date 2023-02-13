import {
    addPoints,
    calculatePointPercentValue,
    getVectorAngle,
    rotateVector,
    subtractPoints
} from '../../../common/Utils'
import {ObjectParams} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams, {onlyLineParamsType} from '../../simple/line/LineCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'

const arrowBaseLength = 10
const arrowBaseWidth = 10

export interface onlyArrowParamsType extends onlyLineParamsType {
    startType?: 'Arrow' | 'None'
    endType?: 'Arrow' | 'None'
}

interface arrowParamsType extends onlyArrowParamsType, ObjectParams {
}

export default class ArrowCanvasAnimationParams extends ComplexCanvasAnimationParams<arrowParamsType> {

    protected getIncludedAnimationParamsByParameter(object: arrowParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        let leftHalfArrowHeadParams: SimpleCanvasAnimationParams | null = null
        let rightHalfArrowHeadParams: SimpleCanvasAnimationParams | null = null
        let leftHalfArrowTailParams: SimpleCanvasAnimationParams | null = null
        let rightHalfArrowTailParams: SimpleCanvasAnimationParams | null = null
        const shaftParams = new LineCanvasAnimationParams({
            object: {
                origin: object.origin,
                endPoint: object.endPoint,
                weight: object.weight,
                zIndex: object.zIndex,
                rotations: object.rotations,
                strokeColor: object.strokeColor,
                dashed: object.dashed
            }
        })
        const angle = getVectorAngle(this.p5, subtractPoints(object.endPoint, object.origin))
        const leftArrowSide = rotateVector(this.p5, {x: arrowBaseLength, y: arrowBaseWidth / 2}, angle)
        const rightArrowSide = rotateVector(this.p5, {x: arrowBaseLength, y: -arrowBaseWidth / 2}, angle)
        if (object.endType === 'Arrow') {
            leftHalfArrowHeadParams = new LineCanvasAnimationParams({
                object: {
                    origin: object.endPoint,
                    endPoint: subtractPoints(object.endPoint, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex,
                    rotations: object.rotations,
                    strokeColor: object.strokeColor
                }
            })
            rightHalfArrowHeadParams = new LineCanvasAnimationParams({
                object: {
                    origin: object.endPoint,
                    endPoint: subtractPoints(object.endPoint, rightArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex,
                    rotations: object.rotations,
                    strokeColor: object.strokeColor
                }
            })
        }
        if (object.startType === 'Arrow') {
            leftHalfArrowTailParams = new LineCanvasAnimationParams({
                object: {
                    origin: object.origin,
                    endPoint: addPoints(object.origin, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex,
                    rotations: object.rotations,
                    strokeColor: object.strokeColor
                }
            })
            rightHalfArrowTailParams = new LineCanvasAnimationParams({
                object: {
                    origin: object.origin,
                    endPoint: addPoints(object.origin, rightArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex,
                    rotations: object.rotations,
                    strokeColor: object.strokeColor
                }
            })
        }
        result.set('shaft', shaftParams)
        leftHalfArrowHeadParams && result.set('left half arrow head', leftHalfArrowHeadParams)
        rightHalfArrowHeadParams && result.set('right half arrow head', rightHalfArrowHeadParams)
        leftHalfArrowTailParams && result.set('left half arrow tail', leftHalfArrowTailParams)
        rightHalfArrowTailParams && result.set('right half arrow tail', rightHalfArrowTailParams)

        return result
    }

}
