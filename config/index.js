/**
 * contains a few values
 * that are constant and will be used
 * accross the application
 */
const Helpers = require('../lib/helpers');

const GITHUB_CLIENT_ID = Helpers.getEnv('GITHUB_CLIENT_ID');
const GITHUB_CLIENT_SECRET = Helpers.getEnv('GITHUB_CLIENT_SECRET');
const GITHUB_CALLBACK_URL = Helpers.getEnv('GITHUB_CALLBACK_URL');
const GITHUB_APP_NAME = Helpers.getEnv('GITHUB_APP_NAME');

const ADMIN_API_KEY = Helpers.getEnv('ADMIN_API_KEY');

const BASE_URL = Helpers.getEnv('BASE_URL', 'http://localhost:3001');

const VERSION = require('../package.json').version;

module.exports = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  GITHUB_APP_NAME,
  ADMIN_API_KEY,
  VERSION,
  BASE_URL,
}
