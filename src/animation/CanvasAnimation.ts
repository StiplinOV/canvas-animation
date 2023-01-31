import p5Types from 'p5'
import {needAppearObject} from '../common/Utils'
import {ZeroPoint} from '../common/Point'
import AnimationStyle from '../AnimationStyles'
import CanvasAnimationParams from './CanvasAnimationParams'

export default abstract class CanvasAnimation<T extends CanvasAnimationParams = CanvasAnimationParams> {

    public readonly params: T

    private readonly animationStyle: AnimationStyle

    public constructor(params: T, animationStyle: AnimationStyle) {
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
        this.doDraw(p5, time, this.animationStyle)
        p5.pop()
    }

    protected abstract doDraw(p5: p5Types, time: number, animationStyle: AnimationStyle): void

}
