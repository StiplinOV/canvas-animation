import ArrayParams from "./ArrayParams";
import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType, objectInfo} from "../ComplexCanvasAnimation";
import CanvasAnimation from "../../CanvasAnimation";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import RectangleCanvasAnimation from "../../simple/rectangle/RectangleCanvasAnimation";
import Params from "../../Params";
import {calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue} from "../../../common/Utils";

export default class ArrayCanvasAnimation extends ComplexCanvasAnimation<ArrayParams, {}> {

    getIncludedObjects(object: ArrayParams, selector?: complexCanvasAnimationSelectionType<{}> | boolean): objectInfo[] {
        const result: CanvasAnimation<Params>[] = []
        const geometryHelper = this.getGeometryHelper()
        const {title, value, indexTitle, firstIndex} = object
        const partHeight = this.calculatePartHeight(object)
        const width = this.calculateWidth(object)
        const arrayRectangleWidth = (width - (value.length - 1) * partHeight) / value.length
        let partShift = 0
        if (title) {
            result.push(new TextCanvasAnimation({
                object: {
                    value: title,
                    origin: {x: width / 2, y: partShift},
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
                    zIndex: 1
                }
            }))
            result.push(new TextCanvasAnimation({
                object: {
                    value: String(index + (firstIndex || 0)),
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 4
                    },
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            }))
        })
        partShift += partHeight * 5
        if (indexTitle) {
            result.push(new TextCanvasAnimation({
                object: {
                    value: indexTitle,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight / 2,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            }))
        }

        return result.map(r => ({object: r, selected: Boolean(selector)}));
    }

    private calculateWidth(object: ArrayParams): number {
        const {value} = object
        const partHeight = this.calculatePartHeight(object)
        const arrayHeight = partHeight * 3
        return object.width || (value.length * arrayHeight + (value.length - 1) * partHeight)
    }

    private calculatePartHeight(object: ArrayParams): number {
        const {title, indexTitle, height} = object
        let numberOfParts = 5
        if (title) {
            numberOfParts += 3
        }
        if (indexTitle) {
            numberOfParts += 2
        }
        return height / numberOfParts
    }

    public mergeWithTransformation(o: ArrayParams, t: Partial<ArrayParams>, p: number, p5: import("p5")): ArrayParams {
        let {value, width, height, title, indexTitle, firstIndex} = o
        value ||= []
        width ||= this.calculateWidth(o)
        title ||= ""
        indexTitle ||= ""
        firstIndex ||= 0
        return {
            ...o,
            value: t.value ? calculateArrayPercentValue(value, t.value, p) : value,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            title: t.title ? calculateTextPercentValue(title, t.title, p) : title,
            indexTitle: t.indexTitle ? calculateTextPercentValue(indexTitle, t.indexTitle, p) : indexTitle,
            firstIndex: t.firstIndex ? Math.floor(calculatePercentValue(firstIndex, t.firstIndex, p)) : firstIndex
        };
    }

}