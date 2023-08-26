import {THE_STYLE} from 'p5'
import {AppearAlgorithm} from './animation/CanvasAnimationParams'
import {FormattedTextStyleName} from './animation/simple/formattedtext/FormattedTextCanvasAnimationParams'

export const COURIER_NEW_FONT = 'Courier New'
export type ColorType = string | 'primary' | 'secondary' | 'background' | 'link'

export type WebSafeFontsType =
    'Arial'
    | 'Verdana'
    | 'Tahoma'
    | 'Trebuchet MS'
    | 'Times New Roman'
    | 'Georgia'
    | 'Garamond'
    | typeof COURIER_NEW_FONT
    | 'Brush Script MT'

export type SupportedFormattedLanguages =
    '1c'
    | 'abnf'
    | 'accesslog'
    | 'actionscript'
    | 'ada'
    | 'angelscript'
    | 'apache'
    | 'applescript'
    | 'arcade'
    | 'arduino'
    | 'armasm'
    | 'xml'
    | 'asciidoc'
    | 'aspectj'
    | 'autohotkey'
    | 'autoit'
    | 'avrasm'
    | 'awk'
    | 'axapta'
    | 'bash'
    | 'basic'
    | 'bnf'
    | 'brainfuck'
    | 'c'
    | 'cal'
    | 'capnproto'
    | 'ceylon'
    | 'clean'
    | 'clojure'
    | 'clojure-repl'
    | 'cmake'
    | 'coffeescript'
    | 'coq'
    | 'cos'
    | 'cpp'
    | 'crmsh'
    | 'crystal'
    | 'csharp'
    | 'csp'
    | 'css'
    | 'd'
    | 'markdown'
    | 'dart'
    | 'delphi'
    | 'diff'
    | 'django'
    | 'dns'
    | 'dockerfile'
    | 'dos'
    | 'dsconfig'
    | 'dts'
    | 'dust'
    | 'ebnf'
    | 'elixir'
    | 'elm'
    | 'ruby'
    | 'erb'
    | 'erlang-repl'
    | 'erlang'
    | 'excel'
    | 'fix'
    | 'flix'
    | 'fortran'
    | 'fsharp'
    | 'gams'
    | 'gauss'
    | 'gcode'
    | 'gherkin'
    | 'glsl'
    | 'gml'
    | 'go'
    | 'golo'
    | 'gradle'
    | 'graphql'
    | 'groovy'
    | 'haml'
    | 'handlebars'
    | 'haskell'
    | 'haxe'
    | 'hsp'
    | 'http'
    | 'hy'
    | 'inform7'
    | 'ini'
    | 'irpf90'
    | 'isbl'
    | 'java'
    | 'javascript'
    | 'jboss-cli'
    | 'json'
    | 'julia'
    | 'julia-repl'
    | 'kotlin'
    | 'lasso'
    | 'latex'
    | 'ldif'
    | 'leaf'
    | 'less'
    | 'lisp'
    | 'livecodeserver'
    | 'livescript'
    | 'llvm'
    | 'lsl'
    | 'lua'
    | 'makefile'
    | 'mathematica'
    | 'matlab'
    | 'maxima'
    | 'mel'
    | 'mercury'
    | 'mipsasm'
    | 'mizar'
    | 'perl'
    | 'mojolicious'
    | 'monkey'
    | 'moonscript'
    | 'n1ql'
    | 'nestedtext'
    | 'nginx'
    | 'nim'
    | 'nix'
    | 'node-repl'
    | 'nsis'
    | 'objectivec'
    | 'ocaml'
    | 'openscad'
    | 'oxygene'
    | 'parser3'
    | 'pf'
    | 'pgsql'
    | 'php'
    | 'php-template'
    | 'plaintext'
    | 'pony'
    | 'powershell'
    | 'processing'
    | 'profile'
    | 'prolog'
    | 'properties'
    | 'protobuf'
    | 'puppet'
    | 'purebasic'
    | 'python'
    | 'python-repl'
    | 'q'
    | 'qml'
    | 'r'
    | 'reasonml'
    | 'rib'
    | 'roboconf'
    | 'routeros'
    | 'rsl'
    | 'ruleslanguage'
    | 'rust'
    | 'sas'
    | 'scala'
    | 'scheme'
    | 'scilab'
    | 'scss'
    | 'shell'
    | 'smali'
    | 'smalltalk'
    | 'sml'
    | 'sqf'
    | 'sql'
    | 'stan'
    | 'stata'
    | 'step21'
    | 'stylus'
    | 'subunit'
    | 'swift'
    | 'taggerscript'
    | 'yaml'
    | 'tap'
    | 'tcl'
    | 'thrift'
    | 'tp'
    | 'twig'
    | 'typescript'
    | 'vala'
    | 'vbnet'
    | 'vbscript'
    | 'vbscript-html'
    | 'verilog'
    | 'vhdl'
    | 'vim'
    | 'wasm'
    | 'wren'
    | 'x86asm'
    | 'xl'
    | 'xquery'
    | 'zephir'

export default interface AnimationStyle {
    backgroundColor: string
    textLinkColor: string
    fontColor: string
    fillColor: string
    strokeColor: string
    primaryColor: string
    secondaryColor: string
    selectedColor: string
    codeSpecBackgroundColor: string
    codeSpecExampleBackgroundColor: string
    backgroundSelectedColor: string
    formattedTextStrokeWeight: number
    formattedTextStrokeColor: string
    font: WebSafeFontsType
    formattedTextFont: WebSafeFontsType
    fontSize: number
    titleFontSize: number
    fontWeight: number
    monospaceFont: typeof COURIER_NEW_FONT
    formattedTextStyle: FormattedTextStyleName
    vertexFontSize: number
    vertexDiameter: number
    edgeFontSize: number
    strokeWeight: number
    strokeBoldWeight: number
    cornerRadius: number
    objectRotation: number
    textStyle: THE_STYLE
    zIndex: number
    appearAlgorithm: AppearAlgorithm
    lineSpacing: number
}

const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    codeSpecBackgroundColor: '#D3D3D3',
    codeSpecExampleBackgroundColor: '#FFFFE0',
    textLinkColor: '#0000FF',
    fontColor: '#000000',
    fillColor: '#FFFFFF',
    strokeColor: '#000000',
    primaryColor: '#637899',
    secondaryColor: '#ff0000',
    selectedColor: '#FF0000',
    backgroundSelectedColor: '#FFFF00',
    formattedTextStrokeColor: '#485460',
    formattedTextStrokeWeight: 5,
    font: 'Verdana',
    formattedTextFont: 'Arial',
    fontSize: 14,
    titleFontSize: 40,
    fontWeight: 0.5,
    monospaceFont: COURIER_NEW_FONT,
    formattedTextStyle: 'qtcreatorDark',
    strokeWeight: 1,
    strokeBoldWeight: 3,
    cornerRadius: 0,
    objectRotation: 0,
    textStyle: 'normal',
    vertexDiameter: 60,
    vertexFontSize: 30,
    edgeFontSize: 20,
    zIndex: 0,
    appearAlgorithm: {
        func: 'linear',
        params: []
    },
    lineSpacing: 1.2
}
const createAnimationStyles = (): Record<string, Partial<AnimationStyle>> => ({
    default: defaultAnimationStyle,
    custom: {
        backgroundColor: '#132226',
        fontColor: '#A4978E',
        selectedColor: '#ff4000',
        primaryColor: '#BE9063'
    }
})
export const getAnimationStyle = (key: keyof typeof animationStyles): AnimationStyle => {
    const animationStyles = createAnimationStyles()
    return {
        ...defaultAnimationStyle,
        ...animationStyles[key]
    }
}

export const getStrokeColor = (animationStyle: AnimationStyle, color?: ColorType): string => {
    if (color === 'primary') {
        return animationStyle.primaryColor
    }
    if (color === 'secondary') {
        return animationStyle.secondaryColor
    }
    if (color === 'background') {
        return animationStyle.backgroundColor
    }
    return color ?? animationStyle.strokeColor
}

export const getFillColor = (animationStyle: AnimationStyle, color?: ColorType): string => {
    if (color === 'primary') {
        return animationStyle.primaryColor
    }
    if (color === 'secondary') {
        return animationStyle.secondaryColor
    }
    if (color === 'background') {
        return animationStyle.backgroundColor
    }
    return color ?? animationStyle.fillColor
}

export const getFontColor = (animationStyle: AnimationStyle, color?: ColorType): string => {
    if (color === 'primary') {
        return animationStyle.primaryColor
    }
    if (color === 'secondary') {
        return animationStyle.secondaryColor
    }
    if (color === 'background') {
        return animationStyle.backgroundColor
    }
    if (color === 'link') {
        return animationStyle.textLinkColor
    }
    return color ?? animationStyle.fontColor
}

export const getFont = (animationStyle: AnimationStyle, font?: WebSafeFontsType | 'monospace'): string => {
    if (font === 'monospace') {
        return animationStyle.monospaceFont
    }
    return font ?? animationStyle.font
}
