import { Watch } from "./models/Watch";
import { WatchView } from "./views/WatchView";
import { WatchController } from "./controllers/WatchController";
import { Button } from "./utils/Button";
import { UserGuide } from "./utils/UserGuide";
import './styles/index.css'
import './styles/watch.css';
import './styles/button.css';
import './styles/popupcontainer.css'
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

// Creation of new watch
function createNewWatch(timezone: string) {
    console.log("Creating new watch: ", timezone);
    const watch = new Watch(timezone);

    const outerContainer = document.createElement('div');
    outerContainer.classList.add('outer-container');

    const watchContainer = document.createElement('div');
    watchContainer.classList.add('watch-container');

    const watchDisplay = document.createElement('div');
    watchDisplay.classList.add('watch-display');
    watchDisplay.innerHTML = '<span class="hours">HH</span>:<span class="minutes">MM</span><span class="format"></span>';

    const hoursElement = watchDisplay.querySelector('.hours') as HTMLElement;
    const minutesElement = watchDisplay.querySelector('.minutes') as HTMLElement;

    const lightButton = new Button('lightButton', 'L');
    const modeButton = new Button('modeButton', 'M');
    const increaseButton = new Button('increaseButton', '+');
    const resetButton = new Button('resetButton', 'R');
    const formatButton = new Button('formatButton', 'F');

    const timezoneDisplay = document.createElement('div');
    timezoneDisplay.classList.add('timezone-display');
    timezoneDisplay.textContent = timezone;



    watchContainer.appendChild(watchDisplay);
    watchContainer.appendChild(lightButton.getElement());
    watchContainer.appendChild(modeButton.getElement());
    watchContainer.appendChild(increaseButton.getElement());
    watchContainer.appendChild(resetButton.getElement());
    watchContainer.appendChild(formatButton.getElement());

    outerContainer.appendChild(timezoneDisplay);
    outerContainer.appendChild(watchContainer);
    
    
    document.getElementById('watchesContainer')!.appendChild(outerContainer);

    const view = new WatchView(watch, hoursElement, minutesElement, watchDisplay, watchDisplay);
    const controller = new WatchController(watch, view);

    lightButton.onClick(() => controller.lightButtonPress());
    modeButton.onClick(() => controller.modeButtonPress());
    increaseButton.onClick(() => controller.increaseButtonPress());
    resetButton.onClick(() => controller.resetButtonPress());
    formatButton.onClick(() => controller.formatButtonPress());

    controller.init();


}

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('createWatchButton')!.addEventListener('click', () => {
        const selectedTimezone = timezoneSelect.value;
        createNewWatch(selectedTimezone);
    });

    createNewWatch("Europe/Paris");
    createNewWatch("America/Caracas");
    createNewWatch("America/Mexico_City");
    createNewWatch("America/New_York");

    // 
    const userGuide = new UserGuide('userGuideButton', 'userGuidePopup', 'closePopupButton');

    const removeAllWatchesButton = document.getElementById('removeAllWatchesButton');
    removeAllWatchesButton.addEventListener('click', () => {
        const watchesContainer = document.getElementById('watchesContainer');
        watchesContainer.innerHTML = '';
    });


});