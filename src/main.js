import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
Vue.use(ElementUI);
import TypeNav from './components/TypeNav/index.vue'
import Carousel  from './components/Carousel/index.vue';
import Pagination  from '@/components/Pagination/index.vue';
import { reqCategoryList } from '@/api/index.js'
reqCategoryList()
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 引入MockServer.js----mock数据
import "@/mock/mockServe.js"
// 引入swiper样式
import "swiper/css/swiper.css"
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  // 注册路由：底下的写法KV一直省略V【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上拥有$router,$router属性
  router,
  // 注册仓库:组件实例身上多了一个属性$store
  store
}).$mount('#app')
