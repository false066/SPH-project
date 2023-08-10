//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from  '@/store'
// 使用插件
Vue.use(VueRouter)


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
let router = new VueRouter({
  // 配置路由
  
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的y代表到滚动条最顶端
    return { y: 0 }
  }
})

//全局守卫：前置守卫（路由跳转之前进行判断）
router.beforeEach(async (to,from,next) =>{
  // to:可以获取到你要跳转的那个路由信息
  // from：可以获取到你从哪个路由而来的信息
  // next：放行函数 next()放行 next(path)放行到指定路由 next(false)
  // 为了测试先全部放行
  // next()
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token;
  // 用户信息：不能用空对象去判断，因为当userInfo为空对象是也是true
  // let userInfo = store.state.user.userInfo
  let name = store.state.user.userInfo.name 
  if(token){
    // 如果用户登录了，还想去登录页，不能去还停留在首页
    if(to.path == '/login' || to.path == '/register'){
      next('/home');
    }else{
      // 登录，去的不是login【home|search|detail】
      // 如果用户名已有
      if(name){
        next()
      }else{
        // 没有用户信息，派发action让仓库存储用户信息在跳转
        try {
          // 获取用户信息成功
          // 在路由跳转之前获取用户信息
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // token过期，获取不到用户信息，重新登陆
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 未登录暂时没有处理完毕，后期处理
    next()
  }
})


export default router
