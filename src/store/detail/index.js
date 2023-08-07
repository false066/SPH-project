// home小仓库
import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
// state:仓库储存数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  goodInfo:{},

}
// mutations；修改state的唯一手段
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  },
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取产品信息
   async getGoodInfo({commit},skuId){
    const res = await reqGoodsInfo(skuId)
    if(res.code === 200){
      commit("GETGOODINFO",res.data)
    }
   },
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
    // 加入购物车返回的解构
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他数据，只返回了code==200，代表此次操作成功
    // 因为服务器没有返回其余数据，因此仓库不需要三连环存储数据
    const res = await reqAddOrUpdateShopCart({skuId,skuNum})
    if(res.code == 200){
      // 加入购物车成功
      return "ok"
    }else{
      // 加入购物车失败
      return Promise.reject(new Error("失败"))
    }
   }
}
// getter：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  // 路径导航简化的数据
  categoryView(state){
    // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值是undifined
    // 当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了
    return state.goodInfo.categoryView  || { }
  },
  // 简化产品信息的数据
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}