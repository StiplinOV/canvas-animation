import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams, {
    CanvasAnimationParamsType
} from '../ComplexCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import ArrayElement, { ElementStyle, ElementType } from './ArrayElement'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'

export interface ArrayParamsType extends ObjectParams {
    values: (ElementType | string | boolean | number)[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
    firstIndex?: number
    hideIndices?: boolean
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
    pointers?: number[]
}

export type ArraySelectorType = {
    values?: 'all' | number[]
    allNElementsInSequence?: number
}

export default class ArrayCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrayParamsType, ArraySelectorType> {

    protected getZeroParams (): Omit<ArrayParamsType, keyof ObjectParams> {
        return {
            values: [],
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter (object: ArrayParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const {
            title,
            values,
            indexTitle,
            firstIndex,
            origin,
            rotations,
            hideIndices,
            pointers
        } = object
        const partHeight = this.calculatePartHeight(object)
        const width = this.calculateWidth(object)
        const arrayRectangleWidth = (width - (values.length - 1) * partHeight) / values.length
        let partShift = 0
        if (title) {
            result.set('array title', {
                type: "text",
                objectParams: {
                    value: title,
                    origin: addPoints(origin, {
                        x: width / 2,
                        y: partShift
                    }),
                    fontSize: partHeight,
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    rotations
                }
            })
            partShift += partHeight * 2
        }
        values.forEach((valueParam, index) => {
            let value = valueParam
            if (typeof value === 'number') {
                const element = object.valueStyle?.get(value)
                if (element) {
                    value = {
                        style: element.style,
                        label: element.label ?? ''
                    }
                }
            }
            new ArrayElement({
                object: {
                    origin: addPoints(origin, {
                        x: index * (arrayRectangleWidth + partHeight),
                        y: partShift
                    }),
                    value,
                    width: arrayRectangleWidth,
                    height: partHeight * 3
                }
            }, this.p5, this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
                result.set(`${k} ${index}`, v)
            })
        })
        partShift += partHeight * 4
        if (!hideIndices) {
            values.forEach((valueParam, index) => {
                result.set(`index text ${index}`, {
                    type: "text",
                    objectParams: {
                        value: String(index + (firstIndex ?? 0)),
                        origin: addPoints(origin, {
                            x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                            y: partShift
                        }),
                        fontSize: partHeight * 2 / 3,
                        horizontalAlign: 'center',
                        rotations
                    }
                })
            })
        }
        partShift += partHeight
        if (indexTitle) {
            result.set('index title', {
                type: "text",
                objectParams: {
                    value: indexTitle,
                    origin: addPoints(origin, {
                        x: width / 2,
                        y: partShift
                    }),
                    fontSize: partHeight * 2 / 3,
                    horizontalAlign: 'center',
                    rotations
                }
            })
            partShift += partHeight
        }
        values.forEach((valueParam, index) => {
            if (pointers?.includes(index)) {
                new ArrowCanvasAnimationParams(
                    {
                        object: {
                            origin: addPoints(origin, {
                                x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                                y: partShift
                            }),
                            endPoint: addPoints(origin, {
                                x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                                y: partShift + arrayRectangleWidth
                            }),
                            startType: 'Arrow',
                            weight: arrayRectangleWidth / 30
                        }
                    },
                    this.p5,
                    this.getAnimationStyle()
                ).getIncludedAnimationParams().forEach((v, k) => result.set(`element pointer ${index} ${k}`, v))
            }
        })

        return result
    }

    private calculateWidth (object: ArrayParamsType): number {
        const { values } = object
        const partHeight = this.calculatePartHeight(object)
        const arrayHeight = partHeight * 3
        return object.width ?? (values.length * arrayHeight + (values.length - 1) * partHeight)
    }

    private calculatePartHeight (object: ArrayParamsType): number {
        const {
            title,
            indexTitle,
            height
        } = object
        let numberOfParts = 5
        if (title) {
            numberOfParts += 3
        }
        if (indexTitle) {
            numberOfParts += 2
        }
        return height / numberOfParts
    }

}
