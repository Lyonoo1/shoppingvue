<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(x,index) in slide" :key='index                                                                                                                       '>
             Slide{{x}}
            </swiper-slide>
            <div class="swiper-pagination" slot ="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    data(){
        return {
              slide:[1,2,3,4,5,6],
              swiperOption:{
                  loop:true,//无限循环
                  pagination:{
                      el:'swiper-pagination',
                      clickable:true//分页循环
                  }
              }
        }
    },
    components:{swiper,swiperSlide}
    }
</script>
<style scoped>
    .swiper-slide{
        text-align:center;
        height: 30px;
        line-height: 30px;
        background:#a2b1f3;
    }
</style>