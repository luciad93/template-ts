import { Mode, ModeStateMachine } from "./ModeStateMachine";
import * as moment from "moment-timezone"; 
import 'moment-timezone';
import 'moment-timezone/data/packed/latest.json';

export enum Format {
    ENUM_FORMAT_24,
    ENUM_FORMAT_AMPM
}

export class Watch {
    private currentTime: moment.Moment;
    private modeStateMachine: ModeStateMachine;
    private lightOn: boolean;
    private lightTimeout: any;
    private readonly LIGHT_TIMEOUT_DURATION = 5000; 

    private timezone: string;

    private format: Format; 

    constructor(timezone: string) {
        this.timezone = timezone;
        this.currentTime = moment.tz(timezone); // Initialize with current time in selected timezone
        this.modeStateMachine = new ModeStateMachine();
        this.lightOn = false;
        
        // console.log("Current time for timezone ", timezone, "is ", this.currentTime);

        this.format = Format.ENUM_FORMAT_24;
        
        // Start a timer to update the current time every second
        setInterval(() => {
            this.currentTime.add(1, 'seconds');
        }, 1000);
    }


    isLightOn(): boolean {
        return this.lightOn;
    }

    getMode(): Mode {
        return this.modeStateMachine.getState();
    }

    getCurrentTime():  moment.Moment {
        return this.currentTime;
    }

    getFormat() : Format {
        return this.format;
    }

    getTimezone() : string {
        return this.timezone;
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


    // Events logic

    resetButtonPress(): void {
        this.currentTime = moment.tz(this.timezone); 
    }

    modeButtonPress(): void {
        this.modeStateMachine.next();
    }

    increaseButtonPress(): void {
        if (this.getMode() === Mode.MODE_ST_HOURS) {
            this.currentTime.add(1, 'hours');
        } else if (this.getMode() === Mode.MODE_ST_MINUTES) {
            this.currentTime.add(1, 'minutes');
        }

        this.modeStateMachine.startEditTimeout();
    }

    lightButtonPress(): void {
        this.lightOn = !this.lightOn;
        if (this.lightOn) {
            this.resetLightTimeout();
        }
    }

    formatButtonPress(): void {
        if (this.format == Format.ENUM_FORMAT_24) {
            this.format = Format.ENUM_FORMAT_AMPM;
        }
        else {
            this.format = Format.ENUM_FORMAT_24;
        }
    }
}
