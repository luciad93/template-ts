import { Watch } from "../models/Watch";
import { Mode } from "../models/ModeStateMachine";

export class WatchView {
    private watch: Watch;
    private displayElement: HTMLElement;
    private lightElement: HTMLElement;
    private hoursPlaceholder: HTMLElement;
    private minutesPlaceholder: HTMLElement;

    constructor(watch: Watch, displayElement: HTMLElement, lightElement: HTMLElement) {
        this.watch = watch;
        this.displayElement = displayElement;
        this.lightElement = lightElement;
        this.hoursPlaceholder = document.getElementById('hoursPlaceholder') as HTMLElement;
        this.minutesPlaceholder = document.getElementById('minutesPlaceholder') as HTMLElement;
    }

    public updateDisplay() {
        const time = this.watch.getCurrentTime();
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const mode = this.watch.getMode();
        
        // Update the display content with placeholders
        this.displayElement.innerHTML = `
            <span id="hoursPlaceholder" class="${mode === Mode.MODE_ST_HOURS ? 'highlight' : ''}">${hours}</span>:
            <span id="minutesPlaceholder" class="${mode=== Mode.MODE_ST_MINUTES ? 'highlight' : ''}">${minutes}</span>
        `;

        // Update references to the placeholders
        const hoursPlaceholder = document.getElementById('hoursPlaceholder');
        const minutesPlaceholder = document.getElementById('minutesPlaceholder');

        // Apply highlighting based on the current mode
        if (hoursPlaceholder && minutesPlaceholder) {
            if (mode === Mode.MODE_ST_HOURS) {
                hoursPlaceholder.classList.add('highlight');
                minutesPlaceholder.classList.remove('highlight');
            } else if (mode === Mode.MODE_ST_MINUTES) {
                hoursPlaceholder.classList.remove('highlight');
                minutesPlaceholder.classList.add('highlight');
            } else {
                hoursPlaceholder.classList.remove('highlight');
                minutesPlaceholder.classList.remove('highlight');
            }
        }

        this.updateBackground(mode);

    }


    public updateLight() {
        if (this.watch.isLightOn()) {
            this.lightElement.classList.add('light-on');
        } else {
            this.lightElement.classList.remove('light-on');
        }
    }

    public updateBackground(mode: Mode) {
        const watchContainer = document.querySelector('.watch-container');
        if (mode === Mode.MODE_ST_HOURS || mode === Mode.MODE_ST_MINUTES) {
            watchContainer?.classList.add('edit-mode');
        } else {
            watchContainer?.classList.remove('edit-mode');
        }
    }
}