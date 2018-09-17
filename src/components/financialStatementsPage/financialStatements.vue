<template>
    <div>
        <section class="capitalHeader">
            <div class="capitalContent capitalNavbar">
                <div class="capitalBtn-navbar capitalNavbar-left">
                    <span class="capitalIcon capitalIcon-return" @click="goBack"></span>
                </div>
                <div class="capitalNavbar-main">资金报表</div>
                <div class="capitalBtn-navbar capitalNavbar-right">
                    <span class="capitalPolicy">?</span>
                </div>
            </div>
        </section>
        <headerFill></headerFill>
        <div class="capitalTop">
            <div class="capitalTop1">
                <p class="balanceTitle">账户余额(元)</p>
                <p class="balanceNumber">{{capitalData.noGetpayFee}}</p>
                <div class="capitalTop1Arrow" @click="jumpFimeBalance"></div>
            </div>
            <div class="capitalTop2">
                <div>
                    <p>可提现金额</p>
                    <p>{{capitalData.canGetpayFee}}</p>
                </div>
                <div @click="jumpReturned">
                    <p>已退货金额</p>
                    <p>{{returnedGoodsAmount}}</p>
                </div>
                <div class="capitalTop2Arrow" ></div>
            </div>
        </div>
        <div class="capitalCenter">
            <div class="capitalCenter1">
                <div>
                    <div class="finacPic1"></div>
                    <p>累计资金</p>
                    <p>￥{{capitalData.totalShareFee}}</p>
                </div>
                <div>
                    <div class="finacPic2"></div>
                    <p>累计单数</p>
                    <p>{{capitalData.pTradesCount}}</p>
                </div>
                <div @click="jumpBring(2)">
                    <div class="finacPic3"></div>
                    <p>已提现</p>
                    <p>￥{{capitalData.totalGotpayFee}}</p>
                    <span></span>
                </div>
                <div @click="jumpBring(1)">
                    <div class="finacPic4"></div>
                    <p>提现中</p>
                    <p>￥{{capitalData.getpayingFee}}</p>
                    <span></span>
                </div>
                
            </div>
            <div class="centerDiv"></div>
            
        </div>
        <button class="iWananPut" @click="jumpApplication">我要提现</button>
    </div>
</template>
<script>
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    import headerFill from '../headerFill/headerFill'
    export default{
        components:{
          headerFill
        },
        data(){
            return{
                capitalData:"",
                returnedGoodsAmount:"",
            }
        },
        created(){
            this.initialCapital()
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            initialCapital(){
                axios
                .post(
                    "profileProfit",
                    qs.stringify({}),{}
                )
                .then(res => {
                    console.log(res.result.agencyShareAccount)
                    this.capitalData=res.result.agencyShareAccount
                    this.returnedGoodsAmount=res.result.sumReturnSaleRecord
                });
            },
            jumpFimeBalance(){
                this.$router.push('/fineBalance/'+this.capitalData.canGetpayFee)
            },
            jumpReturned(){
                this.$router.push('/returnedGoods')
            },
            jumpBring(state){
                this.$router.push('/bringOutTheDetails/'+state)
            },
            jumpApplication(){
                this.$router.push('/applicationPresentation/'+this.capitalData.canGetpayFee)
            },
        }
    }
</script>
<style>
.capitalHeader {
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
.capitalHeader .capitalNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fb4e90;
}
.capitalHeader .capitalBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.capitalHeader .capitalBtn-navbar .capitalIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.capitalHeader .capitalIcon-return {
    background-size: 100%;
    background-image: url('../../../static/images/ic_ab_back_while.png');
}
.capitalHeader .capitalNavbar-main {
    margin: 0;
    color: #fff;
    font-size: 16px;
}
.capitalHeader .capitalNavbar-right {
    right: 0;
}
.capitalPolicy{
    display: inline-block;
    width: 45px;
    height: 45px;
    font-size: 20px;
    font-weight: bolder;
    color:#fff;
}
.capitalTop{
    width: 100%;
    background: #fb4e90;
    /* margin-top: 45px; */
    padding: 0 15px;
}
.balanceTitle{
    color:#fff;
    font-size: 15px;
    padding-top: 15px;
    padding-bottom: 5px;
}
.balanceNumber{
    color:#fff;
    font-size: 28px;
}
.capitalTop1{
    position: relative;
}
.capitalTop1Arrow{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    background: url('../../../static/images/next_white.png') no-repeat;
    background-size: 100% 100%;
}
.capitalTop2{
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    position: relative;
}
.capitalTop2:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.capitalTop2>div{
    float: left;
    width: 50%;
    color:#fff;
    font-size: 15px;
}
.capitalTop2>div:nth-child(1){
    border-right: 1px solid #fff;
    box-sizing: border-box;
}
.capitalTop2>div:nth-child(2){
    padding-left: 15px;
}
.capitalTop2Arrow{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
    width: 20px !important;
    height: 20px;
    background: url('../../../static/images/next_white.png') no-repeat;
    background-size: 100% 100%;
}
.capitalCenter{
    padding: 50px 50px;
    position: relative;

}
.capitalCenter:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.capitalCenter1{
    position: relative;
}
.capitalCenter .capitalCenter1>div{
    float: left;
    width: 50%;
    height: 110px;
    padding: 15px 0;
    text-align: center;
    box-sizing: border-box;
    position: relative;
}
.capitalCenter .capitalCenter1>div>div:nth-child(1){
    width: 30px;
    height: 30px;
    margin: auto;
    /* background: red; */
}
.finacPic1{
    background: url(http://unesmall.b0.upaiyun.com//common/images/icon_money2.png) no-repeat;
    background-size: 100% 100%;
}
.finacPic2{
    background: url(http://unesmall.b0.upaiyun.com//common/images/icon_money2.png) no-repeat;
    background-size: 100% 100%;
}
.finacPic3{
    background: url(http://unesmall.b0.upaiyun.com//common/images/icon_money3.png) no-repeat;
    background-size: 100% 100%;
}
.finacPic4{
    background: url(http://unesmall.b0.upaiyun.com//common/images/icon_money4.png) no-repeat;
    background-size: 100% 100%;
}
.capitalCenter .capitalCenter1>div:nth-child(1){
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    
}
.capitalCenter .capitalCenter1>div:nth-child(1),.capitalCenter .capitalCenter1>div:nth-child(3){
    padding-right: 30px;
}
.capitalCenter .capitalCenter1>div:nth-child(2),.capitalCenter .capitalCenter1>div:nth-child(4){
    padding-left: 30px;
}
.capitalCenter .capitalCenter1>div:nth-child(3)>span:nth-child(4),.capitalCenter .capitalCenter1>div:nth-child(4)>span:nth-child(4){
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    background: url("../../../static/images/arrow_gray.png") no-repeat;
    background-size: 100% 100%;
    top: 0;
    bottom: 0;
    margin: auto;
}
.capitalCenter .capitalCenter1>div:nth-child(3)>span:nth-child(4){
    right: 30px;
}
.capitalCenter .capitalCenter1>div:nth-child(4)>span:nth-child(4){
    right: 0px;
}


.capitalCenter .capitalCenter1>div:nth-child(4){
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    
}
.capitalCenter .centerDiv{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 50px;
    background: #f6f6f6;
}
.capitalCenter .capitalCenter1>div>p:nth-child(2){
    font-size: 13px;
    line-height: 36px;
}
.capitalCenter .capitalCenter1>div>p:nth-child(3){
    font-size: 10px;
}
.iWananPut{
    display: block;
    border:0;
    color:#fff;
    background: #fb4e90;
    font-size: 15px;
    width: 90%;
    height: 40px;
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>