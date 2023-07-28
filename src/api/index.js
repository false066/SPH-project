// 当前模块：api进行统一管理
import requests from './request';
// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
  })
}