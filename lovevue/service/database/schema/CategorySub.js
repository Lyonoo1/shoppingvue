const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySubSchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:Number,
    MALL_SUB_NAME:String,
    COMMENTS:String,
    SORT:Number

},{
    collection:'categorySubs'
})

mongoose.model('CategorySub',categorySubSchema)