<template>
  
      <div class="goods-info"  @click="goGoodsPage">
          <div class="goods-image">
              <img v-lazy="goodsImage"  width="95%" alt="">
          </div>
          <div class="goods-name">
              {{goodsName}}
          </div>
          <div class="goods-price">
              ￥{{goodsPrice | moneyFilter}}({{goodsMallprice-1.3 | moneyFilter}})
          </div>
        </div>  
    
</template>
<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
    props:['goodsImage','goodsName','goodsPrice','goodsMallprice','goodsId'],
     filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
    methods: {
         goGoodsPage(){
             this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})//携带goodsid 跳转到Goods页面
             },
    },
    
}
</script>
<style scoped>
    /* 对goodsname进行单行处理 */
.goods-info{
    border-bottom: 1px solid #eee;
}
.goods-info:nth-child(odd){
    border-right:1px solid #eee;
    border-bottom:1px solid #eee
 }
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
</style>