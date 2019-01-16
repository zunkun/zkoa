const log4js = require('log4js');

const config = require('./config');

// 加载配置文件
log4js.configure(config);

const log = {};
// 调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger');
const errorLogger = log4js.getLogger('errorLogger');
const logLogger = log4js.getLogger('logLogger');

log.error = function () {
	const arrs = Array.prototype.slice.call(arguments);
	arrs.forEach(arr => {
		errorLogger.error(arr);
	});
};

log.info = function () {
	const arrs = Array.prototype.slice.call(arguments);
	arrs.forEach(arr => {
		logLogger.info(arr);
	});
};

// 封装响应日志
log.res = function (ctx, resTime) {
	if (ctx) {
		resLogger.info(formatRes(ctx, resTime));
	}
};

log.resError = function (ctx, resTime) {
	if (ctx) {
		resLogger.info(formatError(ctx, resTime));
	}
};

// 格式化响应日志
const formatRes = function (ctx, resTime) {
	let logText = '\n-----------------------START-----------------------\n';
	logText += formatReqLog(ctx.request, resTime);

	logText += `RESPONSE_STATUS: ${ctx.status} \n`;
	logText += 'RESPONSE_BODY: \n' + JSON.stringify(ctx.body);
	logText += '\n-----------------------End-----------------------\n';

	return logText;
};

// 格式化错误日志
const formatError = function (ctx, err, resTime) {
	let logText = '\n-----------------------START-----------------------\n';
	logText += formatReqLog(ctx.request, resTime);

	logText += '\nERROR: \n' + JSON.stringify(err);
	logText += '\n-----------------------End-----------------------\n';

	return logText;
};

// 格式化请求日志
const formatReqLog = function (req, resTime) {
	const method = req.method;
	// 访问方法
	let logText = 'METHOD: ' + method + '\n';

	// 请求原始地址
	logText += 'ORIGINAL_URL:  ' + req.originalUrl + '\n';

	// 客户端ip
	logText += 'CLIENT_IP:  ' + req.ip + '\n';

	// 请求参数
	if (method === 'GET') {
		logText += 'REQUEST_QUERY:  ' + JSON.stringify(req.query) + '\n';
	} else {
		logText += 'REQUEST_BODY: ' + '\n' + JSON.stringify(req.body) + '\n';
	}
	// 服务器响应时间
	logText += 'RESPONSE_TIME: ' + resTime + '\n';
	return logText;
};

module.exports = log;
