import CanvasAnimation, {paramsType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";
import GeometryHelper from "../../common/GeometryHelper";

export default abstract class ComplexCanvasAnimation<T extends Params> extends CanvasAnimation<T> {

    private allCanvasAnimations: CanvasAnimation<Params>[] = []

    constructor(params: paramsType<T>, geometryHelper: GeometryHelper) {
        super(params)
        this.calculateIncludedObjects(params, geometryHelper).forEach(o => this.addCanvasAnimation(o))

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

    protected abstract calculateIncludedObjects(params: paramsType<T>, geometryHelper: GeometryHelper): CanvasAnimation<Params>[]

    doDraw(p5: p5Types, time: number, selected: boolean, selectedPercent: number): void {
        const rotationAxis = this.getOrigin()
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(this.getObject().rotation || 0)
        this.allCanvasAnimations.forEach(p => p.doDraw(p5, time, selected, selectedPercent))
        p5.pop()
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