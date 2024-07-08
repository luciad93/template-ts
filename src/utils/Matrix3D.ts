import { Point } from './Point';

export class Matrix3x3 {
    elements: number[];

    constructor(elements: number[]) {
        this.elements = elements;
    }

    static identity(): Matrix3x3 {
        return new Matrix3x3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
    }

    static translation(tx: number, ty: number): Matrix3x3 {
        return new Matrix3x3([
            1, 0, tx,
            0, 1, ty,
            0, 0, 1
        ]);
    }

    static rotation(angle: number): Matrix3x3 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix3x3([
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ]);
    }

    static scaling(sx: number, sy: number): Matrix3x3 {
        return new Matrix3x3([
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]);
    }

    multiply(matrix: Matrix3x3): Matrix3x3 {
        const a = this.elements;
        const b = matrix.elements;
        return new Matrix3x3([
            a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
            a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
            a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
            a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
            a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
            a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
            a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
            a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
            a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
        ]);
    }

    transformPoint(point: Point): Point {
        const x = point.x;
        const y = point.y;
        const e = this.elements;
        return new Point(
            x * e[0] + y * e[1] + e[2],
            x * e[3] + y * e[4] + e[5]
        );
    }

    inverse(): Matrix3x3 | null {
        const m = this.elements;
        const det = m[0] * (m[4] * m[8] - m[5] * m[7]) -
                    m[1] * (m[3] * m[8] - m[5] * m[6]) +
                    m[2] * (m[3] * m[7] - m[4] * m[6]);

        if (det === 0) {
            return null;
        }

        const invDet = 1 / det;
        return new Matrix3x3([
            (m[4] * m[8] - m[5] * m[7]) * invDet,
            (m[2] * m[7] - m[1] * m[8]) * invDet,
            (m[1] * m[5] - m[2] * m[4]) * invDet,
            (m[5] * m[6] - m[3] * m[8]) * invDet,
            (m[0] * m[8] - m[2] * m[6]) * invDet,
            (m[2] * m[3] - m[0] * m[5]) * invDet,
            (m[3] * m[7] - m[4] * m[6]) * invDet,
            (m[1] * m[6] - m[0] * m[7]) * invDet,
            (m[0] * m[4] - m[1] * m[3]) * invDet
        ]);
    }
}
