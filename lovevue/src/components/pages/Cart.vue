<template lang="">
    <div>
        <div class='nav-bar' id='nav-bar'>
            <van-nav-bar title='购物车'/>

            </div>
         <div class='cart-title'>
             <van-button size='small' type='danger'  @click='clearCart'  >清空购物车</van-button>
         </div>

         <!--显示购物车中的商品-->
         <div class='list-cart' id='list-cart'>
               <div class='cart-row' id='cart-row' v-for='(x,index) in cartInfo' ::key="index">
                   <div class='row-img'>
                       <img :src='x.image' width='100%' alt=''/>
                   </div>
                   <div class='row-text'>
                       <div class='goods-name' @click='goGoodsDetail(x.goodsId)'>{{x.Name}}</div>
                       <div class='goods-control'>
                           <van-stepper v-model='x.count'></van-stepper>
                       </div>
                   </div>
                   <div class='row-price'>
                       <div>￥{{x.price |moneyFilter}}</div>
                       <div>x{{x.count}}</div>
                       <div class='allPrice'>￥{{x.count*x.price |moneyFilter}}</div>
                   </div>
               </div>
         </div>
        <!--显示总金额-->
        <div class='totalMoney' id='totalMoney'>
   
            <div>商品总价:￥<span>{{totalMoney | moneyFilter}}</span></div>
        </div>
    </div>
     
</template>
<script>
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    data(){
        return {
            cartInfo:[],
            isEmpty:false,
            
        }
    },
    created(){
                this.getCartInfo()
                console.log('cartInfo',JSON.stringify(this.cartInfo))
                // console.log('localStorage',localStorage.cartInfo)
    },
    filters:{
       moneyFilter(money){
           return toMoney(money)
       }  
    },
    computed:{
       totalMoney(){
           let allMoney = 0 
            this.cartInfo.forEach((x,index)=>{
                allMoney  += x.price*x.count 
            })
            return allMoney
       }
    },
    mounted(){
        //购物车里面的商品列表的高度增加为商品总价提供空间
       let listHeight = document.getElementById('list-cart').clientHeight
       document.getElementById('list-cart').style.height = listHeight +82 +'px'
    

    },
    methods:{
        //获取购物车的数据
        getCartInfo(){
            if(localStorage.cartInfo){
                this.cartInfo = JSON.parse(localStorage.cartInfo)
            }

            this.isEmpty = this.cartInfo>0?true : false
        },
        //清空购物车
        clearCart(){
            localStorage.removeItem('cartInfo')//清空localStorage
            document.getElementById('list-cart').style.height = 82 +'px'
            this.cartInfo =[]
           
            
        },
        //点击商品跳转到详情页
        goGoodsDetail(id){
          this.$router.push({name:'Goods',params:{goodsId:id}})//编程时导航  name用params  path 用 query
        }
    }
}
</script>
<style scoped>
    .cart-title{
    height: 2rem;
    line-height: 2rem;
    background: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align:right
    }
    .list-cart{
        background:#fff;
        

    }
    .cart-row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: .5rem;
        font-size: .85rem;
        border-bottom: 1px solid #e4e7ed;
        
    }
    .row-img{
        flex: 6
    }
    .row-text{
        flex: 13;
        padding-left: 10px;
        position: relative;
    }
    .goods-control{
        padding-top: 10px;
        margin-top: 1rem
    }
    .row-price{
        flex: 5;
       float: right;
       text-align: right;
        margin-top:1.5rem
    }
    .allPrice{
        color: rgb(218, 79, 79)
    }
    .totalMoney{
        text-align: right;
        background-color:#fff;
        border-bottom: 1px solid #e4e7ed;
        padding: 6px;
        margin-top: -5.1rem
     

      
    }
     .totalMoney>div>span{
         color:rgb(218, 79, 79);
        font-weight: bolder
     }
 
</style>