<template>
    <div>
     <!--  表头设计    left-arrow是左侧的返回箭头    -->
        <van-nav-bar
           title="用户登录"
           left-text="返回"
           left-arrow 
           @click-left='goBack'
        
        />

        <div class="register-panel">
            <!--文本框   -->
            <van-field
            v-model="username"
            label="用户名"
            clearable
            placeholder="请输入用户名"
            required
            @click-icon="username=''"
            :error-message = 'usernameErrorMsg'
            />


             <van-field
            v-model="password"
            label="密码"
            type="password"
            placeholder="请输入密码"
            required
            :error-message = 'passwordErrorMsg'
            />
            <div class="register-btn">
                <van-button type="primary" size="large" @click="LoginAction" :loading='openLoading' >立即登陆</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
export default {
    data(){
        return{
                username:'',
                password:'',
                openLoading:false,//是否开始用户注册的loadding状态
                usernameErrorMsg:'',//当用户名出现错误时的提示
                passwordErrorMsg:''


        }
   
    },  
    created(){//生命周期 当页面被载入 或者被初始化的时候执行
    
           if(localStorage.userInfo){
               console.log(localStorage.userInfo)
               Toast.success('不能重复登录')
               this.$router.push('/member')
           }
        },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
      

   LoginAction(){
        // if(this.checkform){
        //     this.axiosRegisterUser()
        // }
        this.checkform()&&this.axiosLoginUser()//与上面的相等
    },

        axiosLoginUser(){
            this.openLoading =true
            axios({
            url:url.loginUser,
            method:'post',
            data:{
                  userName:this.username,
                  password:this.password
            }
            }).then(response=>{
                console.log(response)
                if(response.data.code==200 && response.data.msg){
                      //设置localStorage 防止重复登陆 登陆存储
                new Promise((resolve,reject)=>{
                    localStorage.userInfo = JSON.stringify({useName:this.username})
                    console.log('1:'+localStorage.userInfo)
                    // localStorage.userInfo = JSON.parse(localStorage.userInfo)
                    // console.log('2:'+(localStorage.userInfo))
                    
                    setTimeout(()=>{
                        resolve()
                    },500)
                }).then(()=>{
                     Toast.success('登陆成功')
                    this.$router.push('/member')
                    }).catch(err=>{
                        Toast.fail('登录状态保存失败')
                        console.log(err)
                    })

               }else{
                   Toast.fail('登陆失败')
                    this.openLoading =false
               }
              
            }).catch((error)=>{
                Toast.fail('登陆失败')
                  this.openLoading =false
            })
           
        },
        /**表单验证方法 */
        checkform(){
                    let isOk = true
                    if(this.username.length<5){
                        this.usernameErrorMsg='用户名不能小于5'
                        isOk = false
                    }else{
                         this.usernameErrorMsg=''
                    }
                    if(this.password.length<6){
                        this.passwordErrorMsg='密码不能小于六位'
                          isOk = false
                    }else{
                          this.passwordErrorMsg=''
                    }
                    return isOk

        }
    }



}
</script>
<style scoped>
.register-panel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom:80px 
}
.register-btn{
    padding-top:10px 
}
</style>