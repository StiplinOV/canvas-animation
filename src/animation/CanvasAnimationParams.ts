import {
    appearanceParamType,
    calculatePercentValue,
    calculatePointPercentValue,
    needAppearObject,
    toAppearanceParamType,
    toAppearancePercent
} from '../common/Utils'
import {Point, ZeroPoint} from '../common/Point'
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
    rotation?: number
    offset?: Point
    dashed?: number[]
    strokeColor?: string | 'primary' | 'secondary'
    origin: Point
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

    public calculateContainedAnimationsFlatten(animationStyle: AnimationStyle): CanvasAnimationParams[] {
        let containedAnimations = this.calculateContainedAnimations(animationStyle)
        let containedAnimationsFlatten = containedAnimations.flatMap(a => a.calculateContainedAnimations(animationStyle))
        while (containedAnimations.length !== containedAnimationsFlatten.length) {
            containedAnimations = containedAnimationsFlatten
            containedAnimationsFlatten = containedAnimations.flatMap(a => a.calculateContainedAnimations(animationStyle))
        }
        return containedAnimationsFlatten
    }

    public calculateContainedAnimations(animationStyle: AnimationStyle): CanvasAnimationParams[] {
        return [this]
    }

    protected getSelections(): V[] {
        return this.selections
    }

    public addSelection(selection: V): void {
        this.selections.push(selection)
    }

    public getZIndex(time: number, animationStyle: AnimationStyle): number {
        return this.calculateObjectParamsInTime(time, animationStyle).zIndex ?? 0
    }

    public calculateObjectParamsInTime(time: number, animationStyle: AnimationStyle, percentParam?: number): T {
        const sourceObject = this.object
        let result = {...sourceObject}
        this.getTransformations()
            .filter(t => needAppearObject(time, toAppearanceParamType(t.presenceParameters)))
            .sort((l, r) => l.presenceParameters.appearTime - r.presenceParameters.appearTime)
            .forEach((t) => {
                const transformationObject = t.object
                const percent = percentParam ?? toAppearancePercent(time, toAppearanceParamType(t.presenceParameters))
                if (transformationObject.origin) {
                    result.origin = calculatePointPercentValue(result.origin, transformationObject.origin, percent)
                }
                if (transformationObject.zIndex) {
                    result.zIndex = calculatePercentValue(result.zIndex ?? 0, transformationObject.zIndex, percent)
                }
                if (transformationObject.weight) {
                    result.weight = calculatePercentValue(
                        weightToNumber(result.weight ?? animationStyle.strokeWeight, animationStyle),
                        weightToNumber(transformationObject.weight, animationStyle), percent
                    )
                }
                if (transformationObject.rotation) {
                    result.rotation = calculatePercentValue(
                        result.rotation ?? animationStyle.objectRotation,
                        transformationObject.rotation,
                        percent
                    )
                }
                if (transformationObject.offset) {
                    result.offset = calculatePointPercentValue(
                        result.offset ?? ZeroPoint,
                        transformationObject.offset,
                        percent
                    )
                }
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
                    ...this.mergeWithTransformation(result, transformationObject, percent, animationStyle, t.options)
                }
            })
        return result
    }

    public getObject(): T {
        return this.object
    }

    protected getTransformations(): Transformation<T, U>[] {
        return this.transformations
    }

    public appendTransformation(transformation: TransformationParam<T, U>): void {
        this.transformations.push(transformationParamToTransformation(transformation))
    }

    public abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, animationStyle: AnimationStyle, options?: U): Omit<T, keyof ObjectParams>

    public abstract toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation

}
