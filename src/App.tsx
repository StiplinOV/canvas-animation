import React, { ReactElement } from 'react'
import './App.css'
import { canvasHeight, canvasWidth, endTime } from './Animations'
import { useWindowDimensions } from './hook/UseWindowDimensions'
import { Button } from '@mui/material'
import { AnimationPlayer } from './components/player/AnimationPlayer'

const chunks: Blob[] = []
let recorder: MediaRecorder | null = null

const App = (): ReactElement => {

    const canvasTop = 10
    const { width } = useWindowDimensions()
    const left = (width - canvasWidth) / 2

    return (
        <>
            <div className="App">
                <AnimationPlayer
                    top={canvasTop}
                    left={left}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                    endTime={endTime}
                />
                <Button
                    type="button"
                    style={{
                        position: 'absolute',
                        top: 900
                    }}
                    onClick={() => {
                        if (recorder) {
                            recorder.stop()
                        } else {
                            const stream = document.querySelector('canvas')?.captureStream(30)
                            if (!stream) {
                                return
                            }
                            recorder = new MediaRecorder(stream)
                            recorder.ondataavailable = e => {
                                if (e.data.size) {
                                    chunks.push(e.data)
                                }
                            }
                            recorder.onstop = exportVideo
                            recorder.start()
                        }
                    }}
                >Export Video
                </Button>
            </div>
        </>
    )
}

function exportVideo (e: Event): void {
    const blob = new Blob(chunks)
    const vid = document.createElement('video')
    vid.id = 'recorded'
    vid.controls = true
    vid.src = URL.createObjectURL(blob)
    vid.style.top = '10000'
    document.body.appendChild(vid)
    vid.play()
}

export default App
