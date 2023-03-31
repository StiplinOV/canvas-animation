import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { animationStyle, canvasAnimations } from './Animations'
import { Camera, CameraParams } from './camera/CameraParams'
import CanvasAnimation from './animation/CanvasAnimation'
import { LessonJsonType } from './AnimationsJsonType'

interface Props {
    top: number
    left: number
    onTimeChange: (newValue: number) => void
    time: number
    play: boolean
    timeMultiplier: number
    lesson: LessonJsonType
}

export const P5Component: React.FC<Props> = (props: Props) => {

    const [animations, setAnimations] = React.useState<CanvasAnimation[]>([])
    const [cameras, setCameras] = React.useState<CameraParams[]>([])
    const [millisSinceLastPlay, setMillisSinceLastPlay] = React.useState<number>(0)
    const [playedBefore, setPlayedBefore] = React.useState<boolean>(false)
    const { lesson } = props
    // let vid: p5Types.Element

    const preload = (p5: p5Types): void => {
    }

    const setup = (p5: p5Types): void => {
        const {
            animations,
            cameras
        } = lesson
        const cnv = p5.createCanvas(lesson.canvasDimensions.width, lesson.canvasDimensions.height)
        // p5.drawingContext.shadowOffsetX = 3
        // p5.drawingContext.shadowOffsetY = -3
        // p5.drawingContext.shadowBlur = 5
        // p5.drawingContext.shadowColor = '#000000'
        cnv.position(props.left, props.top)
        cnv.style('border: 1px solid')
        cameras.sort((left, right) => left.startTime - right.startTime)
        setAnimations(canvasAnimations(animations, p5).flatMap(p => p.toCanvasAnimations(animationStyle)))
        setCameras(cameras)
        // vid = p5.createVideo("./lessons/9cb2eb1d-1dec-4f47-9501-eb37ba1e9572.mp4").
        //vid.loop()
    }

    const draw = (p5: p5Types): void => {
        const millis = p5.millis()
        let { time } = props
        if (props.play) {
            if (playedBefore) {
                time += props.timeMultiplier * (millis - millisSinceLastPlay)
            }
            setMillisSinceLastPlay(millis)
        }

        const camera = getActualCamera(cameras, time)
        const zoom = camera.zoom ?? 1
        p5.background(animationStyle.backgroundColor)
        // p5.image(vid, 10, 10)
        camera.rotation && p5.rotate(camera.rotation)
        animations.sort((l, r) => l.getZIndex(time, animationStyle) - r.getZIndex(time, animationStyle)).forEach(a => {
            if (a.getLayout() === 'absolute') {
                p5.translate(-camera.x * zoom, -camera.y * zoom)
                p5.scale(zoom)
            }
            a.draw(p5, time)
            if (a.getLayout() === 'absolute') {
                p5.scale(1 / zoom)
                p5.translate(camera.x * zoom, camera.y * zoom)
            }
        })
        setPlayedBefore(props.play)
        if (props.play && playedBefore) {
            props.onTimeChange(time)
        }
    }

    // @ts-expect-error need fidure it out
    return <Sketch setup={setup} preload={preload} draw={draw}/>
}

const getActualCamera = (cameras: CameraParams[], time: number): Camera => {
    let actualCameraParamCandidate: CameraParams = {
        startTime: 0,
        camera: {
            x: 0,
            y: 0,
            zoom: 1
        }
    }
    let prevCamera = actualCameraParamCandidate.camera
    let actualCameraIndex = 0
    for (let i = 0; i < cameras.length; i++) {
        const cameraParam = cameras[i]
        if (cameraParam.startTime <= time) {
            if (cameraParam.startTime > actualCameraParamCandidate.startTime) {
                actualCameraParamCandidate = cameraParam
                actualCameraIndex = i
            }
        } else {
            break
        }
    }
    if (actualCameraIndex >= 1) {
        prevCamera = cameras[actualCameraIndex - 1].camera
    }
    const transformDuration = actualCameraParamCandidate.transformDuration ?? 0
    const isInTransform = actualCameraParamCandidate.startTime + transformDuration > time
    const actualCamera = actualCameraParamCandidate.camera
    const actualZoom = actualCamera.zoom ?? 1
    if (isInTransform) {
        const prevX = prevCamera.x
        const prevY = prevCamera.y
        const prevZoom = prevCamera.zoom ?? 1
        const prevRotation = prevCamera.rotation ?? 0
        const transformPercent = (time - actualCameraParamCandidate.startTime) / transformDuration
        const x = prevX + (actualCamera.x - prevX) * transformPercent
        const y = prevY + (actualCamera.y - prevY) * transformPercent
        const zoom = prevZoom + (actualZoom - prevZoom) * transformPercent
        const rotation = prevRotation + ((actualCamera.rotation ?? 0) - prevRotation) * transformPercent
        return {
            x,
            y,
            zoom,
            rotation
        }
    }
    return actualCamera
}
