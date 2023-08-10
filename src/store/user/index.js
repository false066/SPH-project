// user小仓库
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from "@/api"
// 引入token函数
import { setToken, getToken, removeToken } from '@/utils/token.js'
// state:仓库储存数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  code: '',
  token: getToken(),
  userInfo:{}
}
// mutations；修改state的唯一手段
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  CLEAR(state){
    state.token = ''
    state.userInfo = {}
    removeToken()
  }

}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上
    const res = await reqGetCode(phone)
    // console.log(res);
    // console.log(1111111111);
    if (res.code == 200) {
      commit('GETCODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  },
  // 用户注册
  async userRegister({ commit }, data) {
    let res = reqUserRegister(data)
    console.log(res);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },

  // 用户登录
  async userLogin({ commit }, data) {
    const res = reqUserLogin(data)
    // console.log(res);
    // console.log(res.data.token);
    if (res.code == 200) {
      await commit("USERLOGIN", res.data.token)
      // 持久化存储
      setToken(res.data.token)
      return 'ok'
    }
    else {
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit },){
    const res = await reqUserInfo()
    // console.log(res);
    if (res.code == 200) {
      // 提交用户信息
      commit('GETUSERINFO',res.data)
      return 'ok'
    }
    else{
      return Promise.reject(new Error('获取失败'))
    }
  },
  // 退出登录
  async userLogout({commit}){
    // 只是向服务器发送一次请求清除token
    const res = await reqLogout()
    if(res.code == 200){
      // action里面不能修改state 需要提交到mutation里面修改state
      commit("CLEAR")
      return 'ok'
    }
    else{
      return Promise.reject(new Error('退出失败'))
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