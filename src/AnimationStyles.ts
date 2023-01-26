export default interface AnimationStyle {
    backgroundColor: string
    fillColor: string
    fontColor: string
    selectedColor: string
    strokeColor: string
}
const defaultAnimationStyle: AnimationStyle = {
    backgroundColor: '#FFFFFF',
    fillColor: '#FFFFFF',
    fontColor: '#000000',
    selectedColor: '#FF0000',
    strokeColor: '#000000'
}
const animationStyles = {
    defaut: defaultAnimationStyle,
    custom: {
        backgroundColor: '#000000',
        fillColor: '#3c4396',
        fontColor: '#ffffff',
        strokeColor: '#ffffff'
    }
}
export const getAnimationStyle = (key: keyof typeof animationStyles): AnimationStyle => ({
    ...defaultAnimationStyle,
    ...animationStyles[key]
})
