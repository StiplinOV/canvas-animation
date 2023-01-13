import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import {animations, canvasHeight, canvasWidth, timeDivider} from "./Animations";
import {camera, cameraParams} from "./camera/CameraParams";
import {cameras} from "./Cameras";
import GeometryHelper from "./common/GeometryHelper";

interface ComponentProps {
    //Your component props
}

export const P5Component: React.FC<ComponentProps> = (props: ComponentProps) => {

    const preload = (p5: p5Types) => {
    }

    const setup = (p5: p5Types) => {
        let cnv = p5.createCanvas(canvasWidth, canvasHeight)
        cnv.position(0, 0)
        cnv.style("border: 1px solid")
        cameras.sort((left, right) => left.startTime - right.startTime)
        animations(new GeometryHelper(p5)).sort((left, right) => left.getZIndex() - right.getZIndex())
    }

    const draw = (p5: p5Types) => {
        const millis = p5.millis() % timeDivider;
        const camera = getActualCamera(millis)
        const zoom = camera.zoom || 1
        p5.background(255)
        camera.rotation && p5.rotate(camera.rotation)
        p5.translate(-camera.x * zoom, -camera.y * zoom)
        p5.scale(zoom)
        animations(new GeometryHelper(p5))
            .sort((left, right) => left.getZIndex() - right.getZIndex())
            .forEach(animation => animation.draw(p5, millis))
    }

    // @ts-ignore
    return <Sketch setup={setup} preload={preload} draw={draw}/>;
};

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
        let cameraParam = cameras[i]
        if (cameraParam.startTime <= time) {
            if (cameraParam.startTime > actualCameraParamCandidate.startTime) {
                actualCameraParamCandidate = cameraParam
                actualCameraIndex = i
            }
        } else {
            break;
        }
    }
    if (actualCameraIndex >= 1) {
        prevCamera = cameras[actualCameraIndex - 1].camera
    }
    let transformDuration = actualCameraParamCandidate.transformDuration || 0
    const isInTransform = actualCameraParamCandidate.startTime + transformDuration > time
    const actualCamera = actualCameraParamCandidate.camera
    const actualZoom = actualCamera.zoom || 1
    if (isInTransform) {
        const prevX = prevCamera.x
        const prevY = prevCamera.y
        const prevZoom = prevCamera.zoom || 1
        const prevRotation = prevCamera.rotation || 0
        const transformPercent = (time - actualCameraParamCandidate.startTime) / transformDuration
        let x = prevX + (actualCamera.x - prevX) * transformPercent
        let y = prevY + (actualCamera.y - prevY) * transformPercent
        let zoom = prevZoom + (actualZoom - prevZoom) * transformPercent
        let rotation = prevRotation + ((actualCamera.rotation || 0) - prevRotation) * transformPercent
        return {x, y, zoom, rotation}
    }
    return actualCamera
}


