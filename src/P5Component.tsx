import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import CanvasAnimation from "./object/CanvasAnimation";
import Params from "./object/Params";
import CircleCanvasAnimation from "./object/circle/CircleCanvasAnimation";
import LineCanvasAnimation from "./object/line/LineCanvasAnimation";

const animations: CanvasAnimation<Params>[] = [
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: 0, y: 1024}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 0, y: 0}, endPoint: {x: 1280, y: 0}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 1280, y: 1024}, endPoint: {x: 0, y: 1024}, weight: 10}
    }),
    new LineCanvasAnimation({
        appearTime: 0,
        object: {startPoint: {x: 1280, y: 1024}, endPoint: {x: 1280, y: 0}, weight: 10}
    }),
    new CircleCanvasAnimation({
        appearTime: 0,
        disappearTime: 11000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 1000, y: 100}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearTime: 1000,
        disappearTime: 10000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 500, y: 500}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new LineCanvasAnimation({
        appearTime: 2000,
        disappearTime: 9000,
        appearType: "fromStartToEnd",
        appearDuration: 500,
        disappearType: "fromStartToEnd",
        disappearDuration: 500,
        object: {startPoint: {x: 1000, y: 100}, endPoint: {x: 500, y: 500}, weight: 10}
    }),
    new CircleCanvasAnimation({
        appearTime: 3000,
        disappearTime: 8000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 750, y: 300}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new CircleCanvasAnimation({
        appearTime: 4000,
        disappearTime: 7000,
        appearType: "clock",
        appearDuration: 500,
        disappearType: "clock",
        disappearDuration: 500,
        object: {centerPoint: {x: 1200, y: 700}, diameter: 100, weight: 10, zIndex: 1}
    }),
    new LineCanvasAnimation({
        appearTime: 5000,
        disappearTime: 6000,
        appearType: "fromStartToEnd",
        appearDuration: 500,
        disappearType: "fromStartToEnd",
        disappearDuration: 500,
        object: {startPoint: {x: 750, y: 300}, endPoint: {x: 1200, y: 700}, weight: 10}
    }),
]


interface ComponentProps {
    //Your component props
}

export const P5Component: React.FC<ComponentProps> = (props: ComponentProps) => {

    const preload = (p5: p5Types) => {
    }

    const setup = (p5: p5Types) => {
    }

    const draw = (p5: p5Types) => {
        let cnv = p5.createCanvas(1280, 1024)
        cnv.position(0, 0)
        let m = p5.millis() % 12000;
        animations.sort((left, right) => left.getZIndex() - right.getZIndex() || 0)

        animations.forEach(animation => {
            animation.draw(p5, m)
        })
    }

    // @ts-ignore
    return <Sketch setup={setup} preload={preload} draw={draw}/>;
};


