import {
    calculateArrayPercentValue,
    calculateColorPercentValue,
    calculatePercentValue,
    calculatePointPercentValue,
    calculateRotationsPercentValue,
    calculateTextPercentValue,
    requireValueFromMap,
    RotationType
} from '../common/Utils'
import {Point, ZeroPoint} from '../common/Point'
import {AnimationObjectParams, weightToNumber} from './CanvasAnimationParams'
import AnimationStyle, {getFillColor, getStrokeColor} from '../AnimationStyles'

export class ObjectParamsObject {

    private readonly booleanParams: Map<string, boolean> = new Map<string, boolean>()

    private readonly stringParams: Map<string, string> = new Map<string, string>()

    private readonly colorParams: Map<string, string> = new Map<string, string>()

    private readonly pointParams: Map<string, Point> = new Map<string, Point>()

    private readonly stringLiteralParams: Map<string, string> = new Map<string, string>()

    private readonly numberParams: Map<string, number> = new Map<string, number>()

    private readonly arrayParams: Map<string, unknown[]> = new Map<string, unknown[]>()

    private readonly rotationsParams: Map<string, RotationType[]> = new Map<string, RotationType[]>()

    private readonly dashedParams: Map<string, number[]> = new Map<string, number[]>()

    public constructor(other?: ObjectParamsObject) {
        if (other) {
            other.booleanParams.forEach((v, k) => {
                this.booleanParams.set(k, v)
            })
            other.stringParams.forEach((v, k) => {
                this.stringParams.set(k, v)
            })
            other.colorParams.forEach((v, k) => {
                this.colorParams.set(k, v)
            })
            other.pointParams.forEach((v, k) => {
                this.pointParams.set(k, v)
            })
            other.stringLiteralParams.forEach((v, k) => {
                this.stringLiteralParams.set(k, v)
            })
            other.numberParams.forEach((v, k) => {
                this.numberParams.set(k, v)
            })
            other.arrayParams.forEach((v, k) => {
                this.arrayParams.set(k, v)
            })
            other.rotationsParams.forEach((v, k) => {
                this.rotationsParams.set(k, v)
            })
            other.dashedParams.forEach((v, k) => {
                this.dashedParams.set(k, v)
            })
        }
    }

    public setBooleanParam(key: string, param: boolean): void {
        this.booleanParams.set(key, param)
    }

    public setStringParam(key: string, param: string): void {
        this.stringParams.set(key, param)
    }

    public setColorParam(key: string, param: string): void {
        this.colorParams.set(key, param)
    }

    public setPointParam(key: string, param: Point): void {
        this.pointParams.set(key, param)
    }

    public setNumberParam(key: string, param: number): void {
        this.numberParams.set(key, param)
    }

    public setStringLiteralParam(key: string, param: string): void {
        this.stringLiteralParams.set(key, param)
    }

    public setArrayParam(key: string, param: unknown[]): void {
        this.arrayParams.set(key, param)
    }

    public setRotationsParam(key: string, param: RotationType[]): void {
        this.rotationsParams.set(key, param)
    }

    public setDashedParam(key: string, param: number[]): void {
        this.dashedParams.set(key, param)
    }

    public getBooleanParam(key: string): boolean {
        return requireValueFromMap(this.booleanParams, key)
    }

    public getStringParam(key: string): string {
        return requireValueFromMap(this.stringParams, key)
    }

    public getColorParam(key: string): string {
        return requireValueFromMap(this.colorParams, key)
    }

    public getPointParam(key: string): Point {
        return requireValueFromMap(this.pointParams, key)
    }

    public getNumberParam(key: string): number {
        return requireValueFromMap(this.numberParams, key)
    }

    public getStringLiteralParam<T extends string>(key: string): T {
        return requireValueFromMap(this.stringLiteralParams, key) as T
    }

    public getArrayParam<T>(key: string): T[] {
        return requireValueFromMap(this.arrayParams, key) as T[]
    }

    public getRotationsParam(key: string): RotationType[] {
        return requireValueFromMap(this.rotationsParams, key)
    }

    public getDashedParam(key: string): number[] {
        return requireValueFromMap(this.dashedParams, key)
    }

    public merge(other: ObjectParamsObject, percent: number): void {
        other.booleanParams.forEach((value, key) => {
            if (percent > 0.5) {
                const desireValue = other.getBooleanParam(key)
                this.setBooleanParam(key, desireValue)
            }
        })
        other.stringParams.forEach((value, key) => {
            const currentValue = this.stringParams.get(key) ?? ''
            const desireValue = other.getStringParam(key)
            this.setStringParam(key, calculateTextPercentValue(currentValue, desireValue, percent))
        })
        other.colorParams.forEach((value, key) => {
            const currentValue = this.colorParams.get(key) ?? ''
            const desireValue = other.getColorParam(key)
            this.setColorParam(key, calculateColorPercentValue(currentValue, desireValue, percent))
        })
        other.pointParams.forEach((value, key) => {
            const currentValue = this.pointParams.get(key) ?? ZeroPoint
            const desireValue = other.getPointParam(key)
            this.setPointParam(key, calculatePointPercentValue(currentValue, desireValue, percent))
        })
        other.stringLiteralParams.forEach((value, key) => {
            if (percent > 0.5) {
                const desireValue = other.getStringLiteralParam(key)
                this.setStringLiteralParam(key, desireValue)
            }
        })
        other.numberParams.forEach((value, key) => {
            const currentValue = this.numberParams.get(key) ?? 0
            const desireValue = other.getNumberParam(key)
            this.setNumberParam(key, calculatePercentValue(currentValue, desireValue, percent))
        })
        other.arrayParams.forEach((value, key) => {
            const currentValue = this.arrayParams.get(key) ?? []
            const desireValue = other.getArrayParam(key)
            this.setArrayParam(key, calculateArrayPercentValue(currentValue, desireValue, percent))
        })
        other.rotationsParams.forEach((value, key) => {
            const currentValue = this.rotationsParams.get(key) ?? []
            const desireValue = other.getRotationsParam(key)
            this.setRotationsParam(key, calculateRotationsPercentValue(currentValue, desireValue, percent))
        })
        other.dashedParams.forEach((value, key) => {
            const currentValue = this.dashedParams.get(key) ?? []
            const desireValue = other.getDashedParam(key)
            if (desireValue.length === 0 || currentValue.length === 0) {
                if (percent > 0.5) {
                    this.setDashedParam(key, desireValue)
                }
            } else {
                let resultLength = 1
                if (currentValue.length) {
                    resultLength *= currentValue.length
                }
                if (desireValue.length) {
                    resultLength *= desireValue.length
                }

                const sourceCopy = []
                const transformCopy = []
                for (let i = 0; i < resultLength; i++) {
                    sourceCopy.push(currentValue.length ? currentValue[i % currentValue.length] : 0)
                    transformCopy.push(desireValue.length ? desireValue[i % desireValue.length] : 0)
                }
                for (let i = 0; i < resultLength; i++) {
                    sourceCopy[i] = calculatePercentValue(sourceCopy[i], transformCopy[i], percent)
                }
                this.setDashedParam(key, sourceCopy)
            }

        })
    }

    setAnimationObjectParams(params: Partial<AnimationObjectParams>, animationStyle: AnimationStyle): void {
        params.fillColor && this.setColorParam('fillColor', getFillColor(animationStyle, params.fillColor))
        params.strokeColor && this.setColorParam('strokeColor', getStrokeColor(animationStyle, params.strokeColor))
        params.origin && this.setPointParam('origin', params.origin)
        params.zIndex !== undefined && this.setNumberParam('zIndex', params.zIndex)
        params.weight !== undefined && this.setNumberParam('weight', weightToNumber(animationStyle, params.weight))
        params.rotations && this.setRotationsParam('rotations', params.rotations)
        params.dashed && this.setDashedParam('dashed', params.dashed)
    }

    toAnimationObjectParams(): AnimationObjectParams {
        return {
            weight: this.getNumberParam('weight'),
            zIndex: this.getNumberParam('zIndex'),
            dashed: this.getDashedParam('dashed'),
            strokeColor: this.getColorParam('strokeColor'),
            fillColor: this.getColorParam('fillColor'),
            origin: this.getPointParam('origin'),
            rotations: this.getRotationsParam('rotations')
        }
    }

}
