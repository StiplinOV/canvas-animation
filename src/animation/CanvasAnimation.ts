import p5Types from 'p5'
import {addPoints, convertStringColorToTriplet, needAppearObject, rotateVector, subtractPoints} from '../common/Utils'
import AnimationStyle, {getFillColor, getStrokeColor} from '../AnimationStyles'
import {
    AnimationObjectParams,
    JsonObjectParams,
    LayoutType,
    SelectionType,
    weightToNumber
} from './CanvasAnimationParams'
import SimpleCanvasAnimationParams from './simple/SimpleCanvasAnimationParams'

export default abstract class CanvasAnimation<
    T extends AnimationObjectParams = AnimationObjectParams,
    V extends SelectionType = SelectionType,
    U extends SimpleCanvasAnimationParams<JsonObjectParams, T, V> = SimpleCanvasAnimationParams<JsonObjectParams, T, V>
> {

    private readonly params: U

    private readonly animationStyle: AnimationStyle

    public constructor(params: U, animationStyle: AnimationStyle) {
        this.params = params
        this.animationStyle = animationStyle
    }

    public draw(p5: p5Types, time: number): void {
        const {animationStyle} = this
        const object = this.params.calculateObjectParamsInTime(time)
        const {
            origin,
            rotations,
            dashed
        } = object
        if (!needAppearObject(time, this.params.getPresenceParam())) {
            return
        }
        p5.push()
        const rotationsCopy = rotations?.map(r => ({...r})) ?? []
        const fillColorTriplet = convertStringColorToTriplet(getFillColor(animationStyle, object.fillColor))

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
        dashed && p5.drawingContext.setLineDash(dashed)
        p5.strokeWeight(weightToNumber(animationStyle, object.weight))
        p5.stroke(getStrokeColor(animationStyle, object.strokeColor))
        p5.fill(fillColorTriplet[0], fillColorTriplet[1], fillColorTriplet[2], object.fillColorOpacity * 255)

        this.drawObject(p5, object, animationStyle)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, obj: T, animationStyle: AnimationStyle): void

    public getZIndex(time: number, animationStyle: AnimationStyle): number {
        return this.params.getZIndex(time, animationStyle)
    }

    public getLayout(): LayoutType {
        return this.params.getLayout()
    }

}
