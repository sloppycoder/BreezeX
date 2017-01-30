import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { API_URL } from 'react-native-dotenv';
import { screenTracking } from './analytics';
import { SSO_TOKEN } from './components/login-screen';

const networkInterface = createNetworkInterface({
  uri: `${API_URL}/queries`,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    console.log('sso_token is', SSO_TOKEN);
    req.options.headers.authorization = `Bearer ${SSO_TOKEN}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const logger = createLogger({
  level: 'log',
  diff: true,
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    apollo: client.reducer(),
  }),
  applyMiddleware(screenTracking, client.middleware(), logger),
);

export { client };
export default store;
