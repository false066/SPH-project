// trade小仓库
import { reqAddressInfo, reqOrderInfo } from "@/api"
// state:仓库储存数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  addressInfo:[],
  orderInfo:{}
}
// mutations；修改state的唯一手段
const mutations = {
  ADDRESSINFO(state,addressInfo){
    state.addressInfo = addressInfo
  },
  ORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }

}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取用户地址信息
  async addressInfo({commit}){
    const res = await reqAddressInfo()
    // console.log(res);
    if(res.code == 200){
      commit('ADDRESSINFO', res.data)
    }
  },
  // 获取清单信息
  async orderInfo({commit}){
    const res = await reqOrderInfo()
    if(res.code == 200){
      commit("ORDERINFO",res.data)
    }
  }

}
// getter：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}