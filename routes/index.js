const Router = require('koa-router');

const router = new Router();
router.get('/', async (ctx, next) => {
	ctx.body = { msg: 'HELLO, ZKOA' };
	await next();
});

module.exports = router;
