import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import GeometryHelper from "./common/GeometryHelper";
import TextCanvasAnimation from "./animation/simple/text/TextCanvasAnimation";
import ArrayCanvasAnimation from "./animation/complex/array/ArrayCanvasAnimation";
import XYChartCanvasAnimation from "./animation/complex/xychart/XYChartCanvasAnimation";
import RectangleCanvasAnimation from "./animation/simple/rectangle/RectangleCanvasAnimation";

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
        appearDuration: 2000,
        selections: [{time: 2000, duration: 2000}]
    }),
    new RectangleCanvasAnimation({
        object: {
            origin: {x: 50, y: 50},
            width: 50,
            height: 50
        },
        selections: [{time: 0, duration: 1000}]
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
        selections: [{time: 10000, duration: 5000, type: "sequentially"}]
    }, geometryHelper),
    new XYChartCanvasAnimation({
        object: {
            origin: {x: 240, y: 1250},
            width: 800,
            height: 400,
            yAxisName: "Price",
            xAxisName: "Number of day",
            xScale: [0, 1, 2, 3, 4, 5, 6],
            yScale: [0, 1, 2, 3, 4, 5, 6, 7],
            chartPoints: [
                {x: 1, y: 7},
                {point: {x: 2, y: 1}, text: "Buy"},
                {x: 3, y: 5},
                {x: 4, y: 3},
                {point: {x: 5, y: 6}, text: "Sell"},
                {x: 6, y: 4}
            ],
            chartLines: [
                [{x: 1, y: 7}, {x: 2, y: 1}],
                [{x: 2, y: 1}, {x: 3, y: 5}],
                [{x: 3, y: 5}, {x: 4, y: 3}],
                [{x: 4, y: 3}, {x: 5, y: 6}],
                [{x: 5, y: 6}, {x: 6, y: 4}]
            ],
            weight: 2
        },
        appearTime: 10000,
        appearDuration: 4000,
        selections: [
            {time: 15000, duration: 5000, type: "sequentially", selector: {points: "all"}},
            {time: 25000, duration: 1000, selector: {points: [1]}}
        ]
    }, geometryHelper)
]