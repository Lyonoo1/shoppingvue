<template>
    <div>
        <div class="main-div">
         <keep-alive>
            <router-view></router-view>
            </keep-alive>
        </div>
        <van-tabbar v-model='active' @change='changeTabbar(active)'>
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="bullhorn-o">列表</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="friends-o">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:0,
            nowPage:'',//当前路径
        }
    },
    created() {//一进入页面就执行
        this.chagneTabbarActive()
     
    },
    updated(){//页面发生改变的时候执行
            this.chagneTabbarActive()
    },
    methods:{
        chagneTabbarActive(){
            //获取当前路径
            this.nowPage = this.$route.path
            if(this.nowPage == '/cart'){
                this.active =2
            }
            if(this.nowPage == '/member')
               this.active =3
            if(this.nowPage == '/categoryList')
               this.active =1
             if(this.nowPage == '/shoppingMall')
               this.active =0
        },

        //底部导航栏
        changeTabbar(active){
            console.log(active)
            switch(active){
                case 0:
                    this.$router.push({name:'ShoppingMall'})
                    break;
                case 1:
                    this.$router.push({name:'CategoryList'})
                    break
                case 2:
                    this.$router.push({name:'Cart'})
                    break
                 case 3:
                     this.$router.push({name:'Member'})
                     break
            }
        }
    }
}
</script>
<style scoped>
    
</style>