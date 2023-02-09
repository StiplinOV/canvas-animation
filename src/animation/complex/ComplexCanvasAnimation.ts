import CanvasAnimation from '../CanvasAnimation'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import ComplexCanvasAnimationParams from './ComplexCanvasAnimationParams'
import {ObjectParams} from '../CanvasAnimationParams'

export default class ComplexCanvasAnimation<T extends ObjectParams, U extends ComplexCanvasAnimationParams<T>> extends CanvasAnimation<T, U> {

    protected doDraw(p5: p5Types, time: number, object: T, animationStyle: AnimationStyle): void {
        this.params.calculateContainedAnimations(animationStyle).forEach(a => {
            a.toCanvasAnimation(animationStyle).draw(p5, time)
        })
    }

}
