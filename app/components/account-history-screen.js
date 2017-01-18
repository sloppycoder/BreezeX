import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import tracker from '../analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#15204C',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 110,
    width: 102,
    marginBottom: 80,
  },
  avatar: {
    alignSelf: 'center',
    height: 128,
    width: 240,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  callLogoutButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

  _onCallTransactionDetail = () => {
    this.props.navigator.push('transaction');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Place holder for account history</Text>
        </View>
        <TouchableHighlight
          style={styles.callLogoutButton}
          underlayColor="#949494"
          onPress={this._onCallTransactionDetail}
          >
          <Text>Transaction Detail</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

