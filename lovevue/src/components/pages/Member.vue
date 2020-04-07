<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img :src="headImg" class="top-img" />
        </div>
        <div class="login" v-show="LogReg">
            <div><van-button type="warning" @click="goLogin">我要登录</van-button></div>
            <div><van-button type="primary" @click="goRegister">我要注册</van-button></div>
        </div>
        <div  v-show="Fshow">
          请先登录哦~~欧尼酱
        </div >
        <div logined v-show="Ushow">
            欢迎您~~~{{  this.userName  }}
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
                
            </van-cell-group>
             
             <div class="layout"><van-button type="warning" size="large" @click="lyout">退出登录</van-button> </div> 
        </div>

    </div>
</template>

<script>
import url from '@/serviceAPI.config.js'
    export default {
         data(){
             return{
                 headImg:url.getHeadImg,
                 LogReg:true,
                 Fshow:true,
                 Ushow:false,
                 userInfo:null,
                 userName:''
             }
         },
         created() {
               this.getUserInfo()
               console.log(this.userInfo)
               this.showUserName()
            
         },
         methods: {
             //显示用户名
             showUserName(){
                if(this.userInfo){
                    this.Fshow=false
                    this.Ushow=true
                }
             },
             //注册跳转
             goRegister(){
                 this.$router.push({name:'Register'})
             },
             //登陆跳转
             goLogin(){
                 this.$router.push({name:'Login'})
             },
             //注销
             lyout(){ 
                localStorage.removeItem('userInfo')
                if(!localStorage.userInfo){
                    this.Fshow=true
                    this.Ushow=false
                    this.$toast('已注销~')
                }
                
             },
             //获取用户信息
             getUserInfo(){
                 if(localStorage.userInfo){
                     //JSON.stringify将json对象转化成字符串 parse将字符创转化成对象
                     this.userInfo = JSON.parse(localStorage.userInfo)
                     this.userName = this.userInfo.useName
                     console.log(localStorage.userInfo)
                    
                 }
             }
         },
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
    }
    .top{
        height:5rem;
        text-align: center;
        padding-top:2rem;
        background-color: #EEA2AD;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
   
</style>