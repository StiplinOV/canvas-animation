import CanvasAnimation, {ObjectParams, Selection} from '../CanvasAnimation'
import p5Types from 'p5'
import {toAppearancePercent} from '../../common/Utils'

interface SelectionInfo<U extends Selection = Selection> { selection?: U | null, percent: number }

export default abstract class SimpleCanvasAnimation<T extends ObjectParams> extends CanvasAnimation<T> {

    protected doDraw(p5: p5Types, time: number): void {
        const object = this.calculateObjectParamsInTime(time, p5)
        const selectionInfo = this.calculateSelectionInfo(time)
        p5.strokeWeight(object.weight ?? 1)
        p5.stroke(this.getAnimationStyle().strokeColor)
        p5.fill(this.getAnimationStyle().fillColor)
        this.drawObject(p5, object, toAppearancePercent(time, this.getAppearanceParam()), selectionInfo.percent)
    }

    public containedAnimationsLength(): number {
        return 1
    }

    private calculateSelectionInfo(time: number): SelectionInfo {
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

    public abstract drawObject(p5: p5Types, obj: T, perc: number, selectedPercent: number): void

}
