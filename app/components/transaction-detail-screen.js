import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from '../styles';
import tracker from '../analytics';

export default class TransactionDetailScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Transaction Detail',
    }
  }

  componentDidMount() {
    console.log('track screen view transaction');
    tracker.instance.trackScreenView('transaction');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Place holder for transaction detail</Text>
        </View>
      </View>
    );
  }

}

