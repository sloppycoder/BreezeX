import DeviceInfo from 'react-native-device-info';
import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge';

import env from './config/environment';

GoogleAnalyticsSettings.setDispatchInterval(env.GA_DISPATCH_INTERVAL);
GoogleAnalyticsSettings.setDryRun(DeviceInfo.isEmulator());

const navigationStateKey = 'navigation';
const tracker = new GoogleAnalyticsTracker(env.GA_TRACKING_ID);
console.log('create new tracker');

// gets the current screen from navigation state
function getCurrentScreen(getStateFn) {
  const navigationState = getStateFn()[navigationStateKey];
  // navigationState can be null when exnav is initializing
  if (!navigationState) return null;

  const { currentNavigatorUID, navigators } = navigationState;
  if (!currentNavigatorUID) return null;

  const { index, routes } = navigators[currentNavigatorUID];
  const { routeName } = routes[index];
  return routeName;
}

const screenTracking = ({ getState }) => next => (action) => {
  if (!action.type.startsWith('EX_NAVIGATION')) return next(action);
  const currentScreen = getCurrentScreen(getState);
  const result = next(action);
  const nextScreen = getCurrentScreen(getState);
  if (nextScreen !== currentScreen) {
    tracker.screenView(nextScreen);
  }
  return result;
};

export { tracker };
export default screenTracking;
