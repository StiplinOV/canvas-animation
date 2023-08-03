import {Point, ZeroPoint} from './Point'
import p5Types from 'p5'

/*
        TreeMap<Integer, Integer> inMap = new TreeMap<>();
        for (int[] interval : intervals) {
            int left = interval[0];
            int right = interval[1];
            if (inMap.containsKey(left)) {
                inMap.put(left, Math.max(right, inMap.get(left)));
            } else {
                inMap.put(left, right);
            }
        }
        TreeMap<Integer, Integer> outMap = new TreeMap<>();
        Integer curLeft = inMap.firstKey();
        int curRight = inMap.get(curLeft);

        Integer nextLeft = inMap.higherKey(curLeft);
        while (nextLeft != null) {
            Integer nextRight = inMap.get(nextLeft);
            if (curRight >= nextLeft) {
                curRight = Math.max(curRight, nextRight);
                inMap.remove(nextLeft);
                nextLeft = inMap.higherKey(curLeft);
                continue;
            } else {
                outMap.put(curLeft, curRight);
            }
            curRight = nextRight;
            curLeft = nextLeft;
            nextLeft = inMap.higherKey(curLeft);
        }
        outMap.put(curLeft, curRight);
        int[][] result = new int[outMap.size()][2];
        int i = 0;
        for (Map.Entry<Integer, Integer> entry : outMap.entrySet()) {
            result[i][0] = entry.getKey();
            result[i][1] = entry.getValue();
            i++;
        }
        return result;
    }
 */

interface Coordinates {
    x?: number
    y?: number
}

export interface EventTimeParam {
    time: number
    duration: number
}

export interface PresenceParamType {
    appearTime: number
    appearDuration: number
    disappearTime: number
    disappearDuration: number
}

export type render2DArrayType = 'leftToRight' | 'upToDown'
export type RotationType = {
    axis: Point
    angle: number
}

export const calculatePercentValue = (from: number, to: number, percent: number): number => from + (to - from) * percent
export const calculatePointPercentValue = (from: Point, to: Point, percent: number): Point =>
    ({
        x: calculatePercentValue(from.x, to.x, percent),
        y: calculatePercentValue(from.y, to.y, percent)
    })

export const calculateSetPercentValue = <T>(from: T[], to: T[], percent: number): T[] => {
    const setIntersection = new Set<T>()
    const fromUniqueSet = new Set<T>(from)
    const toUniqueSet = new Set<T>(to)
    from.forEach(v => new Set(Array.from(to.values()).map(v => JSON.stringify(v))).has(JSON.stringify(v)) && setIntersection.add(v))
    setIntersection.forEach(v => {
        new Set(Array.from(fromUniqueSet.values()).map(v => JSON.stringify(v))).has(JSON.stringify(v)) && fromUniqueSet.delete(v)
        new Set(Array.from(toUniqueSet.values()).map(v => JSON.stringify(v))).has(JSON.stringify(v)) && toUniqueSet.delete(v)
    })
    const fromUniqueSetArray = Array.from(fromUniqueSet.values())
    const toUniqueSetArray = Array.from(toUniqueSet.values())
    const resultDeltaArray = calculateArrayPercentValue(fromUniqueSetArray, toUniqueSetArray, percent)
    resultDeltaArray.forEach(v => setIntersection.add(v))
    return Array.from(setIntersection.values())
}

export const calculateArrayPercentValue = <T>(from: T[], to: T[], percent: number): T[] => {
    if (JSON.stringify(from) === JSON.stringify(to)) {
        return from
    }
    let toStartsWithFrom = true
    let fromStartsWithTo = true
    for (let i = 0; i < Math.min(from.length, to.length); i++) {
        if (JSON.stringify(from[i]) !== JSON.stringify(to[i])) {
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
        const numberOfStates = to.length - from.length + 1
        const currentState = Math.round(calculatePercentValue(1, numberOfStates, percent))
        return to.slice(0, from.length + currentState - 1)
    } else if (fromStartsWithTo) {
        const numberOfStates = from.length - to.length + 1
        const currentState = Math.round(calculatePercentValue(1, numberOfStates, percent))
        return from.slice(0, from.length - currentState + 1)
    } else {
        const numberOfStates = from.length + to.length
        const currentState = Math.round(calculatePercentValue(1, numberOfStates, percent))
        if (currentState >= 0 && currentState <= from.length) {
            return from.slice(0, from.length - currentState + 1)
        } else {
            return to.slice(0, currentState - from.length)
        }
    }
}
export const calculatePointsPercentValue = (from: Point[], to: Point[], percent: number): Point[] => {
    const result: Point[] = []
    const fromPoint = from.length ? from[from.length - 1] : ZeroPoint
    const toPoint = to.length ? to[to.length - 1] : ZeroPoint
    while (from.length < to.length) {
        from.push(fromPoint)
    }
    while (to.length < from.length) {
        to.push(toPoint)
    }
    for (let i = 0; i < from.length; i++) {
        result.push(calculatePointPercentValue(from[i], to[i], percent))
    }
    return result
}

export const calculateTextPercentValue = (from: string, to: string, percent: number): string => {
    return calculateArrayPercentValue(from.split(''), to.split(''), percent).join('')
}

export const calculateColorPercentValue = (fromParam: string, toParam: string, percent: number): string => {
    const toColor = (param: string): string => {
        if (param.match(/^#[0-9ABCDEFabcdef]{3}$/)) {
            const r = param.substring(1, 2)
            const g = param.substring(2, 3)
            const b = param.substring(3, 4)

            return `#${r}${r}${g}${g}${b}${b}`
        }
        if (param.match(/^#[0-9ABCDEFabcdef]{6}$/)) {
            return param
        }
        throw new Error(`wrong color: ${param}`)
    }

    const from = toColor(fromParam)
    const to = toColor(toParam)
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
export const calculateRotationPercentValue = (from: RotationType, to: RotationType, percent: number): RotationType => {
    return {
        axis: calculatePointPercentValue(from.axis, to.axis, percent),
        angle: calculatePercentValue(from.angle, to.angle, percent)
    }
}
export const calculateRotationsPercentValue = (from: RotationType[], to: RotationType[], percent: number): RotationType[] => {
    const result: RotationType[] = []
    while (from.length < to.length) {
        from.push({
            axis: ZeroPoint,
            angle: 0
        })
    }
    while (to.length < from.length) {
        to.push({
            axis: ZeroPoint,
            angle: 0
        })
    }
    for (let i = 0; i < from.length; i++) {
        result.push(calculateRotationPercentValue(from[i], to[i], percent))
    }

    return result
}

export const toPresenceParamType = (values?: Partial<PresenceParamType>[]): PresenceParamType[] => {
    if (values) {
        return values.map(v => ({
            appearTime: v.appearTime ?? 0,
            appearDuration: v.appearDuration ?? 0,
            disappearTime: v.disappearTime ?? Number.POSITIVE_INFINITY,
            disappearDuration: v.disappearDuration ?? 0
        }))
    }
    return []
}

export const toPresenceParam = (time: number, presenceParams: PresenceParamType[], skipStartTime?: boolean): PresenceParamType | null => {
    for (let i = 0; i < presenceParams.length; i++) {
        const presenceParam = presenceParams[i]
        if ((skipStartTime ? time > presenceParam.appearTime : time >= presenceParam.appearTime) && time < (presenceParam.disappearTime + presenceParam.disappearDuration)) {
            return presenceParam
        }
    }
    return null
}

export const needAppearObject = (time: number, presenceParams: PresenceParamType[], skipStartTime?: boolean): boolean => {
    return toPresenceParam(time, presenceParams, skipStartTime) !== null
}

export const toAppearancePercent = (time: number, appearanceParams: PresenceParamType[]): number => {
    const appearanceParam = toPresenceParam(time, appearanceParams)
    if (appearanceParam === null) {
        return 0
    }
    const {
        appearTime,
        appearDuration,
        disappearTime,
        disappearDuration
    } = appearanceParam
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
export const swapPointXY = (point: Point): Point => {
    return {
        x: point.y,
        y: point.x
    }
}
export const calculatePointBetween = (l: Point, r: Point): Point => {
    return {
        x: (l.x + r.x) / 2,
        y: (l.y + r.y) / 2
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
export const getBezierControlPoint = (p1: Point, p2: Point, p3: Point, p4: Point): {
    m0: Point
    m1: Point
    m2: Point
    m3: Point
    m4: Point
    m5: Point
} => {
    const m0 = calculatePointBetween(p1, p2)
    const m1 = calculatePointBetween(p2, p3)
    const m2 = calculatePointBetween(p3, p4)
    const m3 = calculatePointBetween(m0, m1)
    const m4 = calculatePointBetween(m2, m1)
    const m5 = calculatePointBetween(m3, m4)

    return {
        m0,
        m1,
        m2,
        m3,
        m4,
        m5
    }
}
export const getBezierLineMiddlePoint = (p1: Point, p2: Point, p3: Point, p4: Point): Point => getBezierControlPoint(
    p1,
    p2,
    p3,
    p4
).m5

export const getVectorAngle = (p5: p5Types, point: Point): number => p5.createVector(point.x, point.y).heading()
export const rotateVector = (p5: p5Types, point: Point, angle: number): Point => {
    const resultVector = p5.createVector(point.x, point.y).rotate(angle)
    return {
        x: resultVector.x,
        y: resultVector.y
    }
}
export const requireValueFromMap = <K, V>(map: Map<K, V>, key: K): V => {
    const value = map.get(key)
    if (value !== undefined) {
        return value
    }
    throw new Error(`Key ${String(key)} is absent in map`)
}
export const mergeValueToMap = <K, V, C extends V[] | Set<V>>(m: Map<K, C>, k: K, v: V, c: () => C): void => {
    let collection = m.get(k)
    if (!collection) {
        collection = c()
        m.set(k, collection)
    }
    if (Array.isArray(collection)) {
        collection.push(v)
    } else {
        collection.add(v)
    }
}
