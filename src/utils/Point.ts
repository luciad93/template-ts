export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    subtract(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }

    multiply(scalar: number): Point {
        return new Point(this.x * scalar, this.y * scalar);
    }
}