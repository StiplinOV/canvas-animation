import {
    calculatePercentValue,
    needAppearObject,
    PresenceParamType,
    RotationType,
    toAppearancePercent,
    toPresenceParamType
} from '../common/Utils'
import {Point} from '../common/Point'
import AnimationStyle, {ColorType} from '../AnimationStyles'
import CanvasAnimation from './CanvasAnimation'
import {intervalContainsIntersections, uniqueArray} from '../common/Alghoritm'
import {ObjectParamsObject} from './ObjectParamsObject'

type WeightType = number | 'normal' | 'bold'

export type LayoutType = 'absolute' | 'fixed'

export const weightToNumber = (style: AnimationStyle, weight?: WeightType): number => {
    if (weight === 'normal') {
        return style.strokeWeight
    }
    if (weight === 'bold') {
        return style.strokeBoldWeight
    }
    return weight ?? style.strokeWeight
}

export interface JsonObjectParams {
    weight?: WeightType
    zIndex?: number
    dashed?: number[]
    strokeColor?: ColorType
    fillColor?: ColorType
    origin: Point
    rotations?: RotationType[]
}

export interface AnimationObjectParams {
    weight: WeightType
    zIndex: number
    dashed: number[]
    strokeColor: ColorType
    fillColor: ColorType
    origin: Point
    rotations: RotationType[]
}

interface FuncNameParamTypeMap {
    'fadeinFadeOut': [number?]
}

export type SelectionAlgorithm<T extends keyof FuncNameParamTypeMap = keyof FuncNameParamTypeMap> = {
    func: T
    params: FuncNameParamTypeMap[T]
}

export interface SelectionType<T = unknown> {
    time: number
    duration: number
    type?: T
    selectionAlgorithm?: SelectionAlgorithm
}

export type Transformation<T extends AnimationObjectParams, U> = {
    object: Partial<T>
    presence: PresenceParamType
    options?: U
}

export type TransformationParam<T extends JsonObjectParams, U> = {
    object: Partial<T>
    appearTime?: number
    appearDuration?: number
    disappearTime?: number
    disappearDuration?: number
    options?: U
}

export type ObjectParamsWithPresence<T extends AnimationObjectParams> = {
    objectParams: T
    time: number
    duration: number
}

export type Params<T extends JsonObjectParams, U = unknown, V extends SelectionType = SelectionType> = {
    transformations?: TransformationParam<T, U>[]
    selections?: V[]
    object: T
    presenceParameters?: Partial<PresenceParamType>[]
    layout?: LayoutType
}

export default abstract class CanvasAnimationParams<
    T extends JsonObjectParams = JsonObjectParams,
    U extends AnimationObjectParams = AnimationObjectParams,
    V = unknown,
    W extends SelectionType = SelectionType
> {

    private presenceParam: PresenceParamType[]
    private readonly transformations: Transformation<U, V>[]
    private readonly object: U
    private readonly layout: LayoutType
    private readonly animationStyle: AnimationStyle

    public constructor(params: Params<T, V, W>, animationStyle: AnimationStyle) {
        this.presenceParam = toPresenceParamType(params.presenceParameters)
        this.transformations = params.transformations?.map(t => this.transformationParamToTransformation(t)) ?? []
        this.transformations.push(...this.calculateSelectionTransformations(params.selections))
        this.animationStyle = animationStyle
        const animationObjectDefaultParams = this.convertJsonObjectToAnimationObjectDefaultParams(params.object)
        this.object = this.convertJsonObjectToAnimationObject(params.object, animationObjectDefaultParams)
        this.layout = params.layout ?? 'absolute'
        this.checkPresenceParam()
    }

    private transformationParamToTransformation(t: TransformationParam<T, V>): Transformation<U, V> {
        return {
            object: this.convertTransformJsonObjectToTransformAnimationObject(t.object),
            presence: {
                appearTime: t.appearTime ?? 0,
                appearDuration: t.appearDuration ?? 0,
                disappearTime: t.disappearTime ?? Number.POSITIVE_INFINITY,
                disappearDuration: t.disappearDuration ?? 0
            },
            options: t.options
        }
    }

    private convertJsonObjectToAnimationObjectDefaultParams(jsonObject: JsonObjectParams): AnimationObjectParams {
        const animationStyle = this.getAnimationStyle()
        return {
            weight: jsonObject.weight ?? animationStyle.strokeWeight,
            zIndex: jsonObject.zIndex ?? 0,
            dashed: jsonObject.dashed ?? [],
            strokeColor: jsonObject.strokeColor ?? animationStyle.strokeColor,
            fillColor: jsonObject.fillColor ?? animationStyle.fillColor,
            origin: jsonObject.origin,
            rotations: jsonObject.rotations ?? []
        }
    }

    protected abstract convertJsonObjectToAnimationObject(jsonObject: T, animationObjectDefaultParams: AnimationObjectParams): U

    protected abstract convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<T>): Partial<U>

    private checkPresenceParam(): void {
        if (intervalContainsIntersections(this.presenceParam.map(p => ({
            start: p.appearTime,
            end: p.disappearTime + p.disappearDuration
        })))) {
            throw new Error(`intervalContainsIntersections: ${JSON.stringify(this.presenceParam)} ${JSON.stringify(this.object)}`)
        }
    }

    public getPresenceParam(): PresenceParamType[] {
        return this.presenceParam
    }

    public setPresenceParam(presenceParam: PresenceParamType[]): void {
        this.presenceParam = presenceParam
    }

    public appendPresence(presence: Partial<PresenceParamType>): void {
        this.presenceParam.push(toPresenceParamType([presence])[0])
    }

    protected getObjectParamsWithTime(): ObjectParamsWithPresence<U>[] {
        const result: ObjectParamsWithPresence<U>[] = []
        const starts = uniqueArray([
            ...this.getPresenceParam(),
            ...this.getTransformations().map(t => t.presence)
        ].flatMap(p => [p.appearTime, p.disappearTime]))
        const ends = uniqueArray([
            ...this.getPresenceParam(),
            ...this.getTransformations().map(t => t.presence)
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

    public calculateObjectParamsInTime(time: number, skipStartTime?: boolean): U {
        const sourceObject = this.getZeroObject()
        const result = new ObjectParamsObject()
        result.setAnimationObjectParams(sourceObject, this.getAnimationStyle())
        this.appendParamsToObjectParamsObject(result, sourceObject)

        if (needAppearObject(time, this.presenceParam, skipStartTime)) {
            this.getTransformations()
                .filter(t => needAppearObject(time, [t.presence], skipStartTime))
                .forEach((t) => {
                    const percent = toAppearancePercent(time, [t.presence])

                    const transformObjectParamsObject = new ObjectParamsObject()
                    transformObjectParamsObject.setAnimationObjectParams(t.object, this.getAnimationStyle())
                    this.appendParamsToObjectParamsObject(transformObjectParamsObject, t.object)

                    result.merge(transformObjectParamsObject, percent)
                })
        }
        return this.convertObjectParamsObjectToAnimationParams(result, result.toAnimationObjectParams())
    }

    protected abstract appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<U>): void

    protected abstract convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): U

    // ХУ Е ТА
    public getZIndex(time: number, animationStyle: AnimationStyle): number {
        let result = this.object.zIndex ?? animationStyle.zIndex
        this.getTransformations()
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

    public getObject(): U {
        return this.object
    }

    public getZeroObject(): U {
        return {
            ...this.getObject(),
            ...this.getZeroParams(),
            origin: this.getZeroObjectOrigin(),
            zIndex: this.object.zIndex
        }
    }

    protected getZeroObjectOrigin(): Point {
        return this.getObject().origin
    }

    protected abstract getZeroParams(): Omit<Partial<U>, keyof AnimationObjectParams>

    public appendTransformation(transformation: TransformationParam<T, V>): void {
        this.transformations.push(this.transformationParamToTransformation(transformation))
    }

    public getTransformations(): Transformation<U, V>[] {
        return [
            ...this.transformations,
            ...this.getPresenceParam().map(p => ({
                object: this.getObject(),
                presence: p
            })),
            ...this.getPresenceParam().map(p => ({
                object: this.getZeroObject(),
                presence: {
                    appearTime: p.disappearTime,
                    appearDuration: p.disappearDuration,
                    disappearTime: Number.POSITIVE_INFINITY,
                    disappearDuration: 0
                }
            }))
        ].sort((l, r) => {
            if (l.presence.appearTime === r.presence.appearTime) {
                return l.presence.appearDuration - r.presence.appearDuration
            }
            return l.presence.appearTime - r.presence.appearTime
        })
    }

    private calculateSelectionTransformations(selections?: W[]): Transformation<U, V>[] {
        return selections?.map(selection => ({
            object: this.convertSelectionToTransformObject(selection),
            presence: {
                appearTime: selection.time,
                appearDuration: selection.duration / 2,
                disappearTime: selection.time + selection.duration / 2,
                disappearDuration: selection.duration / 2
            }
        })) ?? []
    }

    protected convertSelectionToTransformObject(selection: W): Partial<U> {
        return {}
    }

    public abstract toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[]

    public getLayout(): LayoutType {
        return this.layout
    }

    protected getAnimationStyle(): AnimationStyle {
        return this.animationStyle
    }

}
