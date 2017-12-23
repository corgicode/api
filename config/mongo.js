/*
Initializes the connection to the mongo database
*/
const mongoose = require('../models');
const db = require('../models').connection;

module.exports = () => {
  let MONGO_DB;
  let DOCKER_DB = process.env.MONGO_PORT;
  if (DOCKER_DB) {
    MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/codecorgidata';
  } else {
    MONGO_DB = 'mongodb://localhost/codecorgidata';
  }

  mongoose.connect(MONGO_DB, { useMongoClient: true });

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log(`connected to mongo db: ${MONGO_DB}`);
  });
}
