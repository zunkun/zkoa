'use strict';
const path = require('path');
module.exports = {
	appenders: {
		consoleLogger: {
			type: 'console'
		},
		resLogger: {
			type: 'dateFile',
			filename: path.resolve(__dirname, '../../logs/response/response'),
			pattern: '_yyyy-MM-dd-hh.log',
			alwaysIncludePattern: true,
			daysToKeep: 10,
			maxLogSize: 20971520,
			backups: 3,
			encoding: 'utf-8'
		},
		errorLogger: {
			type: 'dateFile',
			filename: path.resolve(__dirname, '../../logs/error/error'),
			pattern: 'yyyy-MM-dd.log',
			alwaysIncludePattern: true,
			daysToKeep: 10,
			maxLogSize: 20971520,
			backups: 3,
			encoding: 'utf-8'
		},
		logLogger: {
			type: 'dateFile',
			filename: path.resolve(__dirname, '../../logs/log/log'),
			pattern: 'yyyy-MM-dd-hh.log',
			alwaysIncludePattern: true,
			daysToKeep: 10,
			maxLogSize: 20971520,
			backups: 3,
			encoding: 'utf-8'
		}
	},
	categories: {
		default: { appenders: ['consoleLogger'], level: 'all' },
		resLogger: { appenders: ['resLogger', 'consoleLogger'], level: 'info' },
		errorLogger: { appenders: ['errorLogger', 'consoleLogger'], level: 'error' },
		logLogger: { appenders: ['logLogger', 'consoleLogger'], level: 'info' }
	}
};
