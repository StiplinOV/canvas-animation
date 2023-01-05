import ArrowParams from "./ArrowParams";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";
import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import Params from "../../Params";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import p5Types from "p5";

const arrowBaseLength = 10
const arrowBaseWidth = 10

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<ArrowParams> {

    protected calculateIncludedObjects(params: paramsType<ArrowParams>, p5: p5Types): CanvasAnimation<Params>[] {
        const result: CanvasAnimation<Params>[] = [
            new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: params.object.startPoint,
                    endPoint: params.object.endPoint,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            })
        ]

        let lineVector = p5.createVector(
            params.object.endPoint.x - params.object.startPoint.x,
            params.object.endPoint.y - params.object.startPoint.y
        )
        let angle = lineVector.heading()
        let leftArrowSide = p5.createVector(arrowBaseLength, arrowBaseWidth / 2)
        let rightArrowSide = p5.createVector(arrowBaseLength, -arrowBaseWidth / 2)
        leftArrowSide.rotate(angle)
        rightArrowSide.rotate(angle)
        if (this.getObject().endType === "Arrow") {
            result.push(new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: params.object.endPoint,
                    endPoint: {
                        x: params.object.endPoint.x - leftArrowSide.x,
                        y: params.object.endPoint.y - leftArrowSide.y
                    },
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            result.push(new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: params.object.endPoint,
                    endPoint: {
                        x: params.object.endPoint.x - rightArrowSide.x,
                        y: params.object.endPoint.y - rightArrowSide.y
                    },
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }
        if (this.getObject().startType === "Arrow") {
            result.push(new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: params.object.startPoint,
                    endPoint: {
                        x: params.object.startPoint.x + leftArrowSide.x,
                        y: params.object.startPoint.y + leftArrowSide.y
                    },
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            result.push(new LineCanvasAnimation({
                appearType: "fromStartToEnd",
                disappearType: "fromStartToEnd",
                object: {
                    startPoint: params.object.startPoint,
                    endPoint: {
                        x: params.object.startPoint.x + rightArrowSide.x,
                        y: params.object.startPoint.y + rightArrowSide.y
                    },
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }

        return result
    }

}