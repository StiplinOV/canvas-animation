import React, { ReactElement } from 'react'
import './App.css'
import { AnimationPlayer } from './components/player/AnimationPlayer'
import { BestTimeToBuyAndSellStock } from './lessons/BestTimeToBuyAndSellStock'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import { Demo } from './lessons/Demo'

const App = (): ReactElement => {
    const lesson = BestTimeToBuyAndSellStock
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App
