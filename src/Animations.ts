import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import XYChartCanvasAnimation from "./animation/xychart/XYChartCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800

export const animations: Array<CanvasAnimation<Params>> = [
    new XYChartCanvasAnimation({
        appearDuration: 4000,
        object: {
            origin: {
                x: 400,
                y: 400
            },
            width: 500,
            height: 300,
            weight: 4,
            xScale: [1, 50, 100],
            yScale: [1, 2, 3, 4, 5],
            chartPoints: [{x: 25, y: 4}, {x: 75, y: 2}, {x: 90, y: 3}],
            chartLines: [[{x: 25, y: 4}, {x: 75, y: 2}], [{x: 75, y: 2}, {x: 90, y: 3}]]
        }
    }),
]