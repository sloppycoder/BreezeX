import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from '../styles';

export default class TransactionDetailScreen extends Component {
  static navigationOptions = {
    title: 'Transaction Detail',
  };

  render() {
    const { transaction } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>{transaction.memo}</Text>
        </View>
      </View>
    );
  }
}

