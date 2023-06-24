import { textParamsType } from './animation/simple/text/TextCanvasAnimationParams'
import { ArrayParamsType, ArraySelectorType } from './animation/complex/array/ArrayCanvasAnimationParams'
import { circleParamsType } from './animation/simple/circle/CircleCanvasAnimationParams'
import { ellipseParamsType } from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import { Params } from './animation/CanvasAnimationParams'
import {
    HighlightedTextCanvasAnimationSelection,
    HighlightedTextParamsType
} from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {
    highlightedSyntaxParamsType, HighlightedSyntaxSelectorType
} from './animation/complex/highlightedsyntax/HighlightedSyntaxCanvasAnimationParams'
import { ComplexCanvasAnimationSelection, TransformOptions } from './animation/complex/ComplexCanvasAnimationParams'
import { LineParamsType } from './animation/simple/line/LineCanvasAnimationParams'
import { ArrowParamsType } from './animation/complex/arrow/ArrowCanvasAnimationParams'
import { rectangleParamsType } from './animation/simple/rectangle/RectangleCanvasAnimationParams'
import {
    TableParamsType,
    TableSelectorType,
    TableTransformOptionsType
} from './animation/complex/table/TableCanvasAnimationParams'
import { XyChartParamsType, XyChartSelectorType } from './animation/complex/xychart/XYChartCanvasAnimationParams'
import { CameraParams } from './camera/CameraParams'
import { GraphDataStructureParamsType } from './animation/complex/datastructure/graph/GraphDataStructureParams'
import { BezierParamsType } from './animation/simple/bezier/BezierCanvasAnimationParams'
import { MatrixParamsType, MatrixSelectorType } from './animation/complex/array/MatrixCanvasAnimationParams'
import { NumberLineParamsType } from './animation/complex/numberline/NumberLineParams'

export type AnimationsJsonType = {
    // TODO dequeue
    array?: Params<ArrayParamsType, TransformOptions, ComplexCanvasAnimationSelection<ArraySelectorType>>[]
    matrix?: Params<MatrixParamsType, TransformOptions, ComplexCanvasAnimationSelection<MatrixSelectorType>>[]
    arrow?: Params<ArrowParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
    circle?: Params<circleParamsType>[]
    ellipse?: Params<ellipseParamsType>[]
    bezier?: Params<BezierParamsType>[]
    highlightedSyntax?: Params<highlightedSyntaxParamsType, TransformOptions, ComplexCanvasAnimationSelection<HighlightedSyntaxSelectorType>>[]
    highlightedText?: Params<HighlightedTextParamsType, unknown, HighlightedTextCanvasAnimationSelection>[]
    line?: Params<LineParamsType>[]
    rectangle?: Params<rectangleParamsType>[]
    table?: Params<TableParamsType, TableTransformOptionsType, ComplexCanvasAnimationSelection<TableSelectorType>>[]
    text?: Params<textParamsType>[]
    xyChart?: Params<XyChartParamsType, TransformOptions, ComplexCanvasAnimationSelection<XyChartSelectorType>>[]
    graphDataStructure?: Params<GraphDataStructureParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
    numberLine?: Params<NumberLineParamsType, TransformOptions, ComplexCanvasAnimationSelection>[]
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
