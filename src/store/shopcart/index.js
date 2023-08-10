// shopcart小仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

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
  //获取购物车列表数据
  async getCartList({commit}){
    const res = await reqCartList()
    // console.log(res);
    if(res.code == 200){
      commit('GETCARTLIST',res.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartById(skuId){
    const res = await reqDeleteCartById(skuId)
    // console.log(res);
    if(res.code == 200){
      return 'OK'
    }else{
      return Promise.reject(new Error(res.error))
    }
  },
  // 删除购物车所有被选中的商品
  deleteAllCheckedCart({getters, dispatch}){
    //  deleteAllCheckedCart(context)
    // context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch 【派发actions】 state 【展示仓库数据】
    // 获取购物车中选中的全部产品【是一个数组】
    let arr = []
    // 获取选中的产品
    getters.cartList.cartInfoList.forEach(item =>{
      let promise = item.isChecked == 1 ?  dispatch('deleteCartById',item.skuId) : ''
      // 将每次返回的Promise放到数组中
      arr.push(promise)
    })
    return Promise.all(arr)

  },
  // 修改购物车某一个产品的选中状态
  async UpdateCheckedById({commit}, {skuId,isChecked}){
    const res = await reqUpdateCheckedById({skuId,isChecked})
    // console.log(res);
    if(res.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('失败'))
    }
  },
  allUpdateChecked({ commit, state, dispatch }, isChecked) {
    let arr = [];
    //获取购物车商品的个数,进行遍历
    state.cartList[0].cartInfoList.forEach(item => {
         //调用修改某一个商品的action【四次】
         let ps = dispatch("UpdateCheckedById", { skuId: item.skuId, isChecked });

         arr.push(ps);
    })
    //Promise.all():参数需要的是一个数组【数组里面需要promise】
    //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
    //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
    return Promise.all(arr);
},
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