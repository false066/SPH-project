import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import TypeNav from './views/Home/TypeNav/index.vue'
import { reqCategoryList } from '@/api/index.js'
reqCategoryList()
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
new Vue({
  render: h => h(App),
  // 注册路由
  router,
}).$mount('#app')
