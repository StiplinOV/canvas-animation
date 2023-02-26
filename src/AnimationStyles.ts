import {THE_STYLE} from 'p5'
import {HighlightedStyleName} from './animation/complex/highlightedsyntax/HighlightedSyntaxCanvasAnimationParams'

export const COURIER_NEW_FONT = 'Courier New'

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
    fillColor: string
    fontColor: string
    selectedColor: string
    strokePrimaryColor: string
    strokeSecondaryColor: string
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
    fillColor: '#FFFFFF',
    fontColor: '#000000',
    selectedColor: '#FF0000',
    strokePrimaryColor: '#000000',
    strokeSecondaryColor: '#FF0000',
    font: 'Verdana',
    fontSize: 12,
    fontWeight: 0.5,
    monospaceFont: COURIER_NEW_FONT,
    highlightTextStyle: 'darcula',
    strokeWeight: 1,
    strokeBoldWeight: 4,
    cornerRadius: 0,
    objectRotation: 0,
    textStyle: 'normal',
    zIndex: 0
}
const createAnimationStyles = (): Record<string, Partial<AnimationStyle>> => ({
    default: defaultAnimationStyle,
    custom: {
        backgroundColor: '#132226',
        fillColor: '#132226',
        fontColor: '#A4978E',
        selectedColor: '#ff4000',
        strokePrimaryColor: '#BE9063'
        // 132226
    }
})
export const getAnimationStyle = (key: keyof typeof animationStyles): AnimationStyle => {
    const animationStyles = createAnimationStyles()
    return {
        ...defaultAnimationStyle,
        ...animationStyles[key]
    }
}
