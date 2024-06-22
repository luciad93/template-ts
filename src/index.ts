import { Watch } from "./models/Watch";
import { WatchView } from "./views/WatchView";
import { WatchController } from "./controllers/WatchController";
import './styles/watch.css'
import * as moment from "moment-timezone"; 

const timezoneSelect = document.getElementById('timezoneSelect') as HTMLSelectElement;
const timezones = moment.tz.names();
timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    timezoneSelect.appendChild(option);
});

document.getElementById('createWatchButton')!.addEventListener('click', () => {
    const selectedTimezone = timezoneSelect.value;
    const watch = new Watch(selectedTimezone);
    const displayElement = document.getElementById('watchDisplay') as HTMLElement;
    const lightElement = displayElement;
    const view = new WatchView(watch, displayElement, lightElement);
    const controller = new WatchController(watch, view);

    controller.init();

    // Show the watch and buttons
    document.querySelector('.watch-container')!.classList.remove('hidden');
    document.getElementById('lightButton')!.classList.remove('hidden');
    document.getElementById('modeButton')!.classList.remove('hidden');
    document.getElementById('increaseButton')!.classList.remove('hidden');
});