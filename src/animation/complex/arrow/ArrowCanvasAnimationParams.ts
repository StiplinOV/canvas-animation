import {
    calculatePointBetween,
    getBezierControlPoint,
    getBezierLineMiddlePoint,
    getVectorAngle,
    rotateVector,
    subtractPoints
} from '../../../common/Utils'
import { ObjectParams } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams, {
    LineParamsType,
    OnlyLineParamsType
} from '../../simple/line/LineCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import { Point, ZeroPoint } from '../../../common/Point'
import { HORIZ_ALIGN, THE_STYLE, VERT_ALIGN } from 'p5'
import { ColorType, WebSafeFontsType } from '../../../AnimationStyles'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import BezierCanvasAnimationParams from '../../simple/bezier/BezierCanvasAnimationParams'

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

export interface ArrowParamsType extends OnlyLineParamsType, ObjectParams {
    startType?: ArrowType
    endType?: ArrowType
    label?: ArrowLabelType | null
    bezierParams?: {
        point2: Point
        point3: Point
    }
}

export default class ArrowCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrowParamsType> {

    protected getIncludedAnimationParamsByParameter (object: ArrowParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const { bezierParams } = object
        let leftHalfArrowHeadParams: SimpleCanvasAnimationParams | null = null
        let rightHalfArrowHeadParams: SimpleCanvasAnimationParams | null = null
        let leftHalfArrowTailParams: SimpleCanvasAnimationParams | null = null
        let rightHalfArrowTailParams: SimpleCanvasAnimationParams | null = null
        const shaftParams = this.createShaftArrowParams(object)
        const arrowHeadLineParams: Partial<LineParamsType> = {
            weight: object.weight,
            zIndex: object.zIndex,
            rotations: object.rotations,
            strokeColor: object.strokeColor
        }
        if (object.endType === 'Arrow') {
            const startPoint = bezierParams?.point3 ?? object.origin
            const endPoint = object.endPoint
            const [left, right] = this.createArrowHeadLinePoints(startPoint, endPoint)
            leftHalfArrowHeadParams = new LineCanvasAnimationParams({
                object: {
                    ...arrowHeadLineParams,
                    origin: object.endPoint,
                    endPoint: left
                }
            }, this.getAnimationStyle())
            rightHalfArrowHeadParams = new LineCanvasAnimationParams({
                object: {
                    ...arrowHeadLineParams,
                    origin: object.endPoint,
                    endPoint: right
                }
            }, this.getAnimationStyle())
        }
        if (object.startType === 'Arrow') {
            const startPoint = bezierParams?.point2 ?? object.endPoint
            const endPoint = object.origin
            const [left, right] = this.createArrowHeadLinePoints(startPoint, endPoint)
            leftHalfArrowTailParams = new LineCanvasAnimationParams({
                object: {
                    ...arrowHeadLineParams,
                    origin: object.origin,
                    endPoint: left
                }
            }, this.getAnimationStyle())
            rightHalfArrowTailParams = new LineCanvasAnimationParams({
                object: {
                    ...arrowHeadLineParams,
                    origin: object.origin,
                    endPoint: right
                }
            }, this.getAnimationStyle())
        }
        result.set('shaft', shaftParams)
        leftHalfArrowHeadParams && result.set('left half arrow head', leftHalfArrowHeadParams)
        rightHalfArrowHeadParams && result.set('right half arrow head', rightHalfArrowHeadParams)
        leftHalfArrowTailParams && result.set('left half arrow tail', leftHalfArrowTailParams)
        rightHalfArrowTailParams && result.set('right half arrow tail', rightHalfArrowTailParams)

        if (object.label) {
            const [horizontalAlign, verticalAlign] = this.calculateTextAlign(object)
            result.set('label', new TextCanvasAnimationParams({
                object: {
                    origin: this.calculateLabelPosition(object),
                    fillColor: object.label.fillColor,
                    fontSize: object.label.fontSize,
                    textStyle: object.label.textStyle,
                    font: object.label.font,
                    horizontalAlign,
                    verticalAlign,
                    value: object.label.value
                }
            }, this.getAnimationStyle()))
        }

        return result
    }

    private createShaftArrowParams (object: ArrowParamsType): SimpleCanvasAnimationParams {
        const objectParams: Partial<ObjectParams> = {
            weight: object.weight,
            zIndex: object.zIndex,
            rotations: object.rotations,
            strokeColor: object.strokeColor,
            dashed: object.dashed
        }
        if (object.bezierParams) {
            return new BezierCanvasAnimationParams({
                object: {
                    ...objectParams,
                    origin: object.origin,
                    originRelativePoints: [
                        ZeroPoint,
                        subtractPoints(object.bezierParams.point2, object.origin),
                        subtractPoints(object.bezierParams.point3, object.origin),
                        subtractPoints(object.endPoint, object.origin)
                    ]
                }
            }, this.getAnimationStyle())
        }
        return new LineCanvasAnimationParams({
            object: {
                ...objectParams,
                origin: object.origin,
                endPoint: object.endPoint
            }
        }, this.getAnimationStyle())
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

    private calculateTextAlign (object: ArrowParamsType): [HORIZ_ALIGN, VERT_ALIGN] {
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

    private calculateLabelPosition (object: ArrowParamsType): Point {
        const { bezierParams } = object
        if (bezierParams) {
            return getBezierLineMiddlePoint(object.origin, bezierParams.point2, bezierParams.point3, object.endPoint)
        }
        return calculatePointBetween(object.origin, object.endPoint)
    }

}
