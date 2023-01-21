import p5Types from "p5";
import {
    appearanceParamType,
    calculatePercentValue,
    calculatePointPercentValue,
    needAppearObject,
    toAppearanceParamType,
    toAppearancePercent
} from "../common/Utils";
import {Point, ZeroPoint} from "../common/Point";

export type objectParamsType<T extends {} = {}> = {
    weight?: number
    zIndex?: number
    rotation?: number
    offset?: Point
    dashed?: number[]
    origin: Point
} & T

export interface selectionType {
    time: number,
    duration?: number
}

type transformationType<T> = {
    object: Partial<objectParamsType<T>>
} & appearanceParamType

type transformationParamType<T> = {
    object: Partial<objectParamsType<T>>
} & Partial<appearanceParamType>

const transformationParamToTransformation = <T>(t: transformationParamType<T>): transformationType<T> =>
    ({...t, ...toAppearanceParamType(t)})

export type paramsType<T extends {}, U extends selectionType = selectionType> = {
    transformations?: transformationParamType<T>[]
    selections?: U[]
    object: objectParamsType<T>
} & Partial<appearanceParamType>

export type selectionInfoType<U extends selectionType = selectionType> = { selection?: U | null, percent: number }

export default abstract class CanvasAnimation<T extends {}, U extends selectionType = selectionType> {

    private appearanceParam: appearanceParamType
    private readonly transformations: transformationType<T>[]
    private readonly selections: U[]
    private readonly object: objectParamsType<T>

    public constructor(params: paramsType<T, U>) {
        const transformations = params.transformations || []
        this.appearanceParam = toAppearanceParamType(params)
        this.selections = params.selections || []
        this.transformations = transformations.map(t => transformationParamToTransformation(t))
        this.object = params.object
    }

    public getAppearanceParam(): appearanceParamType {
        return this.appearanceParam
    }

    public setAppearanceParam(param: Partial<appearanceParamType>): void {
        this.appearanceParam = toAppearanceParamType({
            ...this.appearanceParam,
            ...param
        })
    }

    protected getSelections(): U[] {
        return this.selections
    }

    public addSelection(selection: U): void {
        this.selections.push(selection)
    }

    public draw(p5: p5Types, time: number): void {
        const object = this.calculateObjectParamsInTime(time, p5)
        const offset = object.offset || ZeroPoint
        const rotationAxis = object.origin

        if (!needAppearObject(time, this.getAppearanceParam())) {
            return
        }
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation || 0)
        p5.translate(offset.x, offset.y)
        object.dashed && p5.drawingContext.setLineDash(object.dashed)
        this.doDraw(p5, time)
        p5.pop()
    }

    protected abstract doDraw(p5: p5Types, time: number): void

    public getZIndex(time: number, p5: p5Types): number {
        return this.calculateObjectParamsInTime(time, p5).zIndex || 0
    }

    public calculateObjectParamsInTime(time: number, p5: p5Types, percentParam?: number): objectParamsType<T> {
        const sourceObject = this.object
        let result = {...sourceObject}
        this.getTransformations()
            .filter(t => needAppearObject(time, toAppearanceParamType(t)))
            .sort((l, r) => l.appearTime - r.appearTime)
            .forEach((t) => {
                const transformationObject = t.object
                const percent = percentParam || toAppearancePercent(time, toAppearanceParamType(t))
                if (transformationObject.origin) {
                    result.origin = calculatePointPercentValue(result.origin, transformationObject.origin, percent)
                }
                if (transformationObject.zIndex) {
                    result.zIndex = calculatePercentValue(result.zIndex || 0, transformationObject.zIndex, percent)
                }
                if (transformationObject.weight) {
                    result.weight = calculatePercentValue(result.weight || 1, transformationObject.weight, percent)
                }
                if (transformationObject.rotation) {
                    result.rotation = calculatePercentValue(result.rotation || 0, transformationObject.rotation, percent)
                }
                if (transformationObject.offset) {
                    result.offset = calculatePointPercentValue(result.offset || ZeroPoint, transformationObject.offset, percent)
                }
                const transformDashed = transformationObject.dashed
                const resultDashed = result.dashed || []
                if (transformDashed && (transformDashed.length || resultDashed.length)) {
                    let resultLength = 1
                    if (resultDashed.length) {
                        resultLength *= resultDashed.length
                    }
                    if (transformDashed.length) {
                        resultLength *= transformDashed.length
                    }

                    let sourceCopy = []
                    let transformCopy = []
                    for (let i = 0; i < resultLength; i++) {
                        sourceCopy.push(resultDashed.length ? resultDashed[i % resultDashed.length] : 0)
                        transformCopy.push(transformDashed.length ? transformDashed[i % transformDashed.length] : 0)
                    }
                    for (let i = 0; i < resultLength; i++) {
                        sourceCopy[i] = calculatePercentValue(sourceCopy[i], transformCopy[i], percent)
                    }
                    result.dashed = sourceCopy
                }
                result = {
                    ...result,
                    ...this.mergeWithTransformation(result, transformationObject, percent, p5)
                }
            })
        return result
    }

    public getObject(): objectParamsType<T> {
        return this.object
    }

    protected getTransformations(): transformationType<T>[] {
        return this.transformations
    }

    public appendTransformation(transformation: transformationParamType<T>): void {
        this.transformations.push(transformationParamToTransformation(transformation))
    }

    public abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, p5: p5Types): T

}