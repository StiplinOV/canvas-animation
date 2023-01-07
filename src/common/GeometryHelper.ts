import p5Types from "p5";
import {Point} from "./Point";

type Coordinates = {
    x?: number,
    y?: number
}

export default class GeometryHelper {

    private readonly p5

    public HORIZONTAL_ALIGN_CENTER

    public VERTICAL_ALIGN_TOP

    public VERTICAL_ALIGN_BOTTOM

    public VERTICAL_ALIGN_CENTER

    constructor(p5: p5Types) {
        this.p5 = p5
        this.HORIZONTAL_ALIGN_CENTER = p5.CENTER
        this.VERTICAL_ALIGN_TOP = p5.TOP
        this.VERTICAL_ALIGN_BOTTOM = p5.BOTTOM
        this.VERTICAL_ALIGN_CENTER = p5.CENTER
    }

    getVectorAngle(point: Point): number {
        return this.p5.createVector(point.x, point.y).heading()
    }

    rotateVector(point: Point, angle: number): Point {
        const resultVector = this.p5.createVector(point.x, point.y).rotate(angle)
        return {x: resultVector.x, y: resultVector.y}
    }

    addPoints(term1: Point, term2: Coordinates, ...terms: Coordinates[]): Point {
        let resultX = term1.x + (term2.x || 0)
        let resultY = term1.y + (term2.y || 0)
        if (terms) {
            if (terms.length >= 1) {
                terms.forEach(term => {
                    resultX += term.x || 0
                    resultY += term.y || 0
                })
            }
        }
        return {x: resultX, y: resultY}
    }

    subtractPoints(minuend: Point, subtrahend: Coordinates, ...subtrahends: Coordinates[]): Point {
        return this.addPoints(
            minuend,
            {x: -(subtrahend.x || 0), y: -(subtrahend.y || 0)},
            ...subtrahends.map(subtrahend => ({x: subtrahend.x, y: subtrahend.y}))
        )
    }

}