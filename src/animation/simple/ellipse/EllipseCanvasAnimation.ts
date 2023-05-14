import p5Types from 'p5'
import { calculatePercentValue } from '../../../common/Utils'
import AnimationStyle from '../../../AnimationStyles'
import { ellipseParamsType } from './EllipseCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class EllipseCanvasAnimation extends CanvasAnimation<ellipseParamsType> {

    public drawObject (p5: p5Types, object: ellipseParamsType, percent: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const width = calculatePercentValue(object.width, object.width * 2, selectionInfo.percent)
        const height = calculatePercentValue(object.height, object.height * 2, selectionInfo.percent)
        p5.ellipse(0, 0, width * percent, height * percent)
    }

}
