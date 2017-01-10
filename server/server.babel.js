const env = require('node-env-file');
const path = require('path');

require('babel-register');

env(path.resolve(__dirname,
  process.env.NODE_ENV === 'production'
    ? '../.env'
    : '../.test.env'
));

require('server/server').default();
