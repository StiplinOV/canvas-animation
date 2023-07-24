import {TextJsonParamsType} from './animation/simple/text/TextCanvasAnimationParams'
import {ArrayJsonParamsType, ArraySelectorType} from './animation/complex/array/ArrayCanvasAnimationParams'
import {CircleJsonParamsType} from './animation/simple/circle/CircleCanvasAnimationParams'
import {EllipseJsonParamsType} from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import {Params, SelectionType} from './animation/CanvasAnimationParams'
import {
    HighlightedTextCanvasAnimationSelection,
    HighlightedTextJsonParamsType
} from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {TransformOptions} from './animation/complex/ComplexCanvasAnimationParams'
import {LineJsonParamsType} from './animation/simple/line/LineCanvasAnimationParams'
import {ArrowJsonParamsType} from './animation/complex/arrow/ArrowCanvasAnimationParams'
import {RectangleJsonParamsType} from './animation/simple/rectangle/RectangleCanvasAnimationParams'
import {
    TableJsonParamsType,
    TableSelectorType,
    TableTransformOptionsType
} from './animation/complex/table/TableCanvasAnimationParams'
import {XyChartJsonParamsType, XyChartSelectorType} from './animation/complex/xychart/XYChartCanvasAnimationParams'
import {CameraParams} from './camera/CameraParams'
import {GraphDataStructureJsonParamsType} from './animation/complex/datastructure/graph/GraphDataStructureParams'
import {BezierJsonParamsType} from './animation/simple/bezier/BezierCanvasAnimationParams'
import {MatrixJsonParamsType, MatrixSelectorType} from './animation/complex/array/MatrixCanvasAnimationParams'
import {NumberLineJsonParamsType} from './animation/complex/numberline/NumberLineParams'
import {
    CodeQuestionnaireCanvasAnimationSelection,
    CodeQuestionnaireJsonParams
} from './animation/complex/codequestionnaire/CodeQuestionnaireCanvasAnimationParams'

export type SimpleObjectTypeToGenericTypes = {
    circle: [CircleJsonParamsType, unknown, SelectionType]
    ellipse: [EllipseJsonParamsType, unknown, SelectionType]
    bezier: [BezierJsonParamsType, unknown, SelectionType]
    highlightedText: [HighlightedTextJsonParamsType, unknown, HighlightedTextCanvasAnimationSelection]
    line: [LineJsonParamsType, unknown, SelectionType]
    rectangle: [RectangleJsonParamsType, unknown, SelectionType]
    text: [TextJsonParamsType, unknown, SelectionType]
}

export type ObjectTypeToGenericTypes = SimpleObjectTypeToGenericTypes & {
    array: [ArrayJsonParamsType, TransformOptions, SelectionType<ArraySelectorType>]
    matrix: [MatrixJsonParamsType, TransformOptions, SelectionType<MatrixSelectorType>]
    arrow: [ArrowJsonParamsType, TransformOptions, SelectionType]
    codeQuestionnaire: [CodeQuestionnaireJsonParams, TransformOptions, SelectionType<CodeQuestionnaireCanvasAnimationSelection>]
    table: [TableJsonParamsType, TableTransformOptionsType, SelectionType<TableSelectorType>]
    xyChart: [XyChartJsonParamsType, TransformOptions, SelectionType<XyChartSelectorType>]
    graphDataStructure: [GraphDataStructureJsonParamsType, TransformOptions, SelectionType]
    numberLine: [NumberLineJsonParamsType, TransformOptions, SelectionType]
}

export type ObjectTypeToParamTypesMapping = {
    [key in keyof ObjectTypeToGenericTypes]: Params<ObjectTypeToGenericTypes[key][0], ObjectTypeToGenericTypes[key][1], ObjectTypeToGenericTypes[key][2]>
}

export type AnimationsJsonType = {
    [key in keyof ObjectTypeToGenericTypes]?: ObjectTypeToParamTypesMapping[key][]
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
