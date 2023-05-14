import p5Types from 'p5'
import {LineParamsType} from './LineCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import CanvasAnimation from '../../CanvasAnimation'
import { SelectionInfo } from '../SimpleCanvasAnimationParams'

export default class LineCanvasAnimation extends CanvasAnimation<LineParamsType> {

    public drawObject(p5: p5Types, o: LineParamsType, perc: number, selectionInfo: SelectionInfo, style: AnimationStyle): void {
        const {origin, endPoint} = o
        const endX = (endPoint.x - origin.x) * perc
        const endY = (endPoint.y - origin.y) * perc
        p5.line(0, 0, endX, endY)
    }

}
