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
    SupportedHighlightedLanguages,
    WebSafeFontsType
} from '../../../AnimationStyles'
import HighlightedTextCanvasAnimation from './HighlightedTextCanvasAnimation'
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

export const createHighlightedTextValueSegmentType = (object: HighlightedTextValueType, animationStyle: AnimationStyle): HighlightedTextValueSegmentType[] => {
    type NodeType = string | {
        children: NodeType[]
        scope: string
    }
    type TextWithScope = {
        text: string
        scope: string
    }

    if (Array.isArray(object)) {
        return object
    }
    const {text} = object
    const style = styles[object.highlightStyle ?? animationStyle.highlightTextStyle]
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
        return texts.map((t): HighlightedTextValueSegmentType => {
            if (t === '\n') {
                return 'newline'
            }
            return {
                value: t,
                textColor: properties.color,
                textStyle: cssPropToFontStyle(properties),
                textWeight: cssPropToTextWeight(properties.fontWeight),
                backgroundTextColor: properties.backgroundColor
            }
        })
    })
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

export const calculateBackgroundColor = (params: HighlightedTextJsonParamsType, animationStyle: AnimationStyle): string => {
    if (Array.isArray(params.value)) {
        return params.backgroundColor ?? animationStyle.backgroundColor
    }
    if (params.value.highlightStyle) {
        return String(styles[params.value.highlightStyle].hljs.background)
    }
    if (params.backgroundColor) {
        return params.backgroundColor
    }
    return String(styles[animationStyle.highlightTextStyle].hljs.background)
}

export type HighlightedStyleName = keyof typeof styles

export type HighlightedTextValueSegmentType = {
    value: string
    textStyle?: THE_STYLE
    textWeight?: number
    textColor?: ColorType
    backgroundTextColor?: string
    strikethrough?: boolean
    underlined?: boolean
    type?: 'paragraphTitle' | 'link'
} | 'newline'

export type HighlightedSyntaxValueType = {
    text: string
    language?: SupportedHighlightedLanguages
    highlightStyle?: HighlightedStyleName
}

export type HighlightedTextValueType = HighlightedSyntaxValueType | HighlightedTextValueSegmentType[]

export interface HighlightedTextJsonParamsType extends JsonObjectParams {
    value: HighlightedTextValueType
    fontSize?: number
    font?: WebSafeFontsType | 'monospace'
    backgroundColor?: string
    selectedSubstrings?: {
        from: number
        to: number
        color?: string
        backgroundColor?: string
        strikethrough?: boolean
    }[]
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

export interface HighlightedTextAnimationParamsType extends AnimationObjectParams {
    value: HighlightedTextValueSegmentType[]
    fontSize: number
    font: WebSafeFontsType | 'monospace'
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

export interface HighlightedTextCanvasAnimationSelection extends SelectionType {
    substrings?: {
        from: number
        to: number
        color?: string
        backgroundColor?: string
    }[]
}

export default class HighlightedTextCanvasAnimationParams extends SimpleCanvasAnimationParams<HighlightedTextJsonParamsType, HighlightedTextAnimationParamsType, HighlightedTextCanvasAnimationSelection> {

    protected getZeroParams(): Omit<Partial<HighlightedTextAnimationParamsType>, keyof AnimationObjectParams> {
        return {
            value: [],
            backgroundColor: calculateBackgroundColor(this.getObject(), this.getAnimationStyle())
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): HighlightedTextCanvasAnimation {
        return new HighlightedTextCanvasAnimation(this, animationStyle)
    }

    private splitTextValueSegmentType(param: HighlightedTextValueSegmentType): HighlightedTextValueSegmentType[] {
        const result: HighlightedTextValueSegmentType[] = []
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

    protected convertSelectionToTransformObjectParams(selection: HighlightedTextCanvasAnimationSelection): TransformObjectParams<HighlightedTextAnimationParamsType>[] {
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

    protected appendParamsToObjectParamsObject(objectParamsObject: ObjectParamsObject, params: Partial<HighlightedTextAnimationParamsType>): void {
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

    protected convertJsonObjectToAnimationObject(jsonObject: HighlightedTextJsonParamsType, animationObjectDefaultParams: AnimationObjectParams): HighlightedTextAnimationParamsType {
        const animationStyle = this.getAnimationStyle()
        const overrides = this.jsonSelectedSubstringToOverrides(jsonObject)
        const value = createHighlightedTextValueSegmentType(jsonObject.value, this.getAnimationStyle()).flatMap(f => this.splitTextValueSegmentType(f))
        let numberOfLines = 0
        if (value.length > 0) {
            numberOfLines = value.filter(v => v === 'newline').length + 1
        }
        let highlightStyle = animationStyle.highlightTextStyle
        if (!Array.isArray(jsonObject.value)) {
            highlightStyle = jsonObject.value.highlightStyle ?? highlightStyle
        }
        const defaultNumberingColor = getFontColor(animationStyle, styles[highlightStyle].hljs.color)

        return {
            ...animationObjectDefaultParams,
            ...jsonObject,
            strokeColor: jsonObject.strokeColor ?? animationStyle.highlightedTextStrokeColor,
            weight: jsonObject.weight ?? animationStyle.highlightedTextStrokeWeight,
            value,
            fontSize: jsonObject.fontSize ?? animationStyle.fontSize,
            font: jsonObject.font ?? animationStyle.monospaceFont,
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

    protected convertObjectParamsObjectToAnimationParams(objectParamsObject: ObjectParamsObject, initialDefaultParams: AnimationObjectParams): HighlightedTextAnimationParamsType {
        const value: HighlightedTextValueSegmentType[] = objectParamsObject.getArrayParam('value')

        return {
            ...initialDefaultParams,
            value,
            fontSize: objectParamsObject.getNumberParam('fontSize'),
            font: objectParamsObject.getStringLiteralParam<WebSafeFontsType | 'monospace'>('font'),
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

    protected convertTransformJsonObjectToTransformAnimationObject(jsonObject: Partial<HighlightedTextJsonParamsType>): Partial<HighlightedTextAnimationParamsType> {
        const overrides = this.jsonSelectedSubstringToOverrides(jsonObject)
        return {
            ...jsonObject,
            value: jsonObject.value ? createHighlightedTextValueSegmentType(jsonObject.value, this.getAnimationStyle()).flatMap(f => this.splitTextValueSegmentType(f)) : undefined,
            colorOverrides: overrides.colorOverrides,
            backgroundColorOverrides: overrides.backgroundColorOverrides,
            strikeTroughOverrides: overrides.strikeTroughOverrides
        }
    }

    private jsonSelectedSubstringToOverrides(jsonObject: Partial<HighlightedTextJsonParamsType>): {
        colorOverrides?: ColorOverride[]
        backgroundColorOverrides?: BackgroundColorOverride[]
        strikeTroughOverrides?: StrikeTroughOverride[]
    } {
        const colorOverrides: ColorOverride[] = []
        const backgroundColorOverrides: BackgroundColorOverride[] = []
        const strikeTroughOverrides: StrikeTroughOverride[] = []

        jsonObject.selectedSubstrings?.forEach(s => {
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
            colorOverrides: colorOverrides.length > 0 ? colorOverrides : undefined,
            backgroundColorOverrides: backgroundColorOverrides.length > 0 ? backgroundColorOverrides : undefined,
            strikeTroughOverrides: strikeTroughOverrides.length > 0 ? strikeTroughOverrides : undefined
        }
    }

}
