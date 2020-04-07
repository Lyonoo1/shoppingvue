const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx)=>{
    ctx.body=`这是首页接口`
})
router.get('/homee',async(ctx)=>{
    ctx.body=`这是首页的儿子接口`
})

module.exports = router