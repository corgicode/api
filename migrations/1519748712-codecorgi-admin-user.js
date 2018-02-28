const filename = `${__filename.slice(__dirname.length + 1, -3)}`;
const UserModel = require('../models/user');

const up = () => {
    console.log(`Running up for ${filename}`);
    const data = { username: 'codecorgi', email: 'admin@codecorgi.co', github_id: 10 };
    const query = { username: data.username };
    return UserModel.findOne({ username: 'codecorgi' }).then(doc => {
        if (doc) {
            return UserModel.update(query, data);
        }
        const user = new UserModel(data);
        return user.save();
    });
}

const down = () => {
    return;
}

module.exports = {
    up,
    down,
}
