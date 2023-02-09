import p5Types from 'p5'
import {needAppearObject} from '../common/Utils'
import {ZeroPoint} from '../common/Point'
import AnimationStyle from '../AnimationStyles'
import CanvasAnimationParams, {ObjectParams} from './CanvasAnimationParams'

export default abstract class CanvasAnimation<T extends ObjectParams = ObjectParams, U extends CanvasAnimationParams<T> = CanvasAnimationParams<T>> {

    public readonly params: U

    private readonly animationStyle: AnimationStyle

    public constructor(params: U, animationStyle: AnimationStyle) {
        this.params = params
        this.animationStyle = animationStyle
    }

    public draw(p5: p5Types, time: number): void {
        const object = this.params.calculateObjectParamsInTime(time, this.animationStyle)
        const offset = object.offset ?? ZeroPoint
        const rotationAxis = object.origin

        if (!needAppearObject(time, this.params.getAppearanceParam())) {
            return
        }
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation ?? this.animationStyle.objectRotation)
        p5.translate(offset.x, offset.y)
        object.dashed && p5.drawingContext.setLineDash(object.dashed)
        this.doDraw(p5, time, object, this.animationStyle)
        p5.pop()
    }

    protected abstract doDraw(p5: p5Types, time: number, object: T, animationStyle: AnimationStyle): void

}
