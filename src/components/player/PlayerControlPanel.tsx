import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { IconButton, Stack } from '@mui/material'
import { Download, Pause, PlayArrow } from '@mui/icons-material'
import { VolumeComponent } from './VolumeComponent'
import { AnimationVelocityComponent } from './AnimationVelocityComponent'
import { AnimationTimeComponent } from './AnimationTimeComponent'

interface Props {
    style?: React.CSSProperties
    width: number
    volumeSliderWidth: number
    maxTime: number
    time: number
    onTimeChange: (newValue: number) => void
    onTimeChangeCommited: () => void
    volume: number
    onVolumeChange: (newValue: number) => void
    play: boolean
    onPlayChange: (newValue: boolean) => void
    velocityMultiplier: number
    onVelocityMultiplierChange: (newValue: number) => void
    velocityMultipliers: number[]
}

export const PlayerControlPanel = (props: Props): JSX.Element => {
    const {
        velocityMultiplier,
        velocityMultipliers,
        onVelocityMultiplierChange
    } = props
    const [volumeSliderValue, setVolumeSliderValue] = React.useState<number>(0)
    const timeSliderMaxTime = props.maxTime / 1000

    return (
        <Box width={props.width} style={props.style}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <IconButton onClick={() => {
                    props.onPlayChange(!props.play)
                }}>
                    {props.play ? <Pause fontSize="large"/> : <PlayArrow fontSize="large"/>}
                </IconButton>
                <Slider
                    value={Math.round((props.time / props.maxTime) * timeSliderMaxTime)}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number') {
                            const time = (props.maxTime * newValue) / timeSliderMaxTime
                            props.onTimeChange(time)
                        }
                    }}
                    size={'small'}
                    max={timeSliderMaxTime}
                    min={0}
                    onChangeCommitted={props.onTimeChangeCommited}
                />
                <AnimationTimeComponent time={props.time} maxTime={props.maxTime}/>
                <VolumeComponent
                    volume={volumeSliderValue}
                    onVolumeChange={setVolumeSliderValue}
                    volumeSliderWidth={props.volumeSliderWidth}
                />
                <AnimationVelocityComponent
                    width={250}
                    velocityMultiplier={velocityMultiplier}
                    onVelocityMultiplierChange={onVelocityMultiplierChange}
                    velocityMultipliers={velocityMultipliers}
                />
                <IconButton disabled={props.play}>
                    <Download fontSize="large"/>
                </IconButton>
            </Stack>
        </Box>
    )
}
