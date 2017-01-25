import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import styles from '../styles';

export default class DashboardScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Dashboard',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.profile.picture }}
          />
          <Text style={styles.title}>Welcome {this.props.profile.name}</Text>
        </View>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={
            () => this.props.navigator.push('account')
          }
        >
          <Text>Account History</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={
            () => this.props.navigator.pop()
          }
        >
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

