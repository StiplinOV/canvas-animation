import CanvasAnimation from "./animation/CanvasAnimation";
import Params from "./animation/Params";
import GeometryHelper from "./common/GeometryHelper";
import TextCanvasAnimation from "./animation/simple/text/TextCanvasAnimation";
import ArrayCanvasAnimation from "./animation/complex/array/ArrayCanvasAnimation";

export const canvasWidth = 1280
export const canvasHeight = 800
export const timeDivider = 10000

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
            origin: {x: 100, y: 100},
            value: ["7", "1", "5", "3", "6", "4"],
            height: 300,
            title: "Array title",
            indexTitle: "Array Index Title"
        },
        appearDuration: 4000,
        disappearTime: 5000,
        disappearDuration: 4000
    }, geometryHelper)
]