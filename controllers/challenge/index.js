const ChallengeModel = require('../../models/challenge');
const cache = require('../../config/redis');
const ChallengeSerializer = require('../../serializers').challenges;
const ErrorsSerializer = require('../../serializers').errors;

const update = (req, res) => {
  const data = req.body.data.attributes;
  ChallengeModel.findById(req.params.id).then((doc) => {
    const obj = Object.assign(doc, data);
    return obj.save();
  }).then((doc) => {
    cache.del('cc_html_challenges');
    cache.del(`cc_html_challenge_${doc.id}`);
    res.send(ChallengeSerializer(doc));
  });
};

const getAll = (req, res) => {
  ChallengeModel.find({}, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Retrieved submissions', list.length);
      res.send(ChallengeSerializer(list));
    }
  });
};

const getById = (req, res) => {
  ChallengeModel.findById(req.params.id).then((doc) => {
    console.log('Retrieved challenge: ', req.params.id);
    return res.send(ChallengeSerializer(doc));
  }).catch((err) => {
    return res.status(503).send(ErrorsSerializer(err));
  });
};

const post = (req, res) => {
  const data = req.body.attributes || {};
  data._user = req.user._id;

  const challenge = new ChallengeModel(data);
  challenge.save().then((doc) => {
    cache.del('cc_challenges');
    res.status(201).send(ChallengeSerializer(doc));
  }).catch((err) => {
    res.status(500).send(ErrorsSerializer(err));
  });
};

const get = (req, res) => {
  ChallengeModel.find({}, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Retrieved submissions', list.length);
      res.send(ChallengeSerializer(list));
    }
  });
};

const getByNumber = (req, res) => {
  ChallengeModel.findOne({ number : req.params.number }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).send(ErrorsSerializer(err));
    } else {
      console.log('Retrieved submission by number', req.params.number);
      res.send(ChallengeSerializer(doc));
    }
  });
};

module.exports = {
  getAll,
  getById,
  update,
  post,
  get,
  getByNumber,
};
