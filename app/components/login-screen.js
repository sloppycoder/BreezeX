import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import DeviceInfo from 'react-native-device-info';

import env from '../config/environment';
import styles from '../styles';
import { tracker } from '../analytics';

const lock = new Auth0Lock({ clientId: env.AUTH0_CLIENT_ID, domain: env.AUTH0_DOMAIN });

const registerDevice = (token) => {
  fetch(`${env.API_URL}/device_registration`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'applicaiton/json'
    },
    body: JSON.stringify({
      device_uuid: DeviceInfo.getUniqueID(),
      model: DeviceInfo.getModel(),
      device_id: DeviceInfo.getDeviceId()
    })
  })
    .then(() => { console.log('registered device with server'); })
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
      registerDevice(token.idToken);

      AsyncStorage.multiSet([
        ['AUTH0-PROFILE', JSON.stringify(profile)],
        ['AUTH0-TOKEN', JSON.stringify(token)]
      ])
        .then(
        () => this.props.navigator.push('dashboard', { profile, token }),
        () => console.log('cannot storage token to storage!')
        );
    });
  };

  render() {
    return (
      <View style={styles.container} >
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
      </View >
    );
  }
}
