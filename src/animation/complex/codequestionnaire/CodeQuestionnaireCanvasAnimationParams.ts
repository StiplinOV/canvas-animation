import {
    AnimationObjectParams,
    JsonObjectParams,
    SelectionType,
    TransformObjectParams
} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import {
    createFormattedTextValueSegmentType,
    FormattedTextStyleName,
    FormattedTextValueSegmentType, SelectedSubstringJsonType
} from '../../simple/formattedtext/FormattedTextCanvasAnimationParams'
import {addPoints, requireValueFromMap} from '../../../common/Utils'
import {animationStyle} from '../../../Animations'
import {Point} from '../../../common/Point'
import {ObjectParamsObject} from '../../ObjectParamsObject'
import {SupportedFormattedLanguages, WebSafeFontsType} from '../../../AnimationStyles'

type QuestionParamsOptionsJsonType = (string | (FormattedTextValueSegmentType | string)[])[]

type SelectedLineType = {
    type: 'success' | 'fail' | 'warning'
    num: number
}

export interface OnlyCodeQuestionnaireParams {
    width: number
    height: number
}

export interface CodeQuestionnaireJsonParams extends JsonObjectParams, OnlyCodeQuestionnaireParams {
    codeText?: string
    language?: SupportedFormattedLanguages
    codeFormattedTextStyle?: FormattedTextStyleName
    codeSelectedSubstrings?: SelectedSubstringJsonType[]
    codeSelectedLines?: (SelectedLineType | number)[]
    questionnaireSelectedLines?: (SelectedLineType | number)[]
    codeFontSize?: number
    codePartWidth?: number
    codePartHeight?: number
    codeLinesNumbered?: boolean
    questionParamsPosition?: 'right' | 'center' | 'down'
    questionParamsOptions?: QuestionParamsOptionsJsonType
    questionNumberingType?: 'letters' | 'numbers'
    questionParamsFont?: WebSafeFontsType | 'monospace'
    questionParamsFontSize?: number
    questionParamsStrikethroughOptions?: number[]
    questionParamsLineSpacing?: number
    title?: string
    titleFontSize?: number
}

export interface CodeQuestionnaireAnimationObjectParams extends AnimationObjectParams, OnlyCodeQuestionnaireParams {
    codeText: string
    language: SupportedFormattedLanguages | null
    codeFormattedTextStyle: FormattedTextStyleName | null
    codeSelectedSubstrings: SelectedSubstringJsonType[]
    codeSelectedLines: SelectedLineType[]
    questionnaireSelectedLines: SelectedLineType[]
    codeFontSize: number
    codePartWidth: number
    codePartHeight: number
    codeLinesNumbered: boolean
    questionParamsPosition: 'right' | 'center' | 'down'
    questionParamsOptions: FormattedTextValueSegmentType[][]
    questionNumberingType: 'letters' | 'numbers' | 'none'
    questionParamsFont: WebSafeFontsType | 'monospace'
    questionParamsFontSize: number
    questionParamsStrikethroughOptions: number[]
    questionParamsLineSpacing: number
    title: string
    titleFontSize: number
}

export interface CodeQuestionnaireCanvasAnimationSelection {
    code?: {
        substrings?: {
            from: number
            to: number
        }[]
        lines?: (SelectedLineType | number)[]
    }
    questionnaire?: {
        lines: (SelectedLineType | number)[]
    }
}

export default class CodeQuestionnaireCanvasAnimationParams extends ComplexCanvasAnimationParams<CodeQuestionnaireJsonParams, CodeQuestionnaireAnimationObjectParams, CodeQuestionnaireCanvasAnimationSelection> {

    protected convertJsonObjectToAnimationObject(
        jsonObject: CodeQuestionnaireJsonParams,
        animationObjectDefaultParams: AnimationObjectParams
    ): CodeQuestionnaireAnimationObjectParams {
        const animationStyle = this.getAnimationStyle()
        const questionParamsOptions = this.convertJsonToAnimationQuestionParamOptions(
            jsonObject.questionParamsOptions ?? []
        )
        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            codeText: jsonObject.codeText ?? '',
            language: jsonObject.language ?? null,
            codeFormattedTextStyle: jsonObject.codeFormattedTextStyle ?? animationStyle.formattedTextStyle,
            codeSelectedSubstrings: jsonObject.codeSelectedSubstrings ?? [],
            codeSelectedLines: this.convertJsonToAnimationSelectedLines(jsonObject.codeSelectedLines),
            questionnaireSelectedLines: this.convertJsonToAnimationSelectedLines(jsonObject.questionnaireSelectedLines),
            codeFontSize: jsonObject.codeFontSize ?? animationStyle.fontSize,
            codePartWidth: jsonObject.codePartWidth ?? 0,
            codePartHeight: jsonObject.codePartHeight ?? 0,
            codeLinesNumbered: jsonObject.codeLinesNumbered ?? false,
            questionNumberingType: jsonObject.questionNumberingType ?? 'none',
            questionParamsPosition: jsonObject.questionParamsPosition ?? 'down',
            questionParamsOptions,
            questionParamsFont: jsonObject.questionParamsFont ?? animationStyle.font,
            questionParamsFontSize: jsonObject.questionParamsFontSize ?? animationStyle.fontSize,
            questionParamsStrikethroughOptions: jsonObject.questionParamsStrikethroughOptions ?? [],
            questionParamsLineSpacing: jsonObject.questionParamsLineSpacing ?? animationStyle.lineSpacing,
            title: jsonObject.title ?? '',
            titleFontSize: jsonObject.titleFontSize ?? animationStyle.titleFontSize
        }
    }

    private convertJsonToAnimationSelectedLines(jsonParam?: (SelectedLineType | number)[]): SelectedLineType[] {
        return jsonParam?.map(l => {
            if (typeof l === 'number') {
                return {
                    type: 'warning',
                    num: l
                }
            }
            return l
        }) ?? []
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<CodeQuestionnaireJsonParams>): Partial<CodeQuestionnaireAnimationObjectParams> {
        const questionParamsOptions = jsonObject.questionParamsOptions === undefined ? undefined : this.convertJsonToAnimationQuestionParamOptions(jsonObject.questionParamsOptions)
        let codeSelectedLines: SelectedLineType[] | undefined
        let questionnaireSelectedLines: SelectedLineType[] | undefined
        if (jsonObject.codeSelectedLines) {
            codeSelectedLines = this.convertJsonToAnimationSelectedLines(jsonObject.codeSelectedLines)
        }
        if (jsonObject.questionnaireSelectedLines) {
            questionnaireSelectedLines = this.convertJsonToAnimationSelectedLines(jsonObject.questionnaireSelectedLines)
        }

        return {
            ...jsonObject,
            codeSelectedLines,
            questionParamsOptions,
            questionnaireSelectedLines
        }
    }

    private convertJsonToAnimationQuestionParamOptions(questionParamsOptions: QuestionParamsOptionsJsonType): FormattedTextValueSegmentType[][] {
        return questionParamsOptions.map((o) => {
            if (typeof o === 'string') {
                return [{value: o}]
            }
            return o.map(s => {
                if (typeof s === 'string') {
                    return {value: s}
                }
                return s
            })
        })
    }

    protected getIncludedAnimationParamsByParameter(object: CodeQuestionnaireAnimationObjectParams): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        if (object.title) {
            result.set('titleText', {
                type: 'text',
                objectParams: {
                    boxWidth: object.width,
                    boxHeight: this.getTitleHeight(object),
                    horizontalAlign: 'center',
                    verticalAlign: 'center',
                    origin: object.origin,
                    value: object.title,
                    fontSize: object.titleFontSize ?? 30,
                    zIndex: 1
                }
            })
            result.set('titleRect', {
                type: 'rectangle',
                appearType: 'immediate',
                disappearType: 'immediateAtTheEnd',
                objectParams: {
                    origin: object.origin,
                    width: object.width,
                    height: this.getTitleHeight(object),
                    fillColor: animationStyle.primaryColor
                }
            })
        }
        if (object.codeText) {
            const value = {
                text: object.codeText,
                formattedTextStyle: object.codeFormattedTextStyle ?? undefined,
                language: object.language ?? undefined
            }
            const selectedSubstrings: SelectedSubstringJsonType[] = [
                ...object.codeSelectedSubstrings.map(s => ({
                    from: s.from,
                    to: s.to,
                    backgroundColor: animationStyle.selectedColor
                })),
                ...this.convertSelectedLinesToSelectedSubstrings(
                    createFormattedTextValueSegmentType(value, this.getAnimationStyle()),
                    object.codeSelectedLines
                )
            ]
            result.set('codePart', {
                type: 'formattedText',
                objectParams: {
                    font: 'monospace',
                    origin: this.getCodePartOrigin(object),
                    value,
                    selectedSubstrings,
                    fontSize: object.codeFontSize,
                    numberedLines: object.codeLinesNumbered,
                    width: this.getCodePartWidth(object),
                    height: this.getCodePartHeight(object),
                    zIndex: 0
                }
            })
        }
        if (object.questionParamsOptions && object.questionParamsOptions.length > 0) {
            const value: FormattedTextValueSegmentType[] = object.questionParamsOptions.flatMap((o, i) => {
                const result: FormattedTextValueSegmentType[] = []
                if (object.questionNumberingType === 'numbers') {
                    result.push({
                        textStyle: 'bold',
                        value: `${i + 1}. `
                    })
                } else if (object.questionNumberingType === 'letters') {
                    result.push({
                        textStyle: 'bold',
                        value: String.fromCharCode('A'.charCodeAt(0) + i) + '. '
                    })
                }
                result.push(...o)
                result.push('newline')

                return result
            })
            if (value.length > 0) {
                value.splice(value.length - 1, 1)
            }

            result.set('questionPart', {
                type: 'formattedText',
                objectParams: {
                    font: object.questionParamsFont,
                    origin: this.getQuestionPartOrigin(object),
                    fontSize: object.questionParamsFontSize ?? 20,
                    value,
                    zIndex: 1,
                    width: this.getQuestionPartWidth(object),
                    height: this.getQuestionPartHeight(object),
                    selectedSubstrings: this.convertSelectedLinesToSelectedSubstrings(
                        value,
                        object.questionnaireSelectedLines,
                        object.questionParamsStrikethroughOptions
                    ),
                    lineSpacing: object.questionParamsLineSpacing ?? animationStyle.lineSpacing
                }
            })
        }
        return result
    }

    private convertSelectedLinesToSelectedSubstrings (
        value: FormattedTextValueSegmentType[],
        selectedLines: SelectedLineType[],
        strikethroughLinesParam?: number[]
    ): SelectedSubstringJsonType[] {
        const result: SelectedSubstringJsonType[] = []
        const questionnaireSelectedLines = new Map<number, SelectedLineType>()
        const strikethroughLines = strikethroughLinesParam ?? []
        selectedLines.forEach(l => {
            questionnaireSelectedLines.set(l.num, l)
        })
        let lineNumber = 0
        for (let i = 0; i < value.length; i++) {
            const valueSegment = value[i]
            if (valueSegment === 'newline') {
                lineNumber++
                continue
            }
            if (!strikethroughLines.includes(lineNumber) && !questionnaireSelectedLines.has(lineNumber)) {
                continue
            }
            let curSubstringPosition = 0
            for (let j = 0; j < i; j++) {
                const seg = value[j]
                if (seg === 'newline') {
                    curSubstringPosition++
                } else {
                    curSubstringPosition += seg.value.length
                }
            }

            let backgroundColor = animationStyle.backgroundColor

            if (questionnaireSelectedLines.has(lineNumber)) {
                const backgroundColorType = requireValueFromMap(questionnaireSelectedLines, lineNumber).type
                if (backgroundColorType === 'success') {
                    backgroundColor = animationStyle.successColor
                } else if (backgroundColorType === 'fail') {
                    backgroundColor = animationStyle.failColor
                } else {
                    backgroundColor = animationStyle.warningColor
                }
            }

            result.push({
                from: curSubstringPosition,
                to: curSubstringPosition + valueSegment.value.length,
                color: animationStyle.fontColor,
                strikethrough: strikethroughLines.includes(lineNumber),
                backgroundColor
            })
        }
        return result
    }

    private getTitleHeight(object: CodeQuestionnaireAnimationObjectParams): number {
        return object.titleFontSize ? object.titleFontSize * 3 : 0
    }

    private getCodePartHeight(object: CodeQuestionnaireAnimationObjectParams): number {
        if (object.codePartHeight) {
            return object.codePartHeight
        }
        let result = object.height - this.getTitleHeight(object)

        if (object.questionParamsPosition === 'down') {
            const numberOfCodeLines = object.codeText ? object.codeText.split('\n').length + 2 : 0
            const numberOfQuestionLines = object.questionParamsOptions?.length ?? 0
            result = (result * (numberOfCodeLines)) / (numberOfCodeLines + (numberOfQuestionLines * object.questionParamsLineSpacing))
        }
        return result
    }

    private getCodePartWidth(object: CodeQuestionnaireAnimationObjectParams): number {
        let result = object.width
        if (object.questionParamsPosition === 'right') {
            result /= 2
        }
        return result
    }

    private getQuestionPartHeight(object: CodeQuestionnaireAnimationObjectParams): number {
        if (object.questionParamsPosition === 'center') {
            return object.height / 2
        }
        if (object.questionParamsPosition === 'right') {
            return this.getCodePartHeight(object)
        }
        return object.height - this.getTitleHeight(object) - this.getCodePartHeight(object)
    }

    private getQuestionPartWidth(object: CodeQuestionnaireAnimationObjectParams): number {
        if (object.questionParamsPosition === 'center') {
            return object.width / 2
        }
        if (object.questionParamsPosition === 'down') {
            return this.getCodePartWidth(object)
        }
        return object.width - this.getCodePartWidth(object)
    }

    private getCodePartOrigin(object: CodeQuestionnaireAnimationObjectParams): Point {
        return addPoints(object.origin, {y: this.getTitleHeight(object)})
    }

    private getQuestionPartOrigin(object: CodeQuestionnaireAnimationObjectParams): Point {
        if (object.questionParamsPosition === 'down') {
            return addPoints(this.getCodePartOrigin(object), {y: this.getCodePartHeight(object)})
        } else if (object.questionParamsPosition === 'right') {
            return addPoints(this.getCodePartOrigin(object), {x: this.getCodePartWidth(object)})
        } else if (object.questionParamsPosition === 'center') {
            return addPoints(object.origin, {
                x: (this.getCodePartWidth(object) - this.getQuestionPartWidth(object)) / 2,
                y: (this.getCodePartHeight(object) - this.getQuestionPartHeight(object)) / 2
            })
        } else {
            return object.origin
        }
    }

    protected getZeroParams(): Omit<CodeQuestionnaireAnimationObjectParams, keyof AnimationObjectParams> {
        const animationStyle = this.getAnimationStyle()
        return {
            ...this.getObject(),
            questionParamsOptions: [],
            questionParamsStrikethroughOptions: [],
            codeText: '',
            codeFormattedTextStyle: animationStyle.formattedTextStyle,
            codeSelectedSubstrings: [],
            codeSelectedLines: [],
            questionnaireSelectedLines: [],
            questionParamsPosition: 'down',
            questionParamsFontSize: animationStyle.fontSize
        }
    }

    protected convertSelectionToTransformObjectParams(selection: SelectionType<CodeQuestionnaireCanvasAnimationSelection>): TransformObjectParams<CodeQuestionnaireAnimationObjectParams>[] {
        const questionnaireSelectionLines = selection.type?.questionnaire?.lines
        const codeSelectionLines = selection.type?.code?.lines
        let questionnaireSelectedLines: SelectedLineType[] | undefined
        let codeSelectedLines: SelectedLineType[] | undefined
        if (questionnaireSelectionLines) {
            questionnaireSelectedLines = this.convertJsonToAnimationSelectedLines(questionnaireSelectionLines)
        }
        if (codeSelectionLines) {
            codeSelectedLines = this.convertJsonToAnimationSelectedLines(codeSelectionLines)
        }
        return [{
            transformObject: {
                codeSelectedLines,
                codeSelectedSubstrings: selection.type?.code?.substrings,
                questionnaireSelectedLines
            },
            appearType: 'immediate',
            disappearType: 'immediateAtTheEnd'
        }]
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<CodeQuestionnaireAnimationObjectParams>): void {
        params.codeText !== undefined && objectParamsObject.setStringParam('codeText', params.codeText)
        params.language !== undefined && objectParamsObject.setStringLiteralParam('language', params.language)
        params.codeFormattedTextStyle !== undefined && objectParamsObject.setStringLiteralParam('codeHighlightStyle', params.codeFormattedTextStyle ?? '')
        params.codeSelectedSubstrings !== undefined && objectParamsObject.setArrayParam('codeSelectedSubstrings', params.codeSelectedSubstrings)
        params.codeSelectedLines !== undefined && objectParamsObject.setSetParam('codeSelectedLines', params.codeSelectedLines)
        params.questionnaireSelectedLines !== undefined && objectParamsObject.setSetParam('questionnaireSelectedLines', params.questionnaireSelectedLines)
        params.codeFontSize !== undefined && objectParamsObject.setNumberParam('codeFontSize', params.codeFontSize)
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
        params.codePartWidth !== undefined && objectParamsObject.setNumberParam('codePartWidth', params.codePartWidth)
        params.codePartHeight !== undefined && objectParamsObject.setNumberParam('codePartHeight', params.codePartHeight)
        params.codeLinesNumbered !== undefined && objectParamsObject.setBooleanParam('codeLinesNumbered', params.codeLinesNumbered)
        params.questionParamsPosition !== undefined && objectParamsObject.setStringLiteralParam('questionParamsPosition', params.questionParamsPosition)
        params.questionParamsOptions !== undefined && objectParamsObject.setArrayParam('questionParamsOptions', params.questionParamsOptions)
        params.questionParamsFont !== undefined && objectParamsObject.setStringLiteralParam('questionParamsFont', params.questionParamsFont)
        params.questionParamsFontSize !== undefined && objectParamsObject.setNumberParam('questionParamsFontSize', params.questionParamsFontSize)
        params.questionParamsStrikethroughOptions !== undefined && objectParamsObject.setSetParam('questionParamsStrikethroughOptions', params.questionParamsStrikethroughOptions)
        params.questionParamsLineSpacing !== undefined && objectParamsObject.setNumberParam('questionParamsLineSpacing', params.questionParamsLineSpacing)
        params.questionNumberingType !== undefined && objectParamsObject.setStringLiteralParam('questionNumberingType', params.questionNumberingType)
        params.title !== undefined && objectParamsObject.setStringParam('title', params.title)
        params.titleFontSize !== undefined && objectParamsObject.setNumberParam('titleFontSize', params.titleFontSize)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): CodeQuestionnaireAnimationObjectParams {
        return {
            ...initialDefaultParams,
            codeText: objectParamsObject.getStringParam('codeText'),
            language: objectParamsObject.getStringLiteralParam<SupportedFormattedLanguages>('language'),
            codeFormattedTextStyle: objectParamsObject.getStringLiteralParam<FormattedTextStyleName>('codeHighlightStyle'),
            codeSelectedSubstrings: objectParamsObject.getArrayParam('codeSelectedSubstrings'),
            codeSelectedLines: Array.from(objectParamsObject.getSetParam<SelectedLineType>('codeSelectedLines').values()),
            questionnaireSelectedLines: Array.from(objectParamsObject.getSetParam<SelectedLineType>('questionnaireSelectedLines').values()),
            codeFontSize: objectParamsObject.getNumberParam('codeFontSize'),
            width: objectParamsObject.getNumberParam('width'),
            height: objectParamsObject.getNumberParam('height'),
            codePartWidth: objectParamsObject.getNumberParam('codePartWidth'),
            codePartHeight: objectParamsObject.getNumberParam('codePartHeight'),
            codeLinesNumbered: objectParamsObject.getBooleanParam('codeLinesNumbered'),
            questionParamsPosition: objectParamsObject.getStringLiteralParam<'right' | 'center' | 'down'>('questionParamsPosition'),
            questionParamsOptions: objectParamsObject.getArrayParam('questionParamsOptions'),
            questionParamsFont: objectParamsObject.getStringLiteralParam('questionParamsFont'),
            questionParamsFontSize: objectParamsObject.getNumberParam('questionParamsFontSize'),
            questionParamsStrikethroughOptions: Array.from(objectParamsObject.getSetParam<number>('questionParamsStrikethroughOptions').values()),
            questionParamsLineSpacing: objectParamsObject.getNumberParam('questionParamsLineSpacing'),
            questionNumberingType: objectParamsObject.getStringLiteralParam('questionNumberingType'),
            title: objectParamsObject.getStringParam('title'),
            titleFontSize: objectParamsObject.getNumberParam('titleFontSize')
        }
    }

}
