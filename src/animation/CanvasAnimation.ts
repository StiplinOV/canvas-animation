import Params from "./Params";
import p5Types from "p5";

export type paramsType<T extends Params> = {
    appearTime?: number,
    disappearTime?: number,
    appearDuration?: number,
    disappearDuration?: number,
    object: T
}

export default abstract class CanvasAnimation<T extends Params> {

    private appearTime?: number
    private disappearTime?: number
    private appearDuration?: number
    private disappearDuration?: number
    private readonly object: T

    protected constructor(params: paramsType<T>) {
        this.appearTime = params.appearTime
        this.disappearTime = params.disappearTime
        this.appearDuration = params.appearDuration
        this.disappearDuration = params.disappearDuration
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

    public abstract draw(p5: p5Types, time: number): void

}