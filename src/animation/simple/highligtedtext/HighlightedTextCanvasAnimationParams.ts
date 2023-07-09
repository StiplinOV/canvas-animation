import {calculateArrayPercentValue, calculateColorPercentValue, calculatePercentValue} from '../../../common/Utils'
import { ObjectParams, SelectionType } from '../../CanvasAnimationParams'
import SimpleCanvasAnimationParams from '../SimpleCanvasAnimationParams'
import AnimationStyle, { ColorType, WebSafeFontsType } from '../../../AnimationStyles'
import HighlightedTextCanvasAnimation from './HighlightedTextCanvasAnimation'
import {THE_STYLE} from 'p5'
import {
    AccessLog,
    Bash,
    CMake,
    CoffeeScript,
    CPlusPlus,
    CSS,
    D,
    Diff,
    Dockerfile,
    GCode,
    GLSL,
    Haskell,
    Haxe,
    HTTP,
    INI, init,
    Java,
    JavaScript,
    JSON as JSONDef,
    Less,
    Lisp,
    LLVM,
    Lua,
    Makefile,
    Markdown,
    Matlab,
    Maxima,
    Nginx,
    Nix, OpenSCAD, PHP, process, Python, registerLanguages, Rust, Scheme, SCSS, Shell, SQL, TeX, TypeScript, XML, YAML
} from 'highlight-ts'
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
    sunburst, tomorrow, tomorrowNight,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties, vs, vs2015, xcode, xt256, zenburn
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import HighlightedTextCanvasAnimationRenderer from './HighlightedTextCanvasAnimationRenderer'
import React from 'react'

export const languageDefs = {
    AccessLog,
    Bash,
    CMake,
    CoffeeScript,
    CPlusPlus,
    CSS,
    D,
    Diff,
    Dockerfile,
    GCode,
    GLSL,
    Haskell,
    Haxe,
    HTTP,
    INI,
    Java,
    JavaScript,
    JSONDef,
    Less,
    Lisp,
    LLVM,
    Lua,
    Makefile,
    Markdown,
    Matlab,
    Maxima,
    Nginx,
    Nix,
    OpenSCAD,
    PHP,
    Python,
    Rust,
    Scheme,
    SCSS,
    Shell,
    SQL,
    TeX,
    XML,
    YAML,
    TypeScript
}

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

export const getStyle = (animationStyle: AnimationStyle, styleName?: HighlightedStyleName): Record<string, React.CSSProperties> => {
    return styles[styleName ?? animationStyle.highlightTextStyle]
}

export const createHighlightedTextValueSegmentType = (object: HighlightedTextValueType, animationStyle: AnimationStyle): HighlightedTextValueSegmentType[] => {
    if (Array.isArray(object)) {
        return object
    }
    const {text} = object

    registerLanguages(...Object.values(languageDefs))
    const style = getStyle(animationStyle, object.highlightStyle)
    const highlighter = init(new HighlightedTextCanvasAnimationRenderer(style, animationStyle))

    return process(highlighter, text, languageDefs[object.language].name).value
}

export const calculateBackgroundColor = (params: HighlightedTextParamsType, animationStyle: AnimationStyle): string => {
    if (Array.isArray(params.value)) {
        return params.backgroundColor ?? animationStyle.backgroundColor
    }
    if (params.value.highlightStyle) {
        return String(styles[params.value.highlightStyle].hljs.background)
    }
    return params.backgroundColor ?? animationStyle.backgroundColor
}

export type HighlightedStyleName = keyof typeof styles

export type HighlightedTextValueSegmentType = {
    value: string
    textStyle: THE_STYLE
    textWeight?: number
    textColor?: ColorType
    backgroundTextColor?: string
} | 'newline'

export type HighlightedSyntaxValueType = {
    text: string
    language: keyof typeof languageDefs
    highlightStyle?: HighlightedStyleName
}

export type HighlightedTextValueType = HighlightedSyntaxValueType | HighlightedTextValueSegmentType[]

interface OnlyHighlightedTextParamsType {
    value: HighlightedTextValueType
    fontSize?: number
    font?: WebSafeFontsType | 'monospace'
    backgroundColor?: string
    selectedSubstrings?: {
        from: number,
        to: number,
    }[]
    width?: number
    height?: number
}

export interface HighlightedTextParamsType extends ObjectParams, OnlyHighlightedTextParamsType {
}

export interface HighlightedTextCanvasAnimationSelection extends SelectionType {
    substrings?: {
        from: number,
        to: number
    }[]
}

export default class HighlightedTextCanvasAnimationParams extends SimpleCanvasAnimationParams<HighlightedTextParamsType, HighlightedTextCanvasAnimationSelection> {

    protected getZeroParams(): Omit<HighlightedTextParamsType, keyof ObjectParams> {
        return {
            value: [],
            backgroundColor: calculateBackgroundColor(this.getObject(), this.getAnimationStyle())
        }
    }

    mergeWithTransformation(
        obj: HighlightedTextParamsType,
        trans: Partial<HighlightedTextParamsType>,
        perc: number,
        style: AnimationStyle
    ): OnlyHighlightedTextParamsType {
        let {fontSize, width, height} = obj
        fontSize ??= style.fontSize
        width ??= 0
        height ??= 0
        const value = createHighlightedTextValueSegmentType(obj.value, this.getAnimationStyle())
        const transValue = createHighlightedTextValueSegmentType(trans.value || [], this.getAnimationStyle())
        const backgroundColor = calculateBackgroundColor(obj, style)
        let transBackgroundColor = trans.backgroundColor
        if (!transBackgroundColor && !Array.isArray(trans.value) && trans.value?.highlightStyle){
            transBackgroundColor = String(styles[trans.value?.highlightStyle].hljs.background)
        }
        return {
            backgroundColor: transBackgroundColor ? calculateColorPercentValue(backgroundColor, transBackgroundColor, perc): backgroundColor,
            value: trans.value ? this.calculateValuePercentValue(value, transValue, perc) : obj.value,
            fontSize: trans.fontSize ? calculatePercentValue(fontSize, trans.fontSize, perc) : fontSize,
            font: (trans.font && perc >= 0.5) ? trans.font : obj.font,
            width: trans.width != undefined? calculatePercentValue(width, trans.width, perc) : width,
            height: trans.height != undefined? calculatePercentValue(height, trans.height, perc) : height,
            selectedSubstrings: (trans.selectedSubstrings ? calculateArrayPercentValue(
                obj.selectedSubstrings ?? [],
                trans.selectedSubstrings,
                perc
            ) : obj.selectedSubstrings)
        }
    }

    protected toCanvasAnimation(animationStyle: AnimationStyle): HighlightedTextCanvasAnimation {
        return new HighlightedTextCanvasAnimation(this, animationStyle)
    }

    private calculateValuePercentValue(
        fromParam: HighlightedTextValueSegmentType[],
        toParam: HighlightedTextValueSegmentType[],
        percent: number
    ): HighlightedTextValueSegmentType[] {
        const from = fromParam.flatMap(f => this.splitTextValueSegmentType(f))
        const to = toParam.flatMap(f => this.splitTextValueSegmentType(f))

        return calculateArrayPercentValue(from, to, percent)
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

    protected convertSelectionToTransformObject (selection: HighlightedTextCanvasAnimationSelection): Partial<HighlightedTextParamsType> {
        return {
            selectedSubstrings: selection.substrings
        }
    }

}
