import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { screenTracking } from './analytics';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = applyMiddleware(screenTracking)(createStoreWithNavigation)(
  combineReducers({
    navigation: NavigationReducer,
  })
);

export default store;
