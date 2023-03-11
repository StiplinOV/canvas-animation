import p5Types from 'p5'
import { calculatePercentValue, convertPercentToFadeInFadeOut } from '../../../common/Utils'
import AnimationStyle from '../../../AnimationStyles'
import { ellipseParamsType } from './EllipseCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'

export default class EllipseCanvasAnimation extends CanvasAnimation<ellipseParamsType> {

    public drawObject (p5: p5Types, object: ellipseParamsType, percent: number, selectedPercentParam: number, style: AnimationStyle): void {
        const selectedPercent = convertPercentToFadeInFadeOut(selectedPercentParam)
        const width = calculatePercentValue(object.width, object.width * 2, selectedPercent)
        const height = calculatePercentValue(object.height, object.height * 2, selectedPercent)
        p5.ellipse(0, 0, width * percent, height * percent)
    }

}
