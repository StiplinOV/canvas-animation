import CanvasAnimation, {paramsType, selectionType} from "../CanvasAnimation";
import Params from "../Params";
import p5Types from "p5";
import GeometryHelper from "../../common/GeometryHelper";

export interface complexCanvasAnimationSelectionType<T> extends selectionType {
    type: "together" | "sequentially",
    selector?: T
}

export default abstract class ComplexCanvasAnimation<T extends Params, U> extends CanvasAnimation<T, complexCanvasAnimationSelectionType<U>> {

    private allCanvasAnimations: CanvasAnimation<Params>[] = []

    constructor(params: paramsType<T, complexCanvasAnimationSelectionType<U>>, geometryHelper: GeometryHelper) {
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

    //А тут что? Параметризация?
    protected abstract calculateIncludedObjects(params: paramsType<T>, geometryHelper: GeometryHelper): CanvasAnimation<Params>[]

    doDraw(p5: p5Types, time: number, selectedPercent: number, selection: complexCanvasAnimationSelectionType<U>): void {
        const rotationAxis = this.getOrigin()
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(this.getObject().rotation || 0)
        /*
            Еще можно сделать облако тегов:

            может как то тут сделать финт ушами
            Если применён селектор то надо как то вернуть селектед персент
         */
        this.allCanvasAnimations.forEach(p => p.doDraw(p5, time, selectedPercent, null))
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