import { Close } from '@mui/icons-material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    Link,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import React from 'react'

type MimeType = {
    mimeType: string
    extension: string
}

interface Props {
    open: boolean
    onClose: () => void
    onStartVideoRendering: () => void
    onStopVideoRendering: () => void
    downloadVideoHref?: string | null
    rendering?: boolean
}

export const ExportModalWindow = (props: Props): JSX.Element => {
    const mimeTypes: MimeType[] = [{
        mimeType: 'video/mp4',
        extension: 'mp4'
    }]
    const [fileName, setFileName] = React.useState<string>('file.' + mimeTypes[0].extension)
    const [mimeType, setMimeType] = React.useState<MimeType>(mimeTypes[0])
    const [frameRateRequest, setFrameRateRequest] = React.useState<number>(30)

    return <Dialog
        open={props.open}
        onClose={props.onClose}
    >
        <DialogTitle sx={{
            m: 0,
            p: 2
        }}>
            Export to video
            <IconButton
                disabled={props.rendering}
                aria-label="close"
                onClick={props.onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <Close/>
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <Stack spacing={4}>
                <TextField
                    label="File name"
                    variant="standard"
                    value={fileName}
                    onChange={event => {
                        setFileName(event.target.value)
                    }}
                    disabled={props.rendering}
                />
                <TextField
                    label="Frame request rate"
                    variant="standard"
                    type="number"
                    value={frameRateRequest}
                    onChange={event => {
                        let value = Number(event.target.value)
                        if (value < 12) {
                            value = 12
                        }
                        if (value > 64) {
                            value = 64
                        }
                        setFrameRateRequest(value)
                    }}
                    disabled={props.rendering}
                />
                <FormControl fullWidth>
                    <InputLabel id="mimetype-select-label">mimeType</InputLabel>
                    <Select
                        labelId="mimetype-select-label"
                        value={mimeType.mimeType}
                        label="mimeType"
                        onChange={event => {
                            setMimeType(mimeTypes.filter(m => m.mimeType === event.target.value)[0])
                        }}
                        disabled={props.rendering}
                    >
                        {
                            mimeTypes.map((mimeType, index) => <MenuItem
                                key={`mimeTypeMenuItem${index}`}
                                value={mimeType.mimeType}
                            >
                                {
                                    mimeType.mimeType
                                }
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
                {props.rendering && <LinearProgress/>}
                {props.rendering &&
                    <Typography gutterBottom>
                        Rendering is in process. Please do not minimize your browser or switch tabs
                    </Typography>
                }
                {props.downloadVideoHref && <Link
                    href={props.downloadVideoHref}
                    download={fileName}
                >
                    Download video
                </Link>}
            </Stack>
        </DialogContent>
        <DialogActions>
            {props.rendering && <Button autoFocus onClick={props.onStopVideoRendering}>Stop rendering</Button>}
            {!props.rendering && <Button autoFocus onClick={props.onStartVideoRendering}>Export</Button>}
        </DialogActions>
    </Dialog>
}
