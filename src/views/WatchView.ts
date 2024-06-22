import { Watch } from "../models/Watch";
import { Mode } from "../models/ModeStateMachine";

export class WatchView {
    private watch: Watch;
    private displayElement: HTMLElement;
    private lightElement: HTMLElement;

    constructor(watch: Watch, displayElement: HTMLElement, lightElement: HTMLElement) {
        this.watch = watch;
        this.displayElement = displayElement;
        this.lightElement = lightElement;
    }

    render(): void {
        this.displayElement.innerText = this.watch.displayTime();
        
        if (this.watch.isLightOn()) {
            this.lightElement.style.backgroundColor = 'rgba(255, 255, 0, 0.2)'; // Light on
        } else if (this.watch.getMode() === Mode.MODE_ST_VIEW) {
            this.lightElement.style.backgroundColor = 'black'; // View mode
        } else {
            this.lightElement.style.backgroundColor = 'grey'; // Edit mode
        }
    }
}
