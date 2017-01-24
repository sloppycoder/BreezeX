import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, API_URL } from 'react-native-dotenv';
import styles from '../styles';
import { tracker } from '../analytics';

const lock = new Auth0Lock({ clientId: AUTH0_CLIENT_ID, domain: AUTH0_DOMAIN });

const registerDevice = (accessToken, deviceToken) => {
  fetch(`${API_URL}/device_registration`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'applicaiton/json'
    },
    body: JSON.stringify({
      device_registration: {
        device_uuid: DeviceInfo.getUniqueID(),
        token: deviceToken.token,
        model: DeviceInfo.getModel(),
        device_id: DeviceInfo.getDeviceId(),
        sso: accessToken
      }
    })
  })
    .then(() => { console.log('registered device with server at', API_URL); })
    .catch(() => {
      Alert.alert(
        'Registration Failed',
        'Unable to register this device with the server',
        [
          { text: 'OK' },
        ]
      );
    });
};

export default class LoginScreen extends Component {
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

    console.log('track screen view login');
    tracker.trackScreenView('login');
  }

  _onLogin = () => {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      // push notification registration does not work in simulator
      // when running in simulator, this.state will be empty here.
      registerDevice(token.idToken, this.state ? this.state.token : 'none');

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Fictional Bank</Text>
          <Text style={styles.subtitle}>Where all your money belong</Text>
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
