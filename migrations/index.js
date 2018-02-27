/** TODO:
 * - dynamically load all migrations
 * - Store in the db which migrations have run yet
 * - Allow to run a specific migration by name
 * - Allow to run the down function in a migration */
const challenges0to8 = require('./1519748712-challenges-0-to-8.js');

const migrations = [
    challenges0to8,
];

const run = (dir) => {
    let count = 0;
    migrations.forEach(m => {
        m[dir]();
        count++;
    });
    return `${count} Migrations ran successfully`;
}

const up = () => {
    return run('up');
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
