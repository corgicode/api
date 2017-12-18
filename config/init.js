/**
 * Configuration file, initializes the redis, mongo connection
 * and passport, to keep index.js cleaner.
 *
 * Different to config/index.js that holds a bunch of
 * variables or constants used accross the application
 */

// To check all the env variables on alphabetical order
// Object.keys(process.env).sort().forEach(function(v) {
//           console.log(v, process.env[v]);
// });

module.exports = (app) => {
  require('./mongo')();
  require('./redis');
  require('./passport')(app);
  require('./interceptors')(app);
}
