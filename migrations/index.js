/** TODO:
 * - dynamically load all migrations
 * - Store in the db which migrations have run yet
 * - Allow to run a specific migration by name
 * - Allow to run the down function in a migration */
const Promise = require('bluebird');
const ccAdminUser = require('./1519748712-codecorgi-admin-user.js');
const mongoConnection = require('../config/mongo');
// const challenges0to8 = require('./1519748712-challenges-0-to-8.js');

const migrations = [
    ccAdminUser,
    // challenges0to8,
];

const run = (dir, res) => {
    const promises = [];
    migrations.forEach(m => {
        promises.push(m[dir]());
    });
    return Promise.all(promises).then(() => {
        return res.send({ msg: `${promises.length} Migrations ran successfully`});
    }).catch((e) => {
        console.error('Failed to create admin user');
        res.send({ error: e });
    });
}

const up = (req, res) => {
    run('up', res);
}

const down = () => {
    return run('down');
}

module.exports = {
    up,
    down,
}

require('make-runnable/custom')({
    printOutputFrame: false
});
