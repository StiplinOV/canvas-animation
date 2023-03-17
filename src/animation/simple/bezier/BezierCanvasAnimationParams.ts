import { calculatePointsPercentValue } from '../../../common/Utils'
import { ObjectParams } from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import BezierCanvasAnimation from './BezierCanvasAnimation'
import { Point } from '../../../common/Point'

interface OnlyBezierParamsType {
    originRelativePoints: [Point, Point, Point, Point]
}

export interface BezierParamsType extends OnlyBezierParamsType, ObjectParams {
}

export default class BezierCanvasAnimationParams extends SimpleCanvasAnimationParams<BezierParamsType> {

    mergeWithTransformation (obj: BezierParamsType, trans: BezierParamsType, perc: number): OnlyBezierParamsType {
        const objPoints = obj.originRelativePoints
        const transPoints = trans.originRelativePoints
        const originRelativePoints = transPoints ? calculatePointsPercentValue(objPoints, transPoints, perc) : objPoints

        return {
            originRelativePoints: [originRelativePoints[0], originRelativePoints[1], originRelativePoints[2], originRelativePoints[3]]
        }
    }

    protected toCanvasAnimation (animationStyle: AnimationStyle): BezierCanvasAnimation {
        return new BezierCanvasAnimation(this, animationStyle)
    }

}
