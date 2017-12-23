/**
 * TODO: more cleanup is needed so that this file basically
 * just initializes the app, and all the other
 * routes and information should be moved to their own classes
 * @file Main entry point file for the application
 * @author codecorgi
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/**
 * Requiring config/init will initialize the databases
 * and plugins, like a decorator
 */
require('./config/init')(app);

const auth = require('./auth');

app.use(require('connect-logger')({/* options */}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  req.start = Date.now();
  next();
});

const routes = require('./routes');

app.use('/api/auth', auth);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`codecorgi node app listening on port ${PORT}!`);
});
