import {cameraParams} from "./camera/CameraParams";

export const cameras: cameraParams[] = [
    {
    startTime: 3000,
    transformDuration: 500,
    camera: {
        x: 0,
        y: 0,
        zoom: 2,
        rotation: Math.PI/8
    }
}, {
    startTime: 7000,
    transformDuration: 500,
    camera: {
        x: 0,
        y: 0,
        zoom: 0.5,
        rotation: Math.PI/8
    }
}
]