   //把数据插进数据库  schema/Good.js 就是数据的字段
const Koa =require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

//good
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./database/data_json/newGoods.json','utf8',(err,data)=>{
        data=JSON.parse(data)  //Uncaught SyntaxError: Unexpected token u in JSON at position 0 如果遇到这个错误   是因为 JSON.parse(undefined) 解析undefined 就是文件路径没有写对
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('Success'+saveCount)
            }).catch(error=>{
                console.log(error)
            })

        })
    })
    ctx.body='开始导入数据'
})
//category
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./database/data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount  = 0//计数
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('插入成功'+ saveCount)

            }).catch((error)=>{
                console.log('插入失败：'+error)
            })
        })

    })
    ctx.body= `开始导入数据。。。。。`
})
//category_sub
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./database/data_json/category_sub.json','utf8',(err,data)=>{
        let saveCount =0
        data = JSON.parse(data)
        const CategorySub = mongoose.model('CategorySub')//将 模型娶过来
        data.RECORDS.map((value,index)=>{
        console.log(value)
        let newCategorySub = new CategorySub(value)
        newCategorySub.save().then(()=>{
            saveCount++
            console.log('插入成功----'+saveCount)
        }).catch((error)=>{
            console.log('插入失败：'+error)
        })
            
        })

    })
    ctx.body=`开始导入categorySub.json数据至数据库`
})
//商品详情页面的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodsId = ctx.request.body.goodsId //获取id
    const  Goods = mongoose.model('Goods')
    await Goods.findOne({ID:goodsId}).exec().then(async(result)=>{
        console.log(result)
        ctx.body= {
            code:200,
            msg:result
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={
            code:500,
            msg:error
        }
    })
})
//读取大类数据
router.get('/getCategoryList',async(ctx)=>{
    try{
         const Category = mongoose.model('Category')
         let result = await Category.find().exec()//得到所有的信息
         ctx.body ={
             code:200,
             msg:result
         }
    }catch(error){
         ctx.body={
             code:200,
             msg:error
         }
    }
})
//读取小类的数据
router.post('/getCategorySubList',async(ctx)=>{
    try{
    let categoryid = ctx.request.body.categoryId//获取前台的大类id
    const CategorySub = mongoose.model('CategorySub')
    let resultDate =await CategorySub.find({MALL_CATEGORY_ID:categoryid}).exec()//这个地方一定要用异步
    ctx.body = {
        code:200,
        msg:resultDate
    }
   }catch(error){
       ctx.body = {
           code:500,
           msg:error
       }
   } 
})
//根据类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
         let categorySubID= ctx.request.body.categorySubId//子类别ID
         //当前页数
         let page = ctx.request.body.page
         let num =10 //每页显示数量
         let start = (page-1)*num//当前页数开始位置 
         //let categorySubID= '2c9f6c94621970a801626a3770620177'
         let Goods = mongoose.model('Goods')
         let resultDate =await Goods.find({SUB_ID:categorySubID})
         .skip(start).limit(num).exec()//skip跳过多少 limit每页显示数据
         ctx.body= {
             code:200,
             msg:resultDate
         }
    }catch{
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//module.exportss = router
module.exports = router
