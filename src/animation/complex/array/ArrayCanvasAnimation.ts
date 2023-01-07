import ArrayParams from "./ArrayParams";
import ComplexCanvasAnimation from "../ComplexCanvasAnimation";
import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import GeometryHelper from "../../../common/GeometryHelper";
import Params from "../../Params";
import {Point} from "../../../common/Point";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import RectangleCanvasAnimation from "../../simple/rectangle/RectangleCanvasAnimation";

export default class ArrayCanvasAnimation extends ComplexCanvasAnimation<ArrayParams> {

    protected calculateIncludedObjects(
        params: paramsType<ArrayParams>,
        geometryHelper: GeometryHelper
    ): CanvasAnimation<Params>[] {
        //Делим массив на 5 частей по вертикали
        /*
        gap x1
        заголовок х1
        gap x1
        массив х3
        gap x1
        индексы х1
        gap x1
        заголовок индексов x1
         */
        const result: CanvasAnimation<Params>[] = []
        const {title, value, indexTitle, height} = this.getObject()
        let numberOfParts = 5
        if (title) {
            numberOfParts += 3
        }
        if (indexTitle) {
            numberOfParts += 2
        }
        const partHeight = height / numberOfParts
        const arrayHeight = partHeight * 3
        const width = this.getObject().width || (value.length * arrayHeight + (value.length - 1) * partHeight)
        const arrayRectangleWidth = (width - (value.length - 1) * partHeight) / value.length
        let partShift = 0
        if (title) {
            result.push(new TextCanvasAnimation({
                object: {
                    value: title,
                    origin: {x: width/2, y: partShift},
                    fontSize: partHeight,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP
                }
            }))
            partShift += partHeight * 2
        }
        value.forEach((value, index) => {
            result.push(new RectangleCanvasAnimation({
                object: {
                    origin: {x: index * (arrayRectangleWidth + partHeight), y: partShift},
                    width: arrayRectangleWidth,
                    height: partHeight * 3,
                    cornerRadius: 20
                }
            }))
            result.push(new TextCanvasAnimation({
                object: {
                    value: value,
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 2
                    },
                    fontSize: partHeight,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            }))
            result.push(new TextCanvasAnimation({
                object: {
                    value: String(index),
                    origin: {x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2, y: partShift + partHeight * 4},
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            }))
        })
        partShift += partHeight * 5
        if (indexTitle) {
            result.push(new TextCanvasAnimation({
                object: {
                    value: indexTitle,
                    origin: {x: width/2, y: partShift},
                    fontSize: partHeight/2,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            }))
        }

        return result;
    }

    getOrigin(): Point {
        return this.getObject().origin;
    }


}