import Params from "./Params";
import p5Types from "p5";
import {camera} from "../camera/CameraParams";

export type paramsType<T extends Params>= {appearTime: number, disappearTime?: number, appearDuration?: number, disappearDuration?: number, object: T}

export default abstract class CanvasAnimation<T extends Params> {

    private readonly appearTime: number
    private readonly disappearTime?: number
    private readonly appearDuration?: number
    private readonly disappearDuration?: number
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
        return this.appearTime
    }

    public draw(p5: p5Types, time: number, camera: camera): void {
        const disappearTime = this.disappearTime || Number.POSITIVE_INFINITY
        const {disappearDuration} = this
        if (this.appearTime >= time) {
            return
        }
        if ((disappearTime + (disappearDuration || 0)) <= time) {
            return
        }
        p5.strokeWeight(this.getObject().weight || 1)
        p5.color(255)
        //camera.rotation && console.log(camera.rotation)
        if (camera.rotation) {
            p5.pop()
            p5.push()
            p5.strokeWeight(this.getObject().weight || 1)
            p5.rotateZ(camera.rotation)
            p5.translate(0, 0, this.getObject().zIndex)
        }
        //p5.pop()
        // camera.rotation && p5.rotate(camera.rotation)
        // camera.rotation && console.log(p5.rotationX, p5.rotationY, p5.rotationZ)
        if (this.appearDuration && this.appearDuration >= (time - this.getAppearTime())) {
            let percent = (time - this.getAppearTime())/this.appearDuration
            this.drawAppearedObject(p5, percent)
        } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
            let percent = (time - disappearTime)/disappearDuration
            this.drawDisappearedObject(p5, percent)
        } else {
            this.drawObject(p5, time)
        }
    }

    protected abstract drawAppearedObject(p5:p5Types, percent: number): void

    protected abstract drawDisappearedObject(p5:p5Types, percent: number): void

    protected abstract drawObject(p5: p5Types, time: number): void

}