import { Mode, ModeStateMachine } from "./ModeStateMachine";

export class Watch {
    private currentTime: Date;
    private hours: number;
    private minutes: number;
    private modeStateMachine: ModeStateMachine;
    private lightOn: boolean;
    private lightTimeout: any;
    private readonly LIGHT_TIMEOUT_DURATION = 5000; // 5 seconds

    constructor() {
        this.currentTime = new Date();
        this.hours = this.currentTime.getHours();
        this.minutes = this.currentTime.getMinutes();
        this.modeStateMachine = new ModeStateMachine();
        this.lightOn = false;

        // Start a timer to update the current time every second
        setInterval(() => {
            if (this.modeStateMachine.getState() === Mode.MODE_ST_VIEW) {
                this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
            }
        }, 1000);
    }

    displayTime(): string {
        // console.log("Time is: ", this.currentTime.toLocaleTimeString());
        return this.currentTime.toLocaleTimeString();
    }

    modeButtonPress(): void {
        this.modeStateMachine.next();
        console.log("Mode is: ", this.modeStateMachine.getState())
    }

    increaseButtonPress(): void {
        if (this.modeStateMachine.getState() === Mode.MODE_ST_HOURS) {
            this.hours = (this.hours + 1) % 24;
        } else if (this.modeStateMachine.getState() === Mode.MODE_ST_MINUTES) {
            this.minutes = (this.minutes + 1) % 60;
        }

        this.currentTime.setHours(this.hours);
        this.currentTime.setMinutes(this.minutes);
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
}