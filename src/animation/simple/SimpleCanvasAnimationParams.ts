import CanvasAnimationParams, {ObjectParams, Selection} from '../CanvasAnimationParams'
import AnimationStyle from '../../AnimationStyles'
import CanvasAnimation from '../CanvasAnimation'

interface SelectionInfo<U extends Selection = Selection> {
    selection?: U | null
    percent: number
}

export default abstract class SimpleCanvasAnimationParams<T extends ObjectParams = ObjectParams> extends CanvasAnimationParams<T> {

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
