// const _ = require('lodash');/
const UserModel = require('../../models/user');
const UserSerializer = require('../../serializers').users;

module.exports = {
    update: () => {},
    findById: () => {},
    getAll: (req, res) => {
        UserModel.find().lean().then(docs => {
            res.send(UserSerializer(docs, (item) => UserModel.tidy(item, true)));
        });
    },
};
