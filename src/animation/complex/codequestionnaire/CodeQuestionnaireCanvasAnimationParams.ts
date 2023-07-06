import { ObjectParams, SelectionType } from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import HighlightedTextCanvasAnimationParams, { HighlightedStyleName, languageDefs } from '../../simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import AnimationStyle from '../../../AnimationStyles'
import { calculateArrayPercentValue, calculatePercentValue, calculateTextPercentValue } from '../../../common/Utils'

export interface CodeQuestionnaireParamsType extends ObjectParams {
    codeText: string
    language: keyof typeof languageDefs
    highlightStyle?: HighlightedStyleName,
    codeSelectedSubstrings?: {
        from: number,
        to: number,
    }[],
    codeFontSize: number,
    width: number
    height: number
}

export interface CodeQuestionnaireCanvasAnimationSelection extends SelectionType {
    code: {
        substrings?: {
            from: number,
            to: number
        }[]
    }
}

export default class CodeQuestionnaireCanvasAnimationParams extends ComplexCanvasAnimationParams<CodeQuestionnaireParamsType, CodeQuestionnaireCanvasAnimationSelection> {

    protected getIncludedAnimationParamsByParameter (object: CodeQuestionnaireParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()
        result.set("codePart", new HighlightedTextCanvasAnimationParams({
            object: {
                origin: object.origin,
                value: {
                    text: object.codeText,
                    highlightStyle: object.highlightStyle,
                    language: object.language
                },
                selectedSubstrings: object.codeSelectedSubstrings,
                fontSize: object.codeFontSize,
                width: object.width,
                height: object.height
            }
        }, this.getAnimationStyle()))
        return result
    }

    protected getZeroParams (): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        return {
            width: this.getObject().width,
            height: this.getObject().height,
            codeText: "",
            language: this.getObject().language,
            codeFontSize: 0,
        }
    }

    mergeWithTransformation (obj: CodeQuestionnaireParamsType, trans: Partial<CodeQuestionnaireParamsType>, perc: number, animationStyle: AnimationStyle): Omit<CodeQuestionnaireParamsType, keyof ObjectParams> {
        return {
                codeText: trans.codeText ? calculateTextPercentValue(obj.codeText, trans.codeText, perc) : obj.codeText,
                language: (trans.language && perc > 0.5) ? trans.language : obj.language,
                highlightStyle: (trans.highlightStyle && perc > 0.5) ? trans.highlightStyle : obj.highlightStyle,
                codeSelectedSubstrings: trans.codeSelectedSubstrings ? calculateArrayPercentValue(obj.codeSelectedSubstrings ?? [], trans.codeSelectedSubstrings, perc) : obj.codeSelectedSubstrings,
                codeFontSize: trans.codeFontSize ? calculatePercentValue(obj.codeFontSize, trans.codeFontSize, perc) : obj.codeFontSize,
            width: trans.width ? calculatePercentValue(obj.width, trans.width, perc): obj.width,
            height: trans.height ? calculatePercentValue(obj.height, trans.height, perc): obj.height,
        }
    }

    protected convertSelectionToTransformObject (selection: SelectionType<CodeQuestionnaireCanvasAnimationSelection>): Partial<CodeQuestionnaireParamsType> {
        return {
            codeSelectedSubstrings: selection.type?.code.substrings
        }
    }

}
