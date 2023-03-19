import { ObjectParams } from '../../CanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'
import RectangleCanvasAnimationParams from '../../simple/rectangle/RectangleCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'

export interface ArrayParamsType extends ObjectParams {
    value: string[]
    height: number
    width?: number
    title?: string
    indexTitle?: string
    firstIndex?: number
    hideIndices?: boolean
}

export default class ArrayCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrayParamsType> {

    protected getIncludedAnimationParamsByParameter (object: ArrayParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const {
            title,
            value,
            indexTitle,
            firstIndex,
            origin,
            rotations,
            hideIndices
        } = object
        const partHeight = this.calculatePartHeight(object)
        const width = this.calculateWidth(object)
        const arrayRectangleWidth = (width - (value.length - 1) * partHeight) / value.length
        let partShift = 0
        if (title) {
            result.set('array title', new TextCanvasAnimationParams({
                object: {
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
            }))
            partShift += partHeight * 2
        }
        value.forEach((value, index) => {
            result.set(`value rect ${index}`, new RectangleCanvasAnimationParams({
                object: {
                    origin: addPoints(origin, {
                        x: index * (arrayRectangleWidth + partHeight),
                        y: partShift
                    }),
                    width: arrayRectangleWidth,
                    height: partHeight * 3,
                    cornerRadius: 20,
                    rotations
                }
            }))
            result.set(`value text ${index}`, new TextCanvasAnimationParams({
                object: {
                    value,
                    origin: addPoints(origin, {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 2
                    }),
                    fontSize: partHeight,
                    horizontalAlign: 'center',
                    zIndex: 1,
                    rotations
                }
            }))
            !hideIndices && result.set(`index text ${index}`, new TextCanvasAnimationParams({
                object: {
                    value: String(index + (firstIndex ?? 0)),
                    origin: addPoints(origin, {
                        x: index * (arrayRectangleWidth + partHeight) + arrayRectangleWidth / 2,
                        y: partShift + partHeight * 4
                    }),
                    fontSize: partHeight * 2 / 3,
                    horizontalAlign: 'center',
                    rotations
                }
            }))
        })
        partShift += partHeight * 5
        if (indexTitle) {
            result.set('index title', new TextCanvasAnimationParams({
                object: {
                    value: indexTitle,
                    origin: addPoints(origin, {
                        x: width / 2,
                        y: partShift
                    }),
                    fontSize: partHeight * 2 / 3,
                    horizontalAlign: 'center',
                    rotations
                }
            }))
        }

        return result
    }

    private calculateWidth (object: ArrayParamsType): number {
        const { value } = object
        const partHeight = this.calculatePartHeight(object)
        const arrayHeight = partHeight * 3
        return object.width ?? (value.length * arrayHeight + (value.length - 1) * partHeight)
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
