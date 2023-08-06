import React, { ReactElement } from 'react'
import './App.css'
import { AnimationPlayer } from './components/player/AnimationPlayer'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import {ValidJavaIdentifiers} from "./lessons/javatest/Building Blocks/002 Valid java identifiers/ValidJavaIdentifiers";
import {TextBlocks} from "./lessons/javatest/Building Blocks/003 Text blocks/TextBlocks";

const App = (): ReactElement => {
    const lesson = TextBlocks
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
