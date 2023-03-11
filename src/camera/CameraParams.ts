export interface Camera {
    x: number
    y: number
    zoom?: number
    rotation?: number
}

export interface CameraParams {
    startTime: number
    transformDuration?: number
    camera: Camera
}
