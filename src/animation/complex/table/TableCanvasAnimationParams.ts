import CanvasAnimationParams, {ObjectParams} from '../../CanvasAnimationParams'
import {calculateArrayPercentValue, calculatePercentValue} from '../../../common/Utils'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import LineCanvasAnimationParams from "../../simple/line/LineCanvasAnimationParams";
import TextCanvasAnimationParams from "../../simple/text/TextCanvasAnimationParams";

interface onlyTableParamsType {
    values: string[][]
    width: number
    height: number
}

interface tableParamsType<T extends number = number> extends onlyTableParamsType, ObjectParams {
}

export default class TableCanvasAnimationParams extends ComplexCanvasAnimationParams<tableParamsType> {

    getIncludedAnimationsByParameters(object: tableParamsType): Map<string, CanvasAnimationParams> {
        const result = new Map<string, CanvasAnimationParams>()
        const {values, width, height} = object
        const stepHeight = height / values.length
        const widths: number[] = []
        values.forEach((v, i) => {
            values[i].forEach((v1, j) => {
                if (widths.length < (j + 1)) {
                    widths.push(0)
                }
                widths[j] = Math.max(widths[j], this.p5.textWidth(values[i][j]))
            })
        })
        const tempWidthsSum = widths.reduce((l, r) => l + r, 0)
        for (let i = 0; i < values[0].length; i++) {
            widths[i] = (widths[i] * width) / tempWidthsSum
        }
        for (let i = 1; i < values.length; i++) {
            result.set(`horizontal line ${i}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: 0, y: stepHeight * i},
                    endPoint: {x: width, y: stepHeight * i}
                }
            }))
        }
        let accumulatedWidth = 0
        for (let i = 0; i < widths.length - 1; i++) {
            accumulatedWidth += widths[i]
            result.set(`vertical line ${i}`, new LineCanvasAnimationParams({
                object: {
                    origin: {x: accumulatedWidth, y: 0},
                    endPoint: {x: accumulatedWidth, y: height}
                }
            }))
        }
        values.forEach((v, i) => {
            let accumulatedWidth = 0
            v.forEach((v1, j) => {
                const x = accumulatedWidth + widths[j] / 2
                const y = stepHeight * i + (stepHeight / 2)
                result.set(`value ${i} ${j}`, new TextCanvasAnimationParams({
                    object: {
                        fontSize: 30,
                        origin: {x, y},
                        value: v1,
                        horizontalAlign: "center",
                        verticalAlign: "center"
                    }
                }))
                accumulatedWidth += widths[j]
            })
        })

        return result
    }

    public mergeWithTransformation(o: tableParamsType, t: Partial<tableParamsType>, p: number): onlyTableParamsType {
        let {values, width, height} = o
        return {
            values: t.values ? calculateArrayPercentValue(values, t.values, p) : values,
            width: t.width ? calculatePercentValue(width, t.width, p) : width,
            height: t.height ? calculatePercentValue(height, t.height, p) : height,
        }
    }

}
