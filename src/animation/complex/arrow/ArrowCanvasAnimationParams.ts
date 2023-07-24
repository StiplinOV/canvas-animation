import {
    calculatePointBetween,
    getBezierControlPoint,
    getBezierLineMiddlePoint,
    getVectorAngle,
    rotateVector,
    subtractPoints
} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import {
    LineJsonParamsType,
    OnlyLineParamsType
} from '../../simple/line/LineCanvasAnimationParams'
import { Point, ZeroPoint } from '../../../common/Point'
import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN } from 'p5'
import { ColorType, WebSafeFontsType } from '../../../AnimationStyles'
import { ObjectParamsObject } from '../../ObjectParamsObject'

const arrowBaseLength = 10
const arrowBaseWidth = 10

export type ArrowType = 'Arrow' | 'None'

type ArrowLabelType = {
    fillColor?: ColorType
    fontSize?: number
    textStyle?: THE_STYLE
    font?: WebSafeFontsType
    value: string
}

export interface OnlyArrowParamsType extends OnlyLineParamsType {
    startType?: ArrowType
    endType?: ArrowType
    label?: ArrowLabelType | null
    bezierParams?: {
        point2: Point
        point3: Point
    }
}

export interface ArrowJsonParamsType extends OnlyArrowParamsType, JsonObjectParams {

}

export interface ArrowAnimationParamsType extends OnlyArrowParamsType, AnimationObjectParams {

}

export default class ArrowCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrowJsonParamsType, ArrowAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: ArrowJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): ArrowAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ArrowJsonParamsType>): Partial<ArrowAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ArrowAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ArrowAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected getZeroParams (): Omit<ArrowJsonParamsType, keyof JsonObjectParams> {
        return {
            endPoint: this.getObject().origin
        }
    }

    protected getIncludedAnimationParamsByParameter (object: ArrowJsonParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const { bezierParams } = object
        let leftHalfArrowHeadParams: CanvasAnimationParamsType | null = null
        let rightHalfArrowHeadParams: CanvasAnimationParamsType | null = null
        let leftHalfArrowTailParams: CanvasAnimationParamsType | null = null
        let rightHalfArrowTailParams: CanvasAnimationParamsType | null = null
        const shaftParams = this.createShaftArrowParams(object)
        const arrowHeadLineParams: Partial<LineJsonParamsType> = {
            weight: object.weight,
            zIndex: object.zIndex,
            rotations: object.rotations,
            strokeColor: object.strokeColor
        }
        if (object.endType === 'Arrow') {
            const startPoint = bezierParams?.point3 ?? object.origin
            const endPoint = object.endPoint
            const [left, right] = this.createArrowHeadLinePoints(startPoint, endPoint)
            leftHalfArrowHeadParams = {
                type: 'line',
                objectParams: {
                    ...arrowHeadLineParams,
                    origin: object.endPoint,
                    endPoint: left
                }
            }
            rightHalfArrowHeadParams = {
                type: 'line',
                objectParams: {
                    ...arrowHeadLineParams,
                    origin: object.endPoint,
                    endPoint: right
                }
            }
        }
        if (object.startType === 'Arrow') {
            const startPoint = bezierParams?.point2 ?? object.endPoint
            const endPoint = object.origin
            const [left, right] = this.createArrowHeadLinePoints(startPoint, endPoint)
            leftHalfArrowTailParams = {
                type: 'line',
                objectParams: {
                    ...arrowHeadLineParams,
                    origin: object.origin,
                    endPoint: left
                }
            }
            rightHalfArrowTailParams = {
                type: 'line',
                objectParams: {
                    ...arrowHeadLineParams,
                    origin: object.origin,
                    endPoint: right
                }
            }
        }
        result.set('shaft', shaftParams)
        leftHalfArrowHeadParams && result.set('left half arrow head', leftHalfArrowHeadParams)
        rightHalfArrowHeadParams && result.set('right half arrow head', rightHalfArrowHeadParams)
        leftHalfArrowTailParams && result.set('left half arrow tail', leftHalfArrowTailParams)
        rightHalfArrowTailParams && result.set('right half arrow tail', rightHalfArrowTailParams)

        if (object.label) {
            const [horizontalAlign, verticalAlign] = this.calculateTextAlign(object)
            result.set('label', {
                type: 'text',
                objectParams: {
                    origin: this.calculateLabelPosition(object),
                    fillColor: object.label.fillColor,
                    fontSize: object.label.fontSize,
                    textStyle: object.label.textStyle,
                    font: object.label.font,
                    horizontalAlign,
                    verticalAlign,
                    value: object.label.value
                }
            })
        }

        return result
    }

    private createShaftArrowParams (object: ArrowJsonParamsType): CanvasAnimationParamsType {
        const objectParams: Partial<JsonObjectParams> = {
            weight: object.weight,
            zIndex: object.zIndex,
            rotations: object.rotations,
            strokeColor: object.strokeColor,
            dashed: object.dashed
        }
        if (object.bezierParams) {
            return {
                type: 'bezier',
                objectParams: {
                    ...objectParams,
                    origin: object.origin,
                    originRelativePoints: [
                        ZeroPoint,
                        subtractPoints(object.bezierParams.point2, object.origin),
                        subtractPoints(object.bezierParams.point3, object.origin),
                        subtractPoints(object.endPoint, object.origin)
                    ]
                }
            }
        }
        return {
            type: 'line',
            objectParams: {
                ...objectParams,
                origin: object.origin,
                endPoint: object.endPoint
            }
        }
    }

    private createArrowHeadLinePoints (tail: Point, head: Point): [Point, Point] {
        const angle = getVectorAngle(this.p5, subtractPoints(head, tail))
        const leftArrowSide = rotateVector(this.p5, {
            x: arrowBaseLength,
            y: arrowBaseWidth / 2
        }, angle)
        const rightArrowSide = rotateVector(this.p5, {
            x: arrowBaseLength,
            y: -arrowBaseWidth / 2
        }, angle)

        return [subtractPoints(head, leftArrowSide), subtractPoints(head, rightArrowSide)]
    }

    private calculateTextAlign (object: ArrowJsonParamsType): [HORIZ_ALIGN, VERT_ALIGN] {
        const { bezierParams } = object
        let horizontalAlign: HORIZ_ALIGN = 'center'
        let verticalAlign: VERT_ALIGN = 'center'
        if (bezierParams) {
            const {
                m1,
                m5
            } = getBezierControlPoint(object.origin, bezierParams.point2, bezierParams.point3, object.endPoint)
            if (m5.x < m1.x) {
                horizontalAlign = 'left'
            }
            if (m5.x > m1.x) {
                horizontalAlign = 'right'
            }
            if (m5.y < m1.y) {
                verticalAlign = 'top'
            }
            if (m5.y > m1.y) {
                verticalAlign = 'bottom'
            }
            return [horizontalAlign, verticalAlign]
        }
        const points = [object.origin, object.endPoint]

        let [upPoint, downPoint] = points
        if (points[0].y < points[1].y) {
            [downPoint, upPoint] = points
        }
        if (upPoint.x < downPoint.x) {
            horizontalAlign = 'right'
            verticalAlign = 'bottom'
        }
        if (upPoint.x > downPoint.x) {
            horizontalAlign = 'left'
            verticalAlign = 'bottom'
        }
        return [horizontalAlign, verticalAlign]
    }

    private calculateLabelPosition (object: ArrowJsonParamsType): Point {
        const { bezierParams } = object
        if (bezierParams) {
            return getBezierLineMiddlePoint(object.origin, bezierParams.point2, bezierParams.point3, object.endPoint)
        }
        return calculatePointBetween(object.origin, object.endPoint)
    }

}
