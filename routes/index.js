const Router = require('koa-router');

const router = new Router();
let times = 0;
router.get('/', async (ctx, next) => {
	times++;
	ctx.cookies.set('times', times, {
		signed: true,
		maxAge: 60 * 60 * 1000,
		overwrite: true,
		httpOnly: true
	});
	ctx.body = { msg: 'HELLO, ZKOA', times };
	await next();
});

module.exports = router;
