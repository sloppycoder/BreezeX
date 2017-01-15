import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Auth0Lock from 'react-native-lock';
import env from '../config/environment';
import tracker from '../analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#15204C',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 4,
    color: '#FFFFFF',
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const lock = new Auth0Lock({ clientId: env.AUTH0_CLIENT_ID, domain: env.AUTH0_DOMAIN });

export default class LoginScreen extends Component {

  _onLogin = () => {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      AsyncStorage.multiSet([
        ['AUTH0-PROFILE', JSON.stringify(profile)],
        ['AUTH0-TOKEN', JSON.stringify(token)]
      ])
        .then(
        () => this.props.navigator.push('dashboard', { profile, token }),
        () => console.log('cannot storage token to storage!')
        );
    });
  }

  componentDidMount() {
    console.log('track screen view login');
    tracker.trackScreenView('login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Fictional Bank</Text>
          <Text style={styles.subtitle}>Where all your money belong</Text>
        </View>
        <TouchableHighlight
          style={styles.signInButton}
          underlayColor="#949494"
          onPress={this._onLogin}
          >
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
