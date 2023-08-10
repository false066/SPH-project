// 当前模块：api进行统一管理
import requests from './request';
import mockRequests from './mockRequests'
// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
  })
}

// 获取轮播图数据(Home首页接口)
export const reqBannerList = () => {
  return mockRequests({
    url: '/banner'
  })
}

// 获取floor接口数据
export const reqFloorList = () => {
  return mockRequests({
    url: '/floor'
  })
}

//  获取搜索模块数据 地址：/api/list 请求方式：POST 参数：需要参数
/**
{
  "category3Id": "61",
  "categoryName": "手机",
  "keywords": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个函数需不需要接收外部参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认的参数【至少是一个空对象】
export const reqGetSearchInfo = (data) =>{
  return requests({
    url:'/list',
    method:'POST',
    data,
  })
}

// 获取产品信息详情的接口 URL：/api/item/{ skuId }  请求方式：Get 参数：需要参数
export const reqGoodsInfo = (skuId) =>{
  return requests({
    url:`/item/${ skuId }`,
  })
}

//添加到购物车 URL： /api/cart/addToCart/{ skuId }/{ skuNum } 请求方式：POST 参数：需要参数
export const reqAddOrUpdateShopCart = ({skuId, skuNum}) =>{
  return requests({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:"POST",
  })
}

// 获取购物车列表 URL：/api/cart/cartList 请求方式：GET 参数：不需要参数
export const reqCartList = () =>{
  return requests({
    url:'/cart/cartList'
  })
}

// 删除某一个商品 URL：/api/cart/deleteCart/{skuId} 请求方式：DELETE 参数：需要参数
export const reqDeleteCartById = (skuId) =>{
  return requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'DELETE'
  })
}

// 修改商品选中的状态 URL:/api/cart/checkCart/{skuID}/{isChecked} 请求方式：GET 参数：需要参数
export const reqUpdateCheckedById = ({skuId,isChecked}) =>{
  return requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 获取验证码 URL：/api/user/passport/sendCode/{phone} 请求方式：GET 参数：需要参数
export const reqGetCode = ({ commit },phone) =>{
  return requests({
    url:`/user/passport/sendCode/${phone}`
  })
}

// 用户注册 URL:/api/user/passport/register 请求方式：POST 参数：需要参数
export const reqUserRegister = (data) => {
  return requests({
    url:'/user/passport/register',
    method:"POST",
    data,
  })
}

// 用户登录URL:/api/user/passport/login 请求方式：POST 参数：需要参数 phone，password
export const reqUserLogin = (data) => {
  return requests({
    url:'/user/passport/login',
    method:"POST",
    data,
  })
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// URL：/api/user/passport/auth/getUserInfo 请求方式：get 参数：不需要参数
export const reqUserInfo = () => {
  return requests({
    url:'/user/passport/auth/getUserInfo'
  })
}

//退出登录
// URL：/api/user/passport/logout 请求方式：get 参数：不需要参数
export const reqLogout = () => {
  return requests({
    url:'/user/passport/logout'
  })
}