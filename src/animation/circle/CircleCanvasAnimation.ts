import CircleParams from "./CircleParams";
import CanvasAnimation, {paramsType} from "../CanvasAnimation";
import p5Types from "p5";

export default class CircleCanvasAnimation extends CanvasAnimation<CircleParams> {

    private readonly appearType?: "clock"
    private readonly disappearType?: "clock"

    constructor(params: paramsType<CircleParams> & {
        appearType?: "clock",
        disappearType?: "clock",
    }) {
        super(params)
        this.appearType = params.appearType
        this.disappearType = params.disappearType
    }

    protected drawAppearedObject(p5: p5Types, percent: number): void {
        if (this.appearType === "clock") {
            p5.arc(this.x(), this.y(), this.diameter(), this.diameter(), 0, p5.PI * 2 * percent)
        } else {
            throw new Error("wrong appearType " + this.appearType)
        }
    }

    protected drawDisappearedObject(p5: p5Types, percent: number) {
        if (this.disappearType === "clock") {
            p5.arc(this.x(), this.y(), this.diameter(), this.diameter(), p5.PI * 2 * percent, 0)
        } else {
            throw new Error("wrong disappearType " + this.disappearType)
        }
    }

    protected drawObject(p5: p5Types, time: number): void {
        p5.circle(this.x(), this.y(), this.diameter())
    }

    private x(): number {
        return this.getObject().centerPoint.x
    }

    private y(): number {
        return this.getObject().centerPoint.y
    }

    private diameter(): number {
        return this.getObject().diameter
    }

}