import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import {canvasAnimations, canvasHeight, canvasWidth, startTime, timeDivider, timeMultiplier} from './Animations'
import {camera, cameraParams} from './camera/CameraParams'
import {cameras} from './Cameras'
import CanvasAnimation from './animation/CanvasAnimation'
import {getAnimationStyle} from './AnimationStyles'

interface ComponentProps {
    some?: string
}

export const P5Component: React.FC<ComponentProps> = (props: ComponentProps) => {

    const animations: CanvasAnimation[] = []
    const animationStyle = getAnimationStyle('default')

    const preload = (p5: p5Types): void => {
    }

    const setup = (p5: p5Types): void => {
        const cnv = p5.createCanvas(canvasWidth, canvasHeight)
        // p5.drawingContext.shadowOffsetX = 3
        // p5.drawingContext.shadowOffsetY = -3
        // p5.drawingContext.shadowBlur = 5
        // p5.drawingContext.shadowColor = '#000000'
        cnv.position(0, 0)
        cnv.style('border: 1px solid')
        cameras.sort((left, right) => left.startTime - right.startTime)
        animations.push(
            ...canvasAnimations(p5)
                .sort((left, right) => left.getZIndex(0, animationStyle) - right.getZIndex(0, animationStyle))
                .flatMap(p => p.toCanvasAnimations(animationStyle))
        )
    }

    const draw = (p5: p5Types): void => {
        const millis = startTime + (p5.millis() * timeMultiplier) % timeDivider
        const camera = getActualCamera(millis)
        const zoom = camera.zoom ?? 1
        p5.background(animationStyle.backgroundColor)
        camera.rotation && p5.rotate(camera.rotation)
        p5.translate(-camera.x * zoom, -camera.y * zoom)
        p5.scale(zoom)
        animations.forEach(a => {
            a.draw(p5, millis)
        })
    }

    // @ts-expect-error need fidure it out
    return <Sketch setup={setup} preload={preload} draw={draw}/>
}

const getActualCamera = (time: number): camera => {
    let actualCameraParamCandidate: cameraParams = {
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
        return {x, y, zoom, rotation}
    }
    return actualCamera
}
