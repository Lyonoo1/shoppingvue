const Koa = require('koa')
const app =new Koa()
const { connect , initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')


app.use(bodyParser())//使用
app.use(cors())//解决跨域
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let good = require('./appApi/good.js')

//装载所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/good',good.routes())


//装载路由中间件
app.use(router.routes()) // 加载所有routes 
app.use(router.allowedMethods()) //加载所有methods
//立即执行函数 
;(async ()=>{
     await connect() 
     initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body=`<h1>Hello World</h1>`
})

app.listen(2000,()=>console.log('Success: service has started run in port 2000'))