<template>
  <div >
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 注册其余组件
import ListContainer from './ListContainer/index.vue'
import Recommend from "./Recommed/index.vue"
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default {
  name: 'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    // 派发action，获取floor组件数据
    this.$store.dispatch("getFloorList")
    // 获取用户信息在首页展示
  },
  computed: {
        ...mapState({
            // 右侧需要的是一个函数,当使用这个计算属性的时候,右侧的函数会立即执行一次
            // 注入一个参数state,其实即为大仓库中的数据
            floorList: (state) => {
                return state.home.floorList
            }
        })
    },
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

</style>
