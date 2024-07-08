import { Point } from './Point';
import { Matrix3x3 } from './Matrix3D';

export function animateElement(elementElement: HTMLElement, centerX: number, centerY: number) {
    const elementPosition = new Point(centerX, centerY);

    let angle = 0;
    let scale = 1;
    let scaleDirection = 1;

    function update() {
        // Rotation matrix around the center of the Element
        const rotationMatrix = Matrix3x3.rotation(angle);

        // Scaling matrix
        const scalingMatrix = Matrix3x3.scaling(scale, scale);

        // Combined transformation matrix
        const transformMatrix = rotationMatrix.multiply(scalingMatrix);

        // Apply the transformation to the element
        const transformedPosition = transformMatrix.transformPoint(elementPosition);

        elementElement.style.transform = `matrix(${transformMatrix.elements[0]}, ${transformMatrix.elements[3]}, ${transformMatrix.elements[1]}, ${transformMatrix.elements[4]}, ${transformedPosition.x}, ${transformedPosition.y})`;

        // Update rotation angle and scale
        angle += 0.01;
        scale += scaleDirection * 0.01;
        if (scale > 1.5 || scale < 0.5) {
            scaleDirection *= -1;
        }

        requestAnimationFrame(update);
    }

    update();
}
