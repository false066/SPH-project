<template>
  <div>
    我是搜索
    <h1>params传参---{{ $route.params.keywords }}</h1>
    <h1>query传参---{{ $route.query.k}}</h1>
  </div>
</template>
<script>
export default {
  name: '',
  // props:['keywords','k'],
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

</style>
