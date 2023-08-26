import {TextJsonParamsType} from './animation/simple/text/TextCanvasAnimationParams'
import {ArrayJsonParamsType, ArraySelectorType} from './animation/complex/array/ArrayCanvasAnimationParams'
import {CircleJsonParamsType} from './animation/simple/circle/CircleCanvasAnimationParams'
import {EllipseJsonParamsType} from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import {Params, SelectionType, TransformationOptions} from './animation/CanvasAnimationParams'
import {
    FormattedTextCanvasAnimationSelection,
    FormattedTextJsonParamsType
} from './animation/simple/formattedtext/FormattedTextCanvasAnimationParams'
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
import {ImageJsonParamsType} from './animation/simple/image/ImageCanvasAnimationParams'

export type SimpleObjectTypeToGenericTypes = {
    image: [ImageJsonParamsType, TransformationOptions, SelectionType]
    circle: [CircleJsonParamsType, TransformationOptions, SelectionType]
    ellipse: [EllipseJsonParamsType, TransformationOptions, SelectionType]
    bezier: [BezierJsonParamsType, TransformationOptions, SelectionType]
    formattedText: [FormattedTextJsonParamsType, TransformationOptions, FormattedTextCanvasAnimationSelection]
    line: [LineJsonParamsType, TransformationOptions, SelectionType]
    rectangle: [RectangleJsonParamsType, TransformationOptions, SelectionType]
    text: [TextJsonParamsType, TransformationOptions, SelectionType]
}

export type ObjectTypeToGenericTypes = SimpleObjectTypeToGenericTypes & {
    array: [ArrayJsonParamsType, TransformationOptions, SelectionType<ArraySelectorType>]
    matrix: [MatrixJsonParamsType, TransformationOptions, SelectionType<MatrixSelectorType>]
    arrow: [ArrowJsonParamsType, TransformationOptions, SelectionType]
    codeQuestionnaire: [CodeQuestionnaireJsonParams, TransformationOptions, SelectionType<CodeQuestionnaireCanvasAnimationSelection>]
    table: [TableJsonParamsType, TableTransformOptionsType, SelectionType<TableSelectorType>]
    xyChart: [XyChartJsonParamsType, TransformationOptions, SelectionType<XyChartSelectorType>]
    graphDataStructure: [GraphDataStructureJsonParamsType, TransformationOptions, SelectionType]
    numberLine: [NumberLineJsonParamsType, TransformationOptions, SelectionType]
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
