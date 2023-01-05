import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import ArrowCanvasAnimation from "./animation/complex/arrow/ArrowCanvasAnimation";
import p5Types from "p5";
import XYChartCanvasAnimation from "./animation/complex/xychart/XYChartCanvasAnimation";
import TextCanvasAnimation from "./animation/simple/text/TextCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800

export const animations: (p5: p5Types) => Array<CanvasAnimation<Params, string, string>> = (p5: p5Types) => [
    new TextCanvasAnimation({
        object: {
            value: "This is some text",
            position: {x: 100, y: 100},
            fontSize: 20,
            boxHeight: 100,
            boxWidth: 100
        },
        appearTime: 1000,
        appearDuration: 1000,
        appearType: "letterByLetter",
        disappearTime: 5000,
        disappearDuration: 1000,
        disappearType: "letterByLetter"
    }),
    new XYChartCanvasAnimation({
        appearDuration: 4000,
        disappearDuration: 4000,
        disappearTime: 10000,
        object: {
            origin: {x: 400, y: 400},
            width: 500,
            height: 300,
            weight: 4,
            xScale: [1, 50, 100],
            yScale: [1, 2, 3, 4, 5],
            chartPoints: [{x: 25, y: 4}, {x: 75, y: 2}, {x: 90, y: 3}],
            chartLines: [[{x: 25, y: 4}, {x: 75, y: 2}], [{x: 75, y: 2}, {x: 90, y: 3}]]
        }
    }, p5),
    new ArrowCanvasAnimation(
        {
            appearDuration: 1000,
            disappearDuration: 1000,
            disappearTime: 2000,
            object: {
                startPoint: {x: 50, y: 50},
                endPoint: {x: 200, y: 300},
                // startType: "Arrow",
                endType: "Arrow"
            }
        },
        p5
    )
]