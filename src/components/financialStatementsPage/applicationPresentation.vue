<template>
    <div>
        <section class="applicationHeader">
            <div class="applicationContent applicationNavbar">
                <div class="applicationBtn-navbar applicationNavbar-left">
                    <span class="applicationIcon applicationIcon-return" @click="goBack"></span>
                </div>
                <div class="applicationNavbar-main">申请提现</div>
                <div class="applicationBtn-navbar applicationNavbar-right">
                    <span></span>
                </div>
            </div>
        </section>
        <div class="applicationTop">
            <p class="appTopTitle">可提现余额(元)</p>
            <p class="appTopNumber">{{quotableAmount}}</p>
        </div>
        <div class="putForwardBody">
            <div class="alipayAndWeChat">
                <div v-for="(item,index) in alipayAndWeChatText" :class="{addClass:index==alipayAndWeChatIndex}" @click="moilyItIndex(index)">{{item}}</div>
            </div>
            <!--支付宝start-->
            <div class="alipayModular" v-if="alipayAndWeChatIndex==0">
                <div class="alipayInput">
                    <span>支付宝账户：</span> <input type="text" placeholder="请输入支付宝账户" v-model="userAccount">
                </div>
                <div class="alipayInput">
                    <span>支付宝实名：</span> <input type="text" placeholder="请输入支付宝实名" v-model="userRealname">
                </div>
                <div class="Hyperlink">
                    <span class="seeAlipay">查看支付宝到账</span><span class="seeWeChat">查看微信到账</span>
                </div>
            </div>
            <!--支付宝end-->
            <!--微信start-->
            <div class="weChatModular" v-if="alipayAndWeChatIndex==1">
                <div class="exclamatoryMark">!</div>
                <p class="weChatText">关注优尚汇公众号,微信提现更轻松</p>
                <button class="weChatBtn">如何关注优尚汇公众号</button>
            </div>
            <!--微信end-->
            <button class="footerApplyBtn" @click="clickPutForward" :disabled=isPutforward :style="'background:'+presentationBgColor">申请提现</button>
        </div>
    </div>
</template>
<script>
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
export default{
    data(){
        return{
            alipayAndWeChatText:["支付宝","微信"], 
            alipayAndWeChatIndex:0,
            quotableAmount:"0.00",
            userAccount:"",
            userRealname:"",
            isPutforward:true,
            presentationBgColor:"#ccc"
        }
    },
    created(){
        this.quotableAmount=this.$route.params.quotableAmount
        if(this.$route.params.quotableAmount>0){
            this.isPutforward=false
            this.presentationBgColor="#fb4e90"
        }else{
            this.isPutforward=true
            this.presentationBgColor="#ccc"
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        moilyItIndex(index){
            this.alipayAndWeChatIndex=index
        },
        clickPutForward(){
            var getType
            if(this.alipayAndWeChatIndex==0){
                getType=1
            }else if(this.alipayAndWeChatIndex==1){
                getType=2
            }
            axios
            .post(
                "reqGetPay",
                qs.stringify({
                    getpayType:getType,
                    account:this.userAccount,
                    accountName:this.userRealname,
                    getpayFee:this.quotableAmount,
                }),{}
                )
            .then(res => {
                if(res.code==0){
                    Toast("提示提现申请提交成功，请耐心等候")
                }else{
                    Toast(res.msg)
                }
                
                console.log(res)
                    
            });
        }
    }
}
</script>
<style>
.applicationHeader {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    /* border-bottom: 1px solid #e5e5e5; */
    box-shadow: 0px 3px 4px rgba(000, 000, 000, 0.4);
}
.applicationHeader .applicationNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fb4e90;
}
.applicationHeader .applicationBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.applicationHeader .applicationBtn-navbar .applicationIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.applicationHeader .applicationIcon-return {
    background-size: 100%;
    background-image: url('../../../static/images/ic_ab_back_while.png');
}
.applicationHeader .applicationNavbar-main {
    margin: 0;
    color: #fff;
    font-size: 16px;
}
.applicationHeader .applicationNavbar-right {
    right: 0;
}
.applicationTop{
    background: #fb4e90;
    padding-top: 75px;
    padding-left: 15px;
}
.appTopTitle{
    color:#fff;
    font-size: 15px;
}
.appTopNumber{
    font-size: 30px;
    color:#fff;
    padding: 10px 0;
    padding-bottom: 20px;
}
.putForwardBody{
    background: #fff;
    padding-top: 25px;
}
.alipayAndWeChat{
    width: 50%;
    height: 35px;
    border:1px solid #fb4e90;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
}
.alipayAndWeChat:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.alipayAndWeChat>div{
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    font-size: 15px;
    line-height: 35px;
    color:#fb4e90;
    box-sizing: border-box;
}
.alipayAndWeChat>div:nth-child(1){
    border-right: 1px solid #fb4e90;
}
.addClass{
    background: #fb4e90 !important;
    color:#fff !important;
}
.alipayModular{
    width: 80%;
    padding: 30px 0;
    margin: auto;
}
.alipayInput{
    width: 100%;
    height: 30px;
}
.alipayInput>span{
    /* display: inline-block; */
    /* width: 30%; */
    font-size: 13px;
}
.alipayInput>input{
    margin: 0;
    border:1px solid #ccc;
    width: 65%;
    height: 100%;
    box-sizing: border-box;
    background: #dfdfdf;
}
.alipayModular>div:nth-child(1){
    margin-bottom: 30px;
}
.Hyperlink{
    margin-top: 30px;
    padding: 0 10px;
}
.Hyperlink:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.seeAlipay{
    float: left;
    color:#000;
    border-bottom: 1px solid #000;
}
.seeWeChat{
    float: right;
    color:#000;
    border-bottom: 1px solid #000;
}
.exclamatoryMark{
    width: 80px;
    height: 80px;
    margin: auto;
    margin-top: 80px;
    background: #fb4e90;
    border-radius: 50%;
    text-align: center;
    font-size: 60px;
    color:#fff;
}
.weChatText{
    width: 100%;
    padding-top: 20px;
    font-size: 10px;
    text-align: center;
}
.weChatBtn{
    display: block;
    width: 45%;
   margin: auto;
   border:1px solid #fb4e90;
   color: #fb4e90;
   background: #fff;
   height: 30px;
   border-radius: 5px;
   font-size: 13px;
   margin-top: 10px;
}
.footerApplyBtn{
    border: 0;
    display: block;
    width: 90%;
    /* background: #ccc; */
    color:#fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 15px;
    height: 40px;
}
</style>