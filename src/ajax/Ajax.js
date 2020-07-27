import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({
  baseURL:'/api',
  timeout:20000//超时时间
})
//拦截开始
service.interceptors.request.use(config => {
  Nprogress.start()//进度条开始
  //每个ajax请求带临时ID
  let userTempId = store.state.user.userTempId
  if(userTempId){
    config.headers.userTempId = userTempId
  }
  //token 
   //添加用户登录过后的token信息，让每个ajax请求都带这个token，为了找到用户登录后相关信息（订单、购物车）
   let token = store.state.user.userInfo.token
   if(token){
     config.headers.token = token
   }
  return config //返回结果
})
service.interceptors.response.use(
  response =>{
    Nprogress.done()//进度条结束
    return response.data
  },
  error =>{
    Nprogress.done()//进度条结束
    alert('请求出错' + error.message || '未知错误')
    return new Promise(()=>{})//设置状态为pending
  }
)
export default service