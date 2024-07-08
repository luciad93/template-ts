document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const rotateSlider = document.getElementById('rotateSlider') as HTMLInputElement;
    const scaleSlider = document.getElementById('scaleSlider') as HTMLInputElement;
    const translateXSlider = document.getElementById('translateXSlider') as HTMLInputElement;
    const translateYSlider = document.getElementById('translateYSlider') as HTMLInputElement;

    let angle: number = 0;
    let scale: number = 1;
    let translateX: number = 0;
    let translateY: number = 0;

    const draw = (): void => {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            ctx.translate(canvas.width / 2 + translateX, canvas.height / 2 + translateY);
            ctx.rotate(angle * Math.PI / 180);
            ctx.scale(scale, scale);

            ctx.fillStyle = 'blue';
            ctx.fillRect(-50, -50, 100, 100);

            ctx.restore();
        }
    };

    rotateSlider.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        angle = parseFloat(target.value);
        draw();
    });

    scaleSlider.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        scale = parseFloat(target.value);
        draw();
    });

    translateXSlider.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        translateX = parseFloat(target.value);
        draw();
    });

    translateYSlider.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        translateY = parseFloat(target.value);
        draw();
    });

    draw();
});
