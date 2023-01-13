export const convertPercentToFadeInFadeOut = (percent: number): number => 2 * Math.abs(0.5 - Math.abs(percent - 0.5))
export const calculatePercentValue = (from: number, to: number, percent: number): number => from + (to - from)*percent
