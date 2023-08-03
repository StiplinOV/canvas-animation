import { P5Component } from '../../P5Component'
import { PlayerControlPanel } from './PlayerControlPanel'
import React from 'react'
import { ExportModalWindow } from './ExportModalWindow'
import audioPlay from 'audio-play'
import { LessonJsonType } from '../../AnimationsJsonType'

interface Props {
    top: number
    left: number
    lesson: LessonJsonType
}

export const AnimationPlayer = (props: Props): JSX.Element => {
    const {endTime} = props.lesson
    const {width, height} = props.lesson.canvasDimensions
    const sliderTop = height + props.top + 30
    const [volumeSliderValue, setVolumeSliderValue] = React.useState<number>(100)
    const [inTimeChanging, setInTimeChanging] = React.useState<boolean>(false)
    const [time, setTime] = React.useState<number>(0)
    const [play, setPlay] = React.useState<boolean>(false)
    const [velocityMultiplier, setVelocityMultiplier] = React.useState<number>(1)
    const [exportWindowOpened, setExportWindowOpened] = React.useState<boolean>(false)
    const [rendering, setRendering] = React.useState<boolean>(false)
    const [downloadVideoHref, setDownloadVideoHref] = React.useState<string | null>()
    const [recorder, setRecorder] = React.useState<MediaRecorder | null>()
    const [renderingAborted, setRenderingAborted] = React.useState<boolean>(false)
    const [audioPlayHandleState, setAudioPlayHandleState] = React.useState<audioPlay.AudioPlayHandle | null>()
    const [velocityMultiplierChangeDisabled, setVelocityMultiplierChangeDisabled] = React.useState<boolean>()
    const {sound} = props.lesson

    if (audioPlayHandleState) {
        if (play && !inTimeChanging) {
            audioPlayHandleState.play()
        } else {
            audioPlayHandleState.pause()
            setAudioPlayHandleState(null)
        }
    }

    return <>
        <P5Component
            lesson={props.lesson}
            top={props.top}
            left={props.left}
            time={time}
            onTimeChange={(newValue: number) => {
                setTime(newValue)
                if (newValue >= endTime) {
                    if (rendering) {
                        setRendering(false)
                        if (recorder) {
                            recorder.stop()
                        }
                    }
                    setPlay(false)
                }
            }}
            play={play && !inTimeChanging}
            timeMultiplier={velocityMultiplier}
        />
        <PlayerControlPanel
            onClickDownloadButton={() => {
                setExportWindowOpened(true)
            }}
            style={{
                position: 'absolute',
                top: sliderTop,
                left: props.left
            }}
            volumeSliderWidth={100}
            width={width}
            maxTime={endTime}
            volume={volumeSliderValue}
            onVolumeChange={(newValue) => {
                setVolumeSliderValue(newValue)
                audioPlayHandleState?.pause()
                setAudioPlayHandleState(null)
                createAudioPlayHandle(time, velocityMultiplier, newValue, sound).then(audioPlayHandle => {
                    setAudioPlayHandleState(audioPlayHandle)
                }).catch(reason => {
                    throw new Error(reason)
                })
            }}
            time={time}
            onTimeChange={(newValue: number) => {
                setInTimeChanging(true)
                setTime(newValue)
                if (newValue > endTime) {
                    setPlay(false)
                }
            }}
            onTimeChangeCommited={(newValue: number) => {
                setInTimeChanging(false)
                audioPlayHandleState?.pause()
                setAudioPlayHandleState(null)
                createAudioPlayHandle(newValue, velocityMultiplier, volumeSliderValue, sound).then(audioPlayHandle => {
                    setAudioPlayHandleState(audioPlayHandle)
                }).catch(reason => {
                    throw new Error(reason)
                })
            }}
            play={play}
            onPlayChange={newValue => {
                if (newValue) {
                    createAudioPlayHandle(time, velocityMultiplier, volumeSliderValue, sound).then(audioPlayHandle => {
                        setAudioPlayHandleState(audioPlayHandle)
                    }).catch(reason => {
                        throw new Error(reason)
                    })
                }
                if (time >= endTime) {
                    setTime(0)
                }
                setPlay(newValue)
            }}
            velocityMultiplier={velocityMultiplier}
            onVelocityMultiplierChange={(newValue) => {
                setVelocityMultiplier(newValue)
                audioPlayHandleState?.pause()
                setAudioPlayHandleState(null)
                createAudioPlayHandle(time, newValue, volumeSliderValue, sound).then(audioPlayHandle => {
                    setAudioPlayHandleState(audioPlayHandle)
                }).catch(reason => {
                    throw new Error(reason)
                })
                setVelocityMultiplierChangeDisabled(true)
                setTimeout(() => {
                    setVelocityMultiplierChangeDisabled(false)
                }, 100)
            }}
            velocityMultipliers={[0.25, 0.5, 1, 2, 3, 4, 6, 8, 10]}
            velocityMultiplierChangeDisabled={velocityMultiplierChangeDisabled}
        />
        <ExportModalWindow
            open={exportWindowOpened}
            onClose={() => {
                !rendering && setExportWindowOpened(false)
            }}
            onStartVideoRendering={() => {
                setDownloadVideoHref(null)
                setRenderingAborted(false)
                setTime(0)
                setVolumeSliderValue(100)
                setPlay(true)
                setRendering(true)
                setVelocityMultiplier(1)

                const recorder = createVideoRecorder(setDownloadVideoHref)
                setRecorder(recorder)
                recorder?.start()
            }}
            onStopVideoRendering={() => {
                setRenderingAborted(true)
                setTime(0)
                setPlay(false)
                setRendering(false)

                recorder?.stop()
                setRecorder(null)
                setDownloadVideoHref(null)
            }}
            rendering={rendering}
            downloadVideoHref={renderingAborted ? null : downloadVideoHref}
        />
    </>
}

const createAudioPlayHandle = async (time: number, rate: number, volume: number, sound: URL): Promise<audioPlay.AudioPlayHandle> => {
    const AudioContext = window.AudioContext
    const audioCtx = new AudioContext()
    return await fetch(sound)
        .then(async response => await response.arrayBuffer())
        .then(async buffer => await audioCtx.decodeAudioData(buffer))
        .then(buffer => {
            return audioPlay(buffer, {
                start: time / 1000,
                end: buffer.duration,
                loop: false,
                rate,
                volume: volume / 100,
                autoplay: true
            }, () => {

            })
        })
}

const createVideoRecorder = (setDownloadVideoHref: React.Dispatch<React.SetStateAction<string | undefined | null>>): MediaRecorder | null => {
    const videoStream = document.querySelector('canvas')?.captureStream(30)
    const chunks: Blob[] = []
    if (!videoStream) {
        return null
    }
    const stream = new MediaStream(videoStream.getTracks())

    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data)
        }
    }
    recorder.onstop = () => {
        const url = window.URL.createObjectURL(new Blob(chunks))
        setDownloadVideoHref(url)
    }
    return recorder
}
