const CommentModel = require('../../models/comment');
const SubmitModel = require('../../models/submit');

const newComment = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send({ error: 'must login to add a comment' });
  }
  if (!req.body.data || !req.body.data.body) {
    return res.status(422).send({ error: 'comment data is missing' });
  }
  const submissionId = req.body.data.submission;
  if (!submissionId) {
    return res.status(422).send({ error: 'Missing submission id' });
  }
  
  SubmitModel.findById(submissionId).then((doc) => {
    if (!doc) {
      return res.status(404).send({ error: 'submission not found' });
    }
    const comment = new CommentModel(req.body.data);
    comment._user = req.user._id;
    comment.submission = submissionId;
    doc.comments.push(comment);
    doc.save();
    return comment.save();
  }).then((doc) => {
    return res.send({ doc });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

const getAll = (req, res) => {
  CommentModel.find({}).then((docs) => {
    res.send(docs);
  });
};

const update = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send({ error: 'must login to edit a comment' });
  }
  if (!req.body.data || !req.body.data.body || !req.params.id) {
    return res.status(422).send({ error: 'comment data is missing' });
  }
  const data = { body: req.body.data.body, edited: true };
  CommentModel.findOneAndUpdate({_id: req.params.id, _user: req.user.id, deleted: false}, {$set: data}, {new: true})
  .then((doc) => {
    return res.send({ doc });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

const deleteComment = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send({ error: 'must login to delete a comment' });
  }
  if (!req.params.id) { 
    return res.status(422).send({ error: 'comment data is missing' });
  }
  const data = { body: '[deleted]', deleted: true };
  CommentModel.findOneAndUpdate({_id: req.params.id, _user: req.user.id}, {$set: data}, {new: true})
  .then((doc) => {
    return res.send({ doc });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

const getById = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'Missing comment id' });
  }
  CommentModel.findById(req.params.id).then((doc) => {
    console.log('Retrieved comment: ', req.params.id);
    return res.send({ doc });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

const findBySubmission = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'Missing comment id' });
  }
  CommentModel.find({submission: req.params.id, comment: null})
  .populate('_user', 'codecorgi_url avatar flagged username')
  .then((docs) => {
    return res.send({ docs });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

module.exports = {
  new: newComment,
  getAll,
  getById,
  update,
  delete: deleteComment,
  findBySubmission,
};
