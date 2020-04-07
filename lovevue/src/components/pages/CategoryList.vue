<template>
    <div>
        <div>
            <van-nav-bar title="类别列表" />
        </div>

        <div class="van-Lr">
            <van-row>
                      <van-col span='8'>
                        <div id="left-nav">
                          <ul>
                             <li :class="{categoryAction:categoryClassIndex == index}" @click='clickCategory(index,x.ID)' v-for="(x , index) in category" :key='index' >
                                 {{x.MALL_CATEGORY_NAME}}
                             </li>
                          </ul>
                        </div>
                      </van-col>
                
              
                      <van-col span='16'>
                             <div id="right-nav"> 
                              <div class="tabCategorySub"  >
                                  <van-tabs v-model="active" type="line"  scrollspy  animated  sticky @click="onClickCategorySub">
                                       <van-tab v-for="(x,index) in categorySub" :key="index" :title="x.MALL_SUB_NAME" >
                                          
                                       </van-tab>
                                  </van-tabs>
                              </div>
                             </div>  
                             <div id="list-div" >
                                 <van-pull-refresh v-model="isRefresh" @refresh='onRefresh'>                               
                                 <van-list v-model="loading" :finished="finished" @load='onLoad'>
                                     <div class="list-x" v-for="(x,index) in goodList" :key="index" @click='goGoodsInfo(x.ID)'>
                                          <div class="list-x-img">
                                              <img :src="x.IMAGE1" width="100%" :onerror='errorImg' alt="">
                                          </div>
                                          <div class="list-x-text">
                                              <div>{{x.NAME}}</div>
                                              <div class="list-x-text-price">￥{{x.ORI_PRICE  |toMoney}}</div>
                                          </div>
                                     </div>
                                 </van-list>
                                 </van-pull-refresh>
                                 </div>   
                             </van-col>
                  
                 
            </van-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    data(){
        return{
            category:[],
            categoryClassIndex:0,
            categorySub:[],//小类类别
            active:2,//从第一个开始激活
            loading:false,//可以上拉加载 
            finished:false,//可以下拉刷新
            goodList:[],//商品列表信息isOk
            page:1,//商品列表页数
            list:[],//商品数据
            categorySubId:'',//商品子类id
            isRefresh:false,//下拉刷新                            
            isOk:false,
            errorImg:'this.src="'+require('@/assets/img/errorimg.png')+'"',
            CID:0
        }
    },
    created() {
         this.CID = this.$route.query.ID ? this.$route.query.ID : this.$route.params.ID //接受参数
         if( this.CID != 0 && this.CID != undefined){
            this.categoryClassIndex  = this.CID -1 //确定大类
         }
        
         console.log('ID',this.CID)
        this.getCategoryList()
       
       
    },
    mounted(){//操作dom 
     let windowHeight = document.documentElement.clientHeight 
     document.getElementById("left-nav").style.height = windowHeight -46-50 +'px' //减50是因为减去地下导航栏的高度让商品不让被遮挡
     document.getElementById("list-div").style.height = windowHeight -90 -50+'px' 

            
    },
    filters:{
        toMoney(money){
            return toMoney(money)
        }
    },
    methods:{
              getCategoryList(){
                  axios({
                      url:url.getCategoryList,
                      method:'get'
                     })
                     .then(response=>{
                        
                         if(response.data.code == 200 && response.data.msg){
                                  console.log(response.data)
                                  console.log('this.Id',this.CID)
                                  this.category = response.data.msg
                                  if( this.CID != 0 && this.CID != undefined){
                                     this.getCategorySubListById(this.category[this.CID-1].ID)//当从首页点击进入时 会根据点的不同 加载不同的子类
                                  }else{
                                       this.getCategorySubListById(this.category[0].ID)//当进入页面的时候加载第一个
                                  }
                               
                         }else{
                               Toast('服务器错误！')
                         }
                     })
                     .catch(error=>{
                         Toast('服务器错误！')
                         console.log(error)
                     })
              },
             
             clickCategory(index,categoryId){
                  this.categoryClassIndex = index
                  this.page =1 
                  this.finished = false
                  this.goodList = []
                  
                  this.getCategorySubListById(categoryId)     
              },

              //根据大类id 获取小类数据
             getCategorySubListById(categoryId){
                  axios({
                      url:url.getCategorySubList,
                      method:'post',
                      data:{categoryId:categoryId}
                  })
                  .then(response=>{
                      if(response.data.code == 200 && response.data.msg){
                        //  console.log('getCategorySubList',response)
                          this.categorySub = response.data.msg
                             this.active = 0//当页面重新点回来的时候 归零 默认为第一个tab
                        //   this.page = 1
                          this.onLoad()
                          this.categorySubId = this.categorySub[0].ID
                      }
                  })
                  .catch(error=>{
                       Toast('服务器错误！')
                         console.log(error)
                  })
              },
              //加载数据
             onLoad(){
                  setTimeout(()=>{//延时
                  //假数据 
                    // for(let i = 0; i< 10 ;i++){
                    //     this.list.push(this.list.length+1)//十个数据数组
                    // }
                    // this.loading = false;
                    // if(this.list.length >= 40){
                    //     this.finished =true
                    // }
                //真数据
                       this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID //如果有小类ID 就获取  否 则 从SubID[0]获取
                       this.getGoodList()
                       
                  },500)
              },
              //下拉刷新
            onRefresh(){
                  setTimeout(()=>{
                      this.isRefresh = false
                      this.goodList = []//清空goodlist数据
                      this.page =1 
                      this.finished =false //可以上拉加载
                      this.onLoad() //重新加载数据
                      this.CID = 0

                  },500)
              },
              //获取商品数据
              getGoodList(){
                  axios({
                      url:url.getGoodsListByCategorySubID,
                      method:'post',
                      data:{
                          categorySubId:this.categorySubId,
                          page:this.page
                      }
                  })
                  .then((response)=>{
                     // console.log('good',response)
                      if(response.data.code ==200 && response.data.msg.length){
                          this.page++
                          this.goodList = this.goodList.concat(response.data.msg)//数组合并 当下拉的时候数据都在

                      }else{
                          this.finished=true//下拉不再刷新
                      }
                      this.loading = false //上啦加载
                  })
                  .catch(error=>{
                      Toast('服务器错误')
                      console.log(error)
                  })
              },
              //点击小类获取id 跳转
              onClickCategorySub(index,title){
                  this.categorySubId = this.categorySub[index].ID
                  console.log('categorySubId',this.categorySubId)
                  //初始化操作
                  this.goodList = []
                  this.finished = false
                  this.page =1 
                  this.onLoad()
              },
              //跳转到商品详情页
              goGoodsInfo(id){
                  this.$router.push({name:'Goods',params:{goodsId:id}})//编程式导航  使用name 要用params传递参数  使用path的时候使用query传递参数
              }
    }
    
}
</script>

<style scoped>
#left-nav{
        background-color: aliceblue
    }
#left-nav ul li{
        line-height: 2rem;
        border-bottom:1px solid #e4e7ed;
        padding: 3px;
        font-size: 0.8rem;
        text-align: center;
    } 
.categoryAction{   /* 反白效果 */
        background-color: #fff;

    }
.list-x{
        
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        padding: 5px;
        font-size: 0.8rem
    }
#list-div{
   /*   滚动条 */
    overflow: scroll
} 
.list-x-img{
    flex:8
}
.list-x-text{
    flex:16;
    margin-top: 10px;
    margin-left: 10px;
     
}
.list-x-text-price{
    font-size: 1rem;
    float: right
}
</style>