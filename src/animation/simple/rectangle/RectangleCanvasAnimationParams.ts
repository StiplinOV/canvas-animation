import {addPoints, removeUndefinedKeys} from '../../../common/Utils'
import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import RectangleCanvasAnimation from './RectangleCanvasAnimation'
import {Point} from '../../../common/Point'
import {ObjectParamsObject} from '../../ObjectParamsObject'

interface OnlyRectangleParamsType {
    width: number
    height: number
}

export interface RectangleJsonParamsType extends OnlyRectangleParamsType, JsonObjectParams {
    cornerRadius?: number
}

export interface RectangleAnimationParamsType extends OnlyRectangleParamsType, AnimationObjectParams {
    cornerRadius: number
}

export default class RectangleCanvasAnimationParams extends SimpleCanvasAnimationParams<RectangleJsonParamsType, RectangleAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: RectangleJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): RectangleAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject),
            cornerRadius: jsonObject.cornerRadius ?? 0
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<RectangleJsonParamsType>): Partial<RectangleAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<RectangleAnimationParamsType>): void {
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
        params.cornerRadius !== undefined && objectParamsObject.setNumberParam('cornerRadius', params.cornerRadius)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): RectangleAnimationParamsType {
        return {
            ...initialDefaultParams,
            width: objectParamsObject.getNumberParam('width'),
            height: objectParamsObject.getNumberParam('height'),
            cornerRadius: objectParamsObject.getNumberParam('cornerRadius')
        }
    }

    // mergeWithTransformation(obj: RectangleJsonParamsType, trans: Partial<RectangleJsonParamsType>, perc: number, style: AnimationStyle): OnlyRectangleParamsType {
    //     let cornerRadius = obj.cornerRadius ?? style.cornerRadius
    //     if (trans.cornerRadius !== undefined) {
    //         cornerRadius = calculatePercentValue(cornerRadius, trans.cornerRadius, perc)
    //     }
    //     return {
    //         width: trans.width === undefined ? obj.width : calculatePercentValue(obj.width, trans.width, perc),
    //         height: trans.height === undefined ? obj.height : calculatePercentValue(obj.height, trans.height, perc),
    //         cornerRadius
    //     }
    // }

    protected toCanvasAnimation(animationStyle: AnimationStyle): RectangleCanvasAnimation {
        return new RectangleCanvasAnimation(this, animationStyle)
    }

    getZeroParams(): Omit<RectangleJsonParamsType, keyof AnimationObjectParams> {
        return {
            width: 0,
            height: 0
        }
    }

    protected getZeroObjectOrigin(obj: RectangleAnimationParamsType): Point {
        return addPoints(obj.origin, {
            x: obj.width / 2,
            y: obj.height / 2
        })
    }

}
