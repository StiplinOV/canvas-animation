import CanvasAnimation from "./CanvasAnimation";
import Params from "./Params";
import p5Types from "p5";

export default class ComplexCanvasAnimation<T extends Params> extends CanvasAnimation<T> {

    private allCanvasAnimations: CanvasAnimation<Params>[] = []

    draw(p5: p5Types, time: number): void {
        this.allCanvasAnimations.forEach(p => p.draw(p5, time))
    }

    protected getAllCanvasAnimations(): CanvasAnimation<Params>[] {
        return this.allCanvasAnimations
    }

    protected getNumberOfAllCanvasAnimations(): number {
        return this.allCanvasAnimations.length
    }

    protected addCanvasAnimation(animation: CanvasAnimation<Params>): void {
        this.allCanvasAnimations.push(animation)
    }

}