// 引入路由组件
import Home from "@/views/Home/index.vue"
import Login from "@/views/Login/index.vue"
import Register from "@/views/Register/index.vue"
import Search from "@/views/Search/index.vue"
import NotFound from '@/views/notfound/NotFound.vue'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart/index.vue'
import Trade from '@/views/Trade/index.vue'
// 配置路由信息
export default [
  {
    path:'/home',
    component:Home,
    name:'home',
    meta:{show:true}
  },
  {
    path:'/trade',
    component:Trade,
    name:'trade',
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
  {
    path:'/detail/:skuid',
    name:'detail',
    component:Detail,
    meta:{show:true}
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component:ShopCart,
    meta:{show:true}
  },
  {
    path:'/addcartsuccess',
    name:'addcartsuccess',
    component:AddCartSuccess,
    meta:{show:true}
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