import React, { Component } from 'react';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import codePush from 'react-native-code-push';

import LoginScreen from './components/login-screen';
import DashboardScreen from './components/dashboard-screen';

const Router = createRouter(() => ({
  login: () => LoginScreen,
  dashboard: () => DashboardScreen,
}));

class App extends Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('login')} />
      </NavigationProvider>
    );
  }
}

export default codePush(App);
