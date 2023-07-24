import {calculatePercentValue} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import EllipseCanvasAnimation from './EllipseCanvasAnimation'
import { ObjectParamsObject } from '../../ObjectParamsObject'

interface OnlyEllipseParamsType {
    width: number
    height: number
}

export interface EllipseJsonParamsType extends OnlyEllipseParamsType, JsonObjectParams {
}

export interface EllipseAnimationParamsType extends OnlyEllipseParamsType, AnimationObjectParams {
}

export default class EllipseCanvasAnimationParams extends SimpleCanvasAnimationParams<EllipseJsonParamsType, EllipseAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: EllipseJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): EllipseAnimationParamsType {
        throw new Error('Method not implemented.')
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<EllipseJsonParamsType>): Partial<EllipseAnimationParamsType> {
        throw new Error('Method not implemented.')
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<EllipseAnimationParamsType>): void {
        throw new Error('Method not implemented.')
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): EllipseAnimationParamsType {
        throw new Error('Method not implemented.')
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
