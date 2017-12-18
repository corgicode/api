const Client = require('../../config/redis');

module.exports = {
    get: Client.get,
    set: Client.set,
}
