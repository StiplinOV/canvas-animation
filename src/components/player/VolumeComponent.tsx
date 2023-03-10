import { IconButton } from '@mui/material'
import { VolumeOff, VolumeUp } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import * as React from 'react'

interface Props {
    volumeSliderWidth: number
    volume: number
    onVolumeChange: (newValue: number) => void
}

export const VolumeComponent = (props: Props): JSX.Element => {
    const [volumeBeforeMute, setVolumeBeforeMute] = React.useState<number>(100)
    const [volume, setVolume] = React.useState<number>(props.volume)
    return <>
        <IconButton onClick={() => {
            if (volume === 0) {
                setVolume(volumeBeforeMute)
                props.onVolumeChange(volumeBeforeMute)
            } else {
                setVolumeBeforeMute(volume)
                setVolume(0)
                props.onVolumeChange(0)
            }
        }}>
            {volume === 0 ? <VolumeOff fontSize="large"/> : <VolumeUp fontSize="large"/>}
        </IconButton>
        <Box width={props.volumeSliderWidth}>
            <Slider
                value={volume}
                onChange={(event: Event, newValue: number | number[]) => {
                    typeof newValue === 'number' && setVolume(newValue)
                }}
                onChangeCommitted={(event, newValue: number | number[]) => {
                    typeof newValue === 'number' && props.onVolumeChange(newValue)
                }}
                size={'small'}
                valueLabelDisplay="auto"
                aria-label="time-indicator"
                max={100}
            />
        </Box>
    </>
}
