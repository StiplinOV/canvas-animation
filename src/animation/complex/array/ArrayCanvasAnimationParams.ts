import {AnimationObjectParams, JsonObjectParams} from '../../CanvasAnimationParams'
import {addPoints, RangeTitleType} from '../../../common/Utils'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import ArrayElement, {ElementStyle, ElementType} from './ArrayElement'
import ArrowCanvasAnimationParams from '../arrow/ArrowCanvasAnimationParams'
import {ObjectParamsObject} from '../../ObjectParamsObject'
import {ColorType} from "../../../AnimationStyles";
import {THE_STYLE} from "p5";
import {Point} from "../../../common/Point";

export interface ArrayJsonParamsType extends JsonObjectParams {
    values: (ElementType | string | boolean | number)[]
    overrideValueIds?: (string | null)[]
    height: number
    width?: number | null
    title?: string
    indexTitle?: string
    firstIndex?: number
    hideIndices?: boolean
    elementsInterval?: number
    elementStyle?: ElementStyle
    valueStyle?: Map<number, ElementType>
    pointers?: number[]
    diapasonTitles?: RangeTitleType[]
}

export interface ArrayAnimationParamsType extends AnimationObjectParams {
    values: (ElementType | string | boolean | number)[]
    overrideValueIds: (string | null)[]
    height: number
    width: number | null
    title: string | null
    indexTitle: string | null
    firstIndex: number
    hideIndices: boolean
    valueStyle: Map<number, ElementType>
    pointers: number[]
    elementBackgroundColor: ColorType | null
    elementStrokeColor: ColorType
    elementFontColor: ColorType,
    elementFontSize: number,
    elementTextStyle: THE_STYLE,
    diapasonTitles: RangeTitleType[]
}

export type ArraySelectorType = {
    values?: 'all' | number[]
    allNElementsInSequence?: number
}

type ArrayDimensionsParamsType = {
    arrayWidth?: number | null
    arrayHeight: number
    hasArrayTitle: boolean
    hasIndexTitle: boolean
    numberOfElements: number
    origin: Point
    hideIndices: boolean
    diapasonTitleRanges: [number, number][]
}

class ArrayDimensions {

    private params: ArrayDimensionsParamsType

    private readonly partHeight: number

    constructor(params: ArrayDimensionsParamsType) {
        let numberOfParts = 0
        if (params.hasArrayTitle) {
            numberOfParts += 3
        }
        if (params.diapasonTitleRanges) {
            numberOfParts += 2
        }
        numberOfParts += 5
        if (!params.hideIndices) {
            numberOfParts += 2
        }
        if (params.hasIndexTitle) {
            numberOfParts += 2
        }

        this.params = params
        this.partHeight = params.arrayHeight / numberOfParts
    }

    getArrayWidth(): number {
        if (this.params.arrayWidth) {
            return this.params.arrayWidth
        }
        const arrayHeight = this.partHeight * 3
        return (this.params.numberOfElements * arrayHeight + (this.params.numberOfElements - 1) * this.partHeight)
    }

    getElementWidth(): number {
        let result = this.getElementHeight()
        if ((this.getArrayWidth() - (result * this.params.numberOfElements)) > 0) {
            return result
        }

        return ((this.getArrayWidth() / this.params.numberOfElements) * 3) / 4
    }

    getElementHeight(): number {
        return this.partHeight * 5
    }

    getElementSpacing(): number {
        return (this.getArrayWidth() - (this.params.numberOfElements * this.getElementWidth())) / (this.params.numberOfElements - 1)
    }

    hasArrayTitle(): boolean {
        return this.params.hasArrayTitle
    }

    hasDiapasonTitle(): boolean {
        return this.params.diapasonTitleRanges.length > 0
    }

    hasArrayIndexTitle(): boolean {
        return this.params.hasIndexTitle
    }

    getTitleFontSize(): number {
        return this.partHeight * 2
    }

    getTitleOrigin(): Point {
        return addPoints(this.params.origin, {
            x: this.getArrayWidth() / 2,
            y: 0
        })
    }

    getDiapasonTitleOrigin(from: number, to: number): Point {
        let y = 0
        if (this.hasArrayTitle()) {
            y += this.partHeight * 3
        }

        return addPoints(this.params.origin, {
            x: this.getElementWidth() / 2 + (from + to) * (this.getElementWidth() + this.getElementSpacing())/2,
            y
        })
    }

    getDiapasonTitleFontSize(): number {
        return this.partHeight
    }

    getArrayElementOrigin(index: number): Point {
        let y = 0
        if (this.hasArrayTitle()) {
            y += this.partHeight * 3
        }
        if (this.hasDiapasonTitle()) {
            y += this.partHeight * 2
        }

        return addPoints(this.params.origin, {
            x: index * (this.getElementWidth() + this.getElementSpacing()),
            y
        })
    }

    getArrayElementIndexOrigin(index: number): Point {
        let y = this.partHeight * 6
        if (this.hasArrayTitle()) {
            y += this.partHeight * 3
        }
        if (this.hasDiapasonTitle()) {
            y += this.partHeight * 2
        }
        return addPoints(this.params.origin, {
            x: index * (this.getElementWidth() + this.getElementSpacing()) + this.getElementWidth() / 2,
            y: y
        })
    }

    getArrayElementIndexFontSize(): number {
        return this.partHeight
    }

    getArrayElementIndexTitleFontSize(): number {
        return this.partHeight
    }

    getPointerOrigin(index: number): Point {
        let y = this.partHeight * 5
        if (this.hasArrayTitle()) {
            y += this.partHeight * 3
        }
        if (this.hasDiapasonTitle()) {
            y += this.partHeight * 2
        }
        if (this.hasArrayIndexTitle()) {
            y += this.partHeight * 2
        }
        return addPoints(this.params.origin, {
            x: index * (this.getElementWidth() + this.partHeight) + this.getElementWidth() / 2,
            y: y
        })
    }

    getPointerEndPoint(index: number): Point {
        return addPoints(this.getPointerOrigin(index), {
            y: this.getElementWidth()
        })
    }

    getIndexTitleOrigin(): Point {
        let y = this.partHeight * 6
        if (this.hasArrayTitle()) {
            y += this.partHeight * 3
        }
        if (this.hasDiapasonTitle()) {
            y += this.partHeight * 2
        }
        if (!this.params.hideIndices) {
            y += this.partHeight * 2
        }
        return addPoints(this.params.origin, {
            x: this.getArrayWidth()/2,
            y: y
        })
    }

}

export default class ArrayCanvasAnimationParams extends ComplexCanvasAnimationParams<ArrayJsonParamsType, ArrayAnimationParamsType, ArraySelectorType> {

    protected convertJsonObjectToAnimationObject(jsonObject: ArrayJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): ArrayAnimationParamsType {
        const animationStyle = this.getAnimationStyle()

        let title = null
        if (typeof jsonObject.title === "string") {
            title = jsonObject.title
        }
        let indexTitle = null
        if (typeof jsonObject.indexTitle === "string") {
            indexTitle = jsonObject.indexTitle
        }

        return {
            ...animationObjectDefaultParams,
            values: jsonObject.values,
            overrideValueIds: jsonObject.overrideValueIds ?? [],
            height: jsonObject.height,
            width: jsonObject.width ?? null,
            title,
            indexTitle,
            firstIndex: jsonObject.firstIndex ?? 0,
            hideIndices: Boolean(jsonObject.hideIndices),
            valueStyle: jsonObject.valueStyle ?? new Map<number, ElementType>(),
            pointers: jsonObject.pointers ?? [],
            elementBackgroundColor: jsonObject.elementStyle?.backgroundColor ?? null,
            elementStrokeColor: jsonObject.elementStyle?.strokeColor ?? animationStyle.strokeColor,
            elementFontColor: jsonObject.elementStyle?.fontColor ?? animationStyle.fontColor,
            elementFontSize: jsonObject.elementStyle?.fontSize ?? jsonObject.height / 3,
            elementTextStyle: jsonObject.elementStyle?.textStyle ?? "normal",
            diapasonTitles: jsonObject.diapasonTitles ?? []
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<ArrayJsonParamsType>): Partial<ArrayAnimationParamsType> {
        return {
            values: jsonObject.values,
            overrideValueIds: jsonObject.overrideValueIds,
            height: jsonObject.height,
            width: jsonObject.width,
            title: jsonObject.title,
            indexTitle: jsonObject.indexTitle,
            firstIndex: jsonObject.firstIndex,
            hideIndices: jsonObject.hideIndices,
            valueStyle: jsonObject.valueStyle,
            pointers: jsonObject.pointers,
            elementBackgroundColor: jsonObject.elementStyle?.backgroundColor,
            elementStrokeColor: jsonObject.elementStyle?.strokeColor,
            elementFontColor: jsonObject.elementStyle?.fontColor,
            elementFontSize: jsonObject.elementStyle?.fontSize,
            elementTextStyle: jsonObject.elementStyle?.textStyle,
            diapasonTitles: jsonObject.diapasonTitles
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<ArrayAnimationParamsType>): void {
        params.values !== undefined && objectParamsObject.setArrayParam('values', params.values)
        params.overrideValueIds !== undefined && objectParamsObject.setObjectParam('overrideValueIds', params.overrideValueIds)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
        params.width !== undefined && objectParamsObject.setNullableNumberParam('width', params.width)
        params.title !== undefined && objectParamsObject.setNullableStringParam('title', params.title)
        params.indexTitle !== undefined && objectParamsObject.setNullableStringParam('indexTitle', params.indexTitle)
        params.firstIndex !== undefined && objectParamsObject.setNumberParam('firstIndex', params.firstIndex)
        params.hideIndices !== undefined && objectParamsObject.setBooleanParam('hideIndices', params.hideIndices)
        params.valueStyle !== undefined && objectParamsObject.setObjectParam('valueStyle', params.valueStyle)
        params.pointers !== undefined && objectParamsObject.setArrayParam('pointers', params.pointers)
        params.elementBackgroundColor !== undefined && objectParamsObject.setNullableColorParam('elementBackgroundColor', params.elementBackgroundColor)
        params.elementStrokeColor !== undefined && objectParamsObject.setColorParam('elementStrokeColor', params.elementStrokeColor)
        params.elementFontColor !== undefined && objectParamsObject.setColorParam('elementFontColor', params.elementFontColor)
        params.elementFontSize !== undefined && objectParamsObject.setNumberParam('elementFontSize', params.elementFontSize)
        params.elementTextStyle !== undefined && objectParamsObject.setStringLiteralParam('elementTextStyle', params.elementTextStyle)
        params.diapasonTitles !== undefined && objectParamsObject.setSetParam('diapasonTitles', params.diapasonTitles)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): ArrayAnimationParamsType {
        //console.log("GET", objectParamsObject.getArrayParam('values'))
        return {
            ...initialDefaultParams,
            values: objectParamsObject.getArrayParam('values'),
            overrideValueIds: objectParamsObject.getObjectParam('overrideValueIds'),
            height: objectParamsObject.getNumberParam('height'),
            width: objectParamsObject.getNullableNumberParam('width'),
            title: objectParamsObject.getNullableStringParam('title'),
            indexTitle: objectParamsObject.getNullableStringParam('indexTitle'),
            firstIndex: objectParamsObject.getNumberParam('firstIndex'),
            hideIndices: objectParamsObject.getBooleanParam('hideIndices'),
            valueStyle: objectParamsObject.getObjectParam('valueStyle'),
            pointers: objectParamsObject.getArrayParam('pointers'),
            elementBackgroundColor: objectParamsObject.getNullableColorParam('elementBackgroundColor'),
            elementStrokeColor: objectParamsObject.getColorParam('elementStrokeColor'),
            elementFontColor: objectParamsObject.getColorParam('elementFontColor'),
            elementFontSize: objectParamsObject.getNumberParam('elementFontSize'),
            elementTextStyle: objectParamsObject.getStringLiteralParam('elementTextStyle'),
            diapasonTitles: objectParamsObject.getSetParam('diapasonTitles')
        }
    }

    protected getZeroParams(): Omit<ArrayJsonParamsType, keyof JsonObjectParams> {
        return {
            values: [],
            height: 0
        }
    }

    protected getIncludedAnimationParamsByParameter(object: ArrayAnimationParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        const arrayDimensions = new ArrayDimensions({
            arrayWidth: object.width,
            arrayHeight: object.height,
            hasArrayTitle: typeof object.title === "string",
            hasIndexTitle: typeof object.indexTitle === "string",
            numberOfElements: object.values.length,
            origin: object.origin,
            hideIndices: object.hideIndices,
            diapasonTitleRanges: object.diapasonTitles.map(t => [t.from, t.to])
        })
        let {
            title,
            values,
            indexTitle,
            firstIndex,
            rotations,
            hideIndices,
            pointers,
            overrideValueIds
        } = object
        const arrayElementWidth = arrayDimensions.getElementWidth()

        if (arrayDimensions.hasArrayTitle()) {
            result.set('array title', {
                type: 'text',
                objectParams: {
                    value: title ?? "",
                    origin: arrayDimensions.getTitleOrigin(),
                    fontSize: arrayDimensions.getTitleFontSize(),
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    rotations
                }
            })
        }
        object.diapasonTitles.forEach(rangeTitle => {
            result.set(`range title ${rangeTitle.from} ${rangeTitle.to}`, {
                type: "text",
                objectParams: {
                    value: rangeTitle.title,
                    origin: arrayDimensions.getDiapasonTitleOrigin(rangeTitle.from, rangeTitle.to),
                    fontSize: arrayDimensions.getDiapasonTitleFontSize(),
                    horizontalAlign: "center",
                    verticalAlign: "top"
                }
            })
        })
        values.forEach((valueParam, index) => {
            let value = valueParam
            let elementStyle: ElementStyle = {
                backgroundColor: object.elementBackgroundColor ?? undefined,
                strokeColor: object.elementStrokeColor,
                fontColor: object.elementFontColor,
                fontSize: object.elementFontSize,
                textStyle: object.elementTextStyle
            }
            if (typeof value === 'number') {
                const element = object.valueStyle?.get(value)
                if (element) {
                    elementStyle = {
                        ...elementStyle,
                        ...element.style
                    }
                    value = element.value ?? ''
                }

            }
            if (typeof value === "object") {
                value = {
                    id: value.id,
                    value: value.value,
                    style: {
                        ...elementStyle,
                        ...value.style,
                    }
                }
            } else {
                value = {
                    value: value,
                    style: elementStyle
                }
            }

            new ArrayElement({
                object: {
                    origin: arrayDimensions.getArrayElementOrigin(index),
                    value,
                    width: arrayDimensions.getElementWidth(),
                    height: arrayDimensions.getElementHeight(),
                    weight: 0
                }
            }, this.getP5(), this.getAnimationStyle()).getIncludedAnimationParams().forEach((v, k) => {
                let indexParam = String(index)
                if (typeof value === "object") {
                    if (index < overrideValueIds.length) {
                        const overrideId = overrideValueIds[index]
                        if (typeof overrideId === "string") {
                            value.id = overrideId
                        }
                    }
                    if (value.id !== undefined) {
                        indexParam = `id_${value.id}`
                    }
                }
                result.set(`${k} ${indexParam}`, v)
            })
        })
        if (!hideIndices) {
            values.forEach((valueParam, index) => {
                result.set(`index text ${index}`, {
                    type: 'text',
                    objectParams: {
                        value: String(index + (firstIndex ?? 0)),
                        origin: arrayDimensions.getArrayElementIndexOrigin(index),
                        fontSize: arrayDimensions.getArrayElementIndexFontSize(),
                        horizontalAlign: 'center',
                        verticalAlign: "top",
                        rotations
                    }
                })
            })
        }
        if (indexTitle) {
            result.set('index title', {
                type: 'text',
                objectParams: {
                    value: indexTitle,
                    origin: arrayDimensions.getIndexTitleOrigin(),
                    fontSize: arrayDimensions.getArrayElementIndexTitleFontSize(),
                    horizontalAlign: 'center',
                    verticalAlign: "top",
                    rotations
                }
            })
        }
        values.forEach((valueParam, index) => {
            if (pointers?.includes(index)) {
                new ArrowCanvasAnimationParams(
                    {
                        object: {
                            origin: arrayDimensions.getPointerOrigin(index),
                            endPoint: arrayDimensions.getPointerEndPoint(index),
                            startType: 'Arrow',
                            weight: arrayElementWidth / 30
                        }
                    },
                    this.getP5(),
                    this.getAnimationStyle()
                ).getIncludedAnimationParams().forEach((v, k) => result.set(`element pointer ${index} ${k}`, v))
            }
        })

        return result
    }

}
