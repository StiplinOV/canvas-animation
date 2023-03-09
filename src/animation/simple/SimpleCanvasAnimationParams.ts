import CanvasAnimationParams, {ObjectParams, Selection, weightToNumber} from '../CanvasAnimationParams'
import AnimationStyle from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'
import {
    calculatePercentValue,
    calculatePointPercentValue,
    calculateRotationsPercentValue,
    toAppearancePercent
} from '../../common/Utils'
import { ZeroPoint } from '../../common/Point'

interface SelectionInfo<U extends Selection = Selection> {
    selection?: U | null
    percent: number
}

export default abstract class SimpleCanvasAnimationParams<T extends ObjectParams = ObjectParams> extends CanvasAnimationParams<T> {

    public calculateObjectParamsInTime(time: number, animationStyle: AnimationStyle): T {
        const sourceObject = this.getObject()
        let result = {...sourceObject}
        this.getTransformations()
            .filter(t => time >= t.time)
            .forEach((t) => {
                const transformationObject = t.object
                const percent = toAppearancePercent(time, {
                    appearTime: t.time,
                    appearDuration: t.duration
                })
                if (transformationObject.origin) {
                    result.origin = calculatePointPercentValue(result.origin, transformationObject.origin, percent)
                }
                if (transformationObject.zIndex) {
                    result.zIndex = calculatePercentValue(result.zIndex ?? 0, transformationObject.zIndex, percent)
                }
                if (transformationObject.weight) {
                    result.weight = calculatePercentValue(
                        weightToNumber(result.weight ?? animationStyle.strokeWeight, animationStyle),
                        weightToNumber(transformationObject.weight, animationStyle), percent
                    )
                }
                if (transformationObject.rotations) {
                    result.rotations = calculateRotationsPercentValue(
                        result.rotations ?? [{axis: ZeroPoint, angle: 0}],
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

    public abstract mergeWithTransformation(obj: T, trans: Partial<T>, perc: number, animationStyle: AnimationStyle): Omit<T, keyof ObjectParams>

    public calculateSelectionInfo(time: number): SelectionInfo {
        const selections = this.getSelections()
        let selected = false
        let percent = 0
        let selection = null
        for (let i = 0; i < selections.length; i++) {
            const currentSelection = selections[i]
            const duration = currentSelection.duration
            if (time >= currentSelection.time) {
                selected = !duration || time <= currentSelection.time + duration
                if (selected) {
                    percent = duration ? (time - currentSelection.time) / duration : 1
                    selection = currentSelection
                    break
                }
            }
        }
        return {selection, percent}
    }

    toCanvasAnimations(animationStyle: AnimationStyle): CanvasAnimation[] {
        return [this.toCanvasAnimation(animationStyle)]
    }

    protected abstract toCanvasAnimation(animationStyle: AnimationStyle): CanvasAnimation

}
