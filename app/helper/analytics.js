import DeviceInfo from 'react-native-device-info';
import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';

import { GA_TRACKING_ID, GA_DISPATCH_INTERVAL } from 'react-native-dotenv';

GoogleAnalyticsSettings.setDispatchInterval(parseInt(GA_DISPATCH_INTERVAL, 10));
GoogleAnalyticsSettings.setDryRun(DeviceInfo.isEmulator());

const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

// gets the current screen from navigation state
function getCurrentScreen(getStateFn) {
  const navigationState = getStateFn().nav;
  if (!navigationState) { return null; }
  return navigationState.routes[navigationState.index].routeName;
}

const screenTracking = ({ getState }) => next => (action) => {
  if (action.type !== 'Navigate' && action.type !== 'Back') return next(action);

  const currentScreen = getCurrentScreen(getState);
  const result = next(action);
  const nextScreen = getCurrentScreen(getState);
  if (nextScreen !== currentScreen) {
    tracker.trackScreenView(nextScreen);
  }
  return result;
};

export { screenTracking };
export default tracker;
