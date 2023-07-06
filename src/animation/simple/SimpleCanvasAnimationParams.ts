import CanvasAnimationParams, {
    ObjectParams,
    ObjectParamsWithPresence,
    SelectionType,
    weightToNumber
} from '../CanvasAnimationParams'
import AnimationStyle, { getFillColor, getStrokeColor } from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'
import {
    calculateColorPercentValue,
    calculatePercentValue,
    calculatePointPercentValue,
    calculateRotationsPercentValue,
    needAppearObject, toAppearancePercent
} from '../../common/Utils'
import { ZeroPoint } from '../../common/Point'
import { uniqueArray } from '../../common/Alghoritm'

export interface SelectionInfo<U extends SelectionType = SelectionType> {
    selection?: U | null
    percent: number
}

export default abstract class SimpleCanvasAnimationParams<T extends ObjectParams = ObjectParams,
    V extends SelectionType = SelectionType> extends CanvasAnimationParams<T, unknown, V> {

    toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[] {
        return [this.toCanvasAnimation(animationStyle)]
    }

    protected abstract toCanvasAnimation (animationStyle: AnimationStyle): CanvasAnimation

}
