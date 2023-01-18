import ComplexCanvasAnimation, {includedAnimationsType} from "../ComplexCanvasAnimation";
import {objectParamsType} from "../../CanvasAnimation";
import {calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue} from "../../../common/Utils";
import SimpleCanvasAnimation from "../../simple/SimpleCanvasAnimation";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import RectangleCanvasAnimation from "../../simple/rectangle/RectangleCanvasAnimation";

type arrayParamsType = {
    value: string[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
    firstIndex?: number
}

export default class ArrayCanvasAnimation extends ComplexCanvasAnimation<arrayParamsType, {}> {

    getIncludedAnimationsByParameters(object: objectParamsType<arrayParamsType>): includedAnimationsType {
        const result = new Map<string, SimpleCanvasAnimation<{}>>()
        const {title, value, indexTitle, firstIndex} = object
        const partHeight = this.calculatePartHeight(object)
        const width = this.calculateWidth(object)
        const arrayRectangleWidth = (width - (value.length - 1) * partHeight) / value.length
        let partShift = 0
        if (title) {
            result.set("array title", new TextCanvasAnimation({
                object: {
                    value: title,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight,
                    horizontalAlign: "center",
                    verticalAlign: "top"
                }
            }))
            partShift += partHeight * 2
        }
        value.forEach((value, index) => {
            result.set("value rect " + index, new RectangleCanvasAnimation({
                object: {
                    origin: {x: index * (arrayRectangleWidth + partHeight), y: partShift},
                    width: arrayRectangleWidth,
                    height: partHeight * 3,
                    cornerRadius: 20
                }
            }))
            result.set("value text " + index, new TextCanvasAnimation({
                object: {
                    value: value,
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 2
                    },
                    fontSize: partHeight,
                    horizontalAlign: "center",
                    zIndex: 1
                }
            }))
            result.set("index text " + index, new TextCanvasAnimation({
                object: {
                    value: String(index + (firstIndex || 0)),
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 4
                    },
                    horizontalAlign: "center",
                }
            }))
        })
        partShift += partHeight * 5
        if (indexTitle) {
            result.set("index title", new TextCanvasAnimation({
                object: {
                    value: indexTitle,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight / 2,
                    horizontalAlign: "center",
                }
            }))
        }

        return result
    }

    private calculateWidth(object: objectParamsType<arrayParamsType>): number {
        const {value} = object
        const partHeight = this.calculatePartHeight(object)
        const arrayHeight = partHeight * 3
        return object.width || (value.length * arrayHeight + (value.length - 1) * partHeight)
    }

    private calculatePartHeight(object: objectParamsType<arrayParamsType>): number {
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

    public mergeWithTransformation(o: objectParamsType<arrayParamsType>, t: Partial<arrayParamsType>, p: number, p5: import("p5")): arrayParamsType {
        let {value, width, height, title, indexTitle, firstIndex} = o
        value ||= []
        width ||= this.calculateWidth(o)
        title ||= ""
        indexTitle ||= ""
        firstIndex ||= 0
        return {
            value: t.value ? calculateArrayPercentValue(value, t.value, p) : value,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            title: t.title ? calculateTextPercentValue(title, t.title, p) : title,
            indexTitle: t.indexTitle ? calculateTextPercentValue(indexTitle, t.indexTitle, p) : indexTitle,
            firstIndex: t.firstIndex ? Math.floor(calculatePercentValue(firstIndex, t.firstIndex, p)) : firstIndex
        };
    }

}