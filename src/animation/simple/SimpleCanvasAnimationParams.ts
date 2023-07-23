import CanvasAnimationParams from '../CanvasAnimationParams'
import AnimationStyle from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'
import {AnimationObjectParams} from "../../object/AnimationParams";

export default abstract class SimpleCanvasAnimationParams<T extends AnimationObjectParams = AnimationObjectParams> extends CanvasAnimationParams<T, unknown> {

    toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[] {
        return [this.toCanvasAnimation(animationStyle)]
    }

    protected abstract toCanvasAnimation (animationStyle: AnimationStyle): CanvasAnimation

}
