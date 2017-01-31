import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from '../styles';

// We use the gql tag to parse our query string into a query document
const dashboardQuery = gql`
query CustomerOverview {
  customer(id:1) {
    name,
    rel_id,
    casa_accounts {
      id,
      account_no,
      product_code,
      product_desc
      bal
    },
    credit_cards {
      id,
      account_no,
      bal,
      avail_credit,
      credit_limit
    }
  }
}`;

class DashboardScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    const { profile } = this.props.navigation.state.params;
    return this.props.data.loading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.avatar}
            source={{ uri: profile.picture }}
          />
          <Text style={styles.title}>Welcome {this.props.data.customer.name}</Text>
        </View>
        { this.props.data.customer.casa_accounts.map(account => (
          <TouchableHighlight
            key={account.account_no}
            style={styles.navButton}
            underlayColor="#949494"
            onPress={
              () => this.props.navigation.navigate('account', {account})
            }
          >
            <Text>{account.account_no} ${account.product_desc} ${account.bal}</Text>
          </TouchableHighlight>
        ))}
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          onPress={
            () => this.props.navigation.goBack()
          }
        >
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

DashboardScreen.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    customer: PropTypes.object,
  }).isRequired,
};

export default graphql(dashboardQuery)(DashboardScreen);
