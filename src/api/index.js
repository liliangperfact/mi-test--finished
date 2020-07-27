//这个文件是项目的接口请求函数文件
//给每个接口发请求，我们都把它封装成一个函数，到时需要请求拿数据的时候，就去调用对应的接口函数就完了
import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'
// 请求获取三级分类列表数据
// get   /api/product/getBaseCategoryList   参数：无

export const reqCategoryList = () => Ajax({
  url:'/product/getBaseCategoryList',
  method:'GET'
})


// 使用mock的接口去请求 banner数据   get 请求     /banner
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')
export const reqKeywordsList = () => mockAjax.get('/keywords')
//search
export const reqGoodsList = (searchParams) => Ajax.post('/list',searchParams)
//详情页
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${ skuId }`)

//购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum) => Ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

//请求购物车列表数据
export const reqShopCartList = () => Ajax.get(`/cart/cartList`)

//请求修改选中购物车列表数据 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateIsChecked = (skuID,isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)

// export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
//cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`)


//user/passport/register
export const reqRegister = (userInfo) => Ajax.post(`/user/passport/register`,userInfo)

//user/passport/logout
export const reqLogin = (userInfo) => Ajax.post(`/user/passport/login`,userInfo)
//logout退出
export const reqLogout = () => Ajax.get(`/user/passport/logout`)

//订单
// /api/order/auth/trade
export const reqTradeInfo = () => Ajax.get(`/order/auth/trade`)


//请求创建订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,tradeInfo) => Ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,tradeInfo)
// export const reqSubmitOrder = (page,limit) => Ajax.post(`/order/auth/${page}/${limit}`)


//请求获取订单信息 /api/payment/weixin/createNative/{orderId}  get
export const reqOrderInfo = (orderId) => Ajax.get(`/payment/weixin/createNative/${orderId}`)

//请求查看订单的支付状态信息 /api/payment/weixin/queryPayStatus/{orderId}  get
// 返回状态200代表支付成功   205代表支付中

export const reqPayStatus = (orderId) => Ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)


//我的订单

// /api/order/auth/{page}/{limit}
export const reqMyorder = (page,limit) => Ajax.get(`order/auth/${page}/${limit}`)
