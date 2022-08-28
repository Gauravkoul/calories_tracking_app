const authResolver = require('./auth');
const adminResolver = require('./admin');
const userResolver = require('./user');

const rootResolver = {
  ...authResolver,
  ...adminResolver,
  ...userResolver,
};

module.exports = rootResolver;