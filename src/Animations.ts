import p5Types from 'p5'
import XYChartCanvasAnimationParams from './animation/complex/xychart/XYChartCanvasAnimationParams'
import TextCanvasAnimationParams from './animation/simple/text/TextCanvasAnimationParams'
import CanvasAnimationParams from './animation/CanvasAnimationParams'
import TableCanvasAnimationParams from './animation/complex/table/TableCanvasAnimationParams'
import ArrayCanvasAnimationParams from './animation/complex/array/ArrayCanvasAnimationParams'
import { getAnimationStyle } from './AnimationStyles'
import { AnimationsJsonType } from './AnimationsJsonType'
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

export const animationStyle = getAnimationStyle('default')

export const canvasAnimations: (json: AnimationsJsonType, p5: p5Types) => CanvasAnimationParams[] = (json, p5) => {
    const result: CanvasAnimationParams[] = []
    for (const key in json) {
        if (key === 'circle') {
            result.push(...json.circle?.map(c => new CircleCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'array') {
            result.push(...json.array?.map(c => new ArrayCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'matrix') {
            result.push(...json.matrix?.map(c => new MatrixCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'arrow') {
            result.push(...json.arrow?.map(c => new ArrowCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'ellipse') {
            result.push(...json.ellipse?.map(c => new EllipseCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'bezier') {
            result.push(...json.bezier?.map(c => new BezierCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'highlightedText') {
            result.push(...json.highlightedText?.map(c => new HighlightedTextCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'line') {
            result.push(...json.line?.map(c => new LineCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'rectangle') {
            result.push(...json.rectangle?.map(c => new RectangleCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'table') {
            result.push(...json.table?.map(c => new TableCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'text') {
            result.push(...json.text?.map(c => new TextCanvasAnimationParams(c, animationStyle)) ?? [])
        } else if (key === 'xyChart') {
            result.push(...json.xyChart?.map(c => new XYChartCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'graphDataStructure') {
            result.push(...json.graphDataStructure?.map(c => new GraphDataStructureParams(c, p5, animationStyle)) ?? [])
        } else if (key === 'numberLine') {
            result.push(...json.numberLine?.map(c => new NumberLineCanvasAnimationParams(c, p5, animationStyle)) ?? [])
        } else {
            throw new Error(`Wrong JSON. Unexpected key ${key}`)
        }
    }
    return result
}
