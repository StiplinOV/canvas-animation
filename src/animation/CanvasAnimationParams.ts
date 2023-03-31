import {
    PresenceParamsType,
    calculatePercentValue,
    rotationType,
    toAppearancePercent, toAppearanceParamType
} from '../common/Utils'
import {Point} from '../common/Point'
import AnimationStyle, { ColorType } from '../AnimationStyles'
import CanvasAnimation from './CanvasAnimation'

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

export interface ObjectParams {
    weight?: WeightType
    zIndex?: number
    dashed?: number[]
    strokeColor?: ColorType
    fillColor?: ColorType
    origin: Point
    rotations?: rotationType[]
}

export interface Selection {
    time: number
    duration?: number
}

export type Transformation<T extends ObjectParams, U> = {
    object: Partial<T>
    time: number
    duration: number
    options?: U
}

type TransformationParam<T extends ObjectParams, U> = {
    object: Partial<T>
    time?: number
    duration?: number
    options?: U
}

const transformationParamToTransformation = <T extends ObjectParams, U>(t: TransformationParam<T, U>): Transformation<T, U> => ({
    ...t,
    time: t.time ?? 0,
    duration: t.duration ?? 0,
    options: t.options
})

export type Params<T extends ObjectParams, U = unknown, V extends Selection = Selection> = {
    transformations?: TransformationParam<T, U>[]
    selections?: V[]
    object: T
    presenceParameters?: Partial<PresenceParamsType>
    layout?: LayoutType
}

export default abstract class CanvasAnimationParams<T extends ObjectParams = ObjectParams,
    U = unknown,
    V extends Selection = Selection> {

    private appearanceParam: PresenceParamsType
    private readonly transformations: Transformation<T, U>[]
    private readonly selections: V[]
    private readonly object: T
    private readonly layout: LayoutType

    public constructor(params: Params<T, U, V>) {
        const transformations = params.transformations ?? []
        this.appearanceParam = toAppearanceParamType(params.presenceParameters ?? {})
        this.selections = params.selections ?? []
        this.transformations = transformations.map(t => transformationParamToTransformation(t))
        this.object = params.object
        this.layout = params.layout ?? 'absolute'
    }

    public getAppearanceParam(): PresenceParamsType {
        return this.appearanceParam
    }

    public appendAppearTime(time: number, duration: number): void {
        this.appearanceParam.appears.push({
            time,
            duration
        })
    }

    public appendDisappearTime(time: number, duration: number): void {
        this.appearanceParam.disappears.push({
            time,
            duration
        })
    }

    public setAppearanceParam(param: Partial<PresenceParamsType>): void {
        this.appearanceParam = toAppearanceParamType({
            ...this.appearanceParam,
            ...param
        })
    }

    protected getSelections(): V[] {
        return this.selections
    }

    public addSelection(selection: V): void {
        this.selections.push(selection)
    }

    public getZIndex(time: number, animationStyle: AnimationStyle): number {
        let result = this.object.zIndex ?? animationStyle.zIndex
        this.getTransformations()
            .filter(t => time >= t.time)
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, {
                    appears: [{
                        time: t.time,
                        duration: t.duration
                    }],
                    disappears: []
                })

                if (transformationObject.zIndex) {
                    result = calculatePercentValue(result, transformationObject.zIndex, percent)
                }
            })
        return result
    }

    public getObject(): T {
        return this.object
    }

    public getTransformations(): Transformation<T, U>[] {
        return this.transformations.sort((l, r) => l.time - r.time)
    }

    public appendTransformation(transformation: TransformationParam<T, U>): void {
        this.transformations.push(transformationParamToTransformation(transformation))
    }

    public abstract toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[]

    public getLayout(): LayoutType {
        return this.layout
    }

}
