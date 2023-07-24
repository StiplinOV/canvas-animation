import {THE_STYLE} from 'p5'
import { SelectionAlgorithm } from './animation/CanvasAnimationParams'
import { HighlightedStyleName } from './animation/simple/highligtedtext/HighlightedTextCanvasAnimationParams'

export const COURIER_NEW_FONT = 'Courier New'
export type ColorType = string | 'primary' | 'secondary' | 'background'

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

export default interface AnimationStyle {
    backgroundColor: string
    fontColor: string
    fillColor: string
    strokeColor: string
    primaryColor: string
    secondaryColor: string
    selectedColor: string
    backgroundSelectedColor: string
    font: WebSafeFontsType
    fontSize: number
    titleFontSize: number
    fontWeight: number
    monospaceFont: typeof COURIER_NEW_FONT
    highlightTextStyle: HighlightedStyleName
    vertexFontSize: number
    vertexDiameter: number
    edgeFontSize: number
    strokeWeight: number
    strokeBoldWeight: number
    cornerRadius: number
    objectRotation: number
    textStyle: THE_STYLE
    zIndex: number
    selectionAlgorithm: SelectionAlgorithm
    lineSpacing: number
}

const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
    fillColor: '#FFFFFF',
    strokeColor: '#000000',
    primaryColor: '#637899',
    secondaryColor: '#ff4d00',
    selectedColor: '#FF0000',
    backgroundSelectedColor: '#FFFF00',
    font: 'Verdana',
    fontSize: 14,
    titleFontSize: 40,
    fontWeight: 0.5,
    monospaceFont: COURIER_NEW_FONT,
    highlightTextStyle: 'defaultStyle',
    strokeWeight: 1,
    strokeBoldWeight: 3,
    cornerRadius: 0,
    objectRotation: 0,
    textStyle: 'normal',
    vertexDiameter: 60,
    vertexFontSize: 30,
    edgeFontSize: 20,
    zIndex: 0,
    selectionAlgorithm: {
        func: 'fadeinFadeOut',
        params: [150]
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
    return color ?? animationStyle.fontColor
}
