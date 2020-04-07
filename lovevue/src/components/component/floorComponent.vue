
<template>
    <div>
         <div class="floor">
        <div class="floor-title">
           {{floorTitle}}
        </div>
        <div class="floor-anomaly">
            <div class="floor-one" @click="goGoodsPage(floorData0.goodsId)">
                <img :src="floorData0.image" width="100%"  alt="">
            </div>
            <div>
            <div class="floor-two" @click="goGoodsPage(floorData1.goodsId)">
                 <img :src="floorData1.image" width="100%" alt="">
            </div>
       
            <div @click="goGoodsPage(floorData2.goodsId)">
                 <img :src="floorData2.image" width="100%" alt="">
            </div>
            </div>
        </div>

            <div class="floor-rule">
                <div v-for="(x,index) in floorData.slice(3)" :key="index" @click="goGoodsPage(x.goodsId)">
                    <img :src="x.image" width="100%" alt="">
                </div>
            </div>
        
    </div>
    </div>
</template>
<script>
export default {
    props:['floorData','floorTitle'],
        data(){
            return{ 

                  floorData0:{},
                  floorData1:{},
                  floorData2:{}
                
            }
            
        },
        created() {
           
        },
        methods: {
             goGoodsPage(id){
                 this.$router.push({name:'Goods',params:{goodsId:id}})
             }
        },
        watch:{
            floorData:function(val){
                this.floorData0 = this.floorData[0],
                this.floorData1 = this.floorData[1],
                this.floorData2 = this.floorData[2]
            }
        }
    
}
</script>
<style scoped>
    .floor-title{
    font-size: 18px;
    color: #940fbd;
    border-bottom:1px solid #eee;
    text-align: center;
    height: 1.8rem;
    line-height: 1.8rem
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
    background: #fff
  
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
</style>