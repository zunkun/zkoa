const redis = require('redis');
const log = require('../logs/log');
const config = process.env.config;

const client = redis.createClient(config.options || {});

client.on('connect', function () {
	log.info('REDIS CONNECT SUCCEED');
});

client.on('error', function (err) {
	log.error('REDIS CONNECT ERROR', err);
});

module.exports = client;
