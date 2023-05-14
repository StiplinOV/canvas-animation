import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import { BezierParamsType } from './BezierCanvasAnimationParams'
import CanvasAnimation from '../../CanvasAnimation'
import { calculatePointsPercentValue } from '../../../common/Utils'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class BezierCanvasAnimation extends CanvasAnimation<BezierParamsType> {

    public drawObject (p5: p5Types, object: BezierParamsType, percent: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const points = calculatePointsPercentValue([
            object.originRelativePoints[0],
            object.originRelativePoints[0],
            object.originRelativePoints[0],
            object.originRelativePoints[0]
        ], object.originRelativePoints, percent)

        p5.noFill()
        p5.bezier(
            points[0].x,
            points[0].y,
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
            points[3].x,
            points[3].y
        )
    }

}
