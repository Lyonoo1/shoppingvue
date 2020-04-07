<template>
    <div>
     <!--  表头设计    left-arrow是左侧的返回箭头    -->
        <van-nav-bar
           title="用户注册"
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
                <van-button type="primary" size="large" @click="registerAction" :loading='openLoading' >立即注册</van-button>
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
    methods:{
        goBack(){
            this.$router.go(-1)
        },

    registerAction(){
        // if(this.checkform){
        //     this.axiosRegisterUser()
        // }
        this.checkform()&&this.axiosRegisterUser()//与上面的相等
    },

        axiosRegisterUser(){
            this.openLoading =true
            axios({
            url:url.registerUser,
            method:'post',
            data:{
                  userName:this.username,
                  password:this.password
            }
            }).then(response=>{
                
                if(response.data.code==200){//user.js 保存之后返回的数据
                    Toast.success(response.data.message)
                    this.$router.push('/main')//跳转到个人中心
                }else{
                    this.openLoading =false //注册失败不允许loadding
                    console.log(response.data.message)
                    Toast.fail(`GG`)
                }
            }).catch((error)=>{
                console.log(error)
                 Toast.fail(`GG`)
                 this.openLoading =false //注册失败不允许loadding
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