const mongoose = require('mongoose')
const db ='mongodb://localhost/love-db'
const glob = require('glob')
const {resolve} =require('path')
//把所有的js都引进来
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
//连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0

    return new Promise((resolve,reject)=>{
        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('*******************数据库断开')
            if(maxConnectTimes<=3){
                mongoose.connect(db)
                maxConnectTimes++
            }else{
                reject()
                throw new Error('数据库出现问题，请及时处理。')
                
            }
           
        })
    
        mongoose.connection.on('error',(err)=>{
            console.log('*******************数据库错误')
            console.log('*******************数据库断开')
            if(maxConnectTimes<=3){
                mongoose.connect(db)
                maxConnectTimes++
            }else{
                reject(err)
                throw new Error('数据库出现问题，请及时处理。')
                
            }
        })
    
        //连接打开时
        mongoose.connection.once('open',()=>{
            console.log('Success:数据库已连接~')

            resolve()
        })
    })




}