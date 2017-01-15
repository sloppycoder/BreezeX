const ENV = {
  AUTH0_CLIENT_ID: 'OinUIDXZfHqHWvaTEHwGwdsxIIQQShii',
  AUTH0_DOMAIN: 'vino9.auth0.com'
};

if (process.env.NODE_ENV === 'development') {
  // ENV.blah = 'dev';
}

if (process.env.NODE_ENV === 'test') {
  // ENV.blah = 'none';
}

export default ENV;
