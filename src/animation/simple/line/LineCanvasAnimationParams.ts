import {calculatePointPercentValue} from '../../../common/Utils'
import {Point} from '../../../common/Point'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import LineCanvasAnimation from './LineCanvasAnimation'
import { ObjectParamsObject } from '../../ObjectParamsObject'

export interface OnlyLineParamsType {
    endPoint: Point
}

export interface LineJsonParamsType extends JsonObjectParams, OnlyLineParamsType {
}

export interface LineAnimationParamsType extends AnimationObjectParams, OnlyLineParamsType {
}

export default class LineCanvasAnimationParams extends SimpleCanvasAnimationParams<LineJsonParamsType, LineAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: LineJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): LineAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<LineJsonParamsType>): Partial<LineAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<LineAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): LineAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    mergeWithTransformation(obj: LineJsonParamsType, trans: Partial<LineJsonParamsType>, perc: number): OnlyLineParamsType {
        return {
            endPoint: trans.endPoint ? calculatePointPercentValue(obj.endPoint, trans.endPoint, perc) : obj.endPoint
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): LineCanvasAnimation {
        return new LineCanvasAnimation(this, animationStyle)
    }

    getZeroParams(): Omit<LineJsonParamsType, keyof JsonObjectParams> {
        return {
            endPoint: this.getObject().origin
        }
    }

}
