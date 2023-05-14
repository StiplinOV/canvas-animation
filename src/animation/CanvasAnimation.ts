import p5Types from 'p5'
import {
    addPoints,
    calculateColorPercentValue,
    calculatePercentValue,
    convertPercentToFadeInFadeOut,
    needAppearObject,
    rotateVector,
    subtractPoints,
    toAppearancePercent
} from '../common/Utils'
import AnimationStyle, { getFillColor, getStrokeColor } from '../AnimationStyles'
import { LayoutType, ObjectParams, Selection, weightToNumber } from './CanvasAnimationParams'
import SimpleCanvasAnimationParams, { SelectionInfo } from './simple/SimpleCanvasAnimationParams'

export default abstract class CanvasAnimation<T extends ObjectParams = ObjectParams, V extends Selection = Selection, U extends SimpleCanvasAnimationParams<T, V> = SimpleCanvasAnimationParams<T, V>> {

    private readonly params: U

    private readonly animationStyle: AnimationStyle

    public constructor (params: U, animationStyle: AnimationStyle) {
        this.params = params
        this.animationStyle = animationStyle
    }

    public draw (p5: p5Types, time: number): void {
        const { animationStyle } = this
        const object = this.params.calculateObjectParamsInTime(time, animationStyle)
        const {
            origin,
            rotations,
            dashed
        } = object

        if (!needAppearObject(time, this.params.getAppearanceParam())) {
            return
        }
        p5.push()
        const rotationsCopy = rotations?.map(r => ({ ...r })) ?? []

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
        //const selectedPercent = convertPercentToFadeInFadeOut(selectionInfo.percent)
        // const weight = calculatePercentValue(
        //     weightToNumber(animationStyle, object.weight),
        //     weightToNumber(animationStyle, object.weight) * 2,
        //     selectedPercent
        // )
        p5.strokeWeight(weightToNumber(animationStyle, object.weight))
        p5.stroke(getStrokeColor(animationStyle, object.strokeColor))
        p5.fill(getFillColor(animationStyle, object.fillColor))
        this.drawObject(p5, object, toAppearancePercent(time, this.params.getAppearanceParam()), selectionInfo, animationStyle)
        p5.pop()
    }

    public abstract drawObject (p5: p5Types, obj: T, perc: number, selectedPercent: SelectionInfo<V>, animationStyle: AnimationStyle): void

    public getZIndex (time: number, animationStyle: AnimationStyle): number {
        return this.params.getZIndex(time, animationStyle)
    }

    public getLayout(): LayoutType {
        return this.params.getLayout()
    }

}
