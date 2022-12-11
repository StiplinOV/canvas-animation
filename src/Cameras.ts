import {cameraParams} from "./camera/CameraParams";

export const cameras: cameraParams[] = [{
    startTime: 3000,
    camera: {
        x: 100,
        y: 100,
        zoom: 2
    }
}, {
    startTime: 6000,
    transformDuration: 1000,
    camera: {
        x: 10,
        y: 0,
        zoom: 1,
        rotation: Math.PI/4
    }
}, {
    startTime: 8000,
    transformDuration: 1000,
    camera: {
        x: 0,
        y: 0,
        zoom: 1,
        rotation: 0
    }
}]