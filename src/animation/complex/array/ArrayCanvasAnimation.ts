import ArrayParams from "./ArrayParams";
import ComplexCanvasAnimation, {complexCanvasAnimationSelectionType} from "../ComplexCanvasAnimation";
import CanvasAnimation, {paramsType} from "../../CanvasAnimation";
import GeometryHelper from "../../../common/GeometryHelper";
import TextCanvasAnimation from "../../simple/text/TextCanvasAnimation";
import RectangleCanvasAnimation from "../../simple/rectangle/RectangleCanvasAnimation";
import Params from "../../Params";

export default class ArrayCanvasAnimation extends ComplexCanvasAnimation<ArrayParams, {}> {

    private title?: TextCanvasAnimation
    private arrayCells: RectangleCanvasAnimation[] = []
    private arrayValues: TextCanvasAnimation[] = []
    private arrayIndices: TextCanvasAnimation[] = []
    private indicesTitle?: TextCanvasAnimation

    constructor(params: paramsType<ArrayParams, complexCanvasAnimationSelectionType<{}>>, geometryHelper: GeometryHelper) {
        super(params);
        const {title, value, indexTitle, height, firstIndex} = this.getObject()
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
            this.title = new TextCanvasAnimation({
                object: {
                    value: title,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                    verticalAlign: geometryHelper.VERTICAL_ALIGN_TOP
                }
            })
            partShift += partHeight * 2
        }
        value.forEach((value, index) => {
            this.arrayCells.push(new RectangleCanvasAnimation({
                object: {
                    origin: {x: index * (arrayRectangleWidth + partHeight), y: partShift},
                    width: arrayRectangleWidth,
                    height: partHeight * 3,
                    cornerRadius: 20
                }
            }))
            this.arrayValues.push(new TextCanvasAnimation({
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
            this.arrayIndices.push(new TextCanvasAnimation({
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
            this.indicesTitle = new TextCanvasAnimation({
                object: {
                    value: indexTitle,
                    origin: {x: width / 2, y: partShift},
                    fontSize: partHeight / 2,
                    horizontalAlign: geometryHelper.HORIZONTAL_ALIGN_CENTER,
                }
            })
        }
    }

    getIncludedObjects(): CanvasAnimation<Params>[] {
        const result: CanvasAnimation<Params>[] = []
        this.title && result.push(this.title)
        result.push(...this.arrayCells)
        result.push(...this.arrayValues)
        result.push(...this.arrayIndices)
        this.indicesTitle && result.push(this.indicesTitle)
        return result;
    }

}