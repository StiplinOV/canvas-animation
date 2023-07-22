import CanvasAnimationParams, {
    ObjectParams,
    SelectionType
} from '../CanvasAnimationParams'
import AnimationStyle from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'

export default abstract class SimpleCanvasAnimationParams<T extends ObjectParams = ObjectParams,
    V extends SelectionType = SelectionType> extends CanvasAnimationParams<T, unknown, V> {

    toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[] {
        return [this.toCanvasAnimation(animationStyle)]
    }

    protected abstract toCanvasAnimation (animationStyle: AnimationStyle): CanvasAnimation

}
