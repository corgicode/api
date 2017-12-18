/**
 * Initializes the redis client and returns an object that can be used to
 * save and retrieve data from redis safely
 */
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_PORT = process.env.REDIS_PORT || '6379';

const client = redis.createClient(REDIS_PORT.replace('tcp', 'redis'));

client.on('error', (err) => {
  console.warn('Redis error ' + err);
});

client.on('ready', () => {
  console.log('Redis client ready');
});

module.exports = client;
