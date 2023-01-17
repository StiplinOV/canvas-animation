import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType, objectInfo} from "../ComplexCanvasAnimation";
import LineCanvasAnimation, {lineParamsType} from "../../simple/line/LineCanvasAnimation";
import p5Types from "p5";
import {calculatePointPercentValue, subtractPoints} from "../../../common/Utils";
import {objectParamsType} from "../../CanvasAnimation";

const arrowBaseLength = 10
const arrowBaseWidth = 10

type arrowParamsType = lineParamsType & {
    startType?: "Arrow"
    endType?: "Arrow"
}

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<arrowParamsType, {}> {

    getIncludedObjects(object: objectParamsType<arrowParamsType>, selector?: complexCanvasAnimationSelectionType<{}> | boolean): objectInfo[] {
        const geometryHelper = this.getGeometryHelper()
        const relativeEndPoint = subtractPoints(object.endPoint, object.origin)
        const startArrowLines: LineCanvasAnimation[] = []
        const endArrowLines: LineCanvasAnimation[] = []
        const line = new LineCanvasAnimation({
            object: {
                origin: {x: 0, y: 0},
                endPoint: relativeEndPoint,
                weight: object.weight,
                zIndex: object.zIndex
            }
        })
        let angle = geometryHelper.getVectorAngle(relativeEndPoint)
        let leftArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: arrowBaseWidth / 2}, angle)
        let rightArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: -arrowBaseWidth / 2}, angle)
        if (object.endType === "Arrow") {
            endArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            endArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: subtractPoints(relativeEndPoint, rightArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
        }
        if (object.startType === "Arrow") {
            startArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: 0, y: 0},
                    endPoint: leftArrowSide,
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            startArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: 0, y: 0},
                    endPoint: rightArrowSide,
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
        }
        return [line, ...startArrowLines, ...endArrowLines].map(r => ({object: r, selected: Boolean(selector)}));
    }

    mergeWithTransformation(obj: objectParamsType<arrowParamsType>, trans: Partial<arrowParamsType>, perc: number, p5: p5Types): arrowParamsType {
        let {endPoint, startType, endType} = obj
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(endPoint, trans.endPoint, perc) : endPoint,
            startType: trans.startType ? (perc >= 0.5 ? startType : trans.startType) : startType,
            endType: trans.endType ? (perc >= 0.5 ? endType : trans.endType) : endType
        }
    }

}