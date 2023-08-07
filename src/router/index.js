//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
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
export default new VueRouter({
  // 配置路由
  
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的y代表到滚动条最顶端
    return { y: 0 }
  }
})