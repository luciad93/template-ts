import { Mode, ModeStateMachine } from "./ModeStateMachine";

export class Watch {
    private currentTime: Date;
    private modeStateMachine: ModeStateMachine;
    private lightOn: boolean;
    private editTimeout: any;
    private lightTimeout: any;
    private readonly EDIT_TIMEOUT_DURATION = 10000; // 10 seconds
    private readonly LIGHT_TIMEOUT_DURATION = 5000; // 5 seconds

    constructor() {
        this.currentTime = new Date();
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
            this.currentTime.setHours(this.currentTime.getHours() + 1);
        } else if (this.modeStateMachine.getState() === Mode.MODE_ST_MINUTES) {
            this.currentTime.setMinutes(this.currentTime.getMinutes() + 1);
        }
    }

    lightButtonPress(): void {
        this.lightOn = !this.lightOn;
        // console.log("Light is: ", this.lightOn);

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
}