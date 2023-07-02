import p5Types from 'p5'
import { calculatePercentValue } from '../../../common/Utils'
import AnimationStyle from '../../../AnimationStyles'
import { CircleParamsType } from './CircleCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class CircleCanvasAnimation extends CanvasAnimation<CircleParamsType> {

    public drawObject (p5: p5Types, object: CircleParamsType, percent: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const diameter = calculatePercentValue(object.diameter, object.diameter * 2, selectionInfo.percent)

        p5.arc(0, 0, diameter, diameter, 0, p5.PI * 2 * percent)
    }

}
