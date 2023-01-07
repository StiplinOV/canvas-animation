import CanvasAnimation, {paramsType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";

export default abstract class ComplexCanvasAnimation<T extends Params> extends CanvasAnimation<T> {

    private allCanvasAnimations: CanvasAnimation<Params>[] = []

    constructor(params: paramsType<T>, p5: p5Types) {
        super(params)
        this.calculateIncludedObjects(params, p5).forEach(o => this.addCanvasAnimation(o))

        const objectAppearDuration = this.getAppearDuration() / this.getNumberOfAllCanvasAnimations()
        const objectDisappearDuration = this.getDisappearDuration() / this.getNumberOfAllCanvasAnimations()
        let appearTime = this.getAppearTime()
        let disappearTime = this.getDisappearTime()

        this.getIncludedObjects().forEach(object => {
            object.setAppearTime(appearTime)
            object.setAppearDuration(objectAppearDuration)
            appearTime += objectAppearDuration
        })
        this.getIncludedObjects().reverse().forEach(object => {
            object.setDisappearTime(disappearTime)
            object.setDisappearDuration(objectDisappearDuration)
            disappearTime += objectDisappearDuration
        })
    }

    protected abstract calculateIncludedObjects(params: paramsType<T>, p5: p5Types): CanvasAnimation<Params>[]

    draw(p5: p5Types, time: number): void {
        this.allCanvasAnimations.forEach(p => p.draw(p5, time))
    }

    public getIncludedObjects(): CanvasAnimation<Params>[] {
        return this.allCanvasAnimations.flatMap(a => a.getIncludedObjects())
    }

    protected getNumberOfAllCanvasAnimations(): number {
        return this.getIncludedObjects().length
    }

    protected addCanvasAnimation(animation: CanvasAnimation<Params>): void {
        this.allCanvasAnimations.push(animation)
    }

}