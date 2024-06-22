import { Watch } from "../models/Watch";

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
        this.lightElement.style.backgroundColor = this.watch.isLightOn() ? 'yellow' : 'black';
    }
}
