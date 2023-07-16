import {ObjectParams, SelectionType} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {CanvasAnimationParamsType} from '../ComplexCanvasAnimationParams'
import {
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
import {animationStyle} from "../../../Animations";
import { Point } from '../../../common/Point'

export interface CodeQuestionnaireParamsType extends ObjectParams {
    codeText: string
    language?: keyof typeof languageDefs
    codeHighlightStyle?: HighlightedStyleName
    codeSelectedSubstrings?: {
        from: number
        to: number
    }[],
    questionnaireSelectedLines?: number[],
    codeFontSize: number
    width: number
    height: number
    codePartWidth?: number,
    codePartHeight?: number,
    questionParamsPosition?: "right" | "center" | "down",
    questionParamsOptions?: string[]
    questionParamsFontSize?: number
    title?: string,
    titleFontSize?: number
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

    protected getIncludedAnimationParamsByParameter(object: CodeQuestionnaireParamsType): Map<string, CanvasAnimationParamsType> {
        const result = new Map<string, CanvasAnimationParamsType>()
        if (object.title) {
            result.set("titleText", {
                type: "text",
                objectParams: {
                    boxWidth: object.width,
                    boxHeight: this.getTitleHeight(object),
                    horizontalAlign: "center",
                    verticalAlign: "center",
                    origin: object.origin,
                    value: object.title,
                    fontSize: object.titleFontSize ?? 30,
                    zIndex: 1
                }
            })
            result.set("titleRect", {
                type: "rectangle",
                appearType: "immediate",
                disappearType: "immediateAtTheEnd",
                objectParams: {
                    origin: object.origin,
                    width: object.width,
                    height: this.getTitleHeight(object),
                    fillColor: animationStyle.primaryColor
                }
            })
        }
        result.set("codePart", {
            type: "highlightedText",
            objectParams: {
                origin: this.getCodePartOrigin(object),
                value: {
                    text: object.codeText,
                    highlightStyle: object.codeHighlightStyle,
                    language: object.language
                },
                selectedSubstrings: object.codeSelectedSubstrings ?? [],
                fontSize: object.codeFontSize,
                width: this.getCodePartWidth(object),
                height: this.getCodePartHeight(object),
                zIndex: 0
            }
        })
        if (object.questionParamsOptions && object.questionParamsOptions.length > 0) {
            const value: HighlightedTextValueSegmentType[] = object.questionParamsOptions.flatMap(o => ([{
                textStyle: "normal",
                value: o
            }, "newline"]))
            if (value.length > 0) {
                value.splice(value.length - 1, 1)
            }
            const selectedSubstrings = []
            let curSubstringPosition = 0
            for (let i = 0; i < value.length; i++) {
                const valueSegment = value[i]
                if (valueSegment === "newline") {
                    curSubstringPosition++
                    continue
                }
                const lineNumber = i / 2
                if (object.questionnaireSelectedLines?.includes(lineNumber)) {
                    selectedSubstrings.push({
                        from: curSubstringPosition,
                        to: curSubstringPosition + valueSegment.value.length,
                        backgroundColor: animationStyle.backgroundSelectedColor,
                        color: animationStyle.fontColor
                    })
                }
                curSubstringPosition += valueSegment.value.length
            }
            result.set("questionPart", {
                type: "highlightedText",
                objectParams: {
                    origin: this.getQuestionPartOrigin(object),
                    fontSize: object.questionParamsFontSize ?? 20,
                    value: value,
                    zIndex: 1,
                    width: this.getQuestionPartWidth(object),
                    height: this.getQuestionPartHeight(object),
                    selectedSubstrings: selectedSubstrings
                }
            })
        }
        return result
    }

    private getTitleHeight(object: CodeQuestionnaireParamsType): number {
        return object.titleFontSize ? object.titleFontSize * 2 : 0
    }

    private getCodePartHeight(object: CodeQuestionnaireParamsType): number {
        if (object.codePartHeight) {
            return object.codePartHeight
        }
        let result = object.height - this.getTitleHeight(object)
        if (object.questionParamsPosition === 'down') {
            result /= 2
        }
        return result
    }

    private getCodePartWidth(object: CodeQuestionnaireParamsType): number {
        let result = object.width
        if (object.questionParamsPosition === 'right') {
            result /= 2
        }
        return result
    }

    private getQuestionPartHeight(object: CodeQuestionnaireParamsType): number {
        if (object.questionParamsPosition === "center") {
            return object.height / 2
        }
        if (object.questionParamsPosition === "right") {
            return this.getCodePartHeight(object)
        }
        return object.height - this.getTitleHeight(object) - this.getCodePartHeight(object)
    }

    private getQuestionPartWidth(object: CodeQuestionnaireParamsType): number {
        if (object.questionParamsPosition === "center") {
            return object.width / 2
        }
        if (object.questionParamsPosition === "down") {
            return this.getCodePartWidth(object)
        }
        return object.width - this.getCodePartWidth(object)
    }

    private getCodePartOrigin(object: CodeQuestionnaireParamsType): Point {
        return addPoints(object.origin, {y: this.getTitleHeight(object)})
    }

    private getQuestionPartOrigin(object: CodeQuestionnaireParamsType): Point {
        switch (object.questionParamsPosition) {
            case "down":
                return addPoints(this.getCodePartOrigin(object), {y: this.getCodePartHeight(object)})
            case "right":
                return addPoints(this.getCodePartOrigin(object), {x: this.getCodePartWidth(object)})
            case "center":
                return addPoints(object.origin, {
                    x: (this.getCodePartWidth(object) - this.getQuestionPartWidth(object))/2,
                    y: (this.getCodePartHeight(object) - this.getQuestionPartHeight(object))/2
                })
            default:
                return object.origin
        }
    }

    protected getZeroParams(): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        return {
            width: this.getObject().width,
            height: this.getObject().height,
            codePartWidth: this.getObject().codePartWidth,
            questionParamsOptions: [],
            codeText: "",
            language: this.getObject().language,
            codeFontSize: this.getObject().codeFontSize,
            title: this.getObject().title,
            titleFontSize: this.getObject().titleFontSize
        }
    }

    mergeWithTransformation(obj: CodeQuestionnaireParamsType, trans: Partial<CodeQuestionnaireParamsType>, perc: number, animationStyle: AnimationStyle): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        const codePartHeight = this.getCodePartHeight(obj)
        const codePartWidth = this.getCodePartWidth(obj)
        return {
            codePartHeight: trans.codePartHeight ? calculatePercentValue(codePartHeight, trans.codePartHeight, perc): codePartHeight,
            codePartWidth: trans.codePartWidth ? calculatePercentValue(codePartWidth, trans.codePartWidth, perc): codePartWidth,
            questionParamsPosition: trans.questionParamsPosition && perc > 0.5 ? trans.questionParamsPosition : obj.questionParamsPosition,
            questionParamsFontSize: trans.questionParamsFontSize ? calculatePercentValue(obj.questionParamsFontSize ?? 20, trans.questionParamsFontSize, perc): obj.questionParamsFontSize,
            questionParamsOptions: trans.questionParamsOptions ? calculateArrayPercentValue(obj.questionParamsOptions ?? [], trans.questionParamsOptions, perc): obj.questionParamsOptions,
            title: trans.title? calculateTextPercentValue(obj.title ?? "", trans.title, perc) : obj.title,
            titleFontSize: trans.titleFontSize? calculatePercentValue(obj.titleFontSize ?? 0, trans.titleFontSize, perc) : obj.titleFontSize,
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
            codeSelectedSubstrings: selection.type?.code?.substrings ?? [],
            questionnaireSelectedLines: selection.type?.questionnaire?.lines ?? []
        }
    }

}
