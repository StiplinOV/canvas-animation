import { TextParamsType } from './animation/simple/text/TextCanvasAnimationParams'
import { ArrayParamsType, ArraySelectorType } from './animation/complex/array/ArrayCanvasAnimationParams'
import { CircleParamsType } from './animation/simple/circle/CircleCanvasAnimationParams'
import { EllipseParamsType } from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import { Params, SelectionType } from './animation/CanvasAnimationParams'
import {
    HighlightedTextCanvasAnimationSelection,
    HighlightedTextParamsType
} from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import { TransformOptions } from './animation/complex/ComplexCanvasAnimationParams'
import { LineParamsType } from './animation/simple/line/LineCanvasAnimationParams'
import { ArrowParamsType } from './animation/complex/arrow/ArrowCanvasAnimationParams'
import { RectangleParamsType } from './animation/simple/rectangle/RectangleCanvasAnimationParams'
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
import {
    CodeQuestionnaireCanvasAnimationSelection,
    CodeQuestionnaireParamsType
} from './animation/complex/codequestionnaire/CodeQuestionnaireCanvasAnimationParams'

export type AnimationsJsonType = {
    // TODO dequeue
    array?: Params<ArrayParamsType, TransformOptions, SelectionType<ArraySelectorType>>[]
    matrix?: Params<MatrixParamsType, TransformOptions, SelectionType<MatrixSelectorType>>[]
    arrow?: Params<ArrowParamsType, TransformOptions>[]
    circle?: Params<CircleParamsType>[]
    codeQuestionnaire?: Params<CodeQuestionnaireParamsType, TransformOptions, SelectionType<CodeQuestionnaireCanvasAnimationSelection>>[]
    ellipse?: Params<EllipseParamsType>[]
    bezier?: Params<BezierParamsType>[]
    highlightedText?: Params<HighlightedTextParamsType, unknown, HighlightedTextCanvasAnimationSelection>[]
    line?: Params<LineParamsType>[]
    rectangle?: Params<RectangleParamsType>[]
    table?: Params<TableParamsType, TableTransformOptionsType, SelectionType<TableSelectorType>>[]
    text?: Params<TextParamsType>[]
    xyChart?: Params<XyChartParamsType, TransformOptions, SelectionType<XyChartSelectorType>>[]
    graphDataStructure?: Params<GraphDataStructureParamsType, TransformOptions>[]
    numberLine?: Params<NumberLineParamsType, TransformOptions>[]
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
