<template>
    <div class="contactUsContainer">
        <section class="contactHeader">
            <div class="contactContent contactNavbar">
                <div class="contactBtn-navbar contactNavbar-left">
                    <span class="contactIcon contactIcon-return" @click="goBack"></span>
                </div>
                <div class="contactNavbar-main">联系我们</div>
            </div>
        </section>
        <section class="page-content" id="contactUs">
            <div class="logo">
                <img src="http://unesmall.b0.upaiyun.com/ysh/ysh_logo.png" alt="">
                <p>优尚汇</p>
            </div>

            <div class="contactMain grid" v-for="(item,index) in contactText" @click="ejectWhich(index)">
                <div class="kf row fvc">
                    <div class="col col-10">{{item}}</div>
                    <div class="col col-3 right-icon fb far fvc iconfont"></div>
                </div>
            </div>

            <div class="copyRight">
                <p>Copyright@2016-2020</p>
                <p>深圳米酷信息科技有限公司</p>
            </div>
        </section>

        <!--联系电话和招商热线start-->
        <div class="hotlinesAndPhones" v-show="ifHotlinesPhones">
            <div class="cont bounceIn">
                <p class="contactWay">{{hotlinesOrPhones}}</p>
                <p class="tel">{{contactPhone}}</p>
                <div class="btngroup">
                    <span class="btn reset" @click="hotlinesOrPhonesCancel">取消</span><!---<span @click="callPhone"  class="btn ring" :href="'wtai://wp//mc;'+contactPhone">拨号</span>-->
                    <a class="btn ring" href="tel:4006-234-336">拨号</a> 
                </div>
            </div>
        </div>
        <!--联系电话和招商热线end-->

        <!--联系微信客服start-->
        <section class="wl-trans-dialog translate-viewport" id="weixinKFDialog" v-show="wxShow">
            <img src="http://unesmall.b0.upaiyun.com/common/images/weixinKF.jpg" alt="">
            <i class="close" @click="wxClose"></i>
        </section>
        <!--联系微信客服end-->
    </div>
</template>
<script>
export default{
    data(){
        return{
            contactText:["联系电话","联系微信客服","招商热线","招商公告","关于我们"],
            ifHotlinesPhones:false,
            contactPhone:"",
            hotlinesOrPhones:"",
            wxShow:false,
        }
    },
    created(){

    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        ejectWhich(index){
            if(index==0||index==2){
                if(index==0){
                    this.hotlinesOrPhones="联系电话"
                    this.contactPhone="4006-234-336"
                }else if(index==2){
                    this.hotlinesOrPhones="招商热线"
                    this.contactPhone="4006-234-336"
                }
                this.ifHotlinesPhones=true
            }else if(index==1){
                this.wxShow=true
            }else if(index==3){

            }else if(index==4){

            }
        },
        hotlinesOrPhonesCancel(){
            this.ifHotlinesPhones=false
        },
        callPhone(){
            this.ifHotlinesPhones=false
        },
        wxClose(){
            this.wxShow=false
        }
    }
}
</script>
<style>
.contactUsContainer{
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.contactHeader {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}  
.contactHeader .contactNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.contactHeader .contactBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.contactHeader .contactNavbar-left {
    left: 0;
}
.contactHeader .contactBtn-navbar .contactIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.contactHeader .contactIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.contactHeader .contactNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.page, .page-content {
    position: absolute;
  /* top: 0; */
  left: 0;
    right: 0;
    /* bottom: auto; */
    margin: auto;
    width: 100%;
    height: 100%;
    background: #fff;
}
.page-content {
    padding: 65px 0;
}
.logo {
    width: 18%;
    margin: 10% auto;
    text-align: center;
}
.logo img {
    margin: 0 auto;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.logo p {
    margin-top: 8%;
}
.contactMain .row {
    border-bottom: 1px solid #e5e5e5;
    padding: 3.8% 0;
    font-size: 14px;
    margin: 0 5%;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.fvc {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.grid .row .col.col-10 {
    -moz-box-flex: 40;
    width: 40%;
    -ms-flex: 40;
    -webkit-box-flex: 40;
    flex: 40;
}
.grid .row .col.col-3 {
    -moz-box-flex: 12;
    width: 12%;
    -ms-flex: 12;
    -webkit-box-flex: 12;
    flex: 12;
}
.iconfont.right-icon {
    text-align: right;
}
.far {
    -webkit-box-pack: end;
    -ms-flex-pack: edn;
    justify-content: flex-end;
}
.iconfont {
    font-family: iconfont!important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
}
.iconfont.right-icon:after {
    content: "\E634";
    font-size: 10px;
}
.copyRight {
    text-align: center;
    font-size: 12px;
    position: absolute;
    width: 100%;
    bottom: 5%;
}
.hotlinesAndPhones{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0,0,0,.3);
    z-index: 11;
}
.cont {
    margin: 0 auto;
    width: 85%;
    border-radius: 8px;
    background-color: #fff;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 7.5%;
    padding-top: 3%;
    font-size: 16px;
}
.cont p {
    padding: 2% 5%;
    font-size: 14px;
}
.cont .tel {
    font-size: 18px;
    margin-bottom: 5%;
    padding: 2% 5%;
}
.cont .btngroup {
    border-top: 1px solid #e5e5e5;
}
.cont .btngroup .btn {
    width: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5% 0;
    text-align: center;
    float: left;
    color: #2e2e2e;
}
.cont .btngroup .btn:last-child {
    border-left: 1px solid #e5e5e5;
}
.wl-trans-dialog {
    position: fixed;
    z-index: 1;
    /* top: 0; */
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0,0,0,.5);
}
.translate-viewport {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    opacity: 1;
}
#weixinKFDialog img {
    width: 70%;
    position: absolute;
    left: 15%;
    top: 17%;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
#weixinKFDialog .close {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/close-gray.png);
    width: 30px;
    height: 30px;
    margin: 12px 10px;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    z-index: 9;
    right: 0;
}
</style>