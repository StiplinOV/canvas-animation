import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import ImageCanvasAnimation from './ImageCanvasAnimation'
import {ObjectParamsObject} from '../../ObjectParamsObject'
import p5Types from 'p5'

export interface ImageJsonParamsType extends JsonObjectParams {
    img: string
}

export interface ImageAnimationParamsType extends AnimationObjectParams {
    image: p5Types.Image | null
}

export default class ImageCanvasAnimationParams extends SimpleCanvasAnimationParams<ImageJsonParamsType, ImageAnimationParamsType> {

    protected convertJsonObjectToAnimationObject(jsonObject: ImageJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): ImageAnimationParamsType {
        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            image: jsonObject.img ? this.getP5().loadImage(jsonObject.img) : null
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ImageJsonParamsType>): Partial<ImageAnimationParamsType> {
        return {
            ...jsonObject
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ImageAnimationParamsType>): void {
        params.image !== undefined && objectParamsObject.setObjectParam('image', params.image)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ImageAnimationParamsType {
        return {
            ...initialDefaultParams,
            image: objectParamsObject.getObjectParam('image')
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): ImageCanvasAnimation {
        return new ImageCanvasAnimation(this, animationStyle)
    }

    getZeroParams(): Omit<ImageAnimationParamsType, keyof AnimationObjectParams> {
        return {
            image: null
        }
    }

}
