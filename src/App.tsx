import React, { ReactElement } from 'react'
import './App.css'
import { AnimationPlayer } from './components/player/AnimationPlayer'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import {CliLegalEntryPointMethods} from "./lessons/javatest/Building Blocks/1_CliLegalEntryPointMethods";
import {calculateArrayPercentValue} from "./common/Utils";
import {ObjectParamsObject} from "./animation/ObjectParamsObject";

const App = (): ReactElement => {
    const lesson = CliLegalEntryPointMethods
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    const op = new ObjectParamsObject()

    enum a {
        Lol,
        kek,
        cheburek
    }

    console.log(typeof a.Lol)

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
