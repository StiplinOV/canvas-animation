import Params from "./Params";
import p5Types from "p5";
import {Point} from "../common/Point";

export interface selectionType { time: number, duration?: number }

export type paramsType<T extends Params, U extends selectionType = selectionType> = {
    appearTime?: number,
    disappearTime?: number,
    appearDuration?: number,
    disappearDuration?: number,
    selections?: U[]
    object: T
}

export default abstract class CanvasAnimation<T extends Params, U extends selectionType = selectionType> {

    private appearTime?: number
    private disappearTime?: number
    private appearDuration?: number
    private disappearDuration?: number
    private readonly selections?: U[]
    private readonly object: T

    public constructor(params: paramsType<T, U>) {
        this.appearTime = params.appearTime
        this.disappearTime = params.disappearTime
        this.appearDuration = params.appearDuration
        this.disappearDuration = params.disappearDuration
        this.selections = params.selections
        this.object = params.object
    }

    protected getObject(): T {
        return this.object
    }

    public getZIndex(): number {
        return this.object.zIndex || 0
    }

    public getAppearTime(): number {
        return this.appearTime || 0
    }

    public setAppearTime(value: number): void {
        this.appearTime = value
    }

    protected getAppearDuration(): number {
        return this.appearDuration || 0
    }

    public setAppearDuration(value: number): void {
        this.appearDuration = value
    }

    public getDisappearTime(): number {
        return this.disappearTime || 0
    }

    public setDisappearTime(value: number): void {
        this.disappearTime = value
    }

    protected getDisappearDuration(): number {
        return this.disappearDuration || 0
    }

    public setDisappearDuration(value: number): void {
        this.disappearDuration = value
    }

    public draw(p5: p5Types, time: number): void {
        const selections = this.selections || []
        let selected = false
        let selectedPercent = 0
        let selection = null
        for (let i = 0; i < selections.length; i++) {
            const currentSelection = selections[i]
            const duration = currentSelection.duration
            if (time >= currentSelection.time) {
                selected = !duration || time <= currentSelection.time + duration
                if (selected) {
                    selectedPercent = duration ? (time - currentSelection.time) / duration : 1
                    selection = currentSelection
                    break
                }
            }
        }
        this.doDraw(p5, time, selectedPercent, selection)
    }

    public abstract doDraw(p5: p5Types, time: number, selectedPercent: number, selection: U | null): void

    public abstract getIncludedObjects(): CanvasAnimation<Params>[]

    public abstract getOrigin(): Point

}