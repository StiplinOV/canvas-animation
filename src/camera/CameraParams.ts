export type camera = {
    x: number
    y: number
    zoom: number
    rotation?: number
}

export type cameraParams = {
    startTime: number
    transformDuration?: number
    camera: camera
}