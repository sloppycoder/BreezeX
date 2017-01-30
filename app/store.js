import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { connect } from 'react-redux';

import { API_URL } from 'react-native-dotenv';
import { SSO_TOKEN } from './components/login-screen';

import { screenTracking } from './analytics';

import LoginScreen from './components/login-screen';
import DashboardScreen from './components/dashboard-screen';
import AccountHistoryScreen from './components/account-history-screen';
import TransactionDetailScreen from './components/transaction-detail-screen';

// initialize the apollo client.
const networkInterface = createNetworkInterface({
  uri: `${API_URL}/queries`,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    console.log('sso_token is', SSO_TOKEN);
    req.options.headers.authorization = `Bearer ${SSO_TOKEN}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

// logger for help debugging
const logger = createLogger({
  level: 'log',
  diff: true,
});

const AppNavigator = StackNavigator(
  {
    dashboard: { screen: DashboardScreen },
    account: { screen: AccountHistoryScreen },
    transaction: { screen: TransactionDetailScreen },
    login: { screen: LoginScreen },
  },
  {
    initialRouteName: 'login'
  }
);

const AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    nav: (state, action) => (
      AppNavigator.router.getStateForAction(action, state)
    ),
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


export { store };
export default App;
