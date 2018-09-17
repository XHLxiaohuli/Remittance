<template>
  <div id="usercenter">
      <div class="meTopsearch">
          <h4>个人中心</h4>
        <div class="meSearchbtn" v-if="false">
          <img src="../../../static/images/icon_set.png"/>
        </div>
     </div>
     <headerFill></headerFill>
    <section id="user-page">
      <div class="user-info-layout grid">
        <div class="row">
          <div class="face-img"><img :src=mineInfo.headPic></div>
          <div><p class="user-info" style="line-height: 50px;">{{ mineInfo.mobile}}</p>
            <p class="level" style="display: none;"></p></div>
          <div class="col col-1 fb far fvc"><i class="right-icon iconfont"></i></div>
        </div>
      </div>
      <div class="links-layout ">
        <ul class="clearfix grid">
          <li href="/api/h/1.0/orderList.htm" class="my-order" tj_category="会员中心" tj_action="我的订单">
            <div class="item row fvc" @click="goOrdernav(1)">
              <div class="col col-50"><i class="iconUser "></i><span class="title">我的订单</span></div>
              <div class="col col-50 fb far fvc"><span class="infor">查看全部订单</span><i class="icon-iconfontjiantou4 iconfont"></i>
              </div>
            </div>
            <div class="grid orderContainer itemBox">
              <div class="row">
                <dl @click="goOrdernav(2)" class="col order1" tj_action="待付款">
                  <dt><i class="count hide"></i></dt>
                  <dd>待付款</dd>
                </dl>
                <dl @click="goOrdernav(3)"  class="col order2" tj_action="待收货">
                  <dt><i class="count hide"></i></dt>
                  <dd>待收货</dd>
                </dl>
                <dl @click="goOrdernav(4)" class="col order3" tj_action="待评价">
                  <dt><i class="count hide"></i></dt>
                  <dd>待评价</dd>
                </dl>
                <dl @click="goOrdernav(5)" class="col order4" tj_action="已完成">
                  <dt><i class="count hide"></i></dt>
                  <dd>已完成</dd>
                </dl>
                <dl class="col order5" tj_action="退货/退款" @click="jumpRefund">
                  <dt><i class="count hide"></i></dt>
                  <dd>退货/退款</dd>
                </dl>
              </div>
            </div>
          </li>

          <!--我的资产start-->
            <li class="my-consignee meAssets">
              <div class="item row fvc shouhuodizhi" @click="jumpAssets(0)">
               <div class="col col-50">
                 <i class="iconUser iconUser1"></i>
                 <span class="title">我的资产</span>
               </div>
               <div class="col col-50 fb far fvc">
                 <span class="infor"></span>
                 <i class="icon-iconfontjiantou4 iconfont"></i>
               </div>
              </div>
              <div class="meAssets1">
                <div @click="jumpAssets(0)">我的红包</div>
                <div @click="jumpAssets(1)">我的积分</div>
                <div @click="jumpAssets(2)">我的钱包</div>
              </div>
            </li>
          <!--我的资产end-->



          <li href="/api/h/1.0/address.htm" class="my-consignee" tj_category="会员中心" tj_action="收货地址" @click="goadress()">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50"><i class="iconUser iconUser2"></i><span class="title">收货地址</span></div>
              <div class="col col-50 fb far fvc"><span class="infor"></span><i class="icon-iconfontjiantou4 iconfont"></i></div>
            </div>
          </li>

          <!--店铺升级start-->
          <li class="my-consignee" @click="jumpshopUpgrade">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50">
                <i class=" iconUser3"></i>
                <span class="title">店铺升级</span>
              </div>
              <div class="col col-6 fb far fvc">
                <span class="infor paranText">0成本，高收益</span>
                <i class="icon-iconfontjiantou4 iconfont"></i>
              </div>
            </div>
          </li>
          <!--店铺升级end-->

          <!--资金报表start-->
          <li  class="my-consignee" @click="jumpCapital">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50"><i class="iconUser4"></i><span class="title">资金报表</span></div>
              <div class="col col-50 fb far fvc"><span class="infor"></span><i class="icon-iconfontjiantou4 iconfont"></i></div>
            </div>
          </li>
          <!--资金报表end-->

          <!--营销推广start-->
          <li  class="my-consignee" @click="jumpMarketing" v-if="false">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50"><i class=" iconUser5"></i><span class="title">营销推广</span></div>
              <div class="col col-50 fb far fvc"><span class="infor"></span><i class="icon-iconfontjiantou4 iconfont"></i></div>
            </div>
          </li>
          <!--营销推广end-->

          <!--加盟分享start-->
          <li class="my-consignee" @click="jumpjoinAndShare">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50">
                <i class="iconUser6"></i>
                <span class="title">加盟分享</span>
              </div>
              <div class="col col-6 fb far fvc">
                <span class="infor paranText">分享加盟，推广你的团队</span>
                <i class="icon-iconfontjiantou4 iconfont"></i>
              </div>
            </div>
          </li>
          <!--加盟分享end-->

          <!--分店铺列表start-->
          <li  class="my-consignee" @click="jumpSubShopList">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50"><i class=" iconUser7"></i><span class="title">分店铺列表</span></div>
              <div class="col col-50 fb far fvc"><span class="infor"></span><i class="icon-iconfontjiantou4 iconfont"></i></div>
            </div>
          </li>
          <!--分店铺列表end-->

          <!--联系我们start-->
          <li  class="my-consignee" @click="jumpContactUs">
            <div class="item row fvc shouhuodizhi">
              <div class="col col-50"><i class="iconUser iconUser8"></i><span class="title">联系我们：<span class="contactNumber">4006-234-336</span></span></div>
              <div class=""><span class="infor"></span><i class="icon-iconfontjiantou4 iconfont"></i></div>
            </div>
          </li>
          <!--联系我们end-->

        </ul>
        <button class="backLogin" @click="backLogin">安全退出</button>
      </div>
    </section>
    <tabui></tabui>
    <!--<button @click="denglu" style="border: 1px solid #cccccc;width: 80%;height: 45px;outline: none;margin:0 auto">登录</button>-->
    <bufferPage v-if="!(isLoading)"></bufferPage>
  </div>
</template>
<script>

  var apis=require('../../plugins/api')
  import { Toast  } from 'mint-ui'
  import axios from "../../utils/axios";
  import qs from "qs";
  import tabui from '../common/tabui'
  import bufferPage from '../bufferPage/bufferPage'
  import headerFill from '../headerFill/headerFill'
  export default {
    name: 'usercenter',
    components:{
          tabui,
          bufferPage,
          headerFill
    },
    data() {
      return {
        msg: 'helloworld',
        isLoading:true,
        mineInfo:{},
        isAgency:"",
      }
    },
    methods:{
      //退出登录
      backLogin(){
        axios
          .post(
            "logOut",
            qs.stringify({}),{}
          )
          .then(res => {
            // console.log(res.code)
            if(res.code==0){
              Toast("安全退出")
              this.$router.push('/home');
              localStorage.navselect='tab1'
              localStorage.removeItem('loginstatus')
            }else{
              Toast(res.msg)
            }
          });
      },
      //some function
//      denglu:function () {
//        this.$router.push('/login')
//      },
      goOrdernav:function (index) {
        this.$router.push('/myorder/'+index)
      },
      goadress:function () {
        this.$router.push('/address')
      },
//      ,
//      gomyorder:function () {
//        this.$router.push('/myorder/1')
//      }
      //拉取用户信息
      pullUserData(){
        var that=this;
        axios
          .post(
            "pullUserData",
            qs.stringify({}),{}
          )
          .then(res => {
            // console.log(res.code)
            this.isLoading=true
            if(res.code==0){
              that.mineInfo=res.result;
              this.isAgency=res.result.isAgency
              window.localStorage.setItem("userAgency",that.mineInfo.isAgency);
              window.localStorage.setItem("userPhone",that.mineInfo.mobile);
              window.localStorage.setItem("userId",that.mineInfo.profileId);
              window.localStorage.setItem("userLeve",that.mineInfo.agencyLevelName);
            }else if(res.code==6){
              this.$router.push("/login");
            }else{
              Toast(res.msg)
            }
          });
      },
      jumpRefund(){
        this.$router.push('/applicationForRefund')
      },
      jumpAssets(index){
        this.$router.push('/meAssets/'+index)
      },
      jumpshopUpgrade(){
        this.$router.push('/shopUpgrade/'+this.mineInfo.profileId)
      },
      jumpCapital(){
        if(this.isAgency==1){
          this.$router.push('/financialStatements')
        }else{
          Toast("你需要先成为代理哦")
        }
        
      },
      jumpjoinAndShare(){
        if(this.isAgency==1){
          this.$router.push('/joinAndShare')
        }else{
          Toast("你需要先成为代理哦")
        }
        
      },
      jumpMarketing(){
        if(this.isAgency==1){
          this.$router.push('/marketingPromotion')
        }else{
          Toast("你需要先成为代理哦")
        }
        
      },
      jumpSubShopList(){
        if(this.isAgency==1){
          this.$router.push('/subShopList')
        }else{
          Toast("你需要先成为代理哦")
        }
        
      },
      jumpContactUs(){    
          this.$router.push('/contactUs')     
      },
    },
    created: function () {
      // var that=this;
      // $.ajax({
      //   type: 'post',
      //   url: apis.commonapi.mineInfo,
      //   processData: false,
      //   contentType: false,
      //   xhrFields: { withCredentials: true },
      //   success: function (data) { //返回json结果
      //     console.log("个人中心信息")
      //     console.log(data.result)
      //     that.mineInfo=data.result;
      //   }
      // });
      this.isLoading=false
      this.pullUserData()


    }
  }
</script>
<style scoped>
  /*@charset "UTF-8";*/
  body {
    overflow-y: auto;
  }
  .meTopsearch{
    height: 45px;
    line-height: 45px;
    position: fixed;
    width: 100%;
    z-index: 10;
    background-color: #ffffff;
  }
  .meTopsearch h4{
    font-size: 15px;
    text-align: center;
  }
  .meSearchbtn{
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    text-align: center;
    margin: 0 auto;
    z-index: 10;
  }
  .meSearchbtn img{
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
  }
  .user-icon {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/user_center_icon.png);
    background-size: 40px;
    background-repeat: no-repeat
  }

  #user-page {
    height: 100%;
    padding-bottom: 50px;
    overflow: auto;
    background-color: #f6f6f6
  }

  #user-page .user-info-layout {
    max-height: 160px;
    position: relative;
    background-image: url(http://unesmall.b0.upaiyun.com/ysh/bg.jpg);
    background-size: 100% 142px;
    background-repeat: no-repeat;
    padding: 5% 10%;
    /* margin-top: 35px; */
  }

  #user-page .user-info-layout .right-icon {
    color: #fff;
    font-size: 22px;
    display: none
  }

  #user-page .user-info {
    padding-left: 10px;
    color: #fff;
    font-size: 16px;
    padding-top: 7px;
    padding-bottom: 3px
  }

  #user-page .level {
    padding: 0 8px;
    border: 1px solid #fff;
    border-radius: 20px;
    margin-left: 10px;
    color: #fff;
    line-height: 24px
  }

  #user-page .level:before {
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 22px;
    height: 22px;
    content: "";
    vertical-align: middle;
    margin-top: -2px
  }

  #user-page .level.level1:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconR_level1.png)
  }

  #user-page .level.level2:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconR_level2.png)
  }

  #user-page .level.level3:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconR_level3.png)
  }

  #user-page .level.level4:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconR_level4.png)
  }

  #user-page .level.level5:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconR_level5.png)
  }

  #user-page .face-img img {
    width: 60px;
    height: 60px;
    border-radius: 50%
  }

  #user-page .links-layout {
    color: #8b8b8b
  }

  #user-page .links-layout li {
    background-color: #fff;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  #user-page .links-layout li .item {
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    padding: 3% 0
  }

  #user-page .links-layout li .item .iconUser {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconUser.png);
    background-position-x: 50%;
    background-size: 22px 171px;
    background-repeat: no-repeat;
    margin-right: 4px;
    vertical-align: middle
  }

  #user-page .links-layout li .item .title {
    font-size: 14px;
    color: #2e2e2e
  }

  #user-page .links-layout li .item .infor {
    font-size: 12px
  }

  #user-page .links-layout li .item .right-icon {
    font-size: 18px
  }

  #user-page .links-layout li:last-child {
    margin-bottom: 10px
  }

  #user-page .links-layout li:last-child .item {
    border-bottom-width: 0
  }

  /* #user-page .links-layout li.my-order .iconUser {
    background-position-y: -2px
  }

  #user-page .links-layout li.my-coupon .iconUser {
    background-position-y: -22px
  }

  #user-page .links-layout li.my-consignee .iconUser {
    background-position-y: -44px
  }

  #user-page .links-layout li.my-profit .iconUser {
    background-position-y: -66px
  } */

  #user-page .links-layout li.my-marketSpread .iconUser {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/personal_promote.png);
    background-size: cover;
    background-position: 0 0
  }

  #user-page .links-layout li.my-invite-ally .iconUser {
    background-position-y: -84px
  }

  #user-page .links-layout li.my-ally .iconUser {
    background-position-y: -106px
  }

  #user-page .links-layout li.my-make-money .iconUser {
    background-position-y: -130px
  }

  #user-page .links-layout li.contactUs .iconUser {
    background-position-y: -150px
  }

  #user-page .links-layout li.contactUs .tel {
    color: #fb4e90;
    font-size: 12px;
    display: inline
  }

  .itemBox {
    margin-bottom: 10px
  }

  .itemBox dl {
    font-size: 12px;
    text-align: center;
    padding: 3% 0
  }

  .itemBox i.count {
    position: absolute;
    top: -7px;
    right: -9px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #fb4e90;
    color: #fb4e90;
    font-size: 12px;
    font-style: normal
  }

  .itemBox.orderContainer dt {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/iconOrder.png);
    background-position-x: 50%;
    background-size: 22px 110px;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin: 0 auto 4px;
    position: relative
  }

  .itemBox.orderContainer .order1 dt {
    background-position-y: 0
  }

  .itemBox.orderContainer .order2 dt {
    background-position-y: -22px
  }

  .itemBox.orderContainer .order3 dt {
    background-position-y: -44px
  }

  .itemBox.orderContainer .order4 dt {
    background-position-y: -66px
  }

  .itemBox.orderContainer .order5 dt {
    background-position-y: -88px
  }
  article, aside, blockquote, body, button, code, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, pre, section, td, textarea, th, ul{
    margin: 0;
    padding: 0;
  }
  ::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
  .iconfont.right-icon:after{
    content: "\e60a";
    font-size: 18px;
  }
  .iconfont.right-icon{
    text-align: right;
  }
  .iconfont {
    font-family: iconfont!important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
  }
    .user-info-layout .row>div{
      display: inline-block;
    }
  .fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .grid .row .col.col-50 {
    -moz-box-flex: 1;
    width: 50%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
  }
  .grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
  }
  .far {
    -webkit-box-pack: end;
    -ms-flex-pack: edn;
    justify-content: flex-end;
  }
  .fvc {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

   .icon-iconfontjiantou4{
    font-size: 12px;
  }
  .meAssets{
    margin-bottom: 10px;
  }
  .meAssets1{
    width: 100%;
  }
  .meAssets1:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
  .meAssets1>div{
    width: 33.33%;
    float: left;
    text-align: center;
    padding: 3% 0;
    border-right:1px solid #dfdfdf;
    box-sizing: border-box;
  }
  .meAssets1>div:last-child{
    border:0;
  }
  .paranText{
    display: flex;
    flex: initial;
  }
  .contactNumber{
    color: #fb4e90;
    font-size: 12px;
    display: inline;
  }
  .iconUser1{
    background-position-y: -22px;
  }
  .iconUser2{
    background-position-y: -44px;
  }
  .iconUser3{
    /* background-position-y: -130px; */
    background: url(http://unesmall.b0.upaiyun.com/ysh/icon_dp.png) no-repeat;
    width: 22px;
    height: 22px;
    display: inline-block;
    background-size: 100% 100%;
    position: relative;
    top: 4px;
    /* vertical-align: center; */
  }
  .iconUser4{
    /* background-position-y: -66px; */
    background: url(http://unesmall.b0.upaiyun.com/ysh/icon_zj.png) no-repeat;
    background-size: 100% 100%;
    width: 22px;
    height: 22px;
    display: inline-block;
    position: relative;
    top: 3px;
  }
  .iconUser5{
    /* background-image: url(http://unesmall.b0.upaiyun.com/common/images/personal_promote.png) !important;
    background-size: cover !important;
    background-position: 0 0 !important; */
  }
  .iconUser6{
    /* background-position-y: -84px; */
    background: url(http://unesmall.b0.upaiyun.com/ysh/icon_share.png) no-repeat;
    background-size: 95% 95%;
    width: 22px;
    height: 22px;
    display: inline-block;
    position: relative;
    top: 7px;
    left: 2px;
  }
  .iconUser7{
    /* background-position-y: -106px; */
    background: url(http://unesmall.b0.upaiyun.com/ysh/icon_fdp.png) no-repeat;
    background-size: 95% 95%;
    width: 22px;
    height: 22px;
    display: inline-block;
    position: relative;
    top: 7px;
  }
  .iconUser8{
    background-position-y: -150px;
  }
  .backLogin{
    display: block;
    border:0;
    width: 100%;
    height: 40px;
    background: #fb4e90;
    color:#ffffff;
    margin: auto;
    font-size: 15px;
  }
</style>
