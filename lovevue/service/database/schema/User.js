const mongoose = require('mongoose')
const bcrypt =require('bcryptjs')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId //mogoose原生的
const SALT_WORK_FACTOR = 10 //强度


//给注册的密码进行加密


//创建UserSchema
const userSchema = new Schema({
    UserId : {type:ObjectId},
    userName : {unique:true,type:String},//unique 意思是不让重复 
    password : String,
    createAt: {type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
  collection:'users'  //设定集合的名字 默认是users
})
//加盐加密
userSchema.pre('save',function(next){
        bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{//加盐
            if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash//给密码加密
            next()//处理完成
        })
    })
})


userSchema.methods={//实例方法
               comparePassword:(_password,passsword)=>{//客户端接收的密码， 第二个是数据库存的密码
                return new Promise((resolve,reject)=>{
                       bcrypt.compare(_password,passsword,(err,isMatch)=>{
                           if(!err) resolve(isMatch)//匹配成功 返回结果
                           else reject(err) //匹配失败 返回错误
                       })
                })
               }

}


//发布模型
mongoose.model('User',userSchema)