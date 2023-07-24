import {AnimationObjectParams, JsonObjectParams, SelectionType} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import {
    HighlightedStyleName,
    HighlightedTextValueSegmentType,
    languageDefs
} from '../../simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {addPoints} from '../../../common/Utils'
import {animationStyle} from '../../../Animations'
import {Point} from '../../../common/Point'
import {ObjectParamsObject} from '../../ObjectParamsObject'

const CODE_QUESTIONNAIRE_LINE_SPACING = 2

export interface OnlyCodeQuestionnaireParams {
    width: number
    height: number
}

export interface CodeQuestionnaireJsonParams extends JsonObjectParams, OnlyCodeQuestionnaireParams {
    codeText?: string
    language?: keyof typeof languageDefs
    codeHighlightStyle?: HighlightedStyleName
    codeSelectedSubstrings?: {
        from: number
        to: number
    }[]
    questionnaireSelectedLines?: number[]
    codeFontSize?: number
    codePartWidth?: number
    codePartHeight?: number
    questionParamsPosition?: 'right' | 'center' | 'down'
    questionParamsOptions?: string[]
    questionParamsFontSize?: number
    questionParamsStrikethroughOptions?: number[]
    title?: string
    titleFontSize?: number
}

export interface CodeQuestionnaireAnimationObjectParams extends AnimationObjectParams, OnlyCodeQuestionnaireParams {
    codeText: string
    language: keyof typeof languageDefs | null
    codeHighlightStyle: HighlightedStyleName | null
    codeSelectedSubstrings: {
        from: number
        to: number
    }[]
    questionnaireSelectedLines: number[]
    codeFontSize: number
    codePartWidth: number
    codePartHeight: number
    questionParamsPosition: 'right' | 'center' | 'down'
    questionParamsOptions: string[]
    questionParamsFontSize: number
    questionParamsStrikethroughOptions: number[]
    title: string
    titleFontSize: number
}

export interface CodeQuestionnaireCanvasAnimationSelection {
    code?: {
        substrings: {
            from: number
            to: number
        }[]
    }
    questionnaire?: {
        lines: number[]
    }
}

export default class CodeQuestionnaireCanvasAnimationParams extends ComplexCanvasAnimationParams<CodeQuestionnaireJsonParams, CodeQuestionnaireAnimationObjectParams, CodeQuestionnaireCanvasAnimationSelection> {

    protected convertJsonObjectToAnimationObject(
        jsonObject: CodeQuestionnaireJsonParams,
        animationObjectDefaultParams: AnimationObjectParams
    ): CodeQuestionnaireAnimationObjectParams {
        const animationStyle = this.getAnimationStyle()
        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            codeText: jsonObject.codeText ?? '',
            language: jsonObject.language ?? null,
            codeHighlightStyle: jsonObject.codeHighlightStyle ?? null,
            codeSelectedSubstrings: jsonObject.codeSelectedSubstrings ?? [],
            questionnaireSelectedLines: jsonObject.questionnaireSelectedLines ?? [],
            codeFontSize: jsonObject.codeFontSize ?? animationStyle.fontSize,
            codePartWidth: jsonObject.codePartWidth ?? 0,
            codePartHeight: jsonObject.codePartHeight ?? 0,
            questionParamsPosition: jsonObject.questionParamsPosition ?? 'down',
            questionParamsOptions: jsonObject.questionParamsOptions ?? [],
            questionParamsFontSize: jsonObject.questionParamsFontSize ?? animationStyle.fontSize,
            questionParamsStrikethroughOptions: jsonObject.questionParamsStrikethroughOptions ?? [],
            title: jsonObject.title ?? '',
            titleFontSize: jsonObject.titleFontSize ?? animationStyle.titleFontSize
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<CodeQuestionnaireJsonParams>): Partial<CodeQuestionnaireAnimationObjectParams> {
        return {
            ...jsonObject
        }
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
            result.set('codePart', {
                type: 'highlightedText',
                objectParams: {
                    origin: this.getCodePartOrigin(object),
                    value: {
                        text: object.codeText,
                        highlightStyle: object.codeHighlightStyle ?? undefined,
                        language: object.language ?? undefined
                    },
                    selectedSubstrings: object.codeSelectedSubstrings ?? [],
                    fontSize: object.codeFontSize,
                    width: this.getCodePartWidth(object),
                    height: this.getCodePartHeight(object),
                    zIndex: 0
                }
            })
        }
        if (object.questionParamsOptions && object.questionParamsOptions.length > 0) {
            const value: HighlightedTextValueSegmentType[] = object.questionParamsOptions.flatMap((o, i) => ([{
                textStyle: 'normal',
                value: o
            }, 'newline']))
            if (value.length > 0) {
                value.splice(value.length - 1, 1)
            }
            const selectedSubstrings: {
                from: number
                to: number
                color?: string
                backgroundColor?: string
                strikethrough?: boolean
            }[] = []

            object.questionParamsStrikethroughOptions?.forEach(l => {
                const valueSegment = value[l * 2]
                let curSubstringPosition = 0
                for (let i = 0; i < l * 2; i++) {
                    const seg = value[i]
                    if (seg === 'newline') {
                        curSubstringPosition++
                    } else {
                        curSubstringPosition += seg.value.length
                    }
                }
                if (valueSegment === 'newline') {
                    return
                }

                selectedSubstrings.push({
                    from: curSubstringPosition,
                    to: curSubstringPosition + valueSegment.value.length,
                    color: animationStyle.fontColor,
                    strikethrough: true
                })
            })
            object.questionnaireSelectedLines?.forEach(l => {
                const valueSegment = value[l * 2]
                let curSubstringPosition = 0
                for (let i = 0; i < l * 2; i++) {
                    const seg = value[i]
                    if (seg === 'newline') {
                        curSubstringPosition++
                    } else {
                        curSubstringPosition += seg.value.length
                    }
                }
                if (valueSegment === 'newline') {
                    return
                }

                selectedSubstrings.push({
                    from: curSubstringPosition,
                    to: curSubstringPosition + valueSegment.value.length,
                    backgroundColor: animationStyle.backgroundSelectedColor,
                    color: animationStyle.fontColor
                })
            })

            result.set('questionPart', {
                type: 'highlightedText',
                objectParams: {
                    origin: this.getQuestionPartOrigin(object),
                    fontSize: object.questionParamsFontSize ?? 20,
                    value,
                    zIndex: 1,
                    width: this.getQuestionPartWidth(object),
                    height: this.getQuestionPartHeight(object),
                    selectedSubstrings,
                    lineSpacing: CODE_QUESTIONNAIRE_LINE_SPACING
                }
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
            const numberOfCodeLines = object.codeText ? object.codeText.split('\n').length : 0
            const numberOfQuestionLines = object.questionParamsOptions?.length ?? 0
            result = (result * (numberOfCodeLines)) / (numberOfCodeLines + (numberOfQuestionLines * CODE_QUESTIONNAIRE_LINE_SPACING))
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
            codeHighlightStyle: animationStyle.highlightTextStyle,
            codeSelectedSubstrings: [],
            questionnaireSelectedLines: [],
            questionParamsPosition: 'down',
            questionParamsFontSize: animationStyle.fontSize
        }
    }

    protected convertSelectionToTransformObject(selection: SelectionType<CodeQuestionnaireCanvasAnimationSelection>): Partial<CodeQuestionnaireJsonParams> {
        return {
            codeSelectedSubstrings: selection.type?.code?.substrings ?? [],
            questionnaireSelectedLines: selection.type?.questionnaire?.lines ?? []
        }
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<CodeQuestionnaireAnimationObjectParams>): void {
        params.codeText !== undefined && objectParamsObject.setStringParam('codeText', params.codeText)
        params.language !== undefined && objectParamsObject.setStringLiteralParam('language', params.language ?? '')
        params.codeHighlightStyle !== undefined && objectParamsObject.setStringLiteralParam('codeHighlightStyle', params.codeHighlightStyle ?? '')
        params.codeSelectedSubstrings && objectParamsObject.setArrayParam('codeSelectedSubstrings', params.codeSelectedSubstrings)
        params.questionnaireSelectedLines && objectParamsObject.setArrayParam('questionnaireSelectedLines', params.questionnaireSelectedLines)
        params.codeFontSize && objectParamsObject.setNumberParam('codeFontSize', params.codeFontSize)
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
        params.codePartWidth !== undefined && objectParamsObject.setNumberParam('codePartWidth', params.codePartWidth)
        params.codePartHeight !== undefined && objectParamsObject.setNumberParam('codePartHeight', params.codePartHeight)
        params.questionParamsPosition && objectParamsObject.setStringLiteralParam('questionParamsPosition', params.questionParamsPosition)
        params.questionParamsOptions && objectParamsObject.setArrayParam('questionParamsOptions', params.questionParamsOptions)
        params.questionParamsFontSize && objectParamsObject.setNumberParam('questionParamsFontSize', params.questionParamsFontSize)
        params.questionParamsStrikethroughOptions && objectParamsObject.setSetParam('questionParamsStrikethroughOptions', new Set(params.questionParamsStrikethroughOptions))
        params.title && objectParamsObject.setStringParam('title', params.title)
        params.titleFontSize && objectParamsObject.setNumberParam('titleFontSize', params.titleFontSize)
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): CodeQuestionnaireAnimationObjectParams {
        return {
            ...initialDefaultParams,
            codeText: objectParamsObject.getStringParam('codeText'),
            language: objectParamsObject.getStringLiteralParam<keyof typeof languageDefs>('language'),
            codeHighlightStyle: objectParamsObject.getStringLiteralParam<HighlightedStyleName>('codeHighlightStyle'),
            codeSelectedSubstrings: objectParamsObject.getArrayParam('codeSelectedSubstrings'),
            questionnaireSelectedLines: objectParamsObject.getArrayParam('questionnaireSelectedLines'),
            codeFontSize: objectParamsObject.getNumberParam('codeFontSize'),
            width: objectParamsObject.getNumberParam('width'),
            height: objectParamsObject.getNumberParam('height'),
            codePartWidth: objectParamsObject.getNumberParam('codePartWidth'),
            codePartHeight: objectParamsObject.getNumberParam('codePartHeight'),
            questionParamsPosition: objectParamsObject.getStringLiteralParam<'right' | 'center' | 'down'>('questionParamsPosition'),
            questionParamsOptions: objectParamsObject.getArrayParam('questionParamsOptions'),
            questionParamsFontSize: objectParamsObject.getNumberParam('questionParamsFontSize'),
            questionParamsStrikethroughOptions: Array.from(objectParamsObject.getSetParam<number>('questionParamsStrikethroughOptions').values()),
            title: objectParamsObject.getStringParam('title'),
            titleFontSize: objectParamsObject.getNumberParam('titleFontSize')
        }
    }

}
