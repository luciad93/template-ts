export enum Mode {
    MODE_ST_VIEW, 
    MODE_ST_HOURS, 
    MODE_ST_MINUTES
}


export class ModeStateMachine {
    private currentState: Mode;

    constructor() {
        this.currentState = Mode.MODE_ST_VIEW;
    }

    public getState(): Mode {
        return this.currentState;
    }

    public next(): void {
        switch (this.currentState) {
            case Mode.MODE_ST_VIEW:
                this.currentState = Mode.MODE_ST_HOURS;
                break;
            case Mode.MODE_ST_HOURS:
                this.currentState = Mode.MODE_ST_MINUTES;
                break;
            case Mode.MODE_ST_MINUTES:
                this.currentState = Mode.MODE_ST_VIEW;
                break;
        }
    }
}