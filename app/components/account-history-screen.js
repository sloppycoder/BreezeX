import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles';
import tracker from '../analytics';

export default class AccountHistoryScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Account History',
    }
  }

  componentDidMount() {
    console.log('track screen view account');
    tracker.instance.trackScreenView('account');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Place holder for account history</Text>
        </View>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={
            () => this.props.navigator.push('transaction')
          }
        >
          <Text>Transaction Detail</Text>
        </TouchableHighlight>
      </View>
    );
  }

}
