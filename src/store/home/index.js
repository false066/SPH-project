// home小仓库
import { reqBannerList, reqCategoryList, reqFloorList } from "@/api"
// state:仓库储存数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  categoryList:[],
  bannerList:[],
  floorList:[]
}
// mutations；修改state的唯一手段
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList){
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList){
    state.floorList = floorList
  }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
   async categoryList({ commit }){
    const res = await reqCategoryList();
    // console.log(res);
    if(res.code === 200){
      commit("CATEGORYLIST",res.data)
    }
  },
  async getBannerList({commit}){
    const  res = await reqBannerList()
    // console.log(res);
    if(res.code === 200){
      commit("BANNERLIST",res.data)
    }
  },
  // 获取floorList数据
  async getFloorList({ commit }){
    const res = await reqFloorList()
    // console.log(res.data);
    if(res.code === 200){
      commit("FLOORLIST",res.data)
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