import CanvasAnimation from '../CanvasAnimation'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import ComplexCanvasAnimationParams from './ComplexCanvasAnimationParams'

export default class ComplexCanvasAnimation<T extends ComplexCanvasAnimationParams> extends CanvasAnimation<T> {

    protected doDraw(p5: p5Types, time: number, animationStyle: AnimationStyle): void {
        this.params.calculateContainedAnimations(animationStyle).forEach(a => {
            a.toCanvasAnimation(animationStyle).draw(p5, time)
        })
    }

}
