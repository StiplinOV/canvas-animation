import {cameraParams} from "./camera/CameraParams";

export const cameras: cameraParams[] = [{
    startTime: 3000,
    transformDuration: 500,
    camera: {
        x: 500,
        y: 500,
        rotation: Math.PI,
        zoom: 1.5
    }
}, {
    startTime: 7000,
    transformDuration: 500,
    camera: {
        x: 200,
        y: 300,
        rotation: Math.PI/3,
        zoom: 0.5
    }
}]