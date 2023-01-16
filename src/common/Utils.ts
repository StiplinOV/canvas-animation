import {Point} from "./Point";

export type appearanceParamType = {
    appearTime: number,
    appearDuration: number,
    disappearTime: number,
    disappearDuration: number,
}
export const convertPercentToFadeInFadeOut = (percent: number): number => 2 * Math.abs(0.5 - Math.abs(percent - 0.5))
export const calculatePercentValue = (from: number, to: number, percent: number): number => from + (to - from) * percent
export const calculatePointPercentValue = (from: Point, to: Point, percent: number): Point =>
    ({x: calculatePercentValue(from.x, to.x, percent), y: calculatePercentValue(from.y, to.y, percent)})
export const calculateArrayPercentValue = <T>(from: T[], to: T[], percent: number): T[] => {
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
export const calculateTextPercentValue = (from: string, to: string, percent: number): string => {
    return calculateArrayPercentValue(from.split(''), to.split(''), percent).join('')
}

export const toAppearanceParamType = (values: Partial<appearanceParamType>): appearanceParamType => ({
    appearTime: values.appearTime || 0,
    appearDuration: values.appearDuration || 0,
    disappearTime: values.disappearTime || Number.POSITIVE_INFINITY,
    disappearDuration: values.disappearDuration || 0
})
export const needAppearObject = (time: number, appearanceParam: appearanceParamType): boolean => {
    if (appearanceParam.appearTime >= time) {
        return false
    }
    return (appearanceParam.disappearTime + (appearanceParam.disappearDuration)) > time;
}
export const toAppearancePercent = (time: number, appearanceParam: appearanceParamType): number => {
    const {appearTime, appearDuration, disappearTime, disappearDuration} = appearanceParam
    if (appearDuration && appearDuration >= (time - appearTime)) {
        return (time - appearTime) / appearDuration
    } else if (disappearDuration && time > disappearTime && (disappearDuration >= (time - disappearTime))) {
        return 1 - ((time - disappearTime) / disappearDuration)
    }
    return 1
}