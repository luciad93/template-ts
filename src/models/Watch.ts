import { Mode, ModeStateMachine } from "./ModeStateMachine";

export class Watch {
    private currentTime: Date;
    private modeStateMachine: ModeStateMachine;
    private lightOn: boolean; 

    constructor() {
        this.currentTime = new Date();
        this.modeStateMachine = new ModeStateMachine();
        this.lightOn = false; 
    }

    displayTime(): string {
        return this.currentTime.toLocaleTimeString();
    }

    modeButtonPress(): void {
        this.modeStateMachine.next();
    }

    isLightOn(): boolean {
        return this.lightOn;
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
    }

     // Getter methods for testing
     getMode(): Mode {
        return this.modeStateMachine.getState();
    }

    getCurrentTime(): Date {
        return this.currentTime;
    }

}