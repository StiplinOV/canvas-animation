import {
    calculateColorPercentValue,
    calculatePercentValue,
    calculatePointPercentValue,
    calculateRotationsPercentValue,
    needAppearObject,
    PresenceParamType,
    RotationType,
    toAppearancePercent,
    toPresenceParamType
} from '../common/Utils'
import {Point, ZeroPoint} from '../common/Point'
import AnimationStyle, {ColorType, getFillColor, getStrokeColor} from '../AnimationStyles'
import CanvasAnimation from './CanvasAnimation'
import {uniqueArray} from '../common/Alghoritm'
import {AnimationObjectParams, AnimationParams, Transformation} from "../object/AnimationParams";

type WeightType = number | 'normal' | 'bold'

export type LayoutType = 'absolute' | 'fixed'

export const weightToNumber = (style: AnimationStyle, weight?: WeightType | null): number => {
    if (weight === 'normal') {
        return style.strokeWeight
    }
    if (weight === 'bold') {
        return style.strokeBoldWeight
    }
    return weight ?? style.strokeWeight
}

export interface ObjectParams {
    weight?: WeightType
    zIndex?: number
    dashed?: number[]
    strokeColor?: ColorType
    fillColor?: ColorType
    origin: Point
    rotations?: RotationType[]
}

// interface FuncNameParamTypeMap {
//     'fadeinFadeOut': [number?]
// }

// export type SelectionAlgorithm<T extends keyof FuncNameParamTypeMap = keyof FuncNameParamTypeMap> = {
//     func: T
//     params: FuncNameParamTypeMap[T]
// }

// export interface SelectionType<T = unknown> {
//     time: number
//     duration: number
//     type?: T
//     selectionAlgorithm?: SelectionAlgorithm
// }

// export type TransformationParam<T extends ObjectParams, U> = {
//     object: Partial<T>
//     appearTime?: number
//     appearDuration?: number
//     disappearTime?: number
//     disappearDuration?: number
//     options?: U
// }

// const transformationParamToTransformation = <T extends ObjectParams, U>(t: TransformationParam<T, U>): Transformation<T, U> => ({
//     object: t.object,
//     presence: {
//         appearTime: t.appearTime ?? 0,
//         appearDuration: t.appearDuration ?? 0,
//         disappearTime: t.disappearTime ?? Number.POSITIVE_INFINITY,
//         disappearDuration: t.disappearDuration ?? 0
//     },
//     options: t.options
// })

export type ObjectParamsWithPresence<T extends AnimationObjectParams> = {
    objectParams: T
    time: number
    duration: number
}

// export type Params<T extends ObjectParams, U = unknown, V extends SelectionType = SelectionType> = {
//     transformations?: TransformationParam<T, U>[]
//     selections?: V[]
//     object: T
//     presenceParameters?: Partial<PresenceParamType>[]
//     layout?: LayoutType
// }

export default abstract class CanvasAnimationParams<T extends AnimationObjectParams = AnimationObjectParams, U = unknown> {

    private readonly params: AnimationParams<T, U>
    private readonly animationStyle: AnimationStyle

    public constructor(params: AnimationParams<T, U>, animationStyle: AnimationStyle) {
        this.params = params
        this.animationStyle = animationStyle
    }

    public getPresenceParam(): PresenceParamType[] {
        return this.params.presenceParam
    }

    public setPresenceParam(presenceParam: PresenceParamType[]): void {
        this.params.presenceParam = presenceParam
    }

    public appendPresence(presence: Partial<PresenceParamType>): void {
        this.params.presenceParam.push(toPresenceParamType([presence])[0])
    }

    public getObjectParamsWithTime(): ObjectParamsWithPresence<T>[] {
        const result: ObjectParamsWithPresence<T>[] = []
        const starts = uniqueArray([
            ...this.getPresenceParam(),
            ...this.params.transformations.map(t => t.presence)
        ].flatMap(p => [p.appearTime, p.disappearTime]))
        const ends = uniqueArray([
            ...this.getPresenceParam(),
            ...this.params.transformations.map(t => t.presence)
        ].flatMap(p => [p.appearTime + p.appearDuration, p.disappearTime + p.disappearDuration]))
        const points = [...starts, ...ends].filter(v => v !== Number.POSITIVE_INFINITY).sort((l, r) => l - r)
        let time = points[0]
        for (let i = 1; i < points.length; i++) {
            const nextTime = points[i]
            const duration = nextTime - time
            let objectParams = this.calculateObjectParamsInTime(nextTime, true)
            if (duration === 0) {
                objectParams = this.calculateObjectParamsInTime(nextTime)
            }
            result.push({
                objectParams,
                time,
                duration
            })

            time = nextTime
        }

        return result.sort((l, r) => l.time === r.time ? l.duration - r.duration : l.time - r.time)
    }

    public calculateObjectParamsInTime(time: number, skipStartTime?: boolean): T {
        const animationStyle = this.getAnimationStyle()
        const sourceObject = this.params.zeroObject
        let result = {...sourceObject}

        if (!needAppearObject(time, this.params.presenceParam, skipStartTime)) {
            return result
        }

        this.params
            .transformations
            .filter(t => needAppearObject(time, [t.presence], skipStartTime))
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, [t.presence])
                if (transformationObject.fillColor) {
                    result.fillColor = calculateColorPercentValue(
                        getFillColor(animationStyle, result.fillColor),
                        getFillColor(animationStyle, transformationObject.fillColor),
                        percent
                    )
                }
                if (transformationObject.strokeColor) {
                    result.strokeColor = calculateColorPercentValue(
                        getStrokeColor(animationStyle, result.strokeColor),
                        getStrokeColor(animationStyle, transformationObject.strokeColor),
                        percent
                    )
                }
                if (transformationObject.origin) {
                    result.origin = calculatePointPercentValue(result.origin, transformationObject.origin, percent)
                }
                if (transformationObject.zIndex !== undefined) {
                    result.zIndex = calculatePercentValue(result.zIndex ?? 0, transformationObject.zIndex, percent)
                }
                if (transformationObject.weight) {
                    result.weight = calculatePercentValue(
                        weightToNumber(animationStyle, result.weight),
                        weightToNumber(animationStyle, transformationObject.weight), percent
                    )
                }
                if (transformationObject.rotations) {
                    result.rotations = calculateRotationsPercentValue(
                        result.rotations ?? [{
                            axis: ZeroPoint,
                            angle: 0
                        }],
                        transformationObject.rotations,
                        percent
                    )
                }
                //TODO
                const transformDashed = transformationObject.dashed
                const resultDashed = result.dashed ?? []
                if (transformDashed && (transformDashed.length || resultDashed.length)) {
                    let resultLength = 1
                    if (resultDashed.length) {
                        resultLength *= resultDashed.length
                    }
                    if (transformDashed.length) {
                        resultLength *= transformDashed.length
                    }

                    const sourceCopy = []
                    const transformCopy = []
                    for (let i = 0; i < resultLength; i++) {
                        sourceCopy.push(resultDashed.length ? resultDashed[i % resultDashed.length] : 0)
                        transformCopy.push(transformDashed.length ? transformDashed[i % transformDashed.length] : 0)
                    }
                    for (let i = 0; i < resultLength; i++) {
                        sourceCopy[i] = calculatePercentValue(sourceCopy[i], transformCopy[i], percent)
                    }
                    result.dashed = sourceCopy
                }
                result = {
                    ...result,
                    ...this.mergeWithTransformation(result, transformationObject, percent, animationStyle)
                }
            })
        return result
    }

    protected abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, animationStyle: AnimationStyle): Omit<T, keyof ObjectParams>

//     public objectParamsToObject(params: Partial<T>): ObjectParamsObject {
//         const result = new ObjectParamsObject()
//         const animationStyle = this.getAnimationStyle()
// //Есть два объекта: входные параметры и внутренние параметры. Внутренние параметры они бывают для объекта и для трансформаций
//         result.setColorParam("fillColor", getFillColor(animationStyle, params.fillColor))
//         result.setColorParam("strokeColor", getStrokeColor(animationStyle, params.strokeColor))
//         result.setPointParam("origin", params.origin ?? ZeroPoint)
//         result.setNumberParam("zIndex", params.zIndex ?? 0)
//         result.setNumberParam("weight", weightToNumber(animationStyle, params.weight))
//         result.setRotationsParam("rotations", params.rotations ?? [{axis: ZeroPoint, angle: 0}])
//         result.setDashedParam("dashed", params.dashed ?? [])
//         //this.addParamsToParamsObject(result, params)
//
//         return result
//     }

    //protected abstract addParamsToParamsObject(paramsObject: ObjectParamsObject, params: Partial<T>): void

    // ХУ Е ТА
    public getZIndex(time: number, animationStyle: AnimationStyle): number {
        let result = this.params.object.zIndex ?? animationStyle.zIndex
        this.params
            .transformations
            .filter(t => needAppearObject(time, [t.presence]))
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, [t.presence])

                if (transformationObject.zIndex) {
                    result = calculatePercentValue(result, transformationObject.zIndex, percent)
                }
            })
        return result
    }

    public getObject(): T {
        return this.params.object
    }

    //TODO
    public getZeroObject(): T {
        return {
            ...this.getObject(),
            ...this.getZeroParams(),
            origin: this.getZeroObjectOrigin(),
            zIndex: this.params.object.zIndex
        }
    }

    protected getZeroObjectOrigin(): Point {
        return this.getObject().origin
    }

    protected abstract getZeroParams(): Omit<T, keyof ObjectParams>

    public appendTransformation(transformation: Transformation<T, U>): void {
        this.params.transformations.push(transformation)
    }

    public abstract toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[]

    public getLayout(): LayoutType {
        return this.params.layout
    }

    protected getAnimationStyle(): AnimationStyle {
        return this.animationStyle
    }

}
