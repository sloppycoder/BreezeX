const ENV = {
  AUTH0_CLIENT_ID: 'OinUIDXZfHqHWvaTEHwGwdsxIIQQShii',
  AUTH0_DOMAIN: 'vino9.auth0.com',
  GA_TRACKING_ID: 'UA-90336890-1',
  GA_DISPATCH_INTERVAL: 30, // interval for upload analytics data to server.
};

if (process.env.NODE_ENV === 'development') {
  // ENV.blah = 'dev';
}

if (process.env.NODE_ENV === 'test') {
  // ENV.blah = 'none';
}

export default ENV;
