import CanvasAnimation from '../CanvasAnimation'
import {Selection} from '../CanvasAnimationParams'
import p5Types from 'p5'
import AnimationStyle from '../../AnimationStyles'
import ComplexCanvasAnimationParams from './ComplexCanvasAnimationParams'

export interface ComplexCanvasAnimationSelection<T> extends Selection {
    type?: 'together' | 'sequentially'
    selector?: T
}

type TransformOptions = { type: 'together' | 'sequentially' }

export default class ComplexCanvasAnimation<T extends ComplexCanvasAnimationParams, U = unknown>
    extends CanvasAnimation<T, TransformOptions, ComplexCanvasAnimationSelection<U>> {

    protected doDraw(p5: p5Types, time: number, animationStyle: AnimationStyle): void {
        this.params.calculateContainedAnimations(animationStyle).forEach(a => {
            a.toCanvasAnimation(animationStyle).draw(p5, time)
        })
    }

}
