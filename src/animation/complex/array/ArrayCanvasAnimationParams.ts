import CanvasAnimationParams, {ObjectParams} from '../../CanvasAnimationParams'
import {calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue} from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import RectangleCanvasAnimationParams from '../../simple/rectangle/RectangleCanvasAnimationParams'

interface onlyArrayParamsType {
    value: string[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
    firstIndex?: number
}

interface arrayParamsType extends onlyArrayParamsType, ObjectParams {
}

export default class ArrayCanvasAnimationParams extends ComplexCanvasAnimationParams<arrayParamsType> {

    getIncludedAnimationsByParameters(object: arrayParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const {title, value, indexTitle, firstIndex} = object
        const partHeight = this.calculatePartHeight(object)
        const width = this.calculateWidth(object)
        const arrayRectangleWidth = (width - (value.length - 1) * partHeight) / value.length
        let partShift = 0
        if (title) {
            result.set('array title', new TextCanvasAnimationParams({
                object: {
                    value: title,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight,
                    horizontalAlign: 'center',
                    verticalAlign: 'top'
                }
            }))
            partShift += partHeight * 2
        }
        value.forEach((value, index) => {
            result.set(`value rect ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: {x: index * (arrayRectangleWidth + partHeight), y: partShift},
                    width: arrayRectangleWidth,
                    height: partHeight * 3,
                    cornerRadius: 20
                }
            }))
            result.set(`value text ${index}`, new TextCanvasAnimationParams({
                object: {
                    value,
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 2
                    },
                    fontSize: partHeight,
                    horizontalAlign: 'center',
                    zIndex: 1
                }
            }))
            result.set(`index text ${index}`, new TextCanvasAnimationParams({
                object: {
                    value: String(index + (firstIndex ?? 0)),
                    origin: {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 4
                    },
                    horizontalAlign: 'center'
                }
            }))
        })
        partShift += partHeight * 5
        if (indexTitle) {
            result.set('index title', new TextCanvasAnimationParams({
                object: {
                    value: indexTitle,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight / 2,
                    horizontalAlign: 'center'
                }
            }))
        }

        return result
    }

    private calculateWidth(object: arrayParamsType): number {
        const {value} = object
        const partHeight = this.calculatePartHeight(object)
        const arrayHeight = partHeight * 3
        return object.width ?? (value.length * arrayHeight + (value.length - 1) * partHeight)
    }

    private calculatePartHeight(object: arrayParamsType): number {
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

    public mergeWithTransformation(o: arrayParamsType, t: Partial<arrayParamsType>, p: number): onlyArrayParamsType {
        let {value, width, height, title, indexTitle, firstIndex} = o
        value ??= []
        width ??= this.calculateWidth(o)
        title ??= ''
        indexTitle ??= ''
        firstIndex ??= 0
        return {
            value: t.value ? calculateArrayPercentValue(value, t.value, p) : value,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
            title: t.title ? calculateTextPercentValue(title, t.title, p) : title,
            indexTitle: t.indexTitle ? calculateTextPercentValue(indexTitle, t.indexTitle, p) : indexTitle,
            firstIndex: t.firstIndex ? Math.floor(calculatePercentValue(firstIndex, t.firstIndex, p)) : firstIndex
        }
    }

}
