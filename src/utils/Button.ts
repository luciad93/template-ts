export class Button {
    private action: () => void;

    constructor(action: () => void) {
        this.action = action;
    }

    press(): void {
        this.action();
    }
}