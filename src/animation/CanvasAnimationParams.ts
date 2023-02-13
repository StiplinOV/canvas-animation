import {
    appearanceParamType,
    calculatePercentValue,
    calculatePointPercentValue,
    calculateRotationsPercentValue,
    needAppearObject,
    rotationType,
    toAppearanceParamType,
    toAppearancePercent
} from '../common/Utils'
import {Point} from '../common/Point'
import AnimationStyle from '../AnimationStyles'
import CanvasAnimation from './CanvasAnimation'

type weightType = number | 'normal' | 'bold'
type colorType = string | 'primary' | 'secondary'

export const weightToNumber = (weight: weightType, style: AnimationStyle): number => {
    if (weight === 'normal') {
        return style.strokeWeight
    }
    if (weight === 'bold') {
        return style.strokeBoldWeight
    }
    return weight
}

export const colorToHex = (color: colorType, style: AnimationStyle): string => {
    if (color === 'primary') {
        return style.strokePrimaryColor
    }
    if (color === 'secondary') {
        return style.strokeSecondaryColor
    }
    return color
}

export interface ObjectParams {
    weight?: weightType
    zIndex?: number
    dashed?: number[]
    strokeColor?: string | 'primary' | 'secondary'
    origin: Point
    rotations?: rotationType[]
}

export interface Selection {
    time: number
    duration?: number
}

type Transformation<T extends ObjectParams, U> = {
    object: Partial<T>
    presenceParameters: appearanceParamType
    options?: U
}

type TransformationParam<T extends ObjectParams, U> = {
    object: Partial<T>
    presenceParameters?: & Partial<appearanceParamType>
    options?: U
}

const transformationParamToTransformation = <T extends ObjectParams, U>(t: TransformationParam<T, U>): Transformation<T, U> => ({
    ...t,
    presenceParameters: toAppearanceParamType(t?.presenceParameters ?? {}),
    options: t.options
})

export type Params<T extends ObjectParams, U, V extends Selection = Selection> = {
    transformations?: TransformationParam<T, U>[]
    selections?: V[]
    object: T
    presenceParameters?: & Partial<appearanceParamType>
}

export default abstract class CanvasAnimationParams<T extends ObjectParams = ObjectParams,
    U = unknown,
    V extends Selection = Selection> {

    private appearanceParam: appearanceParamType
    private readonly transformations: Transformation<T, U>[]
    private readonly selections: V[]
    private readonly object: T

    public constructor(params: Params<T, U, V>) {
        const transformations = params.transformations ?? []
        this.appearanceParam = toAppearanceParamType(params.presenceParameters ?? {})
        this.selections = params.selections ?? []
        this.transformations = transformations.map(t => transformationParamToTransformation(t))
        this.object = params.object
    }

    public getAppearanceParam(): appearanceParamType {
        return this.appearanceParam
    }

    public setAppearTime(time: number): void {
        this.setAppearanceParam({
            appearTime: time
        })
    }

    public setAppearDuration(duration: number): void {
        this.setAppearanceParam({
            appearDuration: duration
        })
    }

    public setDisappearTime(time: number): void {
        this.setAppearanceParam({
            disappearTime: time
        })
    }

    public setDisappearDuration(duration: number): void {
        this.setAppearanceParam({
            disappearDuration: duration
        })
    }

    public setAppearanceParam(param: Partial<appearanceParamType>): void {
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
            .filter(t => needAppearObject(time, toAppearanceParamType(t.presenceParameters)))
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, toAppearanceParamType(t.presenceParameters))

                if (transformationObject.zIndex) {
                    result = calculatePercentValue(result, transformationObject.zIndex, percent)
                }
            })
        return result
    }

    public getObject(): T {
        return this.object
    }

    protected getTransformations(): Transformation<T, U>[] {
        return this.transformations.sort((l, r) => l.presenceParameters.appearTime - r.presenceParameters.appearTime)
    }

    public appendTransformation(transformation: TransformationParam<T, U>): void {
        this.transformations.push(transformationParamToTransformation(transformation))
    }

    public abstract toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[]

}
