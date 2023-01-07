import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import ArrowCanvasAnimation from "./animation/complex/arrow/ArrowCanvasAnimation";
import XYChartCanvasAnimation from "./animation/complex/xychart/XYChartCanvasAnimation";
import GeometryHelper from "./common/GeometryHelper";

export const canvasWidth = 1280
export const canvasHeight = 800
export const timeDivider = 10000

export const animations: (geometryHelper: GeometryHelper) => Array<CanvasAnimation<Params>> = (geometryHelper: GeometryHelper) => [
    new XYChartCanvasAnimation({
        appearDuration: 4000,
        disappearDuration: 4000,
        disappearTime: 5000,
        object: {
            origin: {x: 400, y: 400},
            width: 500,
            height: 300,
            weight: 4,
            xScale: [1, 50, 100],
            yScale: [1, 2, 3, 4, 5],
            xAxisName: "X - Axis name",
            yAxisName: "Y - Axis name",
            chartPoints: [{x: 25, y: 4}, {x: 75, y: 2}, {x: 90, y: 3}],
            chartLines: [[{x: 25, y: 4}, {x: 75, y: 2}], [{x: 75, y: 2}, {x: 90, y: 3}]],
            rotation: Math.PI/4
        }
    }, geometryHelper),
    new ArrowCanvasAnimation(
        {
            appearDuration: 1000,
            disappearDuration: 1000,
            disappearTime: 2000,
            object: {
                startPoint: {x: 50, y: 50},
                endPoint: {x: 75, y: 25},
                // startType: "Arrow",
                endType: "Arrow",
                //   rotation: Math.PI/2
            }
        },
        geometryHelper
    )
]