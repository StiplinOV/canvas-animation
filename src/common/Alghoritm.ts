export const findAllArrayIndexGroupsBy = (numberOfElements: number, numberOfElementsInGroup: number, startIndexParam?: number): number[][] => {
    const startIndex = startIndexParam || 0
    if (numberOfElements - startIndex < numberOfElementsInGroup) {
        throw new Error('Number of elements in group should be less than number of elements')
    }
    const result: number[][] = []
    if (numberOfElementsInGroup == 1) {
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

type IntervalType = { start: number; end: number }
export const mergeIntervals = (input: IntervalType[]): IntervalType[] => {
    if (input.length <= 1) {
        return input
    }
    input.sort((l, r) => {
        if (l.start != r.start) {
            return l.start - r.start
        }
        return l.end - r.end
    })
    let fromIndex = 0
    do {
        let left = input[fromIndex]
        let right = input[fromIndex + 1]
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
