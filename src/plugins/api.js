// var HOST="http://sp.mikumine.com/api/h/1.0/"
var HOST="http://192.168.10.27:8888/api/h/1.0/"

var commonapi={
    // 1.购物首页:
    //主页banner
    homeBanner:HOST+'homeBanner.json',
    // 短信验证码
    checkMobile:HOST+'checkMobile.json',

    // 2.个人中心
    //注册
    regist:HOST+'register.json',
    //登录
    login:HOST+'login.json',
  //个人中心信息
    mineInfo:HOST+'mineInfo.json',
   //收货地址
   consignee:HOST+'consignee.json',




}

module.exports ={
  commonapi
}
