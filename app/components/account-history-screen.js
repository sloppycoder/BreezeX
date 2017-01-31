import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from '../styles';

const accountHistoryQuery = gql`
query CasaAccountHistory($accountId: ID!) {
  casa_account(id: $accountId) {
    id,
    account_no,
    product_desc,
    transactions {
      id,
      trx_date,
      deposit_amount,
      withdrawl_amount,
      memo,
      bal
    }
  }
}
`;

class AccountHistoryScreen extends Component {
  static navigationOptions = {
    title:  ({ state }) => `${state.params.account.account_no} ${state.params.account.product_desc} History`
  };

  render() {
    console.log('AccountHistoryScreen.render', this.props.data);
    return this.props.data.loading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={styles.container}>
        { this.props.data.casa_account.transactions.map(transaction => (

        <TouchableHighlight
          style={styles.navButton}
          underlayColor="#949494"
          key={transaction.id}
          onPress={
            () => this.props.navigation.navigate('transaction', { transaction })
          }
        >
          <Text>{transaction.memo}</Text>
        </TouchableHighlight>
      ))}
      </View>
    );
  }
}

AccountHistoryScreen.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    casa_accounts: PropTypes.object,
  }).isRequired,
};

export default graphql(accountHistoryQuery, {
  options: ({ navigation }) => (
    { variables: { accountId: navigation.state.params.account.id } }
  )
})(AccountHistoryScreen);
