import { Format, Watch } from "../models/Watch";
import { Mode } from "../models/ModeStateMachine";

export class WatchView {
    private watch: Watch;
    private displayElement: HTMLElement;
    private lightElement: HTMLElement;
    private hoursPlaceholder: HTMLElement;
    private minutesPlaceholder: HTMLElement;
    private formatPlaceholder: HTMLElement;
    

    constructor(watch: Watch,  hoursPlaceholder: HTMLElement, minutesPlaceholder: HTMLElement, displayElement: HTMLElement, lightElement: HTMLElement, formatPlaceholder: HTMLElement) {
        this.watch = watch;
        this.displayElement = displayElement;
        this.lightElement = lightElement;
        this.hoursPlaceholder = hoursPlaceholder;
        this.minutesPlaceholder = minutesPlaceholder;
        this.formatPlaceholder = formatPlaceholder;
    }

    public updateDisplay() {
        const time = this.watch.getCurrentTime();
        const hoursNb = time.getHours();
        const hours = String(hoursNb).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const mode = this.watch.getMode();
        const format = this.watch.getFormat();
        
        // Update the display content with placeholders depending on the format
        if (format == Format.ENUM_FORMAT_24) {
            this.displayElement.innerHTML = `
            <span id="hoursPlaceholder" class="${mode === Mode.MODE_ST_HOURS ? 'highlight' : ''}">${hours}</span>:
            <span id="minutesPlaceholder" class="${mode=== Mode.MODE_ST_MINUTES ? 'highlight' : ''}">${minutes}</span>
            <span id="formatPlaceholder" class="hidden"></span>
        `;
        }
        else {
            this.displayElement.innerHTML = `
            <span id="hoursPlaceholder" class="${mode === Mode.MODE_ST_HOURS ? 'highlight' : ''}">${hoursNb % 12 || 12}</span>:
            <span id="minutesPlaceholder" class="${mode=== Mode.MODE_ST_MINUTES ? 'highlight' : ''}">${minutes}</span>
            <span id="formatPlaceholder"}">${hoursNb >= 12 ? "pm" : "am"}</span>
        `;
        }


        

       

        // Apply highlighting based on the current mode
        if (this.hoursPlaceholder && this.minutesPlaceholder) {
            if (mode === Mode.MODE_ST_HOURS) {
                this.hoursPlaceholder.classList.add('highlight');
                this.minutesPlaceholder.classList.remove('highlight');
            } else if (mode === Mode.MODE_ST_MINUTES) {
                this.hoursPlaceholder.classList.remove('highlight');
                this.minutesPlaceholder.classList.add('highlight');
            } else {
                this.hoursPlaceholder.classList.remove('highlight');
                this.minutesPlaceholder.classList.remove('highlight');
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
        
        if (mode === Mode.MODE_ST_HOURS || mode === Mode.MODE_ST_MINUTES) {
            this.displayElement.classList.add('edit-mode');
        } else {
            this.displayElement.classList.remove('edit-mode');
        }
    }
}