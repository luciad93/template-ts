import { Mode, ModeStateMachine } from "./ModeStateMachine";
import * as moment from "moment-timezone"; 
import 'moment-timezone';
import 'moment-timezone/data/packed/latest.json';

export class Watch {
    private currentTime: Date;
    private modeStateMachine: ModeStateMachine;
    private lightOn: boolean;
    private lightTimeout: any;
    private readonly LIGHT_TIMEOUT_DURATION = 5000; 

    private timezoneOffset: number;

    constructor(timezone: string) {
        this.currentTime = moment.tz(new Date(), timezone).toDate(); // Initialize with current time in selected timezone
        this.modeStateMachine = new ModeStateMachine();
        this.lightOn = false;

        this.timezoneOffset = this.parseTimezoneOffset(timezone);
        console.log("Selected tz offset: ", this.timezoneOffset);
        
        // Start a timer to update the current time every second
        setInterval(() => {
            this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
        }, 1000);
    }

    displayTime(): string {
        const hours = String(this.currentTime.getHours()).padStart(2, '0');
        const minutes = String(this.currentTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    modeButtonPress(): void {
        this.modeStateMachine.next();
    }

    increaseButtonPress(): void {
        if (this.modeStateMachine.getState() === Mode.MODE_ST_HOURS) {
            this.currentTime.setHours((this.currentTime.getHours() + 1) % 24);
        } else if (this.modeStateMachine.getState() === Mode.MODE_ST_MINUTES) {
            this.currentTime.setMinutes((this.currentTime.getMinutes() + 1) % 60);
        }

        this.modeStateMachine.startEditTimeout();
    }

    lightButtonPress(): void {
        this.lightOn = !this.lightOn;
        if (this.lightOn) {
            this.resetLightTimeout();
        }
    }

    isLightOn(): boolean {
        return this.lightOn;
    }

    getMode(): Mode {
        return this.modeStateMachine.getState();
    }

    getCurrentTime(): Date {
        return this.currentTime;
    }

    private resetLightTimeout(): void {
        if (this.lightTimeout) {
            clearTimeout(this.lightTimeout);
        }

        if (this.lightOn) {
            this.lightTimeout = setTimeout(() => {
                this.lightOn = false;
            }, this.LIGHT_TIMEOUT_DURATION);
        }
    }

    private parseTimezoneOffset(timezone: string): number {
        const match = timezone.match(/GMT([+-]\d+)/);
        if (match) {
            return parseInt(match[1], 10);
        }
        return 0;
    }
}
