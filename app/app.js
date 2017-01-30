import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { ApolloProvider } from 'react-apollo';

import { screenTracking } from './helper/analytics';
import client from './helper/apollo-client';
import AppWithNavigationState, { navReducer } from './helper/navigator';

// logger for help debugging
const logger = createLogger({
  level: 'log',
  diff: true,
});

const INIT_STATE = {
  app: {
    auth: 0, // 0 un-authenicated, 1 authentiated, 2 passed OTP
    ssoToken: '',
  }
};

function dummy(state = INIT_STATE, action) {
  return state;
}

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    nav: navReducer,
    app: dummy,
  }),
  applyMiddleware(
    client.middleware(),
    logger,
    ),
);

class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <AppWithNavigationState initialRouteName="login" />
      </ApolloProvider>
    );
  }
}

const getAppState = () => store.getState().app;

export { store, getAppState };
export default App;
