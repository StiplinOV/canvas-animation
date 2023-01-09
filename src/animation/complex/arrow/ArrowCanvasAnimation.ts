import ArrowParams from "./ArrowParams";
import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType} from "../ComplexCanvasAnimation";
import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import Params from "../../Params";
import LineCanvasAnimation from "../../simple/line/LineCanvasAnimation";
import GeometryHelper from "../../../common/GeometryHelper";

const arrowBaseLength = 10
const arrowBaseWidth = 10

export default class ArrowCanvasAnimation extends ComplexCanvasAnimation<ArrowParams, {}> {

    private line: LineCanvasAnimation
    private startArrowLines: LineCanvasAnimation[] = []
    private endArrowLines: LineCanvasAnimation[] = []

    constructor(params: paramsType<ArrowParams, complexCanvasAnimationSelectionType<{}>>, geometryHelper: GeometryHelper) {
        super(params)
        const relativeEndPoint = geometryHelper.subtractPoints(params.object.endPoint, params.object.origin)
        this.line = new LineCanvasAnimation({
            object: {
                origin: {x: 0, y: 0},
                endPoint: relativeEndPoint,
                weight: params.object.weight,
                zIndex: params.object.zIndex
            }
        })
        let angle = geometryHelper.getVectorAngle(relativeEndPoint)
        let leftArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: arrowBaseWidth / 2}, angle)
        let rightArrowSide = geometryHelper.rotateVector({x: arrowBaseLength, y: -arrowBaseWidth / 2}, angle)
        if (this.getObject().endType === "Arrow") {
            this.endArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, leftArrowSide),
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            this.endArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: relativeEndPoint,
                    endPoint: geometryHelper.subtractPoints(relativeEndPoint, rightArrowSide),
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }
        if (this.getObject().startType === "Arrow") {
            this.startArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: 0, y: 0},
                    endPoint: leftArrowSide,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
            this.startArrowLines.push(new LineCanvasAnimation({
                object: {
                    origin: {x: 0, y: 0},
                    endPoint: rightArrowSide,
                    weight: params.object.weight,
                    zIndex: params.object.zIndex
                }
            }))
        }
    }

    getIncludedObjects(): CanvasAnimation<Params>[] {
        return [this.line, ...this.startArrowLines, ...this.endArrowLines];
    }

}