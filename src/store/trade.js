import {reqTradeInfo} from '@/api'
const state = {
//   goodsDetailInfo:{},
//  //创建一个空数组准备接收数据
tradeInfo:{}
}
const mutations ={
  // //修改数据
  RECEIVETRADEINFO(state,tradeInfo){
    state.tradeInfo = tradeInfo
  }
}
const actions = {
  //异步请求数据
  async getTradeInfo({commit}){//等于axios,直接获取数据，返回成功或失败
    const result = await reqTradeInfo()
    if(result.code === 200){//如果状态码为200
      commit('RECEIVETRADEINFO',result.data)//获取data数据给mutations
    }
  }
}
const getters = {
  
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || []
  },
  userAddressList(state){
    return state.tradeInfo.userAddressList || []
  },
  // spuSaleAttrList(state){
  //   return state.goodsDetailInfo.spuSaleAttrList || []
  // },
  // imgList(state){
  //   return (state.goodsDetailInfo.skuInfo || {}).skuImageList
  // }
}


export default {
  state,
  mutations,
  actions,
  getters
}
  