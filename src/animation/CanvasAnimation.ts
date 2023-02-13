import p5Types from 'p5'
import {addPoints, needAppearObject, rotateVector, subtractPoints} from '../common/Utils'
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
        const {origin, rotations} = object

        if (!needAppearObject(time, this.params.getAppearanceParam())) {
            return
        }
        p5.push()
        const rotationsCopy = rotations?.map(r => ({...r})) ?? []

        let result = origin
        const angle = rotationsCopy.reduce((l, r) => l + r.angle, 0)
        for (let i = 0; i < rotationsCopy.length; i++) {
            const rotation = rotationsCopy[i]
            const vectorPoint = subtractPoints(result, rotation.axis)
            result = addPoints(rotateVector(p5, vectorPoint, rotation.angle), rotation.axis)
            for (let j = i; j < rotationsCopy.length; j++) {
                const nextRotation = rotationsCopy[j]
                nextRotation.axis = rotateVector(p5, nextRotation.axis, rotation.angle)
            }
        }
        p5.translate(result.x, result.y)
        p5.rotate(angle)
        object.dashed && p5.drawingContext.setLineDash(object.dashed)
        this.doDraw(p5, time, object, this.animationStyle)
        p5.pop()
    }

    protected abstract doDraw(p5: p5Types, time: number, object: T, animationStyle: AnimationStyle): void

}
