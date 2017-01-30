import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import LoginScreen from '../components/login-screen';
import DashboardScreen from '../components/dashboard-screen';
import AccountHistoryScreen from '../components/account-history-screen';
import TransactionDetailScreen from '../components/transaction-detail-screen';

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

const navReducer = (state, action) => (
    AppNavigator.router.getStateForAction(action, state)
);

export { navReducer };
export default AppWithNavigationState;
