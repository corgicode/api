/**
 * @file
 *  Challenge model, has the schema for challenges and common functions for challenges
 * @requires ./
 * @author codecorgi
 * @memberof Models
 */
const mongoose = require('../');
const _ = require('lodash');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  created: { type: Date, default: Date.now },
  _user: {
    type: ObjectId,
    required: [true, 'Challenge requires a user'],
    ref: 'User',
  },
  visible: Boolean,
  number: {
    type: String,
    required: [true, 'A number is required for challenges'],
    index: { unique: true },
  },
  title: { 
    type: String,
    required: [true, 'Title is required'],
  },
  short_title: String,
  head: {
    owner: String,
    difficulty: String,
    challenge_type: String,
    date_created: Date,
    priority: String,
  },
  body: {
    description: String,
    short_description: String,
    extra_points: String,
    attachments: [{ name: String, url: String }],
  },
  technical_notes: String,
  tags: [String],
  source: [{ name: String, url: String }],
  procedure: String,
  coding: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

challengeSchema.virtual('url').get(function () {
    return `/challenge/${this.number}/${_.kebabCase(this.title)}`;
});

challengeSchema.virtual('head.resolution').get(function () {
  return 'Unresolved';
});

challengeSchema.virtual('head.status').get(function () {
  return 'New';
});

challengeSchema.statics.groom = (challenge) => {
  if (!challenge) {
    return {};
  }

  return challenge;
}

module.exports = mongoose.model('Challenge', challengeSchema);
