const mongoose = require('mongoose');

const config = process.env.mongodb;
const log = require('../logs/log');

const uri = `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.db}`;
const db = mongoose.createConnection(uri, { autoIndex: true });

db.on('error', () => { log.info('MONGODB 数据库连接错误'); });

db.once('open', () => { log.info('MONGODB 数据库连接成功'); });

export default db;
