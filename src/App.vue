<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue'
export default {
  name: '',
  components: {
    Header,
    Footer,
  },
  mounted(){
    // 通知Vuex发请求，获取数据，储存于仓库当中
    this.$store.dispatch('categoryList')
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
// 重置样式

</style>
