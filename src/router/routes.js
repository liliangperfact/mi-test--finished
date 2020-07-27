const Home  = () => import('@/pages/Home')
const Login  = () => import('@/pages/Login')
const Register  = () => import('@/pages/Register')
const Search  = () => import('@/pages/Search')
const Detail  = () => import('@/pages/Detail')
const AddCartSuccess  = () => import('@/pages/AddCartSuccess')
const ShopCart  = () => import('@/pages/ShopCart')
const Trade  = () => import('@/pages/Trade')
const Pay  = () => import('@/pages/Pay')
const PaySuccess  = () => import('@/pages/PaySuccess')
const Warning  = () => import('@/pages/Warning')
const Center  = () => import('@/pages/Center')
const Group  = () => import('@/pages/Center/Group')
const Myorder  = () => import('@/pages/Center/Myorder')

// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Warning from '@/pages/Warning'
// import Center from '@/pages/Center'
// import Group from '@/pages/Center/Group'
// import Myorder from '@/pages/Center/Myorder'
// import store from '@/store'
export default[
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:Myorder,
      },
      {
        path:'group',
        component:Group,
      },
      {
        path:'',
        redirect:'myorder'
      }
     
    ]
  },
  {
    path:'/warning',
    component:Warning
  },
  {
    path:'/pay',
    component:Pay,
    beforeEnter:(to,from,next)=>{
      if(from.path === '/trade'){//如果没有登陆
        next()//去登陆
      }else{
        next('/')//否则，返回所在也
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    beforeEnter:(to,from,next)=>{
      if(from.path === '/pay'){//如果没有登陆
        next()//去登陆
      }else{
        next('/')//否则，返回所在也
      }
    }
  },
  {
    path:'/trade',
    component:Trade,
    beforeEnter:(to,from,next)=>{
      if(from.path === '/shopcart'){//如果没有登陆
        next()//去登陆
      }else{
        next('/')//否则，返回所在也
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    beforeEnter:(to,from,next)=>{
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if(skuNum && skuInfo){//如果没有登陆
        next()//去登陆
      }else{
        next('/')//否则，返回所在也
      }
    }
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHide:true
    },
    
    // beforeEnter:(to,from,next)=>{
    //   if(!store.state.user.userInfo.name){//如果没有登陆
    //     next()//去登陆
    //   }else{
    //     next('/')//否则，返回所在也
    //   }
    // }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHide:true
    }
  },
  {
    path:'/search/:keyword?',//可传可不传
    component:Search,
    name:'search',
    //props:route => ({kws:route.params.kws,keywords:route.query.keywords})
  },
  {
    path:'/',
    redirect:'/home'
  }
]