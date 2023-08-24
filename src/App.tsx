import React, {ReactElement} from 'react'
import './App.css'
import {AnimationPlayer} from './components/player/AnimationPlayer'
import {useWindowDimensions} from './hook/UseWindowDimensions'
import {VarCompileInAMethod} from "./lessons/javatest/Building Blocks/004 Var compile in a method/VarCompileInAMethod";

const App = (): ReactElement => {
    const lesson = VarCompileInAMethod
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
