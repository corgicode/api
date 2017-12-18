const mongoose = require('../');
const md = require('marked');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SubmitSchema = new Schema({
  _user: {
    type: ObjectId,
    required: [true, 'User id is required, please login'],
    ref: 'User',
  },
  challenge: {
    type: ObjectId,
    required: [true, 'Challenge id is required'],
    ref: 'Challenge',
  },
  comments: [{ 
    type: ObjectId,
    ref: 'Comment',
  }],
  repo: String,
  demo: String,
  advantage: String,
  description: String,
  struggle: String,
  valid: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false },
  visible: { type: Boolean, default: false },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

SubmitSchema.virtual('rendered_advantage').get(function() {  
    return this.advantage ? md(this.advantage) : '';
});

SubmitSchema.virtual('rendered_struggle').get(function() {  
    return this.struggle ? md(this.struggle) : '';
});

module.exports = mongoose.model('Submit', SubmitSchema);
