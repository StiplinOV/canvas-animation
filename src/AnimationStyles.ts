import {THE_STYLE} from 'p5'
import {HighlightedStyleName} from './animation/complex/highlightedsyntax/HighlightedSyntaxCanvasAnimationParams'

export const COURIER_NEW_FONT = 'Courier New'
export type ColorType = string | 'primary' | 'secondary'

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
    font: WebSafeFontsType
    fontSize: number
    fontWeight: number
    monospaceFont: string
    highlightTextStyle: HighlightedStyleName
    strokeWeight: number
    strokeBoldWeight: number
    cornerRadius: number
    objectRotation: number
    textStyle: THE_STYLE
    zIndex: number
}

const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
    fillColor: '#FFFFFF',
    strokeColor: '#000000',
    primaryColor: '#637899',
    secondaryColor: '#ff4d00',
    selectedColor: '#FF0000',
    font: 'Verdana',
    fontSize: 12,
    fontWeight: 0.5,
    monospaceFont: COURIER_NEW_FONT,
    highlightTextStyle: 'darcula',
    strokeWeight: 1,
    strokeBoldWeight: 3,
    cornerRadius: 0,
    objectRotation: 0,
    textStyle: 'normal',
    zIndex: 0
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
    return color ?? animationStyle.strokeColor
}

export const getFillColor = (animationStyle: AnimationStyle, color?: ColorType): string => {
    if (color === 'primary') {
        return animationStyle.primaryColor
    }
    if (color === 'secondary') {
        return animationStyle.secondaryColor
    }
    return color ?? animationStyle.fillColor
}
