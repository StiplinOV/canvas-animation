import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import LineCanvasAnimation from "./animation/line/LineCanvasAnimation";
import CircleCanvasAnimation from "./animation/circle/CircleCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800

export const animations: CanvasAnimation<Params>[] = [
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: canvasWidth, y: canvasHeight}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: canvasHeight}, endPoint: {x: canvasWidth, y: 0}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: 0, y: canvasHeight}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: canvasWidth, y: 0}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: canvasWidth, y: 0}, endPoint: {x: canvasWidth, y: canvasHeight}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: canvasHeight}, endPoint: {x: canvasWidth, y: canvasHeight}, weight: 10}
    }),
    new CircleCanvasAnimation({
        appearDuration: 500,
        appearType: "clock",
        appearTime: 4000,
        object: {centerPoint: {x: 100, y: 100}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearDuration: 500,
        appearType: "clock",
        appearTime: 6000,
        object: {centerPoint: {x: 200, y: 300}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearTime: 0,
        object: {centerPoint: {x: 500, y: 500}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: 1000, y: 1000}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 1000, y: 0}, endPoint: {x: 0, y: 1000}, weight: 10}
    }),
]