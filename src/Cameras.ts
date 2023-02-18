import {cameraParams} from './camera/CameraParams'

export const cameras: cameraParams[] = [
    {
        startTime: 4000,
        transformDuration: 1000,
        camera: {x: 0, y: 350}
    },
    {
        startTime: 10000,
        transformDuration: 1000,
        camera: {x: 0, y: 550}
    },
    {
        startTime: 35000,
        transformDuration: 1000,
        camera: {x: 100, y: 700}
    },
    {
        startTime: 45000,
        transformDuration: 1000,
        camera: {x: 120, y: 810, zoom: 0.9}
    },
    {
        startTime: 77000,
        transformDuration: 1000,
        camera: {x: 60, y: 810, zoom: 0.85}
    },
    {
        startTime: 113000,
        transformDuration: 1000,
        camera: {x: 150, y: 810, zoom: 0.85}
    },
    {
        startTime: 190000,
        transformDuration: 1000,
        camera: {x: 150, y: 1800, zoom: 1}
    }
]
