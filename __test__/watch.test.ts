import { Watch } from '../src/models/Watch';
import { Mode } from '../src/models/ModeStateMachine';

describe('Watch', () => {
  let watch: Watch;

  beforeEach(() => {
    watch = new Watch("Europe/Paris");
  });

  test('should change mode to MODE_ST_HOURS on mode button press', () => {
    watch.modeButtonPress();
    expect(watch.getMode()).toBe(Mode.MODE_ST_HOURS);
  });

  test('should change mode to MODE_ST_MINUTES on second mode button press', () => {
    watch.modeButtonPress();
    watch.modeButtonPress();
    expect(watch.getMode()).toBe(Mode.MODE_ST_MINUTES);
  });

  test('should return to MODE_ST_VIEW mode on third mode button press', () => {
    watch.modeButtonPress();
    watch.modeButtonPress();
    watch.modeButtonPress();
    expect(watch.getMode()).toBe(Mode.MODE_ST_VIEW);
  });

  test('should increase hours in MODE_ST_HOURS mode', () => {
    watch.modeButtonPress();
    const currentHour = watch.getCurrentTime().hours();
    watch.increaseButtonPress();
    expect(watch.getCurrentTime().hours()).toBe((currentHour + 1) % 24);
  });

  test('should increase minutes in MODE_ST_MINUTES mode', () => {
    watch.modeButtonPress();
    watch.modeButtonPress();
    const currentMinute = watch.getCurrentTime().minutes();
    watch.increaseButtonPress();
    expect(watch.getCurrentTime().minutes()).toBe((currentMinute + 1) % 60);
  });

  test('should toggle light on and off', () => {
    expect(watch.isLightOn()).toBe(false);
    watch.lightButtonPress();
    expect(watch.isLightOn()).toBe(true);
    watch.lightButtonPress();
    expect(watch.isLightOn()).toBe(false);
  });
});
