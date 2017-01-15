import React, { Component } from 'react';
import tracker from '../analytics';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

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

export default class DashboardScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Dashboard',
    }
  }

  _onCallLogout = () => {
    console.log('logout not implemented yet');
    this.props.navigator.pop();
  }

  componentDidMount() {
    console.log('track screen view dashboard');
    tracker.trackScreenView('dashboard');
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
          style={styles.callLogoutButton}
          underlayColor="#949494"
          onPress={this._onCallLogout}
          >
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

