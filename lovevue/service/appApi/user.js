const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

router.get('/', async(ctx)=>{
    ctx.body=`1111111111`
})
//注册
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body)//得到前端传过来的数据
    // ctx.body=ctx.request.body//将得到的信息打印在页面上

    //将前端传来的信息插进数据库
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
   await newUser.save().then(()=>{//异步请求
        ctx.body = {
            code:200,
            message:'注册成功',

        }
    }).catch((error)=>{//catch 报错时执行
        ctx.body={
            code:500,//服务器异常
            message:error
        }
    })
})

//登陆
router.post('/login',async(ctx)=>{
   let  loginUser = ctx.request.body
   console.log(loginUser)
   let userName = loginUser.userName
   let userpassword = loginUser.password

   //引入User的model
   const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec().then(async(result)=>{
       console.log(result)
       if(result){
               let newUser = new User()
               await newUser.comparePassword(userpassword,result.password)
               .then(isMatch=>{
                   ctx.body = {
                       code:200,
                       msg:isMatch
                   }   })
                .catch(error=>{
                    ctx.body = {
                        code:500,
                        msg:error
                    }
                })
          
       }else{
           ctx.body = {code:200,msg:'用户名不存在'}
       }
   }).catch(error=>{
       console.log(error)
       ctx.body = {
           code:500,
           msg:error
       }
   })
})






module.exports= router