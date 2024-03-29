import dagre from 'dagre'
import {
    AnimationObjectParams,
    JsonObjectParams,
    SelectionType,
    TransformObjectParams
} from '../../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../../ComplexCanvasAnimationParams'
import {
    addPoints,
    getVectorAngle,
    mergeValueToMap,
    removeUndefinedKeys,
    requireValueFromMap,
    swapPointXY
} from '../../../../common/Utils'
import {THE_STYLE} from 'p5'
import AnimationStyle, {ColorType, WebSafeFontsType} from '../../../../AnimationStyles'
import ArrowCanvasAnimationParams, {ArrowJsonParamsType, ArrowType} from '../../arrow/ArrowCanvasAnimationParams'
import {v4} from 'uuid'
import {Point} from '../../../../common/Point'
import {ObjectParamsObject} from '../../../ObjectParamsObject'

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
    strokeWeight?: number
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

export interface GraphDataStructureJsonParamsType extends JsonObjectParams {
    vertices: VertexType[]
    edges: EdgeType[]
    vertexStyle?: VertexStyle
    edgeStyle?: EdgeStyle
    transpose?: boolean
    frame?: {
        padding?: number
    } | null
    vertexTypeOverrides?: VertexType[]
    edgeTypeOverrides?: EdgeType[]
}

export interface GraphDataStructureAnimationParamsType extends AnimationObjectParams {
    vertices: VertexType[]
    edges: EdgeType[]
    vertexStyle: VertexStyle
    edgeStyle: EdgeStyle
    transpose: boolean
    frame: boolean
    framePadding: number
    vertexTypeOverrides: VertexType[]
    edgeTypeOverrides: EdgeType[]
}

export interface GraphDataStructureCanvasAnimationSelection {
    vertexIds?: string[]
    edges?: {
        sourceId: string
        targetId: string
    }[]
}

export default class GraphDataStructureParams extends ComplexCanvasAnimationParams<GraphDataStructureJsonParamsType, GraphDataStructureAnimationParamsType, GraphDataStructureCanvasAnimationSelection> {

    protected convertJsonObjectToAnimationObject(
        jsonObject: GraphDataStructureJsonParamsType,
        animationObjectDefaultParams: AnimationObjectParams
    ): GraphDataStructureAnimationParamsType {
        let framePadding = 0

        if (jsonObject.frame) {
            framePadding = jsonObject.frame.padding ?? jsonObject
                .vertices
                .map(v => this.calculateVertexStyle(this.getAnimationStyle(), v.id ?? '', jsonObject.vertexTypeOverrides ?? [], jsonObject.vertexStyle, v.style).diameter)
                .reduce((v1, v2) => {
                    return v1 > v2 ? v1 : v2
                })
        }

        return {
            vertexStyle: {},
            edgeStyle: {},
            ...animationObjectDefaultParams,
            ...removeUndefinedKeys(jsonObject),
            transpose: Boolean(jsonObject.transpose),
            frame: Boolean(jsonObject.frame),
            framePadding,
            vertexTypeOverrides: jsonObject.vertexTypeOverrides ?? [],
            edgeTypeOverrides: jsonObject.edgeTypeOverrides ?? []
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<GraphDataStructureJsonParamsType>): Partial<GraphDataStructureAnimationParamsType> {
        let frame: boolean | undefined
        if (jsonObject.frame !== undefined) {
            frame = Boolean(jsonObject.frame)
        }
        return {
            ...jsonObject,
            frame,
            framePadding: jsonObject.frame?.padding
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<GraphDataStructureAnimationParamsType>): void {
        params.edges !== undefined && objectParamsObject.setSetParam('edges', params.edges)
        params.vertices !== undefined && objectParamsObject.setSetParam('vertices', params.vertices)
        params.transpose !== undefined && objectParamsObject.setBooleanParam('transpose', params.transpose)
        params.edgeStyle !== undefined && objectParamsObject.setObjectParam('edgeStyle', params.edgeStyle)
        params.vertexStyle !== undefined && objectParamsObject.setObjectParam('vertexStyle', params.vertexStyle)
        params.frame !== undefined && objectParamsObject.setBooleanParam('frame', params.frame)
        params.framePadding !== undefined && objectParamsObject.setNumberParam('framePadding', params.framePadding)
        params.vertexTypeOverrides !== undefined && objectParamsObject.setArrayParam('vertexTypeOverrides', params.vertexTypeOverrides)
        params.edgeTypeOverrides !== undefined && objectParamsObject.setArrayParam('edgeTypeOverrides', params.edgeTypeOverrides)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): GraphDataStructureAnimationParamsType {
        return {
            ...initialDefaultParams,
            edges: objectParamsObject.getSetParam('edges'),
            vertices: objectParamsObject.getSetParam('vertices'),
            transpose: objectParamsObject.getBooleanParam('transpose'),
            edgeStyle: objectParamsObject.getObjectParam('edgeStyle'),
            vertexStyle: objectParamsObject.getObjectParam('vertexStyle'),
            frame: objectParamsObject.getBooleanParam('frame'),
            framePadding: objectParamsObject.getNumberParam('framePadding'),
            vertexTypeOverrides: objectParamsObject.getArrayParam('vertexTypeOverrides'),
            edgeTypeOverrides: objectParamsObject.getArrayParam('edgeTypeOverrides')
        }
    }

    protected getZeroParams(): Omit<GraphDataStructureAnimationParamsType, keyof JsonObjectParams> {
        return {
            edges: [],
            vertices: [],
            transpose: false,
            edgeStyle: {},
            vertexStyle: {},
            frame: false,
            framePadding: 0,
            vertexTypeOverrides: [],
            edgeTypeOverrides: []
        }
    }

    protected getIncludedAnimationParamsByParameter(object: GraphDataStructureAnimationParamsType): Map<string, CanvasAnimationParamsType> {
        const {
            vertexStyle,
            edgeStyle,
            origin
        } = object
        const animationStyle = this.getAnimationStyle()
        const result = new Map<string, CanvasAnimationParamsType>()
        const vertexEdgeAnglesMap = new Map<string, Set<number>>()
        const vertexIdMap = this.createVertexIdMap(object)
        const edgeIdMap = this.createEdgeIdMap(object)
        const pointedToItselfVertexIdEdgeMap = new Map<string, EdgeType>()
        const {transpose} = object
        let maxX = 0
        let maxY = 0
        const framePadding = object.framePadding

        this.getVertexEdgeSet(vertexIdMap, object.edges).forEach((set, index) => {
            const prevMaxX = maxX
            const prevMaxY = maxY
            const offset = {
                x: transpose ? 0 : maxX + index * 110,
                y: transpose ? maxY + index * 110 : 0
            }
            const dagreGraph = this.createDagreGraph()
            set.vertices.forEach(v => {
                const vertexDiameter = this.calculateVertexStyle(animationStyle, v.id ?? '', object.vertexTypeOverrides, vertexStyle, v.style).diameter
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
                const vertex = requireValueFromMap(vertexIdMap, id)
                const style = this.calculateVertexStyle(animationStyle, id, object.vertexTypeOverrides, vertexStyle, vertex.style)
                maxX = Math.max(maxX, prevMaxX + dagreNode.x + style.diameter / 2)
                maxY = Math.max(maxY, prevMaxY + dagreNode.y + style.diameter / 2)
                result.set(`vertexCircle ${id}`, {
                    type: 'circle',
                    objectParams: {
                        origin: addPoints(origin, offset, {
                            x: dagreNode.x + framePadding,
                            y: dagreNode.y + framePadding
                        }),
                        diameter: style.diameter,
                        strokeColor: style.strokeColor,
                        fillColor: style.fillColor,
                        zIndex: object.zIndex + 1
                    }
                })
                vertex.label && result.set(`vertexValue ${id}`, {
                    type: 'text',
                    objectParams: {
                        origin: addPoints(origin, offset, {
                            x: dagreNode.x + framePadding,
                            y: dagreNode.y + framePadding
                        }),
                        value: vertex.label,
                        fontSize: style.fontSize,
                        verticalAlign: 'center',
                        horizontalAlign: 'center',
                        font: style.font,
                        textStyle: style.textStyle,
                        fillColor: style.fontColor,
                        zIndex: object.zIndex + 2
                    }
                })
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
                const vVertexDiameter = this.calculateVertexStyle(animationStyle, e.v, object.vertexTypeOverrides, vertexStyle, requireValueFromMap(vertexIdMap, e.v).style).diameter
                const wVertexDiameter = this.calculateVertexStyle(animationStyle, e.w, object.vertexTypeOverrides, vertexStyle, requireValueFromMap(vertexIdMap, e.w).style).diameter
                const startVertexAngle = getVectorAngle(this.getP5(), {
                    x: wNode.x - vNode.x,
                    y: wNode.y - vNode.y
                }) % (2 * Math.PI)
                const endVertexAngle = (startVertexAngle + Math.PI) % (2 * Math.PI)
                const edgeStartPoint = this.calculateEdgePoint(
                    vVertexDiameter,
                    addPoints(origin, offset, vNode, {x: framePadding, y: framePadding}),
                    startVertexAngle
                )
                const edgeEndPoint = this.calculateEdgePoint(
                    wVertexDiameter,
                    addPoints(origin, offset, wNode, {x: framePadding, y: framePadding}),
                    endVertexAngle
                )
                mergeValueToMap(vertexEdgeAnglesMap, edge.sourceId, startVertexAngle, () => new Set<number>())
                mergeValueToMap(vertexEdgeAnglesMap, edge.targetId, endVertexAngle, () => new Set<number>())
                new ArrowCanvasAnimationParams({
                    object: {
                        ...this.calculateArrowParams(animationStyle, edge, edgeStyle, object.edgeTypeOverrides),
                        origin: edgeStartPoint,
                        endPoint: edgeEndPoint,
                        zIndex: object.zIndex + 2
                    }
                }, this.getP5(), animationStyle).getIncludedAnimationParams().forEach((value, key) => {
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
                    this.calculateVertexStyle(animationStyle, vertexId, object.vertexTypeOverrides, vertexStyle, vertexIdMap.get(vertexId)?.style).diameter
                )
                new ArrowCanvasAnimationParams({
                    object: {
                        ...this.calculateArrowParams(animationStyle, edge, edgeStyle, object.edgeTypeOverrides),
                        origin: addPoints(object.origin, offset, dagreNode, points[0], {
                            x: framePadding,
                            y: framePadding
                        }),
                        endPoint: addPoints(object.origin, offset, dagreNode, points[3], {
                            x: framePadding,
                            y: framePadding
                        }),
                        bezierParams: {
                            point2: addPoints(object.origin, offset, dagreNode, points[1], {
                                x: framePadding,
                                y: framePadding
                            }),
                            point3: addPoints(object.origin, offset, dagreNode, points[2], {
                                x: framePadding,
                                y: framePadding
                            })
                        },
                        zIndex: object.zIndex + 2
                    }
                }, this.getP5(), animationStyle).getIncludedAnimationParams().forEach((value, key) => {
                    result.set(`edgeLine ${vertexId}-${vertexId} ${key}`, value)
                })
            })
            //
        })

        if (object.frame) {
            result.set('frameRect', {
                type: 'rectangle',
                objectParams: {
                    origin: object.origin,
                    width: maxX + framePadding * 2,
                    height: maxY + framePadding * 2,
                    zIndex: object.zIndex,
                    strokeColor: 'primary',
                    weight: 'bold'
                }
            })
        }

        return result
    }

    private getVertexEdgeSet(vertexIdMap: Map<string, VertexType>, edges: EdgeType[]): VerticesEdges[] {
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

    private calculateVertexStyle(animationStyle: AnimationStyle, id: string, overrides: VertexType[], globalStyle?: VertexStyle, style?: VertexStyle): VertexStyle & {
        diameter: number
    } {
        const overridesStyle = overrides.filter(o => o.id === id).map(o => o.style).reduce((a, b) => ({...a, ...b}), {}) ?? {}
        return {
            diameter: animationStyle.vertexDiameter,
            fontSize: animationStyle.vertexFontSize,
            strokeColor: animationStyle.strokeColor,
            fillColor: animationStyle.fillColor,
            fontColor: animationStyle.fontColor,
            font: animationStyle.font,
            textStyle: animationStyle.textStyle,
            ...removeUndefinedKeys(globalStyle ?? {}),
            ...removeUndefinedKeys(style ?? {}),
            ...removeUndefinedKeys(overridesStyle)
        }
    }

    private calculateArrowParams(animationStyle: AnimationStyle, edge: EdgeType, globalStyle: EdgeStyle, overrides: EdgeType[]): Partial<ArrowJsonParamsType> {
        const overridesStyle = overrides.filter(o => o.sourceId === edge.sourceId && o.targetId === edge.targetId).map(o => o.style).reduce((a, b) => ({...a, ...b}), {}) ?? {}
        const edgeStyle: EdgeStyle = {
            fontSize: animationStyle.edgeFontSize,
            ...globalStyle,
            ...edge.style,
            ...removeUndefinedKeys(overridesStyle)
        }
        return {
            startType: edgeStyle.sourceType ?? 'None',
            endType: edgeStyle.targetType ?? 'Arrow',
            strokeColor: edgeStyle.strokeColor ?? animationStyle.strokeColor,
            weight: edgeStyle.strokeWeight ?? animationStyle.strokeWeight,
            label: {
                fillColor: edgeStyle.fontColor ?? animationStyle.fontColor,
                fontSize: edgeStyle.fontSize ?? animationStyle.vertexFontSize,
                textStyle: edgeStyle.textStyle ?? animationStyle.textStyle,
                font: edgeStyle.font ?? animationStyle.font,
                value: edge.label ?? ''
            }
        }
    }

    private createDagreGraph(): dagre.graphlib.Graph {
        const dagreGraph = new dagre.graphlib.Graph()
        dagreGraph.setGraph({})
        dagreGraph.setDefaultEdgeLabel(() => ({}))

        return dagreGraph
    }

    private createVertexIdMap(object: GraphDataStructureAnimationParamsType): Map<string, VertexType> {
        const result = new Map<string, VertexType>()

        object.vertices.forEach(v => {
            v.id = v.id ?? v4()
            result.set(v.id, v)
        })

        return result
    }

    private createEdgeIdMap(object: GraphDataStructureAnimationParamsType): Map<string, EdgeType> {
        const result = new Map<string, EdgeType>()

        object.edges.forEach(e => result.set(JSON.stringify({
            sourceId: e.sourceId,
            targetId: e.targetId
        }), e))

        return result
    }

    private calculateEdgePoint(vertexDiameter: number, vertexCenter: Point, edgeAngle: number): Point {
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

    private calculateBezierPoints(edgePointAngles: Set<number>, vertexDiameter: number): [Point, Point, Point, Point] {
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

    protected convertSelectionToTransformObjectParams(selection: SelectionType<GraphDataStructureCanvasAnimationSelection>): TransformObjectParams<GraphDataStructureAnimationParamsType>[] {
        const animationStyle = this.getAnimationStyle()
        return [{
            transformObject: {
                vertexTypeOverrides: selection.type?.vertexIds?.map(v => ({
                    id: v,
                    style: {
                        fillColor: animationStyle.selectedColor,
                        textStyle: 'bold'
                    }
                })),
                edgeTypeOverrides: selection.type?.edges?.map(e => ({
                    sourceId: e.sourceId,
                    targetId: e.targetId,
                    style: {
                        strokeColor: animationStyle.selectedColor,
                        strokeWeight: animationStyle.strokeBoldWeight,
                        textStyle: 'bold'
                    }
                }))
            },
            appearType: 'immediate',
            disappearType: 'immediateAtTheEnd'
        }]

    }

}
