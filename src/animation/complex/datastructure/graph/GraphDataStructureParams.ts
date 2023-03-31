import dagre from 'dagre'
import { ObjectParams } from '../../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../../simple/SimpleCanvasAnimationParams'
import CircleCanvasAnimationParams from '../../../simple/circle/CircleCanvasAnimationParams'
import TextCanvasAnimationParams from '../../../simple/text/TextCanvasAnimationParams'
import { addPoints, getVectorAngle, mergeValueToMap, requireValueFromMap, swapPointXY } from '../../../../common/Utils'
import { THE_STYLE } from 'p5'
import AnimationStyle, { ColorType, WebSafeFontsType } from '../../../../AnimationStyles'
import ArrowCanvasAnimationParams, { ArrowParamsType, ArrowType } from '../../arrow/ArrowCanvasAnimationParams'
import { v4 } from 'uuid'
import { Point } from '../../../../common/Point'

type VerticesEdges = {
    vertices: VertexType[]
    edges: EdgeType[]
}

type VertexStyle = {
    strokeColor?: ColorType
    fillColor?: ColorType
    fontColor?: ColorType
    fontSize?: number
    diameter?: number
    textStyle?: THE_STYLE
    font?: WebSafeFontsType
}

type VertexType = {
    label?: string
    id?: string
    style?: VertexStyle
}

type EdgeStyle = {
    sourceType?: ArrowType
    targetType?: ArrowType
    fontColor?: ColorType
    strokeColor?: ColorType
    fontSize?: number
    textStyle?: THE_STYLE
    font?: WebSafeFontsType
}

type EdgeType = {
    sourceId: string
    targetId: string
    label?: string
    style?: EdgeStyle
}

export interface GraphDataStructureParamsType extends ObjectParams {
    vertices: VertexType[]
    edges: EdgeType[]
    vertexStyle?: VertexStyle
    edgeStyle?: EdgeStyle
    transpose?: boolean
}

export default class GraphDataStructureParams extends ComplexCanvasAnimationParams<GraphDataStructureParamsType> {

    protected getIncludedAnimationParamsByParameter (object: GraphDataStructureParamsType): Map<string, SimpleCanvasAnimationParams> {
        const {
            vertexStyle,
            edgeStyle,
            origin
        } = object
        const animationStyle = this.getAnimationStyle()
        const result = new Map<string, SimpleCanvasAnimationParams>()
        const vertexEdgeAnglesMap = new Map<string, Set<number>>()
        const vertexIdMap = this.createVertexIdMap(object)
        const edgeIdMap = this.createEdgeIdMap(object)
        const pointedToItselfVertexIdEdgeMap = new Map<string, EdgeType>()
        const { transpose } = object
        let maxX = 0
        let maxY = 0

        this.getVertexEdgeSet(vertexIdMap, object.edges).forEach((set, index) => {
            const prevMaxX = maxX
            const prevMaxY = maxY
            const offset = {
                x: transpose ? 0 : maxX + index * 110,
                y: transpose ? maxY + index * 110 : 0
            }
            const dagreGraph = this.createDagreGraph()
            set.vertices.forEach(v => {
                const vertexDiameter = v.style?.diameter ?? vertexStyle?.diameter ?? animationStyle.vertexDiameter
                v.id && dagreGraph.setNode(v.id, {
                    width: vertexDiameter,
                    height: vertexDiameter
                })
            })
            set.edges.forEach((e) => dagreGraph.setEdge(e.sourceId, e.targetId))

            dagre.layout(dagreGraph)

            dagreGraph.nodes().forEach(id => {
                let dagreNode: Point = dagreGraph.node(id)
                if (transpose) {
                    dagreNode = swapPointXY(dagreNode)
                }
                maxX = Math.max(maxX, prevMaxX + dagreNode.x)
                maxY = Math.max(maxY, prevMaxY + dagreNode.y)
                const vertex = requireValueFromMap(vertexIdMap, id)
                const style = this.calculateVertexStyle(animationStyle, vertexStyle, vertex.style)

                result.set(`vertexCircle ${id}`, new CircleCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, offset, {
                            x: dagreNode.x,
                            y: dagreNode.y
                        }),
                        diameter: style.diameter,
                        strokeColor: style.strokeColor,
                        fillColor: style.fillColor
                    }
                }))
                vertex.label && result.set(`vertexValue ${id}`, new TextCanvasAnimationParams({
                    object: {
                        origin: addPoints(origin, offset, {
                            x: dagreNode.x,
                            y: dagreNode.y
                        }),
                        value: vertex.label,
                        fontSize: style.fontSize,
                        verticalAlign: 'center',
                        horizontalAlign: 'center',
                        font: style.font,
                        textStyle: style.textStyle,
                        fillColor: style.fontColor
                    }
                }))
            })
            dagreGraph.edges().forEach((e) => {
                let vNode: Point = dagreGraph.node(e.v)
                let wNode: Point = dagreGraph.node(e.w)
                if (transpose) {
                    vNode = swapPointXY(vNode)
                    wNode = swapPointXY(wNode)
                }
                const edge = requireValueFromMap(edgeIdMap, JSON.stringify({
                    sourceId: e.v,
                    targetId: e.w
                }))
                if (e.v === e.w) {
                    pointedToItselfVertexIdEdgeMap.set(e.v, edge)
                    return
                }
                const vVertexDiameter = this.calculateVertexStyle(animationStyle, vertexStyle, requireValueFromMap(vertexIdMap, e.v).style).diameter
                const wVertexDiameter = this.calculateVertexStyle(animationStyle, vertexStyle, requireValueFromMap(vertexIdMap, e.w).style).diameter
                const startVertexAngle = getVectorAngle(this.p5, {
                    x: wNode.x - vNode.x,
                    y: wNode.y - vNode.y
                }) % (2 * Math.PI)
                const endVertexAngle = (startVertexAngle + Math.PI) % (2 * Math.PI)
                const edgeStartPoint = this.calculateEdgePoint(vVertexDiameter, addPoints(origin, offset, vNode), startVertexAngle)
                const edgeEndPoint = this.calculateEdgePoint(wVertexDiameter, addPoints(origin, offset, wNode), endVertexAngle)
                mergeValueToMap(vertexEdgeAnglesMap, edge.sourceId, startVertexAngle, () => new Set<number>())
                mergeValueToMap(vertexEdgeAnglesMap, edge.targetId, endVertexAngle, () => new Set<number>())
                new ArrowCanvasAnimationParams({
                    object: {
                        ...this.calculateArrowParams(animationStyle, edge, edgeStyle),
                        origin: edgeStartPoint,
                        endPoint: edgeEndPoint
                    }
                }, this.p5, animationStyle).getIncludedAnimationParams().forEach((value, key) => {
                    result.set(`edgeLine ${e.v}-${e.w} ${key}`, value)
                })
            })
            pointedToItselfVertexIdEdgeMap.forEach((edge, vertexId) => {
                let dagreNode: Point = dagreGraph.node(vertexId)
                if (transpose) {
                    dagreNode = swapPointXY(dagreNode)
                }
                const points = this.calculateBezierPoints(
                    vertexEdgeAnglesMap.get(vertexId) ?? new Set<number>(),
                    this.calculateVertexStyle(animationStyle, vertexStyle, vertexIdMap.get(vertexId)?.style).diameter
                )

                new ArrowCanvasAnimationParams({
                    object: {
                        ...this.calculateArrowParams(animationStyle, edge, edgeStyle),
                        origin: addPoints(object.origin, offset, dagreNode, points[0]),
                        endPoint: addPoints(object.origin, offset, dagreNode, points[3]),
                        bezierParams: {
                            point2: addPoints(object.origin, offset, dagreNode, points[1]),
                            point3: addPoints(object.origin, offset, dagreNode, points[2])
                        }
                    }
                }, this.p5, animationStyle).getIncludedAnimationParams().forEach((value, key) => {
                    result.set(`edgeLine ${vertexId}-${vertexId} ${key}`, value)
                })
            })
            //
        })

        return result
    }

    private getVertexEdgeSet (vertexIdMap: Map<string, VertexType>, edges: EdgeType[]): VerticesEdges[] {
        const result: VerticesEdges[] = []
        const vertexGroupMap = new Map<string, number>()
        const edgeMap = new Map<string, Set<string>>()
        let currentGroup = 0

        edges.forEach(edges => {
            mergeValueToMap(edgeMap, edges.sourceId, edges.targetId, () => new Set<string>())
            mergeValueToMap(edgeMap, edges.targetId, edges.sourceId, () => new Set<string>())
        })

        edgeMap.forEach((_, key) => {
            if (!vertexGroupMap.has(key)) {
                result.push({
                    vertices: [],
                    edges: []
                })
                const stack = [key]
                let cur = stack.pop()
                while (cur) {
                    if (!vertexGroupMap.has(cur)) {
                        vertexGroupMap.set(cur, currentGroup)
                        edgeMap.get(cur)?.forEach(oth => {
                            stack.push(oth)
                        })
                    }
                    cur = stack.pop()
                }
                currentGroup++
            }
        })

        edges.forEach(e => {
            const group = requireValueFromMap(vertexGroupMap, e.sourceId)
            result[group].edges.push(e)
        })
        vertexIdMap.forEach((vertex, id) => {
            let group = vertexGroupMap.get(id)
            if (group === undefined) {
                group = result.push({
                    vertices: [],
                    edges: []
                }) - 1
            }
            result[group].vertices.push(vertex)
        })
        return result
    }

    private calculateVertexStyle (animationStyle: AnimationStyle, globalStyle?: VertexStyle, style?: VertexStyle): VertexStyle & { diameter: number } {
        return {
            diameter: animationStyle.vertexDiameter,
            fontSize: animationStyle.vertexFontSize,
            ...globalStyle,
            ...style
        }
    }

    private calculateArrowParams (animationStyle: AnimationStyle, edge: EdgeType, globalStyle?: EdgeStyle): Partial<ArrowParamsType> {
        const edgeStyle: EdgeStyle = {
            fontSize: animationStyle.edgeFontSize,
            ...globalStyle,
            ...edge?.style
        }
        return {
            startType: edgeStyle.sourceType,
            endType: edgeStyle.targetType,
            strokeColor: edgeStyle.strokeColor,
            label: {
                fillColor: edgeStyle.fontColor,
                fontSize: edgeStyle.fontSize ?? animationStyle.vertexFontSize,
                textStyle: edgeStyle.textStyle,
                font: edgeStyle.font,
                value: edge.label ?? ''
            }
        }
    }

    private createDagreGraph (): dagre.graphlib.Graph {
        const dagreGraph = new dagre.graphlib.Graph()
        dagreGraph.setGraph({})
        dagreGraph.setDefaultEdgeLabel(() => ({}))

        return dagreGraph
    }

    private createVertexIdMap (object: GraphDataStructureParamsType): Map<string, VertexType> {
        const result = new Map<string, VertexType>()

        object.vertices.forEach(v => {
            v.id = v.id ?? v4()
            result.set(v.id, v)
        })

        return result
    }

    private createEdgeIdMap (object: GraphDataStructureParamsType): Map<string, EdgeType> {
        const result = new Map<string, EdgeType>()

        object.edges.forEach(e => result.set(JSON.stringify({
            sourceId: e.sourceId,
            targetId: e.targetId
        }), e))

        return result
    }

    private calculateEdgePoint (vertexDiameter: number, vertexCenter: Point, edgeAngle: number): Point {
        return addPoints(
            {
                x: vertexCenter.x,
                y: vertexCenter.y
            },
            {
                x: (vertexDiameter * Math.cos(edgeAngle) / 2),
                y: (vertexDiameter * Math.sin(edgeAngle) / 2)
            }
        )
    }

    private calculateBezierPoints (edgePointAngles: Set<number>, vertexDiameter: number): [Point, Point, Point, Point] {
        if (edgePointAngles.size) {
            edgePointAngles.add(Math.PI / 2)
        }
        let angles = Array.from(edgePointAngles.values())
        angles = angles.sort((a, b) => a - b)
        angles.push(angles[0] + Math.PI * 2)
        let rightAngleBoundary = angles[0]
        let leftAngleBoundary = angles[0]
        if (angles.length === 1) {
            leftAngleBoundary += (Math.PI * 2)
        }
        let maxAngle = leftAngleBoundary - rightAngleBoundary
        let maxAngleRightBoundary = rightAngleBoundary
        let maxAngleLeftBoundary = leftAngleBoundary
        for (let i = 1; i < angles.length; i++) {
            leftAngleBoundary = angles[i]
            const maxAngleCandidate = leftAngleBoundary - rightAngleBoundary
            if (maxAngleCandidate > maxAngle) {
                maxAngle = maxAngleCandidate
                maxAngleLeftBoundary = leftAngleBoundary
                maxAngleRightBoundary = rightAngleBoundary
            }
            rightAngleBoundary = leftAngleBoundary
        }
        const edgeAngle = Math.min(maxAngle / 3, Math.PI / 3)
        const edgeLeftAngle = maxAngleLeftBoundary - (maxAngle - edgeAngle) / 2
        const edgeRightAngle = maxAngleRightBoundary + (maxAngle - edgeAngle) / 2
        const pointDiscriminator = 1.5

        return [
            {
                x: (vertexDiameter * Math.cos(edgeLeftAngle) / 2),
                y: (vertexDiameter * Math.sin(edgeLeftAngle) / 2)
            },
            {
                x: (vertexDiameter * pointDiscriminator * Math.cos(edgeLeftAngle)),
                y: (vertexDiameter * pointDiscriminator * Math.sin(edgeLeftAngle))
            },
            {
                x: (vertexDiameter * pointDiscriminator * Math.cos(edgeRightAngle)),
                y: (vertexDiameter * pointDiscriminator * Math.sin(edgeRightAngle))
            },
            {
                x: (vertexDiameter * Math.cos(edgeRightAngle) / 2),
                y: (vertexDiameter * Math.sin(edgeRightAngle) / 2)
            }
        ]
    }

}
