import * as React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { FastForward, FastRewind } from '@mui/icons-material'

interface Props {
    width: number
    velocityMultiplier: number
    onVelocityMultiplierChange: (newValue: number) => void
    velocityMultipliers: number[]
}

export const AnimationVelocityComponent = (props: Props): JSX.Element => {
    const {
        velocityMultiplier,
        velocityMultipliers
    } = props

    return (
        <Stack direction="row" width={props.width} alignItems="center" justifyContent="space-between">
            <IconButton onClick={() => {
                const index = velocityMultipliers.indexOf(velocityMultiplier)
                props.onVelocityMultiplierChange(velocityMultipliers[index - 1])
            }} disabled={velocityMultipliers.indexOf(velocityMultiplier) === 0}>
                <FastRewind fontSize="large"/>
            </IconButton>
            <Typography>x{velocityMultiplier}</Typography>
            <IconButton onClick={() => {
                const index = velocityMultipliers.indexOf(velocityMultiplier)
                props.onVelocityMultiplierChange(velocityMultipliers[index + 1])
            }} disabled={velocityMultipliers.indexOf(velocityMultiplier) === velocityMultipliers.length - 1}>
                <FastForward fontSize="large"/>
            </IconButton>
        </Stack>
    )
}
