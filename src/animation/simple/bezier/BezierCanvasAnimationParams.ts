import { calculatePointsPercentValue } from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import BezierCanvasAnimation from './BezierCanvasAnimation'
import { Point } from '../../../common/Point'
import { ObjectParamsObject } from '../../ObjectParamsObject'

interface OnlyBezierParamsType {
    originRelativePoints: [Point, Point, Point, Point]
}

export interface BezierJsonParamsType extends OnlyBezierParamsType, JsonObjectParams {
}

export interface BezierAnimationParamsType extends OnlyBezierParamsType, AnimationObjectParams {
}

export default class BezierCanvasAnimationParams extends SimpleCanvasAnimationParams<BezierJsonParamsType, BezierAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: BezierJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): BezierAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<BezierJsonParamsType>): Partial<BezierAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<BezierAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): BezierAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected getZeroParams (): Omit<BezierJsonParamsType, keyof JsonObjectParams> {
        return {
            originRelativePoints: [{
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }]
        }
    }

    mergeWithTransformation (obj: BezierJsonParamsType, trans: BezierJsonParamsType, perc: number): OnlyBezierParamsType {
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
