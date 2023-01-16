import LineParams from "./LineParams";
import p5Types from "p5";
import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import {calculatePointPercentValue} from "../../../common/Utils";

export default class LineCanvasAnimation extends SimpleCanvasAnimation<LineParams> {

    public drawObject(p5: p5Types, object: LineParams, percent: number, selectedPercent: number): void {
        const {origin, endPoint} = object
        let endX = (endPoint.x - origin.x) * percent
        let endY = (endPoint.y - origin.y) * percent
        p5.line(0, 0, endX, endY)
    }

    mergeWithTransformation(object: LineParams, transformObject: Partial<LineParams>, percent: number): LineParams {
        let {endPoint} = object
        if (transformObject.endPoint) {
            endPoint = calculatePointPercentValue(object.endPoint, endPoint, percent)
        }
        return {
            ...object,
            endPoint
        }
    }

}