// 对axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径：发送请求时，路径会出现api
  baseURL:"/api",
  // 代表请求超时
  timeout:5000,
});

//请求拦截器：在请求发出之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config) => {
  //config:配置对象，对象里面有一个属性很重要，headers请求头
  nprogress.start()
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器：
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器相应的数据回来以后，响应拦截器可以检测到，可以做一些事
  nprogress.done()
  return res.data;
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(error);
});

// 对外暴露
export default requests;