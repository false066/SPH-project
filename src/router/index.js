//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from "@/views/Home/index.vue"
import Login from "@/views/Login/index.vue"
import Register from "@/views/Register/index.vue"
import Search from "@/views/Search/index.vue"
import NotFound from '@/views/notfound/NotFound.vue'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace 
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// call||apply区别
// 相同点：都可以调用函数一次，都可以篡改函数上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行传递数组
VueRouter.prototype.push = function (location,resolve,reject){
  if(resolve && reject){
    originPush.call(this, location,resolve, reject)
  }else{
    originPush.call(this, location, () =>{ })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
      //代表真:代表着两个形参接受参数【箭头函数】
      originReplace.call(this, location, resolve, reject);
  } else {
      originReplace.call(this, location, () => { }, () => { });
  }
}





// 配置路由
export default new VueRouter({
  // 配置路由
  
  routes: [
    {
      path:'/home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/login',
      component:Login,
      meta:{show:false}
    },
    {
      path:'/register',
      component:Register,
      meta:{show:false}

    },
    {
      path:'/search/:keywords?',
      name:'search',
      component:Search,
      meta:{show:true},
      // 路由组件能不能传递props数据
      // 布尔值写法
      // props:true
      // 对象写法：额外的给路由组件传递一些props
      // props:{a:1,b:2}
      // 函数写法：可以传递params参数和query参数，通过props传递给路由组件
      // props:($route) =>{
      //   return{
      //     keywords:$route.params.keywords,
      //     k:$route.query.k
      //   }
      // }
    },
    // 重定向：在项目跑起来的时候，访问、，立马跳转到首页
    {
      path:'/',
      redirect:'/home'
    },
    { // 404 页面
      path:"/:pathMatch(.*)*",// 官网写法
      name:"Notfound",
      component:NotFound,
      meta:{show:true}
  }
  ]
})