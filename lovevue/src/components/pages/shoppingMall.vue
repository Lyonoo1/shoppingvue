<template>
<div>
    <div class="search_bar">
         <van-row>
             <van-col span='3' >
                 <img :src="locationIcon" width="60%" class="location_img" alt="">
             </van-col>
             <van-col span='16'>
                 <input type="text" class="search_input">
             </van-col>
             <van-col span='5'>
                 <van-button class="searh_button" size='mini' type="primary">Search
                 </van-button> </van-col>
         </van-row>
    </div>
   <!-- swiper area -->
   <div class="swiper-area">
       <van-swipe :autoplay="1500">
           <van-swipe-item v-for="(x,index) in bannerImg" :key="index">
               <img v-lazy="x.image" width="100%"/>
           </van-swipe-item>
           </van-swipe>     
   </div>
   <!-- type-bar -->
   <div class="type-bar">
       <div v-for="(x,index) in category" :key="index" @click="goCategorySubList(x.ID)" >
           <img v-lazy="x.image" alt="" width="100%">
           <span>{{x.mallCategoryName}}{{x.ID}}</span>
       </div>
</div>
       <!-- adBanner -->
       <div class="adBanner">
        <img v-lazy='adBanner' width="100%" alt="">
       
   </div>
   <!-- Recommend gooods area -->
   <div class="recommend-area">
       <div class="recommend-title">
          商品推荐
      </div>
       <div class="recommend-body">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(x,index) in recommendGoods"  :key='index'> 
                <div class="recommend-item"  @click="goGoods(x.goodsId)">
                    <img :src=x.image width="80%" alt="">
                    <div>{{x.goodsName}}</div>
                    <div>￥{{x.price | moneyFilter}}(￥{{x.mallPrice-2 | moneyFilter}})</div>
                </div>
            </swiper-slide>
        </swiper>
       </div>
       </div>
           <!-- <swiperSlide2></swiperSlide2>
       <swiperTest></swiperTest> -->
    <floor-component :floorData='floor1' :floorTitle='floorName.floor1'></floor-component>
    <floor-component :floorData='floor2' :floorTitle='floorName.floor2'></floor-component>
    <floor-component :floorData='floor3' :floorTitle='floorName.floor3'></floor-component>

     <!-- Hot Area -->
     <div class="hot-area">
         <div class="hot-title">热卖商品</div>
         <div class="hotgoods">
         <!-- 这里需要一个list组件 -->
     <van-list>
              <!-- //gutter中间留20像素 -->
             <van-row gutter="0">
                 <van-col span="12" v-for='(x,index) in hotGoods' :key="index">
                 <goodsinfo-component :goodsId="x.goodsId" :goodsName='x.name' :goodsImage="x.image" :goodsPrice='x.price' :goodsMallprice='x.mallPrice'> </goodsinfo-component>
                 </van-col>
             </van-row>
         </van-list>
         </div>
     </div>


    </div>
</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import swiperTest from '../swiper/swiperTest'
import swiperSlide2 from '../swiper/swiperSlide2'
import floorComponent from '../component/floorComponent'
import goodsinfoComponent from '../component/goodsInfoComponent'
import { toMoney } from '@/filter/moneyFilter.js';
import {getShoppingMallJson,getShoppingMallLocationIcon} from '@/serviceAPI.config.js'
export default {
    data(){
        return {
        swiperOption:{
            slidesPerView:3
        },
        locationIcon:getShoppingMallLocationIcon,
        bannerImg:[],
        category:[],
        adBanner:'',
        recommendGoods:[],
        floor1:[],
        floor2:[],
        floor3:[],
        floorName:{},
        hotGoods:[],//热卖商品
    
        }
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
    components:{
        
        swiper,
        swiperSlide,
        floorComponent,
        goodsinfoComponent
    },
    methods:{
            //大类跳转
            goCategorySubList(id){
             this.$router.push({name:'CategoryList',params:{ID:id}})
            },
            //商品推荐跳转
            goGoods(goodsId){
              this.$router.push({name:'Goods',params:{goodsId:goodsId}})
            },
             getData(){
                 //console.log(getShoppingMallJson) 显示axios的数据路径
                 axios.get(getShoppingMallJson)
                
                 .then(response=>{
                        console.log(response)//接收到的数据
                        if(response.status == 200){
                            this.category = response.data.data.category
                            this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
                            this.bannerImg = response.data.data.slides
                            this.recommendGoods = response.data.data.recommend
                            console.log('recommend',this.recommendGoods)
                            this.floor1 = response.data.data.floor1
                            this.floor2 = response.data.data.floor2
                            this.floor3 = response.data.data.floor3
                            this.floorName = response.data.data.floorName
                            this.floorName = response.data.data.floorName
                            this.floorName = response.data.data.floorName
                            this.hotGoods = response.data.data.hotGoods
                            console.log(this.floor1)
                            
         }})
        .catch(error=>{
            console.log(error)
        })
             
             },
             onLoad(){
                 setTimeout(()=>{
                   
                 this.getData()

                 },500)
             }
    },                
   created(){
     this.getData()
    //  console.log(this.bannerImg)
    }
    
}
</script>
<style scoped>
.search_bar{
    height: 2.2rem;
    background: #e5017d;  
    line-height: 2.2rem;
    overflow: hidden
}
.location_img{
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    /* height: 10rem; */
}
.searh_button{
    margin:0 0.6rem;
    
}
.search_input{
      width: 100%;
      height: 1.2rem;
      border-top: 0px;
      border-right: 0px;
      border-left: 0px;
      border-bottom:1px solid #fff !important;
       background: #e5017d; 
      color: #fff;

}
.swiper-area{
    clear: both;
    max-height: 12rem;
    overflow: hidden;
}
.type-bar{
    background: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;

}
.type-bar div{
    padding: .3rem;
    font-size: .75rem;
    text-align: center;
    flex: 1

}

.recommend-area{
    background-color: #fff;
    margin-top: .3rem;

}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: .2rem;
    color:rgb(199, 51, 75);

}
.recommend-body{
    border-bottom: 1px solid  #eee;

}
.recommend-item{
 width:99%;
 border-right: 1px solid #eee;
 font-size: .75rem;
 text-align: center
}
.floor-title{
    font-size: 18px;
    color: #940fbd;
    border-bottom:1px solid #eee;
    background: #fff
}
.floor-anomaly{
    display:flex;
    flex-direction:row;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
.floor-anomaly div{
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.floor-one{
    border-right: 1px solid #ddd
}
.floor-two{
    border-bottom: 1px solid #ddd
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;/**自动换行 */
    background: #fff;
   
  
}
.floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd){
 border-right: 1px solid #ddd;
}
.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem
}
.hotgoods{
    height: 140rem;
    overflow: hidden;
    background:#fff;
}
</style>