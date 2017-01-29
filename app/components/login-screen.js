import React, { Component } from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  TouchableHighlight,
  Platform
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, API_URL } from 'react-native-dotenv';
import styles from '../styles';
import badge from '../images/badge.png';

const lock = new Auth0Lock({
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
});

let SSO_TOKEN = 'none';
export { SSO_TOKEN };

export default class LoginScreen extends Component {
  componentDidMount() {
    console.log('API URL is', API_URL);

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

  _onLogin = async () => {
    let lockOptions = { closable: true };
    if (Platform.OS === 'ios') {
      lockOptions = { connections: ['touchid'], closable: true };
    }
    console.log('Lock Options', lockOptions);
    lock.show(lockOptions, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      SSO_TOKEN = token.idToken;
      console.log('Logged in, got sso token', SSO_TOKEN);

      this.props.navigator.push('dashboard', { profile, token });
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
          onPress={this._onLogin}
        >
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

