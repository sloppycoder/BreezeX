/* eslint no-param-reassign: ["error", { "props": false }]*/

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SSO_TOKEN } from '../components/login-screen';
import env from '../config/environment';

const networkInterface = createNetworkInterface({
  uri: `${env.API_URL}/queries`,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    console.log('sso_token is', SSO_TOKEN);
    console.log('API_URL in networkInterface is', env.API_URL);
    req.options.headers.authorization = `Bearer ${SSO_TOKEN}`;
    next();
  }
}]);

export default new ApolloClient({
  networkInterface
});
