import Params from "./Params";
import p5Types from "p5";

export type paramsType<T extends Params, S extends string, U extends string> = {
    appearTime?: number,
    disappearTime?: number,
    appearDuration?: number,
    disappearDuration?: number,
    appearType?: S,
    disappearType?: U,
    object: T
}

export default abstract class CanvasAnimation<T extends Params, S extends string, U extends string> {

    private appearTime?: number
    private disappearTime?: number
    private appearType?: S
    private appearDuration?: number
    private disappearDuration?: number
    private disappearType?: U
    private readonly object: T

    public constructor(params: paramsType<T, S, U>) {
        this.appearTime = params.appearTime
        this.disappearTime = params.disappearTime
        this.appearType = params.appearType
        this.appearDuration = params.appearDuration
        this.disappearDuration = params.disappearDuration
        this.disappearType = params.disappearType
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

    public getAppearType(): S | null {
        return this.appearType || null
    }

    public setAppearType(value: S) {
        this.appearType = value;
    }

    public getDisappearType(): U | null {
        return this.disappearType || null
    }

    public setDisappearType(value: U) {
        this.disappearType = value;
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

    public abstract getDefaultAppearType(): S

    public abstract getDefaultDisappearType(): U

    public abstract draw(p5: p5Types, time: number): void

    public abstract getIncludedObjects(): CanvasAnimation<Params, string, string>[]

}