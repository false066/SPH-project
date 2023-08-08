// shopcart小仓库
// import { reqCartList } from "@/api"

import { reqCartList } from "@/api"

// state:仓库储存数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  cartList:[]
}
// mutations；修改state的唯一手段
const mutations = {
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}
 
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  async getCartList({commit}){
    const res = await reqCartList()
    // console.log(res);
    if(res.code == 200){
      commit('GETCARTLIST',res.data)
    }
  }
}
// getter：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  cartList(state){
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}