import React, { Component } from 'react';
import codePush from 'react-native-code-push';
import {
  createRouter,
  NavigationContext,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
import { ApolloProvider } from 'react-apollo';

import LoginScreen from './components/login-screen';
import DashboardScreen from './components/dashboard-screen';
import AccountHistoryScreen from './components/account-history-screen';
import TransactionDetailScreen from './components/transaction-detail-screen';

import store, { client } from './store';

const router = createRouter(() => ({
  login: () => LoginScreen,
  dashboard: () => DashboardScreen,
  account: () => AccountHistoryScreen,
  transaction: () => TransactionDetailScreen
}));

const navigationContext = new NavigationContext({ router, store });

class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={router.getRoute('login')} />
        </NavigationProvider>
      </ApolloProvider>
    );
  }
}

export default codePush(App);
