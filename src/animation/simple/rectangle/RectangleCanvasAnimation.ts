import SimpleCanvasAnimation from "../SimpleCanvasAnimation";
import RectangleParams from "./RectangleParams";
import p5Types from "p5";
import {calculatePercentValue} from "../../../common/Utils";

export default class RectangleCanvasAnimation extends SimpleCanvasAnimation<RectangleParams> {

    drawObject(p5: p5Types, object: RectangleParams, percent: number): void {
        const {width, height, cornerRadius} = object
        p5.rect(width / 2 * (1 - percent), height / 2 * (1 - percent), width * percent, height * percent, cornerRadius)
    }

    mergeWithTransformation(object: RectangleParams, transformObject: Partial<RectangleParams>, percent: number): RectangleParams {
        let {width, height, cornerRadius} = object
        if (transformObject.cornerRadius) {
            cornerRadius = calculatePercentValue(cornerRadius || 0, transformObject.cornerRadius, percent)
        }
        return {
            ...object,
            width: transformObject.width ? calculatePercentValue(width, transformObject.width, percent) : width,
            height: transformObject.height ? calculatePercentValue(height, transformObject.height, percent) : height,
            cornerRadius
        }
    }

}