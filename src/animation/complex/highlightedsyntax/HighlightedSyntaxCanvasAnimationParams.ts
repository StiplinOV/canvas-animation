import {ObjectParams} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, { AnimationSelectedInfo } from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import HighlightedTextCanvasAnimationParams, {
    HighlightedTextValueSegmentType
} from '../../simple/highligtedtext/HighlightedTextCanvasAnimationParams'
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
    INI,
    init,
    Java,
    JavaScript,
    JSON,
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
    process,
    Python,
    registerLanguages,
    Rust,
    Scheme,
    SCSS,
    Shell,
    SQL,
    TeX,
    TypeScript,
    XML,
    YAML
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
import {animationStyle} from '../../../Animations'
import HighlightedSyntaxCanvasAnimationRenderer from './HighlightedSyntaxCanvasAnimationRenderer'
import React from 'react'

const languageDefs = {
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
    JSON,
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

export type HighlightedStyleName = keyof typeof styles

export interface highlightedSyntaxParamsType extends ObjectParams {
    value: string
    language: keyof typeof languageDefs
    highlightStyle?: HighlightedStyleName
    fontSize?: number
    width?: number,
    height?: number
}

export type HighlightedSyntaxSelectorType = {
    lines?: number[]
    substring?: string
}

export default class HighlightedSyntaxCanvasAnimationParams extends ComplexCanvasAnimationParams<highlightedSyntaxParamsType, HighlightedSyntaxSelectorType> {

    protected getIncludedAnimationParamsByParameter(object: highlightedSyntaxParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()

        result.set('highlightedText', new HighlightedTextCanvasAnimationParams({
            object: {
                fontSize: object.fontSize,
                origin: object.origin,
                font: 'monospace',
                value: this.createValue(object),
                rotations: object.rotations,
                backgroundColor: String(this.getStyle(object).hljs.background),
                width: object.width,
                height: object.height
            }
        }))

        return result
    }

    private createValue(object: highlightedSyntaxParamsType): HighlightedTextValueSegmentType[] {
        const {value} = object

        registerLanguages(...Object.values(languageDefs))

        const style = this.getStyle(object)
        const highlighter = init(new HighlightedSyntaxCanvasAnimationRenderer(style, animationStyle))

        return process(highlighter, value, languageDefs[object.language].name).value
    }

    private getStyle(object: highlightedSyntaxParamsType): Record<string, React.CSSProperties> {
        return styles[object.highlightStyle ?? this.getAnimationStyle().highlightTextStyle]
    }

    protected getAnimationsToBeSelectedInfo (animationsCanBeSelected: Set<string>, selectionType?: HighlightedSyntaxSelectorType): AnimationSelectedInfo[] {
        const result: AnimationSelectedInfo[] = []
        let selectionLines = selectionType?.lines ?? []

        if (selectionLines.length !== 0) {

        }
        return super.getAnimationsToBeSelectedInfo(animationsCanBeSelected, selectionType)
    }

}
