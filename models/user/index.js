/**
 * @module models/user
 *  User model, has the schema for users and common functions for users
 * @requires ./
 * @author codecorgi
 * @memberof Models
 */
const mongoose = require('../');
// const _ = require('lodash');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  accounts: { github: Object },
  name: String,
  avatar: Object,
  heroImage: Object,
  deleted: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false },
  private: { type: Boolean, default: false },
  github_id: {
    type: Number,
    index: { unique: true },
  },
  profile: {
    tagline: String,
    bio: String,
    location: String,
    links: [{ name: String, url: String }],
    linkedin_url: String,
    twitter_url: String,
    github_url: String,
    company: String,
    hireable: { type: Boolean, default: false },
  },
  submissions : [{ type: ObjectId, ref: 'Submit' }],
}, {
  timestamps: true,
  toObject: {
    virtual: true,
  },
  toJSON: {
    virtual: true,
  }
});

userSchema.virtual('profile_url').get(function() {
    return `/profile/${this.username}`;
});

userSchema.statics.tidy = (user, restrict) => {
  if (!user) {
    return {};
  }

  let data = {};
  data.id = user._id;
  data.avatar = user.avatar;
  // data.heroImage = user.heroImage;
  data.created = user.created;
  data.deleted = user.deleted;
  data.flagged = user.flagged;
  data.private = user.private;
  data.name = user.name;
  data.username = user.username;
  data.github_id = user.github_id;
  data.profile_url = user.profile_url;
  if (restrict) return data;
  data.submissions = user.submissions;
  data.profile = user.profile;
  return data;
}

module.exports = mongoose.model('User', userSchema);
