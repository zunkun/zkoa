'use strict';

const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const log = require('./utils/logs/log');

app.keys = ['abcd1234', '11235813abcd'];
// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// 请求日志
app.use(async (ctx, next) => {
	const start = new Date();
	let end;
	try {
		await next();
		end = new Date();
		log.res(ctx, end - start);
	} catch (error) {
		end = new Date();
		log.resError(ctx, error, end - start);
	}
});

// 请求出错日志
app.on('error', function (err) {
	log.error(err);
});

/**
 * 初始化路由
 */
function initRouters (pathRoute) {
	let routersPath = path.join(__dirname, 'routes');
	let files = fs.readdirSync(routersPath);

	files.forEach(file => {
		let stat = fs.lstatSync(path.join(routersPath, file));
		if (stat.isDirectory()) {
			initRouters(pathRoute ? path.join(pathRoute, file) : file);
		} else {
			if (file.endsWith('.js')) {
				let _router = require(path.join(routersPath, file));
				app.use(_router.routes());
				app.use(_router.allowedMethods());
			}
		}
	});
}

initRouters();

app.use(require('koa-static')(path.join(__dirname, '/public')));
app.use(views(path.join(__dirname, '/views'), {
	extension: 'ejs'
}));
module.exports = app;
