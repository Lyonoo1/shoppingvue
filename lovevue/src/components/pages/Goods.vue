<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" alt="" width=100%>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs swipeable sticky> <!--滑动效果swipeable  吸顶效果sticky -->
                <van-tab title="商品详情"> 
                  <div class="detail" v-html="goodsInfo.DETAIL">

                  </div>
                </van-tab>
                <van-tab title="评论">
                    <div>
                        评论制作中。。。。
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary" @click='addGoodsToCart'>加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter.js';
export default {
    data(){
        return{
            goodsId:'',
            goodsInfo:{},//商品详细信息
        }
    },
    created() {//页面加载或者初始化的时候调用
        this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId: this.$route.params.goodsId//接受参数     goodsInfoComponent组件传出goodsId参数，Goods接受参数 之后通过axios查询具体数据
        this.getInfo()
    },
    filters:{
         moneyFilter(money){
             return toMoney(money)
         }
    },
    methods: {
        getInfo(){
            axios({
                url:url.getDetailGoodsInfo,
                method:'post',
                data:{goodsId:this.goodsId}
            })
            .then(response=>{
                if(response.data.code == 200 && response.data.msg){
                     this.goodsInfo = response.data.msg
                }else{
                    Toast('服务器错误~')
                }
               
            })
            .catch(error=>{
                console.log(error)
            })
        },
        onClickLeft(){
            this.$router.go(-1)//返回上一页面
        },
        //增加商品到购物车
        addGoodsToCart(){
            //取本地购物车的数据
            //localStorage.removeItem('cartInfo')
            let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo):[]
            let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId)//find 没有就返回undefind 有就返回第一个数据
            if(!isHaveGoods){
                let newGoodsInfo = {
                    goodsId : this.goodsInfo.ID,
                    Name :this.goodsInfo.NAME,
                    price : this.goodsInfo.PRESENT_PRICE,
                    image : this.goodsInfo.IMAGE1,
                    count:1
                }
                cartInfo.push(newGoodsInfo)
                localStorage.cartInfo = JSON.stringify(cartInfo)
                Toast.success("添加成功")

            }else{
                cartInfo.map((v,i)=>{
                    if(v.goodsId == this.goodsId){
                             v.count++
                        console.log('v.goodsId',v.goodsId)
                        console.log('this.goodsId',this.goodsId)
                        console.log('count',v.count)
                   
                    }
                })
                console.log('cartInfo',cartInfo)
                 localStorage.cartInfo = JSON.stringify(cartInfo)//更新localStorage
                Toast.success('已有此商品~')
            }
   //跳转到购物车 编程时导航
            this.$router.push({name:'Cart'})
        }
    },

}
</script>
<style scoped>
.goods-name,.goods-price{
    font-size: 18px;
    font-weight: 200;
    font-family: '微软雅黑';
    background:#fff
}
.detail{
  font-size: 0px

}
.goods-bottom{
    position: fixed;
    bottom: 0px;
    left: 0px;
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap; /*不换行 */
    
}

.goods-bottom div{
       flex: 1;/**平均分 */
       padding: 5px;
}
</style>
