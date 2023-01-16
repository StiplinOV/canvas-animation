import ArrowParams from "./ArrowParams";
import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType, objectInfo} from "../ComplexCanvasAnimation";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import p5Types from "p5";
import {calculatePointPercentValue} from "../../../common/Utils";

const arrowBaseLength = 10
const arrowBaseWidth = 10

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<ArrowParams, {}> {

    getIncludedObjects(object: ArrowParams, selector?: complexCanvasAnimationSelectionType<{}> | boolean): objectInfo[] {
        const geometryHelper = this.getGeometryHelper()
        const relativeEndPoint = geometryHelper.subtractPoints(object.endPoint, object.origin)
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
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: object.weight,
                    zIndex: object.zIndex
                }
            }))
            endArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, rightArrowSide),
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

    mergeWithTransformation(obj: ArrowParams, transform: Partial<ArrowParams>, perc: number, p5: p5Types): ArrowParams {
        let {endPoint, startType, endType} = obj
        return {
            ...obj,
            endPoint: transform.endPoint ? calculatePointPercentValue(endPoint, transform.endPoint, perc) : endPoint,
            startType: transform.startType ? (perc >= 0.5 ? startType : transform.startType) : startType,
            endType: transform.endType ? (perc >= 0.5 ? endType : transform.endType) : endType
        }
    }

}