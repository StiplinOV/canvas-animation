export interface camera {
    x: number
    y: number
    zoom?: number
    rotation?: number
}

export interface cameraParams {
    startTime: number
    transformDuration?: number
    camera: camera
}
