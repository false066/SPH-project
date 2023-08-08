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
