import {calculatePercentValue, removeUndefinedKeys} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import EllipseCanvasAnimation from './EllipseCanvasAnimation'
import { ObjectParamsObject } from '../../ObjectParamsObject'

interface OnlyEllipseParamsType {
    width: number
    height: number
}

export interface EllipseJsonParamsType extends JsonObjectParams {
    width: number
    height: number
}

export interface EllipseAnimationParamsType extends AnimationObjectParams {
    width: number
    height: number
}

export default class EllipseCanvasAnimationParams extends SimpleCanvasAnimationParams<EllipseJsonParamsType, EllipseAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: EllipseJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): EllipseAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject)
        }

    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<EllipseJsonParamsType>): Partial<EllipseAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<EllipseAnimationParamsType>): void {
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): EllipseAnimationParamsType {
        return {
            ...initialDefaultParams,
            width: objectParamsObject.getNumberParam('width'),
            height: objectParamsObject.getNumberParam('height')
        }
    }

    protected getZeroParams(): Omit<EllipseJsonParamsType, keyof JsonObjectParams> {
        return {
            width: 0,
            height: 0
        }
    }

    mergeWithTransformation(obj: EllipseJsonParamsType, trans: EllipseJsonParamsType, perc: number): OnlyEllipseParamsType {
        return {
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): EllipseCanvasAnimation {
        return new EllipseCanvasAnimation(this, animationStyle)
    }

}
