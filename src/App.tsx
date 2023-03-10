import React, { ReactElement } from 'react'
import './App.css'
import { endTime } from './Animations'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import { AnimationPlayer } from './components/player/AnimationPlayer'

const App = (): ReactElement => {
    const canvasWidth = 1280
    const canvasHeight = 800
    const canvasTop = 10
    const { width } = useWindowDimensions()
    const left = (width - canvasWidth) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        canvasHeight={canvasHeight}
        canvasWidth={canvasWidth}
        endTime={endTime}
    />
}

export default App
