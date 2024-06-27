type ButtonState = 'pressed' | 'released';

export class Button {
    private element: HTMLButtonElement;
    private state: ButtonState;

    constructor(id: string, text: string, initialState: ButtonState = 'released') {
        this.element = document.createElement('button');
        this.element.id = id;
        this.element.textContent = text;
        this.state = initialState;
        this.element.classList.add('button');
        this.applyStateStyles();
        
        this.element.addEventListener('mousedown', () => this.setState('pressed'));
        this.element.addEventListener('mouseup', () => this.setState('released'));
        this.element.addEventListener('mouseleave', () => this.setState('released'));
    }

    getElement(): HTMLButtonElement {
        return this.element;
    }

    getState(): ButtonState {
        return this.state;
    }

    setState(state: ButtonState): void {
        if (this.state != state) {
            this.state = state;
            this.applyStateStyles();
        }
        
    }

    private applyStateStyles(): void {
        if (this.state === 'pressed') {
            this.element.classList.add('pressed');
            // console.log("Button pressed");
        } else {
            this.element.classList.remove('pressed');
            // console.log("Button released");
        }
    }

    onClick(callback: () => void): void {
        this.element.addEventListener('click', callback);
    }
}
