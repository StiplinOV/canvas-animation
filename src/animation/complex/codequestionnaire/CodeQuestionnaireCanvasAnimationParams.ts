import {ObjectParams, SelectionType} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import HighlightedTextCanvasAnimationParams, {
    HighlightedStyleName,
    HighlightedTextValueSegmentType,
    languageDefs
} from '../../simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import {
    addPoints,
    calculateArrayPercentValue,
    calculatePercentValue,
    calculateTextPercentValue
} from '../../../common/Utils'

export interface CodeQuestionnaireParamsType extends ObjectParams {
    codeText: string
    language: keyof typeof languageDefs
    codeHighlightStyle?: HighlightedStyleName
    codeSelectedSubstrings?: {
        from: number
        to: number
    }[],
    questionnaireSelectedLines?: number[],
    codeFontSize: number
    width: number
    height: number
    questionParams?: {
        position?: "right" | "center" | "down"
        options: string[]
        fontSize: number
    }
}

export interface CodeQuestionnaireCanvasAnimationSelection {
    code?: {
        substrings: {
            from: number,
            to: number
        }[]
    },
    questionnaire?: {
        lines: number[]
    }
}

export default class CodeQuestionnaireCanvasAnimationParams extends ComplexCanvasAnimationParams<CodeQuestionnaireParamsType, CodeQuestionnaireCanvasAnimationSelection> {

    protected getIncludedAnimationParamsByParameter(object: CodeQuestionnaireParamsType): Map<string, SimpleCanvasAnimationParams> {
        let codePartWidth = object.width
        let codePartHeight = object.height
        let questionParamWidth = object.width
        let questionParamHeight = object.height
        let questionPartOrigin = object.origin
        const {questionParams} = object
        const questionParamsPosition = questionParams?.position || "center"
        if (questionParams) {
            switch (questionParamsPosition) {
                case "down":
                    codePartHeight = (object.height * 3) / 4
                    questionParamHeight = object.height / 4
                    questionPartOrigin = addPoints(questionPartOrigin, {
                        y: codePartHeight,
                    })
                    break
                case "right":
                    codePartWidth = (object.width * 3) / 4
                    questionParamWidth = object.width / 4
                    questionPartOrigin = addPoints(questionPartOrigin, {
                        x: codePartWidth,
                    })
                    break
                case "center":
                    questionParamWidth = object.width / 4
                    questionParamHeight = object.height / 4
                    questionPartOrigin = addPoints(questionPartOrigin, {
                        x: (codePartWidth - questionParamWidth) / 2,
                        y: (codePartHeight - questionParamHeight) / 2
                    })
                    break
            }
        }
        const result = new Map<string, SimpleCanvasAnimationParams>()
        result.set("codePart", new HighlightedTextCanvasAnimationParams({
            object: {
                origin: object.origin,
                value: {
                    text: object.codeText,
                    highlightStyle: object.codeHighlightStyle,
                    language: object.language
                },
                selectedSubstrings: object.codeSelectedSubstrings ?? [],
                fontSize: object.codeFontSize,
                width: codePartWidth,
                height: codePartHeight,
                zIndex: 0
            }
        }, this.getAnimationStyle()))
        if (questionParams) {
            const value: HighlightedTextValueSegmentType[] = questionParams.options.flatMap(o => ([{
                textStyle: "normal",
                value: o
            }, "newline"]))
            if (value.length > 0) {
                value.splice(value.length - 1, 1)
            }
            const selectedSubstrings  = []
            let curSubstringPosition = 0
            for (let i = 0; i < value.length; i++) {
                const valueSegment = value[i]
                if ( valueSegment === "newline") {
                    curSubstringPosition++
                    continue
                }
                const lineNumber = i/2
                if (object.questionnaireSelectedLines?.includes(lineNumber)) {
                    selectedSubstrings.push({
                        from: curSubstringPosition,
                        to: curSubstringPosition+ valueSegment.value.length
                    })
                }
                curSubstringPosition += valueSegment.value.length
            }
            result.set("questionPart", new HighlightedTextCanvasAnimationParams({
                object: {
                    origin: questionPartOrigin,
                    fontSize: questionParams.fontSize,
                    value: value,
                    zIndex: 1,
                    width: questionParamWidth,
                    height: questionParamHeight,
                    selectedSubstrings: selectedSubstrings
                }
            }, this.getAnimationStyle()))
        }
        return result
    }

    protected getZeroParams(): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        return {
            width: this.getObject().width,
            height: this.getObject().height,
            codeText: "",
            language: this.getObject().language,
            codeFontSize: 0,
        }
    }

    mergeWithTransformation(obj: CodeQuestionnaireParamsType, trans: Partial<CodeQuestionnaireParamsType>, perc: number, animationStyle: AnimationStyle): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        return {
            codeText: trans.codeText ? calculateTextPercentValue(obj.codeText, trans.codeText, perc) : obj.codeText,
            language: (trans.language && perc > 0.5) ? trans.language : obj.language,
            codeHighlightStyle: (trans.codeHighlightStyle && perc > 0.5) ? trans.codeHighlightStyle : obj.codeHighlightStyle,
            codeSelectedSubstrings: trans.codeSelectedSubstrings ? calculateArrayPercentValue(obj.codeSelectedSubstrings ?? [], trans.codeSelectedSubstrings, perc) : obj.codeSelectedSubstrings,
            questionnaireSelectedLines: trans.questionnaireSelectedLines ? calculateArrayPercentValue(obj.questionnaireSelectedLines ?? [], trans.questionnaireSelectedLines, perc) : obj.questionnaireSelectedLines,
            codeFontSize: trans.codeFontSize ? calculatePercentValue(obj.codeFontSize, trans.codeFontSize, perc) : obj.codeFontSize,
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc) : obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc) : obj.height,
        }
    }

    protected convertSelectionToTransformObject(selection: SelectionType<CodeQuestionnaireCanvasAnimationSelection>): Partial<CodeQuestionnaireParamsType> {
        return {
            codeSelectedSubstrings: selection.type?.code?.substrings,
            questionnaireSelectedLines: selection.type?.questionnaire?.lines
        }
    }

}
