// search小仓库
import { reqGetSearchInfo } from "@/api"
// state:仓库储存数据的地方
const state = {
  searchList:{}
}
// mutations；修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取search模块数据
  async getSearchList({commit},params={}){
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params形参：是当用户触发action的时候，第二个参数传过来的，至少是一个空对象
    const res = await reqGetSearchInfo(params)
    if(res.code === 200){
      commit('GETSEARCHLIST',res.data)
    }
  }
}
// getter：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】

const getters = {
  // 当前形参state，是当前仓库中的state，并非大仓库中的那个state
  goodsList(state){
    // 这样书写是有问题的：searchList开始数据是空对象，可能造成获取的数据是undifined
    // state.searchList.goodsList 如果服务器数据回来了，没问题是一个数组
    // 假如网络不给力或者是没有网络，state.searchList.goodsList应该返回的是undifined
    // 
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}