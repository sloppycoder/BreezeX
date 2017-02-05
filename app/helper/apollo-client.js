/* eslint no-param-reassign: ["error", { "props": false }]*/

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { API_URL } from 'react-native-dotenv';
import { SSO_TOKEN } from '../components/login-screen';

const networkInterface = createNetworkInterface({
  uri: `${API_URL}/queries`,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    console.log('sso_token is', SSO_TOKEN);
    console.log('API_URL in networkInterface is', API_URL);
    req.options.headers.authorization = `Bearer ${SSO_TOKEN}`;
    next();
  }
}]);

export default new ApolloClient({
  networkInterface
});
