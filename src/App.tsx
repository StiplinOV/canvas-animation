import React, { ReactElement } from 'react'
import './App.css'
import { AnimationPlayer } from './components/player/AnimationPlayer'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import {CliLegalEntryPointMethods} from "./lessons/javatest/Building Blocks/1_CliLegalEntryPointMethods";

const App = (): ReactElement => {
    const lesson = CliLegalEntryPointMethods
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
