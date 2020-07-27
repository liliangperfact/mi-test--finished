import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import store from '@/store'
import routes from '@/router/routes'

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to,from,next) =>{
  let targetPath = to.path
  if(targetPath.startsWith('/pay') || targetPath.startsWith('/center') || targetPath.startsWith('/trade')){
    if(store.state.user.userInfo.name){
      next()
    }else{
      next('/login?redirect='+targetPath)
    }
  }else{
    next()
  }
})





export default router