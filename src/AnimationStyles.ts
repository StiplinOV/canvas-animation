export default interface AnimationStyle {
    backgroundColor: string
    fillColor: string
    fontColor: string
    selectedColor: string
    strokeColor: string
    fontSize: number
}
const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    fillColor: '#FFFFFF',
    fontColor: '#000000',
    selectedColor: '#FF0000',
    strokeColor: '#000000',
    fontSize: 12
}
const createAnimationStyles = (): Record<string, Partial<AnimationStyle>> => ({
    default: defaultAnimationStyle,
    custom: {
        backgroundColor: '#000000',
        fillColor: '#3c4396',
        fontColor: '#ffffff',
        strokeColor: '#ffffff'
    }
})
export const getAnimationStyle = (key: keyof typeof animationStyles): AnimationStyle => {
    const animationStyles = createAnimationStyles()
    return {
        ...defaultAnimationStyle,
        ...animationStyles[key]
    }
}
