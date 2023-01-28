import p5Types from 'p5'
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

export interface ObjectParams {
    weight?: number
    zIndex?: number
    rotation?: number
    offset?: Point
    dashed?: number[]
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

export default abstract class CanvasAnimation<T extends ObjectParams = ObjectParams,
    U = unknown,
    V extends Selection = Selection> {

    private appearanceParam: appearanceParamType
    private readonly transformations: Transformation<T, U>[]
    private readonly selections: V[]
    private readonly object: T
    private readonly animationStyle: AnimationStyle

    public constructor(params: Params<T, U, V>, animationStyle: AnimationStyle) {
        const transformations = params.transformations ?? []
        this.appearanceParam = toAppearanceParamType(params.presenceParameters ?? {})
        this.selections = params.selections ?? []
        this.transformations = transformations.map(t => transformationParamToTransformation(t))
        this.object = params.object
        this.animationStyle = animationStyle
    }

    protected getAnimationStyle(): AnimationStyle {
        return this.animationStyle
    }

    public getAppearanceParam(): appearanceParamType {
        return this.appearanceParam
    }

    public setAppearanceParam(param: Partial<appearanceParamType>): void {
        this.appearanceParam = toAppearanceParamType({
            ...this.appearanceParam,
            ...param
        })
        this.afterSetAppearanceParam()
    }

    protected afterSetAppearanceParam(): void {
        // skip
    }

    public abstract containedAnimationsLength(): number

    protected getSelections(): V[] {
        return this.selections
    }

    public addSelection(selection: V): void {
        this.selections.push(selection)
    }

    public draw(p5: p5Types, time: number): void {
        const object = this.calculateObjectParamsInTime(time)
        const offset = object.offset ?? ZeroPoint
        const rotationAxis = object.origin

        if (!needAppearObject(time, this.getAppearanceParam())) {
            return
        }
        p5.push()
        p5.translate(rotationAxis.x, rotationAxis.y)
        p5.rotate(object.rotation ?? this.getAnimationStyle().objectRotation)
        p5.translate(offset.x, offset.y)
        object.dashed && p5.drawingContext.setLineDash(object.dashed)
        this.doDraw(p5, time)
        p5.pop()
    }

    protected abstract doDraw(p5: p5Types, time: number): void

    public getZIndex(time: number): number {
        return this.calculateObjectParamsInTime(time).zIndex ?? 0
    }

    public calculateObjectParamsInTime(time: number, percentParam?: number): T {
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
                        result.weight ?? this.getAnimationStyle().strokeWeight,
                        transformationObject.weight, percent
                    )
                }
                if (transformationObject.rotation) {
                    result.rotation = calculatePercentValue(
                        result.rotation ?? this.getAnimationStyle().objectRotation,
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
                    ...this.mergeWithTransformation(result, transformationObject, percent)
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

    public abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number): Omit<T, keyof ObjectParams>

}
