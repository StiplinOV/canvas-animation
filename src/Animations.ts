import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import LineCanvasAnimation from "./animation/line/LineCanvasAnimation";
import CircleCanvasAnimation from "./animation/circle/CircleCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800

export const animations: CanvasAnimation<Params>[] = [
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: -canvasWidth/2, y: -canvasHeight/2}, endPoint: {x: -canvasWidth/2, y: canvasHeight/2}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: -canvasWidth/2, y: -canvasHeight/2}, endPoint: {x: canvasWidth/2, y: -canvasHeight/2}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: canvasWidth/2, y: canvasHeight/2}, endPoint: {x: -canvasWidth/2, y: canvasHeight/2}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: canvasWidth/2, y: canvasHeight/2}, endPoint: {x: canvasWidth/2, y: -canvasHeight/2}, weight: 10}
    }),
    new CircleCanvasAnimation({
        appearTime: 0,
        disappearTime: 11000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 400, y: -300}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearTime: 1000,
        disappearTime: 10000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: -100, y: -100}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new LineCanvasAnimation({
        appearTime: 2000,
        disappearTime: 9000,
        appearType: "fromStartToEnd",
        appearDuration: 500,
        disappearType: "fromStartToEnd",
        disappearDuration: 500,
        object: {startPoint: {x: 400, y: -300}, endPoint: {x: -100, y: -100}, weight: 10}
    }),
    new CircleCanvasAnimation({
        appearTime: 3000,
        disappearTime: 8000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 150, y: -200}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearTime: 4000,
        disappearTime: 7000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 600, y: 100}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new LineCanvasAnimation({
        appearTime: 5000,
        disappearTime: 6000,
        appearType: "fromStartToEnd",
        appearDuration: 500,
        disappearType: "fromStartToEnd",
        disappearDuration: 500,
        object: {startPoint: {x: 150, y: -200}, endPoint: {x: 600, y: 100}, weight: 10}
    }),
]