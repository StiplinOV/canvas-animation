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
    const sorted = intervals.sort((l,r) => l.start - r.start)
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

export const convertPercentToFadeInFadeOut = (percent: number, duration?: number, fadeDuration?: number): number => {
    if (!duration || !fadeDuration) {
        duration = 1
        fadeDuration = 0.5
    }
    if (percent < fadeDuration / duration) {
        return (percent * duration) / fadeDuration
    }
    if (percent < 1 - (fadeDuration / duration)) {
        return 1
    }
    return ((1 - percent) * duration) / fadeDuration
}

export const uniqueArray = <T>(array: Array<T>): Array<T> => {
    return array.filter((value, index, array) => array.indexOf(value) === index)
}
