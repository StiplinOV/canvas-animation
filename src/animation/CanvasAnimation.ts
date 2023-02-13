import p5Types from 'p5'
import {addPoints, needAppearObject, rotateVector, subtractPoints, toAppearancePercent} from '../common/Utils'
import AnimationStyle from '../AnimationStyles'
import {colorToHex, ObjectParams, weightToNumber} from './CanvasAnimationParams'
import SimpleCanvasAnimationParams from './simple/SimpleCanvasAnimationParams'

export default abstract class CanvasAnimation<T extends ObjectParams = ObjectParams, U extends SimpleCanvasAnimationParams<T> = SimpleCanvasAnimationParams<T>> {

    public readonly params: U

    private readonly animationStyle: AnimationStyle

    public constructor(params: U, animationStyle: AnimationStyle) {
        this.params = params
        this.animationStyle = animationStyle
    }

    public draw(p5: p5Types, time: number): void {
        const {animationStyle} = this
        const object = this.params.calculateObjectParamsInTime(time, animationStyle)
        const {origin, rotations, dashed} = object

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
        dashed && p5.drawingContext.setLineDash(dashed)
        const selectionInfo = this.params.calculateSelectionInfo(time)
        p5.strokeWeight(weightToNumber(object.weight ?? animationStyle.strokeWeight, animationStyle))
        p5.stroke(colorToHex(object.strokeColor ?? animationStyle.strokePrimaryColor, animationStyle))
        p5.fill(animationStyle.fillColor)
        this.drawObject(p5, object, toAppearancePercent(time, this.params.getAppearanceParam()), selectionInfo.percent, animationStyle)
        p5.pop()
    }

    public abstract drawObject(p5: p5Types, obj: T, perc: number, selectedPercent: number, animationStyle: AnimationStyle): void

}
