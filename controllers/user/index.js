const to_jsonapi = require('../../serializers').to_jsonapi;
// const _ = require('lodash');/
const UserModel = require('../../models/user');

module.exports = {
    update: () => {},
    findById: () => {},
    getAll: (req, res) => {
        UserModel.find().lean().then(docs => {
            res.send(to_jsonapi(docs, 'users', (item) => UserModel.tidy(item, true)));
        });
    },
};
