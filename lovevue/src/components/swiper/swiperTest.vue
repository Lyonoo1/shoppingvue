<template>
    <div>
     <swiper :options="swiperOption" class="swiper">
         <swiper-slide class="text">
<div>
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基。
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基

各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基
各大基金公司正加紧对主流宽基指数布局时，《每日经济新闻》记者注意到，近期有一只沪深300指数增强基金却悄然清盘。12月17日，安信沪深300指数增强型发起式发布基金合同终止公告，成为年内首只清盘的沪深300指基

  </div>
    </swiper-slide>   
    </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper,swiperSlide} from 'vue-awesome-swiper';
export default {
      data(){
          return {
              swiperOption:{
                  direction:'vertical', //竖直滚动
                  slidesPerView:'auto',//一行有几个 auto
                  freeMode:true,//滑动几个随用户滑动
                  mousewheel:true//鼠标滚轮也可以
              }
          }
      },
      components:{
          swiperSlide,
          swiper
      }  
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.swiper{
    height: 300px;
    overflow: hidden;
}
.text{
    font-size:18px;
    text-align: left;
    padding: 30px;
    height: auto;
    -webkit-box-sizing:border-box;
    box-sizing:border-box ;
}
</style>