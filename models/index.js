/**
 * @file Base file for the models
 * @requires mongoose
 * @author codecorgi
 * @namespace Models
 */
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = mongoose;
