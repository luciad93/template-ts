import { Watch } from "./models/Watch";
import { WatchView } from "./views/WatchView";
import { WatchController } from "./controllers/WatchController";
import './styles/watch.css'
import * as moment from "moment-timezone"; 


// Populate scrolling menu with options of timezone
const timezoneSelect = document.getElementById('timezoneSelect') as HTMLSelectElement;
const timezones = moment.tz.names();
timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    timezoneSelect.appendChild(option);
});


// 
document.getElementById('createWatchButton')!.addEventListener('click', () => {
    const selectedTimezone = timezoneSelect.value;
    createNewWatch(selectedTimezone);
});

// Creation of new watch
function createNewWatch(timezone: string) {
    const watch = new Watch(timezone);
    const watchContainer = document.createElement('div');
    watchContainer.classList.add('watch-container');

    const watchDisplay = document.createElement('div');
    watchDisplay.classList.add('watch-display');
    watchDisplay.innerHTML = '<span class="hours">HH</span>:<span class="minutes">MM</span>';

    const hoursElement = watchDisplay.querySelector('.hours') as HTMLElement;
    const minutesElement = watchDisplay.querySelector('.minutes') as HTMLElement;

    const lightButton = document.createElement('button');
    lightButton.textContent = 'Light';
    lightButton.id = "lightButton";
    const modeButton = document.createElement('button');
    modeButton.textContent = 'Mode';
    modeButton.id = "modeButton";
    const increaseButton = document.createElement('button');
    increaseButton.textContent = 'Increase';
    increaseButton.id = "increaseButton";
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.id = "resetButton";

    watchContainer.appendChild(watchDisplay);
    watchContainer.appendChild(lightButton);
    watchContainer.appendChild(modeButton);
    watchContainer.appendChild(increaseButton);
    watchContainer.appendChild(resetButton);

    document.getElementById('watchesContainer')!.appendChild(watchContainer);

    const view = new WatchView(watch, hoursElement, minutesElement, watchDisplay, watchDisplay);
    const controller = new WatchController(watch, view);

    lightButton.addEventListener('click', () => controller.lightButtonPress());
    modeButton.addEventListener('click', () => controller.modeButtonPress());
    increaseButton.addEventListener('click', () => controller.increaseButtonPress());
    resetButton.addEventListener('click', () => controller.resetButtonPress());

    controller.init();


}