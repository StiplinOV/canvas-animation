import CanvasAnimation from '../CanvasAnimation'
import p5Types from 'p5'
import {toAppearancePercent} from '../../common/Utils'
import SimpleCanvasAnimationParams from "./SimpleCanvasAnimationParams";
import {ObjectParams, Selection} from "../CanvasAnimationParams";
import AnimationStyle from "../../AnimationStyles";

export default abstract class SimpleCanvasAnimation<T extends ObjectParams, U extends SimpleCanvasAnimationParams<T>> extends CanvasAnimation<U> {

    protected doDraw(p5: p5Types, time: number, animationStyle: AnimationStyle): void {
        const object = this.params.calculateObjectParamsInTime(time, animationStyle)
        const selectionInfo = this.params.calculateSelectionInfo(time)
        p5.strokeWeight(object.weight ?? animationStyle.strokeWeight)
        p5.stroke(animationStyle.strokeColor)
        p5.fill(animationStyle.fillColor)
        this.drawObject(p5, object, toAppearancePercent(time, this.params.getAppearanceParam()), selectionInfo.percent, animationStyle)
    }

    public abstract drawObject(p5: p5Types, obj: T, perc: number, selectedPercent: number, animationStyle: AnimationStyle): void

}
