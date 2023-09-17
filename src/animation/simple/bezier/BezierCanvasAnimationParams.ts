import {removeUndefinedKeys} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import BezierCanvasAnimation from './BezierCanvasAnimation'
import { Point } from '../../../common/Point'
import { ObjectParamsObject } from '../../ObjectParamsObject'

export interface BezierJsonParamsType extends JsonObjectParams {
    originRelativePoints: [Point, Point, Point, Point]
}

export interface BezierAnimationParamsType extends AnimationObjectParams {
    originRelativePoints: [Point, Point, Point, Point]
}

export default class BezierCanvasAnimationParams extends SimpleCanvasAnimationParams<BezierJsonParamsType, BezierAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: BezierJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): BezierAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject)
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<BezierJsonParamsType>): Partial<BezierAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<BezierAnimationParamsType>): void {
        params.originRelativePoints !== undefined && objectParamsObject.setPointArrayParam('originRelativePoints', params.originRelativePoints)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): BezierAnimationParamsType {
        return {
            ...initialDefaultParams,
            originRelativePoints: objectParamsObject.getPointArrayParam('originRelativePoints')
        }
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

    protected toCanvasAnimation (animationStyle: AnimationStyle): BezierCanvasAnimation {
        return new BezierCanvasAnimation(this, animationStyle)
    }

}
