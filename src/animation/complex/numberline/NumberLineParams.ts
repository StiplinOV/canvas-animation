import { ObjectParams } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import { addPoints } from '../../../common/Utils'
import LineCanvasAnimationParams from '../../simple/line/LineCanvasAnimationParams'
import TextCanvasAnimationParams from '../../simple/text/TextCanvasAnimationParams'

const coordinateDashWidth = 20

type ChartRangeType = {
    coords: [number, number]
    value?: string
    layer?: number
}

type ChartRangeTypeWithLayer = ChartRangeType & {
    layer: number
}

export interface NumberLineParamsType extends ObjectParams {
    width: number
    height?: number
    scale?: number[]
    ranges?: ChartRangeType[]
    fontSize?: number
}

export default class NumberLineCanvasAnimationParams extends ComplexCanvasAnimationParams<NumberLineParamsType> {

    protected getIncludedAnimationParamsByParameter (object: NumberLineParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const {
            origin,
            width
        } = object
        const animationStyle = this.getAnimationStyle()
        const fontSize = object.fontSize ?? animationStyle.fontSize
        const ranges = this.getRangesWithLayers(object)
        const scale = this.getScale(object)
        const height = object.height ?? 0

        new ArrowCanvasAnimationParams({
            object: {
                origin,
                endPoint: addPoints(origin, {
                    x: width,
                    y: 0
                }),
                endType: 'Arrow',
                weight: 'bold'
            }
        }, this.p5, animationStyle).getIncludedAnimationParams().forEach((value, key) => {
            result.set(`axis ${key}`, value)
        })
        scale.sort((l, r) => l - r)
        console.log(scale.length)
        const length = scale.length
        const segmentWidth = width / (length + 1)
        const getLineX = (value: number): number => {
            const left = scale[0]
            const right = scale[length - 1]
            let valPercent
            if (right === left) {
                valPercent = 0.5
            } else {
                valPercent = (value - left) / (right - left)
            }
            return segmentWidth + (width - segmentWidth - segmentWidth) * valPercent
        }
        if (length) {
            scale.forEach(value => {
                const valX = getLineX(value)
                result.set(`scale ${value}`, new LineCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, {
                            x: valX,
                            y: coordinateDashWidth / 2
                        }),
                        endPoint: addPoints(origin, {
                            x: valX,
                            y: -coordinateDashWidth / 2
                        })
                    }
                }))
                result.set(`scale value ${value}`, new TextCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, {
                            x: valX,
                            y: Number(coordinateDashWidth)
                        }),
                        value: String(value),
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        fontSize
                    }
                }))
            })
        }
        const maxLayer = ranges.reduce((l, r) => Math.max(l, r.layer), 0)
        const rangeYCoordsMap = new Map<string, number>()

        let layerLineYSegment = coordinateDashWidth * 5
        if (height !== 0) {
            layerLineYSegment = (height - fontSize - 3 * coordinateDashWidth / 2) / (maxLayer + 1)
        }

        ranges.forEach(r => {
            const startX = getLineX(r.coords[0])
            const endX = getLineX(r.coords[1])
            const dashed = [3]
            let layerLineY = (r.layer + 1) * layerLineYSegment * -1
            if (height !== 0) {
                layerLineY = (r.layer + 1) * layerLineYSegment * -1
            }
            new ArrowCanvasAnimationParams({
                object: {
                    origin: addPoints(origin, {
                        x: startX,
                        y: layerLineY
                    }),
                    endPoint: addPoints(origin, {
                        x: endX,
                        y: layerLineY
                    }),
                    startType: 'Arrow',
                    endType: 'Arrow'
                }
            }, this.p5, animationStyle).getIncludedAnimationParams().forEach((v, k) => {
                result.set(`range [${r.coords[0]},${r.coords[1]}] arrow ` + k, v)
            })
            r.coords.forEach(c => {
                const rangeKey = `range ${c}`
                const x = getLineX(c)
                const rangeYCoord = Math.min(rangeYCoordsMap.get(rangeKey) ?? 0, layerLineY - coordinateDashWidth / 2)
                rangeYCoordsMap.set(rangeKey, rangeYCoord)
                result.set(rangeKey, new LineCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, {
                            x,
                            y: rangeYCoord
                        }),
                        endPoint: addPoints(origin, {
                            x,
                            y: 0
                        }),
                        dashed
                    }
                }))
            })
        })

        return result
    }

    private getScale (object: NumberLineParamsType): number[] {
        const scale = object.scale ?? []
        const ranges = object.ranges?.map(r => r.coords).flatMap(r => r) ?? []
        return [...scale, ...ranges].filter((value, index, array) => array.indexOf(value) === index)
    }

    private getRangesWithLayers (object: NumberLineParamsType): ChartRangeTypeWithLayer[] {
        const { ranges } = object
        const results: Map<number, ChartRangeType[]> = new Map<number, ChartRangeType[]>()
        const result: ChartRangeTypeWithLayer[] = []
        let maxLayer = 1

        if (!ranges) {
            return result
        }

        ranges.sort((l, r) => {
            let result = l.coords[0] - r.coords[0]
            if (result === 0) {
                result = l.coords[1] - r.coords[1]
            }
            return result
        })
        ranges.forEach(r => {
            if (r.layer !== undefined) {
                const layerRanges = results.get(r.layer) ?? []
                layerRanges.push(r)
                results.set(r.layer, layerRanges)
                maxLayer = Math.max(r.layer, maxLayer)
            }
        })
        ranges.forEach(r => {
            const layer = r.layer
            if (layer === undefined) {
                let i = 0
                while (true) {
                    const layerRanges = results.get(i) ?? []
                    if (!this.hasRangeIntersection(layerRanges.map(lr => lr.coords), r.coords)) {
                        layerRanges.push(r)
                        results.set(i, layerRanges)
                        result.push({
                            ...r,
                            layer: i
                        })
                        break
                    }
                    i++
                }
            } else {
                result.push({
                    ...r,
                    layer
                })
            }
        })
        return result
    }

    private hasRangeIntersection (ranges: [number, number][], search: [number, number]): boolean {
        for (let i = 0; i < ranges.length; i++) {
            if (this.isRangeInRange(ranges[i], search)) {
                return true
            }
        }
        return false
    }

    private isRangeInRange (first: [number, number], second: [number, number]): boolean {
        if (first[0] > second[0] && first[0] < second[1]) {
            return true
        }
        if (first[1] > second[0] && first[1] < second[1]) {
            return true
        }
        if (second[0] > first[0] && second[0] < first[1]) {
            return true
        }
        if (second[1] > first[0] && second[1] < first[1]) {
            return true
        }
        return first[0] === second[0] && first[1] === second[1]
    }

}
