import {
    AnimationObjectParams,
    JsonObjectParams,
    SelectionType,
    TransformObjectParams
} from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, {
    ColorType,
    getFontColor,
    SupportedFormattedLanguages,
    WebSafeFontsType
} from '../../../AnimationStyles'
import FormattedTextCanvasAnimation from './FormattedTextCanvasAnimation'
import {THE_STYLE} from 'p5'
import hljs from 'highlight.js'
import {
    a11yDark,
    a11yLight,
    agate,
    androidstudio,
    anOldHope,
    arduinoLight,
    arta,
    ascetic,
    atelierCaveDark,
    atelierCaveLight,
    atelierDuneDark,
    atelierDuneLight,
    atelierEstuaryDark,
    atelierEstuaryLight,
    atelierForestDark,
    atelierForestLight,
    atelierHeathDark,
    atelierHeathLight,
    atelierLakesideDark,
    atelierLakesideLight,
    atelierPlateauDark,
    atelierPlateauLight,
    atelierSavannaDark,
    atelierSavannaLight,
    atelierSeasideDark,
    atelierSeasideLight,
    atelierSulphurpoolDark,
    atelierSulphurpoolLight,
    atomOneDark,
    atomOneDarkReasonable,
    atomOneLight,
    brownPaper,
    codepenEmbed,
    colorBrewer,
    darcula,
    dark,
    defaultStyle,
    docco,
    dracula,
    far,
    foundation,
    github,
    githubGist,
    gml,
    googlecode,
    gradientDark,
    grayscale,
    gruvboxDark,
    gruvboxLight,
    hopscotch,
    hybrid,
    idea,
    irBlack,
    isblEditorDark,
    isblEditorLight,
    kimbieDark,
    kimbieLight,
    lightfair,
    lioshi,
    magula,
    monoBlue,
    monokai,
    monokaiSublime,
    nightOwl,
    nnfx,
    nnfxDark,
    nord,
    obsidian,
    ocean,
    paraisoDark,
    paraisoLight,
    pojoaque,
    purebasic,
    qtcreatorDark,
    qtcreatorLight,
    railscasts,
    rainbow,
    routeros,
    schoolBook,
    shadesOfPurple,
    solarizedDark,
    solarizedLight,
    srcery,
    sunburst,
    tomorrow,
    tomorrowNight,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    vs,
    vs2015,
    xcode,
    xt256,
    zenburn
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import React from 'react'
import {ObjectParamsObject} from '../../ObjectParamsObject'
import {Property} from 'csstype'
import {getCssClassesSortedByPriority} from '../../../common/Alghoritm'

const styles = {
    a11yDark,
    a11yLight,
    agate,
    anOldHope,
    androidstudio,
    arduinoLight,
    arta,
    ascetic,
    atelierCaveDark,
    atelierCaveLight,
    atelierDuneDark,
    atelierDuneLight,
    atelierEstuaryDark,
    atelierEstuaryLight,
    atelierForestDark,
    atelierForestLight,
    atelierHeathDark,
    atelierHeathLight,
    atelierLakesideDark,
    atelierLakesideLight,
    atelierPlateauDark,
    atelierPlateauLight,
    atelierSavannaDark,
    atelierSavannaLight,
    atelierSeasideDark,
    atelierSeasideLight,
    atelierSulphurpoolDark,
    atelierSulphurpoolLight,
    atomOneDarkReasonable,
    atomOneDark,
    atomOneLight,
    brownPaper,
    codepenEmbed,
    colorBrewer,
    darcula,
    dark,
    defaultStyle,
    docco,
    dracula,
    far,
    foundation,
    githubGist,
    github,
    gml,
    googlecode,
    gradientDark,
    grayscale,
    gruvboxDark,
    gruvboxLight,
    hopscotch,
    hybrid,
    idea,
    irBlack,
    isblEditorDark,
    isblEditorLight,
    kimbieDark,
    kimbieLight,
    lightfair,
    lioshi,
    magula,
    monoBlue,
    monokaiSublime,
    monokai,
    nightOwl,
    nnfxDark,
    nnfx,
    nord,
    obsidian,
    ocean,
    paraisoDark,
    paraisoLight,
    pojoaque,
    purebasic,
    qtcreatorDark,
    qtcreatorLight,
    railscasts,
    rainbow,
    routeros,
    schoolBook,
    shadesOfPurple,
    solarizedDark,
    solarizedLight,
    srcery,
    sunburst,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    tomorrowNight,
    tomorrow,
    vs,
    vs2015,
    xcode,
    xt256,
    zenburn
}

const splitTextValueSegmentType = (param: FormattedTextValueSegmentType): FormattedTextValueSegmentType[] => {
    const result: FormattedTextValueSegmentType[] = []
    if (param === 'newline') {
        return [param]
    }
    for (let i = 0; i < param.value.length; i++) {
        const char = param.value.charAt(i)
        result.push({
            ...param,
            value: char
        })
    }
    return result
}

export const createFormattedTextValueSegmentType = (object: FormattedTextValueType, animationStyle: AnimationStyle): FormattedTextValueSegmentType[] => {
    type NodeType = string | {
        children: NodeType[]
        scope: string
    }
    type TextWithScope = {
        text: string
        scope: string
    }

    if (Array.isArray(object)) {
        return object.flatMap(f => splitTextValueSegmentType(f))
    }
    const {text} = object
    const style = styles[object.formattedTextStyle ?? animationStyle.formattedTextStyle]
    const emitter = hljs.highlight(text, {language: object.language ?? 'java'})._emitter as any
    const rootNode = emitter.rootNode as {
        children: NodeType[]
    }

    const convertNodesToTextsWithScopes = (parentScope: string, nodes: NodeType[]): TextWithScope[] => {
        return nodes.flatMap(n => {
            if (typeof n === 'string') {
                return [{
                    text: n,
                    scope: parentScope
                }]
            }
            const scope = parentScope + '.' + n.scope
            return convertNodesToTextsWithScopes(scope, n.children)
        })
    }

    let textWithScopes = convertNodesToTextsWithScopes('', rootNode.children)
    if (!object.language) {
        textWithScopes = textWithScopes.map(t => ({
            text: t.text,
            scope: ''
        }))
    }

    return textWithScopes.flatMap(c => {
        let properties: React.CSSProperties = {}
        getCssClassesSortedByPriority(['hljs', ...c.scope.split('.').filter(s => s !== '').reverse().map(v => 'hljs-' + v)]).forEach(classes => {
            const styleKey = classes.map((c, i) => `${i > 0 ? '.' : ''}${c}`).join(' ')
            const localProperties = style[styleKey]

            properties = {
                ...localProperties,
                ...properties
            }

        })
        const texts: string[] = []
        let buffer = ''
        const text = c.text
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === '\n') {
                texts.push(buffer)
                texts.push('\n')
                buffer = ''
            } else {
                buffer = buffer + text.charAt(i)
            }
        }
        if (buffer.length !== 0) {
            texts.push(buffer)
        }
        return texts.map((t): FormattedTextValueSegmentType => {
            if (t === '\n') {
                return 'newline'
            }
            return {
                value: t,
                textColor: properties.color,
                textStyle: cssPropToFontStyle(properties),
                textWeight: cssPropToTextWeight(properties.fontWeight),
                font: 'monospace',
                backgroundTextColor: properties.backgroundColor
            }
        })
    }).flatMap(f => splitTextValueSegmentType(f))
}

const cssPropToFontStyle = (style: React.CSSProperties): THE_STYLE => {
    if (style.fontWeight === 'bold') {
        return style.fontStyle === 'italic' ? 'bolditalic' : 'bold'
    }
    return style.fontStyle === 'italic' ? 'italic' : 'normal'
}

const cssPropToTextWeight = (fontWeightParam?: Property.FontWeight): number | undefined => {
    return typeof fontWeightParam === 'number' ? fontWeightParam : undefined
}

export const calculateBackgroundColor = (params: FormattedTextJsonParamsType, animationStyle: AnimationStyle): string => {
    if (Array.isArray(params.value)) {
        return params.backgroundColor ?? animationStyle.backgroundColor
    }
    if (params.value.formattedTextStyle) {
        return String(styles[params.value.formattedTextStyle].hljs.background)
    }
    if (params.backgroundColor) {
        return params.backgroundColor
    }
    return String(styles[animationStyle.formattedTextStyle].hljs.background)
}

export type FormattedTextStyleName = keyof typeof styles

export type FormattedTextValueSegmentType = {
    value: string
    textStyle?: THE_STYLE
    textWeight?: number
    textColor?: ColorType
    backgroundTextColor?: string
    strikethrough?: boolean
    underlined?: boolean
    type?: 'paragraphTitle' | 'link' | 'codeSpec' | 'codeSpecLink' | 'codeSpecExample'
    font?: WebSafeFontsType | 'monospace'
    fontSize?: number
} | 'newline'

export type FormattedSyntaxValueType = {
    text: string
    language?: SupportedFormattedLanguages
    formattedTextStyle?: FormattedTextStyleName
}

export type FormattedTextValueType = FormattedSyntaxValueType | FormattedTextValueSegmentType[]

export type SelectedSubstringJsonType = {
    from: number
    to: number
    color?: string
    backgroundColor?: string
    strikethrough?: boolean
}

export interface FormattedTextJsonParamsType extends JsonObjectParams {
    value: FormattedTextValueType
    fontSize?: number
    font?: WebSafeFontsType | 'monospace'
    backgroundColor?: string
    selectedSubstrings?: SelectedSubstringJsonType[]
    lineSpacing?: number
    numberedLines?: boolean
    numberingColor?: string
    width?: number
    height?: number
}

type ColorOverride = {
    from: number
    to: number
    color: string
}

type BackgroundColorOverride = {
    from: number
    to: number
    backgroundColor: string
}

type StrikeTroughOverride = {
    from: number
    to: number
    strikethrough: boolean
}

export interface FormattedTextAnimationParamsType extends AnimationObjectParams {
    value: FormattedTextValueSegmentType[]
    fontSize: number
    font: WebSafeFontsType
    backgroundColor: string
    colorOverrides: ColorOverride[]
    backgroundColorOverrides: BackgroundColorOverride[]
    strikeTroughOverrides: StrikeTroughOverride[]
    lineSpacing: number
    numberedLines: boolean
    numberingColor: string
    numberOfLines: number
    width: number
    height: number
}

export interface FormattedTextCanvasAnimationSelection extends SelectionType {
    substrings?: {
        from: number
        to: number
        color?: string
        backgroundColor?: string
    }[]
}

export default class FormattedTextCanvasAnimationParams extends SimpleCanvasAnimationParams<FormattedTextJsonParamsType, FormattedTextAnimationParamsType, FormattedTextCanvasAnimationSelection> {

    protected getZeroParams(): Omit<Partial<FormattedTextAnimationParamsType>, keyof AnimationObjectParams> {
        return {
            value: [],
            backgroundColor: calculateBackgroundColor(this.getObject(), this.getAnimationStyle())
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): FormattedTextCanvasAnimation {
        return new FormattedTextCanvasAnimation(this, animationStyle)
    }

    protected convertSelectionToTransformObjectParams(selection: FormattedTextCanvasAnimationSelection): TransformObjectParams<FormattedTextAnimationParamsType>[] {
        const colorOverrides: ColorOverride[] = []
        const backgroundColorOverrides: BackgroundColorOverride[] = []
        selection.substrings?.forEach(s => {
            let color = s.color
            if (!s.backgroundColor && !s.color) {
                color = this.getAnimationStyle().selectedColor
            }
            color && colorOverrides.push({
                from: s.from,
                to: s.to,
                color
            })
            s.backgroundColor && backgroundColorOverrides.push({
                from: s.from,
                to: s.to,
                backgroundColor: s.backgroundColor
            })
        })
        return [{
            transformObject: {
                colorOverrides: colorOverrides.length > 0 ? colorOverrides : undefined,
                backgroundColorOverrides: backgroundColorOverrides.length > 0 ? backgroundColorOverrides : undefined
            },
            appearType: 'immediate',
            disappearType: 'immediateAtTheEnd'
        }]
    }

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<FormattedTextAnimationParamsType>): void {
        params.value !== undefined && objectParamsObject.setArrayParam('value', params.value)
        params.fontSize !== undefined && objectParamsObject.setNumberParam('fontSize', params.fontSize)
        params.font !== undefined && objectParamsObject.setStringLiteralParam('font', params.font)
        params.backgroundColor && objectParamsObject.setColorParam('backgroundColor', params.backgroundColor)
        params.colorOverrides && objectParamsObject.setSetParam('colorOverrides', params.colorOverrides)
        params.backgroundColorOverrides && objectParamsObject.setSetParam('backgroundColorOverrides', params.backgroundColorOverrides)
        params.strikeTroughOverrides && objectParamsObject.setSetParam('strikeTroughOverrides', params.strikeTroughOverrides)
        params.lineSpacing !== undefined && objectParamsObject.setNumberParam('lineSpacing', params.lineSpacing)
        params.numberedLines !== undefined && objectParamsObject.setBooleanParam('numberedLines', params.numberedLines)
        params.numberingColor !== undefined && objectParamsObject.setColorParam('numberingColor', params.numberingColor)
        params.numberOfLines !== undefined && objectParamsObject.setNumberParam('numberOfLines', params.numberOfLines)
        params.width !== undefined && objectParamsObject.setNumberParam('width', params.width)
        params.height !== undefined && objectParamsObject.setNumberParam('height', params.height)
    }

    protected convertJsonObjectToAnimationObject(jsonObject: FormattedTextJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): FormattedTextAnimationParamsType {
        const animationStyle = this.getAnimationStyle()
        const overrides = this.jsonSelectedSubstringToOverrides(jsonObject)
        const value = createFormattedTextValueSegmentType(jsonObject.value, this.getAnimationStyle())
        let numberOfLines = 0
        if (value.length > 0) {
            numberOfLines = value.filter(v => v === 'newline').length + 1
        }
        let highlightStyle = animationStyle.formattedTextStyle
        if (!Array.isArray(jsonObject.value)) {
            highlightStyle = jsonObject.value.formattedTextStyle ?? highlightStyle
        }
        const defaultNumberingColor = getFontColor(animationStyle, styles[highlightStyle].hljs.color)

        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            strokeColor: jsonObject.strokeColor ?? animationStyle.formattedTextStrokeColor,
            weight: jsonObject.weight ?? animationStyle.formattedTextStrokeWeight,
            value,
            fontSize: jsonObject.fontSize ?? animationStyle.fontSize,
            font: jsonObject.font === 'monospace' ? animationStyle.monospaceFont : (jsonObject.font ?? animationStyle.formattedTextFont),
            backgroundColor: calculateBackgroundColor(jsonObject, this.getAnimationStyle()),
            colorOverrides: overrides.colorOverrides ?? [],
            backgroundColorOverrides: overrides.backgroundColorOverrides ?? [],
            strikeTroughOverrides: overrides.strikeTroughOverrides ?? [],
            lineSpacing: jsonObject.lineSpacing ?? animationStyle.lineSpacing,
            numberedLines: jsonObject.numberedLines ?? false,
            numberingColor: jsonObject.numberingColor ?? defaultNumberingColor,
            numberOfLines,
            width: jsonObject.width ?? 0,
            height: jsonObject.height ?? 0
        }
    }

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): FormattedTextAnimationParamsType {
        const value: FormattedTextValueSegmentType[] = objectParamsObject.getArrayParam('value')

        return {
            ...initialDefaultParams,
            value,
            fontSize: objectParamsObject.getNumberParam('fontSize'),
            font: objectParamsObject.getStringLiteralParam<WebSafeFontsType>('font'),
            backgroundColor: objectParamsObject.getColorParam('backgroundColor'),
            colorOverrides: Array.from(objectParamsObject.getSetParam<ColorOverride>('colorOverrides').values()),
            backgroundColorOverrides: Array.from(objectParamsObject.getSetParam<BackgroundColorOverride>('backgroundColorOverrides').values()),
            strikeTroughOverrides: Array.from(objectParamsObject.getSetParam<StrikeTroughOverride>('strikeTroughOverrides').values()),
            lineSpacing: objectParamsObject.getNumberParam('lineSpacing'),
            numberedLines: objectParamsObject.getBooleanParam('numberedLines'),
            numberingColor: objectParamsObject.getColorParam('numberingColor'),
            numberOfLines: objectParamsObject.getNumberParam('numberOfLines'),
            width: objectParamsObject.getNumberParam('width'),
            height: objectParamsObject.getNumberParam('height')
        }
    }

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<FormattedTextJsonParamsType>): Partial<FormattedTextAnimationParamsType> {
        const overrides = this.jsonSelectedSubstringToOverrides(jsonObject)
        const animationStyle = this.getAnimationStyle()

        return {
            ...jsonObject,
            font: jsonObject.font === 'monospace' ? animationStyle.monospaceFont : (jsonObject.font ?? animationStyle.formattedTextFont),
            value: jsonObject.value ? createFormattedTextValueSegmentType(jsonObject.value, this.getAnimationStyle()) : undefined,
            colorOverrides: overrides.colorOverrides,
            backgroundColorOverrides: overrides.backgroundColorOverrides,
            strikeTroughOverrides: overrides.strikeTroughOverrides
        }
    }

    private jsonSelectedSubstringToOverrides(jsonObject: Partial<FormattedTextJsonParamsType>): {
        colorOverrides?: ColorOverride[]
        backgroundColorOverrides?: BackgroundColorOverride[]
        strikeTroughOverrides?: StrikeTroughOverride[]
    } {
        const colorOverrides: ColorOverride[] = []
        const backgroundColorOverrides: BackgroundColorOverride[] = []
        const strikeTroughOverrides: StrikeTroughOverride[] = []

        if (jsonObject.selectedSubstrings === undefined) {
            return {}
        }

        jsonObject.selectedSubstrings.forEach(s => {
            s.color && colorOverrides.push({
                from: s.from,
                to: s.to,
                color: s.color
            })
            s.backgroundColor && backgroundColorOverrides.push({
                from: s.from,
                to: s.to,
                backgroundColor: s.backgroundColor
            })
            s.strikethrough && strikeTroughOverrides.push({
                from: s.from,
                to: s.to,
                strikethrough: s.strikethrough
            })
        })

        return {
            colorOverrides,
            backgroundColorOverrides,
            strikeTroughOverrides
        }
    }

}
