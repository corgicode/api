/*
Initializes the connection to the mongo database
*/
const mongoose = require('../models');
const db = require('../models').connection;
const Helpers = require('../lib/helpers');

module.exports = (callback) => {
  let MONGO_DB;
  const DOCKER_DB = process.env.MONGO_PORT;
  MONGO_DB = 'mongodb://localhost/codecorgidata';
  if (DOCKER_DB) {
    MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/codecorgidata';
  }

  mongoose.connect(MONGO_DB, {
    useMongoClient: true,
    user: Helpers.getEnv('MONGO_ROOT_USERNAME', undefined),
    pass: Helpers.getEnv('MONGO_ROOT_PASSWORD', undefined),
  });

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log(`connected to mongo db: ${MONGO_DB}`);
    if (typeof callback === 'function') {
      console.log('Running callback');
      callback();
    }
  });
}
