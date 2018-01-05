// const _ = require('lodash');/
const UserModel = require('../../models/user');
const UserSerializer = require('../../serializers').users;

module.exports = {
    update: (req, res) => {
        const data = req.body.data || { attributes: {}};
        UserModel.findByIdAndUpdate(req.user.id, { $set: data.attributes }, {upsert: true, new: true })
        .then((doc) => {
            res.send(UserSerializer(UserModel.tidy(doc)));
        }).catch((err) => {
            res.status(503).send({ error: 'server error catched', err });
        });
    },
    findById: () => {},
    getAll: (req, res) => {
        UserModel.find().lean().then(docs => {
            res.send(UserSerializer(docs, (item) => UserModel.tidy(item, true)));
        });
    },
};
