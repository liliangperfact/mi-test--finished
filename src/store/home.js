import {reqCategoryList,reqBannerList,reqFloorList,reqKeywordsList} from '@/api'

const state = {
  categoryList : [],
  bannerList:[],
  floorList:[],
  keywordslist:[]
}
const mutations = {
  //直接修改数据
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST(state,floorList){
    state.floorList = floorList
  },
  RECEIVEKEYWORDSLIST(state,keywordslist){
    state.keywordslist = keywordslist
  }
}

const actions = {
  //异步请求数据
  //async 和 await的用法
  async getCategoryList({commit}){
    const result = await reqCategoryList()
    if(result.code === 200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  },
  async getBannerList({commit}){
    const result = await reqBannerList()
    if(result.code === 200){
      commit('RECEIVEBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}){
    const result = await reqFloorList()
    if(result.code === 200){
      commit('RECEIVEFLOORLIST',result.data)
    }
  },
  async getKeywordsList({commit}){
    const result = await reqKeywordsList()
    if(result.code === 200){
      commit('RECEIVEKEYWORDSLIST',result.data)
    }
  },
  
}

const getters = {
  bannerList(state){
    return state.bannerList;
  },
  keywordslist(state){
    return state.keywordslist;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}