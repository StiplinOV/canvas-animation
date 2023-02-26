import {ObjectParams, Params} from '../../CanvasAnimationParams'
import ComplexCanvasAnimationParams, {
    ComplexCanvasAnimationSelection,
    TransformOptions
} from '../ComplexCanvasAnimationParams'
import SimpleCanvasAnimationParams from '../../simple/SimpleCanvasAnimationParams'
import HighlightedTextCanvasAnimationParams, {
    highlightedTextValueSegmentType
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
import p5Types from 'p5'
import AnimationStyle from '../../../AnimationStyles'
import {animationStyle} from '../../../Animations'
import HighlightedSyntaxCanvasAnimationRenderer from './HighlightedSyntaxCanvasAnimationRenderer'

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

interface highlightedSyntaxParamsType extends ObjectParams {
    value: string
    language: keyof typeof languageDefs
    highlightStyle?: HighlightedStyleName
    fontSize?: number
}

export default class HighlightedSyntaxCanvasAnimationParams extends ComplexCanvasAnimationParams<highlightedSyntaxParamsType> {

    private readonly animationStyle: AnimationStyle

    constructor(params: Params<highlightedSyntaxParamsType, TransformOptions, ComplexCanvasAnimationSelection>, p5: p5Types, animationStyle: AnimationStyle) {
        super(params, p5)
        this.animationStyle = animationStyle
    }

    protected getIncludedAnimationParamsByParameter(object: highlightedSyntaxParamsType): Map<string, SimpleCanvasAnimationParams> {
        const result = new Map<string, SimpleCanvasAnimationParams>()

        result.set('highlightedText', new HighlightedTextCanvasAnimationParams({
            object: {
                fontSize: object.fontSize,
                origin: object.origin,
                font: 'monospace',
                value: this.createValue(object),
                rotations: object.rotations,
                backgroundColor: String(this.getStyle(object).hljs.background)
            }
        }))

        return result
    }

    private createValue(object: highlightedSyntaxParamsType): highlightedTextValueSegmentType[] {
        const {value} = object

        registerLanguages(...Object.values(languageDefs))

        const style = this.getStyle(object)
        const highlighter = init(new HighlightedSyntaxCanvasAnimationRenderer(style, animationStyle))

        return process(highlighter, value, languageDefs[object.language].name).value
    }

    private getStyle(object: highlightedSyntaxParamsType): Record<string, React.CSSProperties> {
        return styles[object.highlightStyle ?? this.animationStyle.highlightTextStyle]
    }

}