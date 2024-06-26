import { Mode } from "../models/ModeStateMachine";
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

         // Initial display update
         this.view.updateDisplay();
         this.view.updateLight();
 
         // Update the display every second
         setInterval(() => {
             if (this.watch.getMode() === Mode.MODE_ST_VIEW) {
                 this.view.updateDisplay();
             }
         }, 1000);
      
    }

    lightButtonPress(): void {
        this.watch.lightButtonPress();
        this.view.updateLight();
        this.checkLightTimeout();
    }

    modeButtonPress(): void {
        this.watch.modeButtonPress();
        this.view.updateDisplay();
    }

    increaseButtonPress(): void {
        this.watch.increaseButtonPress();
        this.view.updateDisplay();
    }

    resetButtonPress(): void {
        this.watch.resetButtonPress();
    }

    

    private checkLightTimeout() {
        if (this.watch.isLightOn()) {
            setTimeout(() => {
                this.view.updateLight();
            }, 5000); // Timeout of 5 seconds
        }
    }


}
