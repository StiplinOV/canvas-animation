import * as React from 'react'
import { Typography } from '@mui/material'
import moment from 'moment'

interface Props {
    maxTime: number
    time: number
}

export const AnimationTimeComponent = (props: Props): JSX.Element => {
    const format = 'mm:ss'
    const cur = moment(props.time).format(format)
    const max = moment(props.maxTime).format(format)
    return <Typography>{cur}&nbsp;/&nbsp;{max}</Typography>
}
