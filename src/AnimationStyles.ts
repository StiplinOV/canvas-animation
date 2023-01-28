export default interface AnimationStyle {
    backgroundColor: string
    fillColor: string
    fontColor: string
    selectedColor: string
    strokeColor: string
    font: string
    fontSize: number
    fontWeight: number
    strokeWeight: number
    cornerRadius: number
    objectRotation: number
}
const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    fillColor: '#FFFFFF',
    fontColor: '#000000',
    selectedColor: '#FF0000',
    strokeColor: '#000000',
    font: 'Verdana',
    fontSize: 12,
    fontWeight: 0.5,
    strokeWeight: 1,
    cornerRadius: 0,
    objectRotation: 0
}
const createAnimationStyles = (): Record<string, Partial<AnimationStyle>> => ({
    default: defaultAnimationStyle,
    custom: {
        backgroundColor: '#132226',
        fillColor: '#525B56',
        fontColor: '#A4978E',
        selectedColor: '#ff4000',
        strokeColor: '#BE9063'
    }
})
export const getAnimationStyle = (key: keyof typeof animationStyles): AnimationStyle => {
    const animationStyles = createAnimationStyles()
    return {
        ...defaultAnimationStyle,
        ...animationStyles[key]
    }
}
