import * as React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { FastForward, FastRewind } from '@mui/icons-material'

interface Props {
    width: number
    velocityMultiplier: number
    onVelocityMultiplierChange: (newValue: number) => void
    velocityMultipliers: number[]
    velocityMultiplierChangeDisabled?: boolean
}

export const AnimationVelocityComponent = (props: Props): JSX.Element => {
    const {
        velocityMultiplier,
        velocityMultipliers
    } = props
    let decreaseButtonDisabled = props.velocityMultiplierChangeDisabled
    let increaseButtonDisabled = props.velocityMultiplierChangeDisabled
    if (!decreaseButtonDisabled) {
        decreaseButtonDisabled = velocityMultipliers.indexOf(velocityMultiplier) === 0
    }
    if (!increaseButtonDisabled) {
        increaseButtonDisabled = velocityMultipliers.indexOf(velocityMultiplier) === velocityMultipliers.length - 1
    }

    return (
        <Stack direction="row" width={props.width} alignItems="center" justifyContent="space-between">
            <IconButton onClick={() => {
                const index = velocityMultipliers.indexOf(velocityMultiplier)
                props.onVelocityMultiplierChange(velocityMultipliers[index - 1])
            }} disabled={decreaseButtonDisabled}>
                <FastRewind fontSize="large"/>
            </IconButton>
            <Typography>x{velocityMultiplier}</Typography>
            <IconButton onClick={() => {
                const index = velocityMultipliers.indexOf(velocityMultiplier)
                props.onVelocityMultiplierChange(velocityMultipliers[index + 1])
            }} disabled={increaseButtonDisabled}>
                <FastForward fontSize="large"/>
            </IconButton>
        </Stack>
    )
}
