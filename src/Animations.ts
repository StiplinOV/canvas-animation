import p5Types from 'p5'
import XYChartCanvasAnimationParams from './animation/complex/xychart/XYChartCanvasAnimationParams'
import TextCanvasAnimationParams from './animation/simple/text/TextCanvasAnimationParams'
import CanvasAnimationParams from './animation/CanvasAnimationParams'
import TableCanvasAnimationParams from './animation/complex/table/TableCanvasAnimationParams'
import ArrayCanvasAnimationParams from './animation/complex/array/ArrayCanvasAnimationParams'
import AnimationStyle, {getAnimationStyle} from './AnimationStyles'
import {
    AnimationsJsonType,
    ObjectTypeToGenericTypes,
    ObjectTypeToParamTypesMapping,
    SimpleObjectTypeToGenericTypes
} from './AnimationsJsonType'
import CircleCanvasAnimationParams from './animation/simple/circle/CircleCanvasAnimationParams'
import ArrowCanvasAnimationParams from './animation/complex/arrow/ArrowCanvasAnimationParams'
import EllipseCanvasAnimationParams from './animation/simple/ellipse/EllipseCanvasAnimationParams'
import HighlightedTextCanvasAnimationParams
    from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import LineCanvasAnimationParams from './animation/simple/line/LineCanvasAnimationParams'
import RectangleCanvasAnimationParams from './animation/simple/rectangle/RectangleCanvasAnimationParams'
import GraphDataStructureParams from './animation/complex/datastructure/graph/GraphDataStructureParams'
import BezierCanvasAnimationParams from './animation/simple/bezier/BezierCanvasAnimationParams'
import MatrixCanvasAnimationParams from './animation/complex/array/MatrixCanvasAnimationParams'
import NumberLineCanvasAnimationParams from './animation/complex/numberline/NumberLineParams'
import CodeQuestionnaireCanvasAnimationParams
    from './animation/complex/codequestionnaire/CodeQuestionnaireCanvasAnimationParams'
import SimpleCanvasAnimationParams from "./animation/simple/SimpleCanvasAnimationParams";

export const animationStyle = getAnimationStyle('default')

export const TypeToSimpleParamsConstructorMapping: {
    [key in keyof SimpleObjectTypeToGenericTypes]: (p: ObjectTypeToParamTypesMapping[key], p5: p5Types, animationStyle: AnimationStyle) => SimpleCanvasAnimationParams
} = {
    circle: (p, p5, animationStyle) => new CircleCanvasAnimationParams(p, animationStyle),
    ellipse: (p, p5, animationStyle) => new EllipseCanvasAnimationParams(p, animationStyle),
    bezier: (p, p5, animationStyle) => new BezierCanvasAnimationParams(p, animationStyle),
    highlightedText: (p, p5, animationStyle) => new HighlightedTextCanvasAnimationParams(p, animationStyle),
    line: (p, p5, animationStyle) => new LineCanvasAnimationParams(p, animationStyle),
    rectangle: (p, p5, animationStyle) => new RectangleCanvasAnimationParams(p, animationStyle),
    text: (p, p5, animationStyle) => new TextCanvasAnimationParams(p, animationStyle),
}

export const TypeToConstructorMapping: {
    [key in keyof ObjectTypeToGenericTypes]: (p: ObjectTypeToParamTypesMapping[key], p5: p5Types, animationStyle: AnimationStyle) => CanvasAnimationParams
} = {
    ...TypeToSimpleParamsConstructorMapping,
    array: (p, p5, animationStyle) => new ArrayCanvasAnimationParams(p, p5, animationStyle),
    matrix: (p, p5, animationStyle) => new MatrixCanvasAnimationParams(p, p5, animationStyle),
    arrow: (p, p5, animationStyle) => new ArrowCanvasAnimationParams(p, p5, animationStyle),
    codeQuestionnaire: (p, p5, animationStyle) => new CodeQuestionnaireCanvasAnimationParams(p, p5, animationStyle),
    table: (p, p5, animationStyle) => new TableCanvasAnimationParams(p, p5, animationStyle),
    xyChart: (p, p5, animationStyle) => new XYChartCanvasAnimationParams(p, p5, animationStyle),
    graphDataStructure: (p, p5, animationStyle) => new GraphDataStructureParams(p, p5, animationStyle),
    numberLine: (p, p5, animationStyle) => new NumberLineCanvasAnimationParams(p, p5, animationStyle),
}

export const canvasAnimations: (json: AnimationsJsonType, p5: p5Types) => CanvasAnimationParams[] = (json, p5) => {
    const result: CanvasAnimationParams[] = []
    let key: keyof AnimationsJsonType
    for (key in json) {
        result.push(...json[key]?.map(c => TypeToConstructorMapping[key](c as any, p5, animationStyle)) ?? [])
    }
    return result
}
