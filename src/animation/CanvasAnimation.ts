import Params from "./Params";
import p5Types from "p5";
import {
    appearanceParamType,
    calculatePercentValue, calculatePointPercentValue,
    needAppearObject,
    toAppearanceParamType,
    toAppearancePercent
} from "../common/Utils";

export interface selectionType {
    time: number,
    duration?: number
}

type transformationType<T> = {
    object: Partial<T>
} & Partial<appearanceParamType>

export type paramsType<T extends Params, U extends selectionType = selectionType> = {
    transformations?: transformationType<T>[]
    selections?: U[]
    object: T
} & Partial<appearanceParamType>

export default abstract class CanvasAnimation<T extends Params, U extends selectionType = selectionType> {

    private appearanceParam: appearanceParamType
    private readonly transformations?: transformationType<T>[]
    private readonly selections?: U[]
    private readonly object: T

    public constructor(params: paramsType<T, U>) {
        this.appearanceParam = toAppearanceParamType(params)
        this.selections = params.selections
        this.transformations = params.transformations
        this.object = params.object
    }

    public getAppearTime(): number {
        return this.appearanceParam.appearTime || 0
    }

    public setAppearTime(value: number): void {
        this.appearanceParam.appearTime = value
    }

    protected getAppearDuration(): number {
        return this.appearanceParam.appearDuration || 0
    }

    public setAppearDuration(value: number): void {
        this.appearanceParam.appearDuration = value
    }

    public getDisappearTime(): number {
        return this.appearanceParam.disappearTime || 0
    }

    public setDisappearTime(value: number): void {
        this.appearanceParam.disappearTime = value
    }

    protected getDisappearDuration(): number {
        return this.appearanceParam.disappearDuration || 0
    }

    public setDisappearDuration(value: number): void {
        this.appearanceParam.disappearDuration = value
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

    public calculateObjectToBeDraw(time: number, p5: p5Types): T {
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
            result = this.mergeWithTransformation(result, transformationObject, percent, p5)
        })
        return result
    }

    public abstract mergeWithTransformation(obj: T, transform: Partial<T>, percent: number, p5: p5Types): T

    public abstract doDraw(p5: p5Types, object: T, time: number, selectedPercent: number, selection: U | null): void

    public abstract getIncludedObjects(object: T, selected?: boolean): { object: CanvasAnimation<Params>, selected: boolean }[]

}