import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import home from '@/components/home/home'
// Vue.use(home)
//
// import tabui from '@/components/common/tabui'
// Vue.use(tabui)
//
// import classify from '@/components/classify/classify'
// Vue.use(classify)
//
// import shopcart from '@/components/shopcart/shopcart'
// Vue.use(shopcart)
//
// import usercenter from '@/components/usercenter/usercenter'
// Vue.use(usercenter)

const home = () => import('../components/home/home')
Vue.use(home)
const tabui = () => import('../components/common/tabui')
Vue.use(tabui)
const classify = () => import('../components/classify/classify')
Vue.use(classify)
const shopcart = () => import('../components/shopcart/shopcart')
Vue.use(shopcart)

const usercenter = () => import('../components/usercenter/usercenter')
Vue.use(usercenter)

const cancelReceipt = () => import('../components/usercenter/cancelReceipt')
Vue.use(cancelReceipt)

const lookLogistics = () => import('../components/usercenter/lookLogistics')
Vue.use(lookLogistics)

const login = () => import('../components/common/login')
Vue.use(login)

const test = () => import('../components/common/test')
Vue.use(test)

const myorder = () => import('../components/usercenter/myorder')
Vue.use(myorder)

const ImmediateEvaluation = () => import('../components/usercenter/ImmediateEvaluation')
Vue.use(ImmediateEvaluation)

const address = () => import('../components/common/address')
Vue.use(address)

const listPage = () => import('../components/common/listPage')
Vue.use(listPage)

const commodityDetails = () => import('../components/commodityDetailsPage/commodityDetails')
Vue.use(commodityDetails)

// import commodityDetails from '@/components/commodityDetailsPage/commodityDetails'

const picAndText = () => import('../components/commodityDetailsPage/picAndText')
Vue.use(picAndText)

const shopListPage = () => import('../components/shopListPage/shopListPage')
Vue.use(shopListPage)

const confirmationOfOrder = () => import('../components/confirmationPage/confirmationOfOrder')
Vue.use(confirmationOfOrder)

const paymentResults = () => import('../components/confirmationPage/paymentResults')
Vue.use(paymentResults)

const paymentMethod = () => import('../components/confirmationPage/paymentMethod')
Vue.use(paymentMethod)

const stateOfPayment = () => import('../components/confirmationPage/stateOfPayment')
Vue.use(stateOfPayment)

const orderDetails = () => import('../components/confirmationPage/orderDetails')
Vue.use(orderDetails)

const applicationForRefund = () => import('../components/usercenter/applicationForRefund')
Vue.use(applicationForRefund)

const meAssets = () => import('../components/meAssetsPage/meAssets')
Vue.use(meAssets)

const shopUpgrade = () => import('../components/shopUpgradePage/shopUpgrade')
Vue.use(shopUpgrade)

const financialStatements = () => import('../components/financialStatementsPage/financialStatements')
Vue.use(financialStatements)

const returnedGoods = () => import('../components/financialStatementsPage/returnedGoods')
Vue.use(returnedGoods)

const bringOutTheDetails = () => import('../components/financialStatementsPage/bringOutTheDetails')
Vue.use(bringOutTheDetails)

const applicationPresentation = () => import('../components/financialStatementsPage/applicationPresentation')
Vue.use(applicationPresentation)

const fineBalance = () => import('../components/financialStatementsPage/fineBalance')
Vue.use(fineBalance)

const joinAndShare = () => import('../components/joinAndSharePage/joinAndShare')
Vue.use(joinAndShare)

const marketingPromotion = () => import('../components/marketingPromotionPage/marketingPromotion')
Vue.use(marketingPromotion)

const subShopList = () => import('../components/subShopListPage/subShopList')
Vue.use(subShopList)

const contactUs = () => import('../components/contactUsPage/contactUs')
Vue.use(contactUs)

const buyGiftBag = () => import('../components/buyGiftBag/buyGiftBag')
Vue.use(buyGiftBag)






export default new Router( {
// history: false,
// hashbang: true,
//mode:'history', //去除#号连接符
routes:[ {
path:'/', 
name:'home', 
component:home, 
},  {
path:'/home', 
name:'home', 
component:home, 
},  {
path:'/tabui', 
name:'tabui', 
component:tabui
    },  {
path:'/classify', 
name:'classify', 
component:classify
    },  {
path:'/shopcart', 
name:'shopcart', 
component:shopcart
    },  {
path:'/usercenter', 
name:'usercenter', 
component:usercenter
    },  {
path:'/login', 
name:'login', 
component:login
    },  {
path:'/myorder/:param', 
name:'myorder', 
component:myorder
    },  {
path:'/test', 
name:'test', 
component:test
    },  {
path:'/address', 
name:'address', 
component:address
    },  {
path:'/listPage', 
name:'listPage', 
component:listPage
    },  {
path:'/commodityDetails/:shopId', 
name:'commodityDetails', 
component:commodityDetails, 
},  {
path:'/shopListPage/:catId/:catLevel', 
name:'shopListPage', 
component:shopListPage, 
},  {
path:'/confirmationOfOrder/:ordervalue', 
name:'confirmationOfOrder', 
component:confirmationOfOrder, 
},  {
path:'/paymentResults/:biography/:dataArr/:GreaterThan', 
name:'paymentResults', 
component:paymentResults, 
},  {
path:'/paymentMethod/:biographyId/:payDataArr/:payGreaterThan/:dateCreated', 
name:'paymentMethod', 
component:paymentMethod, 
},  {
path:'/applicationForRefund', 
name:'applicationForRefund', 
component:applicationForRefund, 
},  {
path:'/stateOfPayment', 
name:'stateOfPayment', 
component:stateOfPayment, 
},  {
path:'/orderDetails', 
name:'orderDetails', 
component:orderDetails, 
},  {
path:'/meAssets/:index', 
name:'meAssets', 
component:meAssets, 
},  {
path:'/shopUpgrade/:userId', 
name:'shopUpgrade', 
component:shopUpgrade, 
},  {
path:'/financialStatements', 
name:'financialStatements', 
component:financialStatements, 
},  {
path:'/returnedGoods', 
name:'returnedGoods', 
component:returnedGoods, 
},  {
path:'/bringOutTheDetails/:stare', 
name:'bringOutTheDetails', 
component:bringOutTheDetails, 
},  {
path:'/applicationPresentation/:quotableAmount', 
name:'applicationPresentation', 
component:applicationPresentation, 
},  {
path:'/fineBalance/:canBePresented', 
name:'fineBalance', 
component:fineBalance, 
},  {
path:'/joinAndShare', 
name:'joinAndShare', 
component:joinAndShare, 
},  {
path:'/marketingPromotion', 
name:'marketingPromotion', 
component:marketingPromotion, 
},  {
path:'/subShopList', 
name:'subShopList', 
component:subShopList, 
},  {
path:'/contactUs', 
name:'contactUs', 
component:contactUs, 
},  {
path:'/buyGiftBag/:userId', 
name:'buyGiftBag', 
component:buyGiftBag, 
},  {
path:'/ImmediateEvaluation', 
name:'ImmediateEvaluation', 
component:ImmediateEvaluation, 
}  ,{
path:'/cancelReceipt/:tradeId', 
name:'cancelReceipt', 
component:cancelReceipt, 
},  ,{
path:'/lookLogistics/:tradeIds', 
name:'lookLogistics', 
component:lookLogistics, 
},

]
})
