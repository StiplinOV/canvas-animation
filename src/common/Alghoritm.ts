import {AppearAlgorithm} from '../animation/CanvasAnimationParams'

export const findAllArrayIndexGroupsBy = (numberOfElements: number, numberOfElementsInGroup: number, startIndexParam?: number): number[][] => {
    const startIndex = startIndexParam ?? 0
    if (numberOfElements - startIndex < numberOfElementsInGroup) {
        throw new Error('Number of elements in group should be less than number of elements')
    }
    const result: number[][] = []
    if (numberOfElementsInGroup === 1) {
        for (let i = startIndex; i < numberOfElements; i++) {
            result.push([i])
        }
        return result
    }
    for (let i = startIndex; i < numberOfElements; i++) {
        const newNumberOfElementsInGroup = numberOfElementsInGroup - 1
        const newStartIndex = i + 1
        if (numberOfElements - newStartIndex < newNumberOfElementsInGroup) {
            break
        }
        findAllArrayIndexGroupsBy(numberOfElements, newNumberOfElementsInGroup, newStartIndex).forEach(found => {
            result.push([i, ...found])
        })
    }
    return result
}

export type IntervalType = { start: number, end: number }
export const intervalContainsIntersections = (intervals: IntervalType[]): boolean => {
    if (intervals.length === 0) {
        return false
    }
    if (intervals[0].end < intervals[0].start) {
        return true
    }
    if (intervals.length === 1) {
        return false
    }
    const sorted = intervals.sort((l, r) => l.start - r.start)
    let prevInterval = sorted[0]
    for (let i = 1; i < sorted.length; i++) {
        const interval = sorted[i]
        if (interval.end < interval.start) {
            return true
        }
        if (interval.start < prevInterval.end) {
            return true
        }
        prevInterval = interval
    }
    return false
}
export const mergeIntervals = (input: IntervalType[]): IntervalType[] => {
    if (input.length <= 1) {
        return input
    }
    input.sort((l, r) => {
        if (l.start !== r.start) {
            return l.start - r.start
        }
        return l.end - r.end
    })
    let fromIndex = 0
    do {
        const left = input[fromIndex]
        const right = input[fromIndex + 1]
        if (right.start > left.end) {
            fromIndex++
        } else {
            input.splice(fromIndex, 1)
            input[fromIndex] = {
                start: left.start,
                end: right.end
            }
        }
    } while (fromIndex < input.length - 1)
    return input
}

export const convertPercentAccordingToAlgorithm = (percent: number, algorithm: AppearAlgorithm): number => {
    if (algorithm.func === 'linear') {
        return percent
    } else if (algorithm.func === 'immediate') {
        return 1
    }
    throw new Error(`Wrong algorithm parameter ${JSON.stringify(algorithm)}`)
}

export const uniqueArray = <T>(array: T[]): T[] => {
    return array.filter((value, index, array) => array.indexOf(value) === index)
}

export const getCssClassesSortedByPriority = (cssSelector: string[]): string [][] => {
    const findAllBinaryOnePositions = (bitDepth: number, numberOfOnes: number): number [][] => {
        const result: number[][] = []
        if (numberOfOnes === 0) {
            return result
        }
        if (bitDepth === numberOfOnes) {
            const res: number[] = []
            for (let i = 0; i < bitDepth; i++) {
                res.push(i)
            }
            return [res]
        }
        let prevResultForOne = findAllBinaryOnePositions(bitDepth - 1, numberOfOnes - 1).map(arr => [...arr, bitDepth - 1])
        const prevResultForZero = findAllBinaryOnePositions(bitDepth - 1, numberOfOnes)
        if (numberOfOnes === 1) {
            prevResultForOne = [[bitDepth - 1]]
        }

        return [...prevResultForOne, ...prevResultForZero]
    }

    const indices: number[][] = []
    for (let i = cssSelector.length; i > 0; i--) {
        indices.push(...findAllBinaryOnePositions(cssSelector.length, i))
    }
    return indices.map(idices => cssSelector.filter((_, i) => idices.includes(i)))
}
