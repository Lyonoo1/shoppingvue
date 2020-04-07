const BASEURL = '../../../static/shoppingmall.json'
const LOCALURL = 'http://localhost:2000/'
const LOCATIONICON = '../../../static/locationIcon.png'
const URL = {
   getShopingMallInfo: BASEURL+'index',//首页
   getShoppingMallJson:BASEURL,//json文件
   getShoppingMallLocationIcon:LOCATIONICON,//获取定位图标的位置
   getGoodsInfo:BASEURL+'getGoodsInfo',
   registerUser:LOCALURL+'user/register',//用户注册
   loginUser:LOCALURL+'user/login',//用户登录
   getDetailGoodsInfo:LOCALURL+'good/getDetailGoodsInfo',//获取商品详情
   getCategoryList:LOCALURL+'good/getCategoryList',//得到大分类列表
   getCategorySubList:LOCALURL+'good/getCategorySubList',//得到小分类列表 二级
   getGoodsListByCategorySubID:LOCALURL+'good/getGoodsListByCategorySubID',//得到小分类商品信息
   getHeadImg:'../../../static/lyon.jpg'//头像
}

module.exports = URL