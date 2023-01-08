import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import GeometryHelper from "./common/GeometryHelper";
import TextCanvasAnimation from "./animation/simple/text/TextCanvasAnimation";
import ArrayCanvasAnimation from "./animation/complex/array/ArrayCanvasAnimation";
import XYChartCanvasAnimation from "./animation/complex/xychart/XYChartCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800
export const timeDivider = 1000000

export const animations: (geometryHelper: GeometryHelper) => Array<CanvasAnimation<Params>> = (geometryHelper: GeometryHelper) => [
    new TextCanvasAnimation({
        object: {
            value: "Best Time to Buy and Sell Stock",
            origin: {x: 640, y: 400},
            horizontalAlign: "center",
            verticalAlign: "center",
            fontSize: 70
        },
        appearDuration: 2000
    }),
    new ArrayCanvasAnimation({
        object: {
            origin: {x: 240, y: 600},
            value: ["7", "1", "5", "3", "6", "4"],
            height: 300,
            width: 800,
            title: "Array of stock prices",
            indexTitle: "Number of day",
            firstIndex: 1
        },
        appearTime: 5000,
        appearDuration: 4000,
    }, geometryHelper),
    new XYChartCanvasAnimation({
        object: {
            origin: {x: 240, y: 1250},
            width: 800,
            height: 400,
            yAxisName: "Price",
            xAxisName: "Number of day",
            xScale: [0, 1, 2, 3, 4, 5, 6],
            yScale: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        appearTime: 10000,
        appearDuration: 4000
    }, geometryHelper)
]