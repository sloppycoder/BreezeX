/* eslint import/no-mutable-exports: 0 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  Platform
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import PushNotification from 'react-native-push-notification';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from 'react-native-dotenv';
import styles from '../styles';
import badge from '../images/badge.png';

const lock = new Auth0Lock({
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
});

let SSO_TOKEN = 'none';
export { SSO_TOKEN };

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  componentDidMount() {
    PushNotification.configure({
      onRegister: (token) => {
        console.log('registered for push notificaiton. device token is', token);
        this.state = { token };
      },
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },
      senderID: 'YOUR GCM SENDER ID',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  onLogin = () => {
    let lockOptions = { closable: true };
    // specificy 'touchid' on Android device will cause login to fail
    if (Platform.OS === 'ios') {
      lockOptions = { connections: ['touchid'], closable: true };
    }

    lock.show(lockOptions, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      SSO_TOKEN = token.idToken;
      console.log('Logged in, got sso token', SSO_TOKEN);

      this.props.navigation.navigate('dashboard', { profile });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={badge}
          />
          <Text style={styles.title}>Geek Bank</Text>
          <Text style={styles.subtitle}>we care about our code not your money!</Text>
        </View>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={this.onLogin}
        >
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

