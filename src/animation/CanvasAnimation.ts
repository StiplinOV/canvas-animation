import Params from "./Params";
import p5Types from "p5";
import {Point} from "../common/Point";

export type paramsType<T extends Params> = {
    appearTime?: number,
    disappearTime?: number,
    appearDuration?: number,
    disappearDuration?: number,
    selections?: { time: number, duration?: number }[]
    object: T
}

export default abstract class CanvasAnimation<T extends Params> {

    private appearTime?: number
    private disappearTime?: number
    private appearDuration?: number
    private disappearDuration?: number
    private selections?: { time: number, duration?: number }[]
    private readonly object: T

    public constructor(params: paramsType<T>) {
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
        for (let i = 0; i < selections.length; i++) {
            const selection = selections[i]
            const duration = selection.duration
            if (time >= selection.time) {
                selected = !duration || time <= selection.time + duration
                if (selected) {
                    selectedPercent = duration ? (time - selection.time)/duration : 1
                    selectedPercent = 2 * Math.abs(0.5 - Math.abs(selectedPercent - 0.5))
                    break
                }
            }
        }
        this.doDraw(p5, time, selected, selectedPercent)
    }

    public abstract doDraw(p5: p5Types, time: number, selected: boolean, selectedPercent: number): void

    public abstract getIncludedObjects(): CanvasAnimation<Params>[]

    public abstract getOrigin(): Point

}