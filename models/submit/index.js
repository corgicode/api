const mongoose = require('../');

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

SubmitSchema.index({ _user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model('Submit', SubmitSchema);
