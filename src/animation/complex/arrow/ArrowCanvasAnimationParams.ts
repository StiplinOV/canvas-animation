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
import {LineJsonParamsType} from '../../simple/line/LineCanvasAnimationParams'
import {Point, ZeroPoint} from '../../../common/Point'
import {HORIZ_ALIGN, THE_STYLE, VERT_ALIGN} from 'p5'
import {ColorType, WebSafeFontsType} from '../../../AnimationStyles'
import {ObjectParamsObject} from '../../ObjectParamsObject'

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

export interface ArrowJsonParamsType extends JsonObjectParams {
    endPoint: Point
    startType?: ArrowType
    endType?: ArrowType
    label?: ArrowLabelType | null
    bezierParams?: {
        point2: Point
        point3: Point
    } | null
}

export interface ArrowAnimationParamsType extends AnimationObjectParams {
    endPoint: Point
    startType: ArrowType
    endType: ArrowType
    labelFillColor: ColorType
    labelFontSize: number
    labelTextStyle: THE_STYLE
    labelFont: WebSafeFontsType
    labelValue: string
    bezier: boolean
    point2: Point
    point3: Point
}

export default class ArrowCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrowJsonParamsType, ArrowAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(
        jsonObject: ArrowJsonParamsType,
        animationObjectDefaultParams: AnimationObjectParams
    ): ArrowAnimationParamsType {
        const animationStyle = this.getAnimationStyle()
        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            startType: jsonObject.startType ?? 'None',
            endType: jsonObject.endType ?? 'None',
            labelFillColor: jsonObject.label?.fillColor ?? animationStyle.fontColor,
            labelFontSize: jsonObject.label?.fontSize ?? animationStyle.fontSize,
            labelTextStyle: jsonObject.label?.textStyle ?? animationStyle.textStyle,
            labelFont: jsonObject.label?.font ?? animationStyle.font,
            labelValue: jsonObject.label?.value ?? '',
            bezier: Boolean(jsonObject.bezierParams),
            point2: jsonObject.bezierParams?.point2 ?? ZeroPoint,
            point3: jsonObject.bezierParams?.point3 ?? ZeroPoint
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ArrowJsonParamsType>): Partial<ArrowAnimationParamsType> {
        const {bezierParams} = jsonObject
        return {
            ...jsonObject,
            labelFillColor: jsonObject.label?.fillColor,
            labelFontSize: jsonObject.label?.fontSize,
            labelTextStyle: jsonObject.label?.textStyle,
            labelFont: jsonObject.label?.font,
            labelValue: jsonObject.label?.value,
            bezier: bezierParams === undefined ? undefined : Boolean(bezierParams),
            point2: bezierParams?.point2,
            point3: bezierParams?.point3
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ArrowAnimationParamsType>): void {
        params.endPoint !== undefined && objectParamsObject.setPointParam('endPoint', params.endPoint)
        params.startType !== undefined && objectParamsObject.setStringLiteralParam('startType', params.startType)
        params.endType !== undefined && objectParamsObject.setStringLiteralParam('endType', params.endType)
        params.labelFillColor !== undefined && objectParamsObject.setColorParam('labelFillColor', params.labelFillColor)
        params.labelFontSize !== undefined && objectParamsObject.setNumberParam('labelFontSize', params.labelFontSize)
        params.labelTextStyle !== undefined && objectParamsObject.setStringLiteralParam('labelTextStyle', params.labelTextStyle)
        params.labelFont !== undefined && objectParamsObject.setStringLiteralParam('labelFont', params.labelFont)
        params.labelValue !== undefined && objectParamsObject.setStringParam('labelValue', params.labelValue)
        params.bezier !== undefined && objectParamsObject.setBooleanParam('bezier', params.bezier)
        params.point2 !== undefined && objectParamsObject.setPointParam('point2', params.point2)
        params.point3 !== undefined && objectParamsObject.setPointParam('point3', params.point3)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ArrowAnimationParamsType {
        return {
            ...initialDefaultParams,
            endPoint: objectParamsObject.getPointParam('endPoint'),
            startType: objectParamsObject.getStringLiteralParam('startType'),
            endType: objectParamsObject.getStringLiteralParam('endType'),
            labelFillColor: objectParamsObject.getColorParam('labelFillColor'),
            labelFontSize: objectParamsObject.getNumberParam('labelFontSize'),
            labelTextStyle: objectParamsObject.getStringLiteralParam('labelTextStyle'),
            labelFont: objectParamsObject.getStringLiteralParam('labelFont'),
            labelValue: objectParamsObject.getStringParam('labelValue'),
            bezier: objectParamsObject.getBooleanParam('bezier'),
            point2: objectParamsObject.getPointParam('point2'),
            point3: objectParamsObject.getPointParam('point3')
        }
    }

    protected getZeroParams(): Omit<ArrowAnimationParamsType, keyof JsonObjectParams> {
        const animationStyle = this.getAnimationStyle()
        return {
            startType: 'None',
            endType: 'None',
            labelFillColor: animationStyle.fontColor,
            labelFontSize: animationStyle.fontSize,
            labelTextStyle: animationStyle.textStyle,
            labelFont: animationStyle.font,
            endPoint: this.getObject().origin,
            labelValue: '',
            bezier: false,
            point2: ZeroPoint,
            point3: ZeroPoint
        }
    }

    protected getIncludedAnimationParamsByParameter(object: ArrowAnimationParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
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
            const startPoint = object.bezier ? object.point3 : object.origin
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
            const startPoint = object.bezier ? object.point2 : object.endPoint
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

        const [horizontalAlign, verticalAlign] = this.calculateTextAlign(object)
        result.set('label', {
            type: 'text',
            objectParams: {
                origin: this.calculateLabelPosition(object),
                fillColor: object.labelFillColor,
                fontSize: object.labelFontSize,
                textStyle: object.labelTextStyle,
                font: object.labelFont,
                horizontalAlign,
                verticalAlign,
                value: object.labelValue
            }
        })
        return result
    }

    private createShaftArrowParams(object: ArrowAnimationParamsType): CanvasAnimationParamsType {
        const objectParams: Partial<JsonObjectParams> = {
            weight: object.weight,
            zIndex: object.zIndex,
            rotations: object.rotations,
            strokeColor: object.strokeColor,
            dashed: object.dashed
        }
        if (object.bezier) {
            return {
                type: 'bezier',
                objectParams: {
                    ...objectParams,
                    origin: object.origin,
                    originRelativePoints: [
                        ZeroPoint,
                        subtractPoints(object.point2, object.origin),
                        subtractPoints(object.point3, object.origin),
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

    private createArrowHeadLinePoints(tail: Point, head: Point): [Point, Point] {
        const angle = getVectorAngle(this.getP5(), subtractPoints(head, tail))
        const leftArrowSide = rotateVector(this.getP5(), {
            x: arrowBaseLength,
            y: arrowBaseWidth / 2
        }, angle)
        const rightArrowSide = rotateVector(this.getP5(), {
            x: arrowBaseLength,
            y: -arrowBaseWidth / 2
        }, angle)

        return [subtractPoints(head, leftArrowSide), subtractPoints(head, rightArrowSide)]
    }

    private calculateTextAlign(object: ArrowAnimationParamsType): [HORIZ_ALIGN, VERT_ALIGN] {
        let horizontalAlign: HORIZ_ALIGN = 'center'
        let verticalAlign: VERT_ALIGN = 'center'
        if (object.bezier) {
            const {
                m1,
                m5
            } = getBezierControlPoint(object.origin, object.point2, object.point3, object.endPoint)
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

    private calculateLabelPosition(object: ArrowAnimationParamsType): Point {
        if (object.bezier) {
            return getBezierLineMiddlePoint(object.origin, object.point2, object.point3, object.endPoint)
        }
        return calculatePointBetween(object.origin, object.endPoint)
    }

}
