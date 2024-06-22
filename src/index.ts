import { Watch } from "./models/Watch";
import { WatchView } from "./views/WatchView";
import { WatchController } from "./controllers/WatchController";

document.addEventListener('DOMContentLoaded', () => {
    const watch = new Watch();
    const displayElement = document.getElementById('watchDisplay') as HTMLElement;
    const lightElement = document.getElementById('watchLight') as HTMLElement;
    const view = new WatchView(watch, displayElement, lightElement);
    const controller = new WatchController(watch, view);

    controller.init();
});
