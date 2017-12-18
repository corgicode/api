/**
 * @file
 *  Challenge model, has the schema for challenges and common functions for challenges
 * @requires ./
 * @author codecorgi
 * @memberof Models
 */
const mongoose = require('../');
// const _ = require('lodash');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _user: {
    type: ObjectId,
    required: [true, 'Comment requires a user'],
    ref: 'User',
  },
  submission: {
    type: ObjectId,
    required: [true, 'Comment requires a submission'],
    ref: 'Submit',
  },
  parentComment: {
    type: ObjectId,
    ref: 'Comment',
  },
  visible: Boolean,
  body: String, 
  //Deleted means deleted by user. Flagged means deleted by admins.
  deleted: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false },
  edited: { type: Boolean, default: false },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

commentSchema.virtual('url').get(function () {
    return `/comment/${this._id}`;
});

commentSchema.statics.groom = (comment) => {
  if (!comment) {
    return {};
  }

  return comment;
}

module.exports = mongoose.model('Comment', commentSchema);
