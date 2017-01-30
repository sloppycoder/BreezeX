import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles';

export default class AccountHistoryScreen extends Component {
  static navigationOptions = {
    title:  ({ state }) => `${state.params.account.account_no} ${state.params.account.product_desc} History`
  };

  render() {
    const { account } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Transactions for account {account.account_no} will appear here momentarily</Text>
        </View>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={
            () => this.props.navigation.navigate('transaction')
          }
        >
          <Text>Transaction Detail</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

