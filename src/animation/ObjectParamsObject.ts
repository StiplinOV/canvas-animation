import {
    calculateArrayPercentValue,
    calculateColorPercentValue,
    calculatePercentValue, calculatePointPercentValue, calculateRotationsPercentValue,
    calculateTextPercentValue,
    requireValueFromMap, RotationType
} from "../common/Utils";
import {Point, ZeroPoint} from "../common/Point";


export class ObjectParamsObject {

    private booleanParams: Map<string, boolean> = new Map<string, boolean>()
    private stringParams: Map<string, string> = new Map<string, string>()
    private colorParams: Map<string, string> = new Map<string, string>()
    private pointParams: Map<string, Point> = new Map<string, Point>()
    private stringLiteralParams: Map<string, string> = new Map<string, string>()
    private numberParams: Map<string, number> = new Map<string, number>()
    private arrayParams: Map<string, unknown[]> = new Map<string, unknown[]>()
    private rotationsParams: Map<string, RotationType[]> = new Map<string, RotationType[]>()
    private dashedParams: Map<string, number[]> = new Map<string, number[]>

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

    public merge(other: ObjectParamsObject, percent: number): ObjectParamsObject {
        const result = new ObjectParamsObject(this)

        other.booleanParams.forEach((value, key) => {
            if (percent > 0.5) {
                const desireValue = other.getBooleanParam(key)
                result.setBooleanParam(key, desireValue)
            }
        })
        other.stringParams.forEach((value, key) => {
            const currentValue = result.stringParams.get(key) ?? ""
            const desireValue = other.getStringParam(key)
            result.setStringParam(key, calculateTextPercentValue(currentValue, desireValue, percent))
        })
        other.colorParams.forEach((value, key) => {
            const currentValue = result.colorParams.get(key) ?? ""
            const desireValue = other.getColorParam(key)
            result.setColorParam(key, calculateColorPercentValue(currentValue, desireValue, percent))
        })
        other.pointParams.forEach((value, key) => {
            const currentValue = result.pointParams.get(key) ?? ZeroPoint
            const desireValue = other.getPointParam(key)
            result.setPointParam(key, calculatePointPercentValue(currentValue, desireValue, percent))
        })
        other.stringLiteralParams.forEach((value, key) => {
            if (percent > 0.5) {
                const desireValue = other.getStringLiteralParam(key)
                result.setStringLiteralParam(key, desireValue)
            }
        })
        other.numberParams.forEach((value, key) => {
            const currentValue = result.numberParams.get(key) ?? 0
            const desireValue = other.getNumberParam(key)
            result.setNumberParam(key, calculatePercentValue(currentValue, desireValue, percent))
        })
        other.arrayParams.forEach((value, key) => {
            const currentValue = result.arrayParams.get(key) ?? []
            const desireValue = other.getArrayParam(key)
            result.setArrayParam(key, calculateArrayPercentValue(currentValue, desireValue, percent))
        })
        other.rotationsParams.forEach((value, key) => {
            const currentValue = result.rotationsParams.get(key) ?? []
            const desireValue = other.getRotationsParam(key)
            result.setRotationsParam(key, calculateRotationsPercentValue(currentValue, desireValue, percent))
        })
        other.dashedParams.forEach((value, key) => {
            const currentValue = result.dashedParams.get(key) ?? []
            const desireValue = other.getDashedParam(key)
            if (desireValue.length === 0 || currentValue.length === 0) {
                if (percent > 0.5) {
                    result.setDashedParam(key, desireValue)
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
                result.setDashedParam(key, sourceCopy)
            }

        })

        return result
    }

}