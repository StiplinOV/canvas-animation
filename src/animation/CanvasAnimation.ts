import p5Types from "p5";
import {
    appearanceParamType,
    calculatePercentValue,
    calculatePointPercentValue,
    needAppearObject,
    toAppearanceParamType,
    toAppearancePercent
} from "../common/Utils";
import {Point} from "../common/Point";

export type objectParamsType<T extends {} = {}> = {
    weight?: number
    zIndex?: number
    rotation?: number
    offset?: Point
    origin: Point
} & T

export interface selectionType {
    time: number,
    duration?: number
}

type transformationType<T> = {
    object: Partial<objectParamsType<T>>
} & Partial<appearanceParamType>

export type paramsType<T extends {}, U extends selectionType = selectionType> = {
    transformations?: transformationType<T>[]
    selections?: U[]
    object: objectParamsType<T>
} & Partial<appearanceParamType>

export default abstract class CanvasAnimation<T extends {}, U extends selectionType = selectionType> {

    private appearanceParam: appearanceParamType
    private readonly transformations?: transformationType<T>[]
    private readonly selections?: U[]
    private readonly object: objectParamsType<T>

    public constructor(params: paramsType<T, U>) {
        this.appearanceParam = toAppearanceParamType(params)
        this.selections = params.selections
        this.transformations = params.transformations
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

    public draw(p5: p5Types, time: number): void {
        const selections = this.selections || []
        let selected = false
        let selectedPercent = 0
        let selection = null
        for (let i = 0; i < selections.length; i++) {
            const currentSelection = selections[i]
            const duration = currentSelection.duration
            //TODO func
            if (time >= currentSelection.time) {
                selected = !duration || time <= currentSelection.time + duration
                if (selected) {
                    selectedPercent = duration ? (time - currentSelection.time) / duration : 1
                    selection = currentSelection
                    break
                }
            }
        }
        this.doDraw(p5, this.calculateObjectToBeDraw(time, p5), time, selectedPercent, selection)
    }

    public getZIndex(time: number, p5: p5Types): number {
        return this.calculateObjectToBeDraw(time, p5).zIndex || 0
    }

    public calculateObjectToBeDraw(time: number, p5: p5Types): objectParamsType<T> {
        const sourceObject = this.object
        let result = {
            ...sourceObject
        }
        const transformations = this.transformations?.filter(t => needAppearObject(time, toAppearanceParamType(t))) || []
        transformations.forEach(transformation => {
            const transformationObject = transformation.object
            const percent = toAppearancePercent(time, toAppearanceParamType(transformation))

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
                result.offset = calculatePointPercentValue(result.offset || {
                    x: 0,
                    y: 0
                }, transformationObject.offset, percent)
            }
            result = {
                ...result,
                ...this.mergeWithTransformation(result, transformationObject, percent, p5)
            }
        })
        return result
    }

    public abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, p5: p5Types): T

    public abstract doDraw(p5: p5Types, object: objectParamsType<T>, time: number, selectedPercent: number, selection: U | null): void

    public abstract getIncludedObjects(object: objectParamsType<T>, selected?: boolean): { object: CanvasAnimation<{}>, selected: boolean }[]

}