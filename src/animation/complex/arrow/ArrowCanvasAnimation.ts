import ArrowParams from "./ArrowParams";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";
import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import Params from "../../Params";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import {Point} from "../../../common/Point";
import GeometryHelper from "../../../common/GeometryHelper";

const arrowBaseLength = 10
const arrowBaseWidth = 10

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<ArrowParams> {

    protected calculateIncludedObjects(params: paramsType<ArrowParams>, geometryHelper: GeometryHelper): CanvasAnimation<Params>[] {
        const relativeEndPoint = geometryHelper.subtractPoints(params.object.endPoint, params.object.startPoint)
        const result: CanvasAnimation<Params>[] = [
            new LineCanvasAnimation({
                object: {
                    startPoint: {x: 0, y: 0},
                    endPoint: relativeEndPoint,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            })
        ]
        let angle = geometryHelper.getVectorAngle(relativeEndPoint)
        let leftArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: arrowBaseWidth / 2}, angle)
        let rightArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: -arrowBaseWidth / 2}, angle)
        if (this.getObject().endType === "Arrow") {
            result.push(new LineCanvasAnimation({
                object: {
                    startPoint: relativeEndPoint,
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            result.push(new LineCanvasAnimation({
                object: {
                    startPoint: relativeEndPoint,
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, rightArrowSide),
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }
        if (this.getObject().startType === "Arrow") {
            result.push(new LineCanvasAnimation({
                object: {
                    startPoint: {x: 0, y: 0},
                    endPoint: leftArrowSide,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            result.push(new LineCanvasAnimation({
                object: {
                    startPoint: {x: 0, y: 0},
                    endPoint: rightArrowSide,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }

        return result
    }

    getOrigin(): Point {
        return this.getObject().startPoint;
    }

}