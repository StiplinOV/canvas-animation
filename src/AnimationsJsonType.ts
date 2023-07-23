import {TextParamsType} from './animation/simple/text/TextCanvasAnimationParams'
import {ArrayParamsType, ArraySelectorType} from './animation/complex/array/ArrayCanvasAnimationParams'
import {CircleParamsType} from './animation/simple/circle/CircleCanvasAnimationParams'
import {EllipseParamsType} from './animation/simple/ellipse/EllipseCanvasAnimationParams'
//import {Params, SelectionType} from './animation/CanvasAnimationParams'
import {
   // HighlightedTextCanvasAnimationSelection,
    HighlightedTextParamsType
} from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {TransformOptions} from './animation/complex/ComplexCanvasAnimationParams'
import {LineParamsType} from './animation/simple/line/LineCanvasAnimationParams'
import {ArrowParamsType} from './animation/complex/arrow/ArrowCanvasAnimationParams'
import {RectangleParamsType} from './animation/simple/rectangle/RectangleCanvasAnimationParams'
import {
    TableParamsType,
    TableSelectorType,
    TableTransformOptionsType
} from './animation/complex/table/TableCanvasAnimationParams'
import {XyChartParamsType, XyChartSelectorType} from './animation/complex/xychart/XYChartCanvasAnimationParams'
import {CameraParams} from './camera/CameraParams'
import {GraphDataStructureParamsType} from './animation/complex/datastructure/graph/GraphDataStructureParams'
import {BezierParamsType} from './animation/simple/bezier/BezierCanvasAnimationParams'
import {MatrixParamsType, MatrixSelectorType} from './animation/complex/array/MatrixCanvasAnimationParams'
import {NumberLineParamsType} from './animation/complex/numberline/NumberLineParams'
import {
    CodeQuestionnaireCanvasAnimationSelection,
    CodeQuestionnaireParamsType
} from './animation/complex/codequestionnaire/CodeQuestionnaireCanvasAnimationParams'
import {JsonParams, SelectionType} from "./object/JsonParams";
import {MatrixJsonObjectParamsType} from "./animation/complex/array/MatrixObjectParamsConverter";

export type SimpleObjectTypeToGenericTypes = {
    // circle: [CircleParamsType, unknown, SelectionType]
    // ellipse: [EllipseParamsType, unknown, SelectionType]
    // bezier: [BezierParamsType, unknown, SelectionType]
    // highlightedText: [HighlightedTextParamsType, unknown, HighlightedTextCanvasAnimationSelection]
    // line: [LineParamsType, unknown, SelectionType]
    // rectangle: [RectangleParamsType, unknown, SelectionType]
    // text: [TextParamsType, unknown, SelectionType]
}

export type ObjectTypeToGenericTypes = SimpleObjectTypeToGenericTypes & {
    // array: [ArrayParamsType, TransformOptions, SelectionType<ArraySelectorType>]
    matrix: [MatrixJsonObjectParamsType, TransformOptions, SelectionType<MatrixSelectorType>]
    // arrow: [ArrowParamsType, TransformOptions, SelectionType]
    // codeQuestionnaire: [CodeQuestionnaireParamsType, TransformOptions, SelectionType<CodeQuestionnaireCanvasAnimationSelection>]
    // table: [TableParamsType, TableTransformOptionsType, SelectionType<TableSelectorType>]
    // xyChart: [XyChartParamsType, TransformOptions, SelectionType<XyChartSelectorType>]
    // graphDataStructure: [GraphDataStructureParamsType, TransformOptions, SelectionType]
    // numberLine: [NumberLineParamsType, TransformOptions, SelectionType]
}

export type ObjectTypeToParamTypesMapping = {
    [key in keyof ObjectTypeToGenericTypes]: JsonParams<ObjectTypeToGenericTypes[key][0], ObjectTypeToGenericTypes[key][1], ObjectTypeToGenericTypes[key][2]>
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
