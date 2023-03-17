import { textParamsType } from './animation/simple/text/TextCanvasAnimationParams'
import { arrayParamsType } from './animation/complex/array/ArrayCanvasAnimationParams'
import { circleParamsType } from './animation/simple/circle/CircleCanvasAnimationParams'
import { ellipseParamsType } from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import { Params } from './animation/CanvasAnimationParams'
import { highlightedTextParamsType } from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {
    highlightedSyntaxParamsType
} from './animation/complex/highlightedsyntax/HighlightedSyntaxCanvasAnimationParams'
import { ComplexCanvasAnimationSelection, TransformOptions } from './animation/complex/ComplexCanvasAnimationParams'
import { LineParamsType } from './animation/simple/line/LineCanvasAnimationParams'
import { ArrowParamsType } from './animation/complex/arrow/ArrowCanvasAnimationParams'
import { rectangleParamsType } from './animation/simple/rectangle/RectangleCanvasAnimationParams'
import {
    tableParamsType,
    tableSelectorType,
    tableTransformOptionsType
} from './animation/complex/table/TableCanvasAnimationParams'
import { xyChartParamsType, xyChartSelectorType } from './animation/complex/xychart/XYChartCanvasAnimationParams'
import { CameraParams } from './camera/CameraParams'
import { GraphDataStructureParamsType } from './animation/complex/datastructure/tree/GraphDataStructureParams'
import { BezierParamsType } from './animation/simple/bezier/BezierCanvasAnimationParams'

export type AnimationsJsonType = {
    array?: Params<arrayParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
    arrow?: Params<ArrowParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
    circle?: Params<circleParamsType>[]
    ellipse?: Params<ellipseParamsType>[]
    bezier?: Params<BezierParamsType>[]
    highlightedSyntax?: Params<highlightedSyntaxParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
    highlightedText?: Params<highlightedTextParamsType>[]
    line?: Params<LineParamsType>[]
    rectangle?: Params<rectangleParamsType>[]
    table?: Params<tableParamsType, tableTransformOptionsType, ComplexCanvasAnimationSelection<tableSelectorType>>[]
    text?: Params<textParamsType>[]
    xyChart?: Params<xyChartParamsType, TransformOptions, ComplexCanvasAnimationSelection<xyChartSelectorType>>[]
    graphDataStructure?: Params<GraphDataStructureParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
}

export type LessonJsonType = {
    sound: URL
    canvasDimensions: {
        width: number
        height: number
    }
    endTime: number
    cameras: CameraParams[]
    animations: AnimationsJsonType
}
