import {
    calculateColorPercentValue,
    calculatePercentValue, calculatePointPercentValue, calculateRotationsPercentValue,
    needAppearObject,
    PresenceParamsType,
    rotationType,
    toAppearanceParamType,
    toAppearancePercent
} from '../common/Utils'
import { Point, ZeroPoint } from '../common/Point'
import AnimationStyle, { ColorType, getFillColor, getStrokeColor } from '../AnimationStyles'
import CanvasAnimation from './CanvasAnimation'
import { uniqueArray } from '../common/Alghoritm'
import { animationStyle } from '../Animations'

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

interface FuncNameParamTypeMap {
    'fadeinFadeOut': [number?]
}

export type SelectionAlgorithm<T extends keyof FuncNameParamTypeMap = keyof FuncNameParamTypeMap> = {
    func: T
    params: FuncNameParamTypeMap[T]
}

export const fadeinFadeOut = (duration?: number): SelectionAlgorithm => {
    return {
        func: 'fadeinFadeOut',
        params: [duration]
    }
}

export interface SelectionType<T = unknown> {
    time: number
    duration: number
    type?: T
    selectionAlgorithm?: SelectionAlgorithm
}

export type Transformation<T extends ObjectParams, U> = {
    object: Partial<T>
    appearTime: number
    appearDuration: number
    disappearTime: number
    disappearDuration: number
    options?: U
}

export type TransformationParam<T extends ObjectParams, U> = {
    object: Partial<T>
    appearTime?: number
    appearDuration?: number
    disappearTime?: number
    disappearDuration?: number
    options?: U
}

const transformationParamToTransformation = <T extends ObjectParams, U> (t: TransformationParam<T, U>): Transformation<T, U> => ({
    ...t,
    appearTime: t.appearTime ?? 0,
    appearDuration: t.appearDuration ?? 0,
    disappearTime: t.disappearTime ?? Number.POSITIVE_INFINITY,
    disappearDuration: t.disappearDuration ?? 0,
    options: t.options
})

export type ObjectParamsWithPresence<T extends ObjectParams> = {
    objectParams: T
    time: number,
    duration: number
}

export type Params<T extends ObjectParams, U = unknown, V extends SelectionType = SelectionType> = {
    transformations?: TransformationParam<T, U>[]
    selections?: V[]
    object: T
    presenceParameters?: Partial<PresenceParamsType>
    layout?: LayoutType
}

export default abstract class CanvasAnimationParams<T extends ObjectParams = ObjectParams,
    U = unknown,
    V extends SelectionType = SelectionType> {

    private appearanceParam: PresenceParamsType
    private readonly transformations: Transformation<T, U>[]
    private readonly selections: V[]
    private readonly object: T
    private readonly layout: LayoutType
    private readonly animationStyle: AnimationStyle

    public constructor (params: Params<T, U, V>, animationStyle: AnimationStyle) {
        const transformations = params.transformations ?? []
        this.appearanceParam = toAppearanceParamType(params.presenceParameters ?? {})
        this.selections = params.selections ?? []
        this.transformations = transformations.map(t => transformationParamToTransformation(t))
        this.object = params.object
        this.layout = params.layout ?? 'absolute'
        this.animationStyle = animationStyle
    }

    public getAppearanceParam (): PresenceParamsType {
        return this.appearanceParam
    }

    public appendAppearTime (time: number, duration: number): void {
        this.appearanceParam.appears.push({
            time,
            duration
        })
    }

    public appendDisappearTime (time: number, duration: number): void {
        this.appearanceParam.disappears.push({
            time,
            duration
        })
    }

    public setAppearanceParam (param: Partial<PresenceParamsType>): void {
        this.appearanceParam = toAppearanceParamType({
            ...this.appearanceParam,
            ...param
        })
    }

    public getObjectParamsWithTime (): ObjectParamsWithPresence<T>[] {
        const result: ObjectParamsWithPresence<T>[] = []
        this.getAppearanceParam().appears.forEach(a => {
            result.push({
                objectParams: this.getObject(),
                time: a.time,
                duration: a.duration
            })
        })
        this.getAppearanceParam().disappears.forEach(d => {
            result.push({
                objectParams: this.getZeroObject(),
                time: d.time,
                duration: d.duration
            })
        })

        const transformations = this.getTransformations()
        uniqueArray([
            ...transformations.map(t => ({
                time: t.appearTime,
                duration: t.appearDuration
            })),
            ...transformations.map(t => ({
                time: t.disappearTime,
                duration: t.disappearDuration
            }))
        ]).map(presence => {//Ошибка. НЕ учтен процент появления
            result.push({
                ...presence,
                objectParams: this.calculateObjectParamsInTime(presence.time + presence.duration)//TODO бред
            })
        })

        return result.sort((l, r) => l.time == r.time ? l.duration - r.duration : l.time - r.time)
    }

    public calculateObjectParamsInTime (time: number): T {
        const animationStyle = this.getAnimationStyle()
        const sourceObject = this.getZeroObject()
        let result = { ...sourceObject }
        this.getTransformations()
            .filter(t => needAppearObject(time, {
                appears: [{
                    time: t.appearTime,
                    duration: t.appearDuration
                }],
                disappears: [{
                    time: t.disappearTime,
                    duration: t.disappearDuration
                }]
            }))
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, {
                    appears: [{
                        time: t.appearTime,
                        duration: t.appearDuration
                    }],
                    disappears: [{
                        time: t.disappearTime,
                        duration: t.disappearDuration
                    }]
                })
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

    public abstract mergeWithTransformation (obj: T, trans: Partial<T>, perc: number, animationStyle: AnimationStyle): Omit<T, keyof ObjectParams>


    public getZIndex (time: number, animationStyle: AnimationStyle): number {//ХУ Е ТА
        let result = this.object.zIndex ?? animationStyle.zIndex
        this.getTransformations()
            .filter(t => needAppearObject(time, {
                appears: [{
                    time: t.appearTime,
                    duration: t.appearDuration
                }],
                disappears: [{
                    time: t.disappearTime,
                    duration: t.disappearDuration
                }]
            }))
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, {
                    appears: [{
                        time: t.appearTime,
                        duration: t.appearDuration
                    }],
                    disappears: [{
                        time: t.disappearTime,
                        duration: t.disappearDuration
                    }]
                })

                if (transformationObject.zIndex) {
                    result = calculatePercentValue(result, transformationObject.zIndex, percent)
                }
            })
        return result
    }

    public getObject (): T {
        return this.object
    }

    public getZeroObject (): T {
        return {
            ...this.getObject(),
            ...this.getZeroParams(),
            origin: this.getZeroObjectOrigin(),
            zIndex: Number.MIN_VALUE,
        }
    }

    protected getZeroObjectOrigin (): Point {
        return this.getObject().origin
    }

    protected abstract getZeroParams (): Omit<T, keyof ObjectParams>

    public appendTransformation (transformation: TransformationParam<T, U>): void {
        this.transformations.push(transformationParamToTransformation(transformation))
    }

    public getTransformations (): Transformation<T, U>[] {
        return [
            ...this.transformations,
            ...this.calculateSelectionTransformations(),
            ...this.getAppearanceParam().appears.map(a => ({
                object: this.getObject(),
                appearTime: a.time,
                appearDuration: a.duration,
                disappearTime: Number.POSITIVE_INFINITY,
                disappearDuration: 0
            })),
            ...this.getAppearanceParam().disappears.map(d => ({
                object: this.getZeroObject(),
                appearTime: d.time,
                appearDuration: d.duration,
                disappearTime: Number.POSITIVE_INFINITY,
                disappearDuration: 0
            }))
        ].sort((l, r) => l.appearTime === r.appearTime ? l.appearDuration - r.appearDuration : l.appearTime - r.appearTime)
    }

    private calculateSelectionTransformations (): Transformation<T, U>[] {
        return this.selections.map(selection => ({
            object: this.convertSelectionToTransformObject(selection),
            appearTime: selection.time,
            appearDuration: selection.duration / 2,
            disappearTime: selection.time + selection.duration / 2,
            disappearDuration: selection.duration / 2
        }))
    }

    protected convertSelectionToTransformObject (selection: V): Partial<T> {
        return {}
    }

    public abstract toCanvasAnimations (animationStyle: AnimationStyle): CanvasAnimation[]

    public getLayout (): LayoutType {
        return this.layout
    }

    protected getAnimationStyle (): AnimationStyle {
        return this.animationStyle
    }

}
