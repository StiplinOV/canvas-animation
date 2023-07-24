import CanvasAnimationParams, {
    AnimationObjectParams,
    JsonObjectParams,
    SelectionType
} from '../CanvasAnimationParams'
import AnimationStyle from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'

export default abstract class SimpleCanvasAnimationParams<
    T extends JsonObjectParams = JsonObjectParams,
    U extends AnimationObjectParams = AnimationObjectParams,
    V extends SelectionType = SelectionType
> extends CanvasAnimationParams<T, U, unknown, V> {

    toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[] {
        return [this.toCanvasAnimation(animationStyle)]
    }

    protected abstract toCanvasAnimation (animationStyle: AnimationStyle): CanvasAnimation

}
