import { Watch } from "../models/Watch";
import { WatchView } from "../views/WatchView";

export class WatchController {
    private watch: Watch;
    private view: WatchView;

    constructor(watch: Watch, view: WatchView) {
        this.watch = watch;
        this.view = view;
    }

    init(): void {
        document.getElementById('modeButton')?.addEventListener('click', () => {
            this.watch.modeButtonPress();
            this.view.render();
        });

        document.getElementById('increaseButton')?.addEventListener('click', () => {
            this.watch.increaseButtonPress();
            this.view.render();
        });

        document.getElementById('lightButton')?.addEventListener('click', () => {
            this.watch.lightButtonPress();
            this.view.render();
        });

        // Initial render
        this.view.render();

        // Update the view every second
        setInterval(() => {
            this.view.render();
        }, 1000);
    }
}
