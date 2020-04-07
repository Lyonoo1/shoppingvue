// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Stepper,Row,Col,Search,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tab,Tabs,TabbarItem,Tabbar,PullRefresh,Cell, CellGroup} from  'vant'


Vue
   .use(Button)
   .use(Row)
   .use(Col) 
   .use(Swipe)
   .use(SwipeItem)
   .use(Search)
   .use(Lazyload)
   .use(List)
   .use(Field)
   .use(NavBar)
   .use(Tab)
   .use(Tabs)
   .use(TabbarItem)
   .use(Tabbar)
   .use(PullRefresh)
   .use(Stepper)
   .use(Cell)
   .use(CellGroup)
  


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
