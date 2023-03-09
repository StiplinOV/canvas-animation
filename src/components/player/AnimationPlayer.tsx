import { P5Component } from '../../P5Component'
import { PlayerControlPanel } from './PlayerControlPanel'
import React from 'react'
import { canvasHeight } from '../../Animations'

// export type Mode = 'play' | 'export'

interface Props {
    top: number
    left: number
    canvasWidth: number
    canvasHeight: number
    endTime: number
}

export const AnimationPlayer = (props: Props): JSX.Element => {
    const sliderTop = canvasHeight + props.top + 30
    const [volumeSliderValue, setVolumeSliderValue] = React.useState<number>(0)
    const [inTimeChanging, setInTimeChanging] = React.useState<boolean>(false)
    const [time, setTime] = React.useState<number>(0)
    const [play, setPlay] = React.useState<boolean>(false)
    const [velocityMultiplier, setVelocityMultiplier] = React.useState<number>(1)
    // const [mode, setMode] = React.useState<Mode>('play')

    return <>
        <P5Component
            canvasWidth={props.canvasWidth}
            canvasHeight={props.canvasHeight}
            top={props.top}
            left={props.left}
            time={time}
            onTimeChange={(newValue: number) => {
                setTime(newValue)
                if (newValue > props.endTime) {
                    setPlay(false)
                }
            }}
            play={play && !inTimeChanging}
            timeMultiplier={velocityMultiplier}
        />
        <PlayerControlPanel
            style={{
                position: 'absolute',
                top: sliderTop,
                left: props.left
            }}
            volumeSliderWidth={100}
            width={props.canvasWidth}
            maxTime={props.endTime}
            volume={volumeSliderValue}
            onVolumeChange={setVolumeSliderValue}
            time={time}
            onTimeChange={(newValue: number) => {
                setInTimeChanging(true)
                setTime(newValue)
                if (newValue > props.endTime) {
                    setPlay(false)
                }
            }}
            onTimeChangeCommited={() => {
                setInTimeChanging(false)
            }}
            play={play}
            onPlayChange={newValue => {
                if (time >= props.endTime) {
                    setTime(0)
                }
                setPlay(newValue)
            }}
            velocityMultiplier={velocityMultiplier}
            onVelocityMultiplierChange={setVelocityMultiplier}
            velocityMultipliers={[0.25, 0.5, 1, 2, 3, 4, 6, 8, 10]}
        />
    </>
}
