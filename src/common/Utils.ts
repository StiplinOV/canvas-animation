import {Point} from './Point'
import p5Types from 'p5'

interface Coordinates {
    x?: number
    y?: number
}

export interface appearanceParamType {
    appearTime: number
    appearDuration: number
    disappearTime: number
    disappearDuration: number
}

export const convertPercentToFadeInFadeOut = (percent: number): number => 2 * Math.abs(0.5 - Math.abs(percent - 0.5))
export const calculatePercentValue = (from: number, to: number, percent: number): number => from + (to - from) * percent
export const calculatePointPercentValue = (from: Point, to: Point, percent: number): Point =>
    ({x: calculatePercentValue(from.x, to.x, percent), y: calculatePercentValue(from.y, to.y, percent)})
export const calculateArrayPercentValue = <T>(from: T[], to: T[], percent: number): T[] => {
    if (JSON.stringify(from) === JSON.stringify(to)) {
        return from
    }
    let toStartsWithFrom = true
    let fromStartsWithTo = true
    for (let i = 0; i < Math.min(from.length, to.length); i++) {
        if (from[i] !== to[i]) {
            toStartsWithFrom = false
            fromStartsWithTo = false
            break
        }
    }
    if (toStartsWithFrom) {
        toStartsWithFrom = to.length >= from.length
        fromStartsWithTo = from.length >= to.length
    }
    if (toStartsWithFrom) {
        const numberOfStates = to.length - from.length
        const currentState = Math.floor(calculatePercentValue(1, numberOfStates, percent))
        return to.slice(0, from.length + currentState)
    } else if (fromStartsWithTo) {
        const numberOfStates = from.length - to.length
        const currentState = Math.floor(calculatePercentValue(1, numberOfStates, percent))
        return to.slice(0, from.length - currentState)
    } else {
        const numberOfStates = from.length + to.length
        const currentState = Math.floor(calculatePercentValue(1, numberOfStates, percent))
        if (currentState >= 0 && currentState <= from.length - 1) {
            return from.slice(0, from.length - currentState)
        } else if (currentState >= from.length + 1 && currentState <= from.length + to.length) {
            return to.slice(0, currentState - from.length)
        } else {
            return []
        }
    }
}
export const calculateTextPercentValue = (from: string, to: string, percent: number): string => {
    return calculateArrayPercentValue(from.split(''), to.split(''), percent).join('')
}
export const calculateColorPercentValue = (from: string, to: string, percent: number): string => {
    const fromNumR = parseInt(from.substring(1, 3), 16)
    const toNumR = parseInt(to.substring(1, 3), 16)
    const fromNumG = parseInt(from.substring(3, 5), 16)
    const toNumG = parseInt(to.substring(3, 5), 16)
    const fromNumB = parseInt(from.substring(5, 7), 16)
    const toNumB = parseInt(to.substring(5, 7), 16)
    const r = Math.round(calculatePercentValue(fromNumR, toNumR, percent)).toString(16).padStart(2, '0')
    const g = Math.round(calculatePercentValue(fromNumG, toNumG, percent)).toString(16).padStart(2, '0')
    const b = Math.round(calculatePercentValue(fromNumB, toNumB, percent)).toString(16).padStart(2, '0')

    return `#${r}${g}${b}`
}

export const toAppearanceParamType = (values: Partial<appearanceParamType>): appearanceParamType => ({
    appearTime: values.appearTime ?? 0,
    appearDuration: values.appearDuration ?? 0,
    disappearTime: values.disappearTime ?? Number.MAX_VALUE,
    disappearDuration: values.disappearDuration ?? 0
})
export const needAppearObject = (time: number, appearanceParam: appearanceParamType): boolean => {
    if (appearanceParam.appearTime > time) {
        return false
    }
    return appearanceParam.disappearTime + appearanceParam.disappearDuration > time
}
export const toAppearancePercent = (time: number, appearanceParam: appearanceParamType): number => {
    const {appearTime, appearDuration, disappearTime, disappearDuration} = appearanceParam
    if (time < appearTime) {
        return 0
    }
    if (appearDuration >= (time - appearTime)) {
        return (time - appearTime) / appearDuration
    } else if ((time > disappearTime) && (disappearDuration >= (time - disappearTime))) {
        return 1 - ((time - disappearTime) / disappearDuration)
    }
    return 1
}

export const addPoints = (term1: Point, term2: Coordinates, ...terms: Coordinates[]): Point => {
    let resultX = term1.x + (term2.x ?? 0)
    let resultY = term1.y + (term2.y ?? 0)
    if (terms.length > 0) {
        terms.forEach(term => {
            resultX += term.x ?? 0
            resultY += term.y ?? 0
        })
    }
    return {
        x: resultX,
        y: resultY
    }
}
export const subtractPoints = (minuend: Point, subtrahend: Coordinates, ...subtrahends: Coordinates[]): Point => addPoints(
    minuend,
    {
        x: -(subtrahend.x ?? 0),
        y: -(subtrahend.y ?? 0)
    },
    ...subtrahends.map(subtrahend => ({
        x: subtrahend.x,
        y: subtrahend.y
    }))
)

export const getVectorAngle = (p5: p5Types, point: Point): number => p5.createVector(point.x, point.y).heading()
export const rotateVector = (p5: p5Types, point: Point, angle: number): Point => {
    const resultVector = p5.createVector(point.x, point.y).rotate(angle)
    return {
        x: resultVector.x,
        y: resultVector.y
    }
}
