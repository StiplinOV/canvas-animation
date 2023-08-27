import React, {ReactElement} from 'react'
import './App.css'
import {AnimationPlayer} from './components/player/AnimationPlayer'
import {useWindowDimensions} from './hook/UseWindowDimensions'
import {
    InitialValuesOfVariable
} from './lessons/javatest/Building Blocks/005 Initial Values of Variables/InitialValuesOfVariable';

const App = (): ReactElement => {
    const lesson = InitialValuesOfVariable
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
