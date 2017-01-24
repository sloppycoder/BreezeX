import React, { Component } from 'react';
import codePush from 'react-native-code-push';
import {
  createRouter,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';

import LoginScreen from './components/login-screen';
import DashboardScreen from './components/dashboard-screen';
import AccountHistoryScreen from './components/account-history-screen';
import TransactionDetailScreen from './components/transaction-detail-screen';

const router = createRouter(() => ({
  login: () => LoginScreen,
  dashboard: () => DashboardScreen,
  account: () => AccountHistoryScreen,
  transaction: () => TransactionDetailScreen
}));

class App extends Component {
  render() {
    return (
      <NavigationProvider router={router}>
        <StackNavigation initialRoute={router.getRoute('login')} />
      </NavigationProvider>
    );
  }
}

export default codePush(App);
