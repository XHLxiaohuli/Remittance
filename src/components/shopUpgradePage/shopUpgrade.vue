<template>
    <div>
        <section class="shopUpHeader">
            <div class="shopUpContent shopUpNavbar">
                <div class="shopUpBtn-navbar shopUpNavbar-left">
                    <span class="shopUpIcon shopUpIcon-return" @click="goBack"></span>
                </div>
                <div class="shopUpNavbar-main">店铺升级</div>
            </div>
            <div class="broadcast"></div>
            <div class="shopUpMain">
                <p class="congratulationsText">恭喜你已成功加入优商汇店铺，快去查看如何赚钱吧</p>
                <div class="shopUpButDiv">
                    <button :disabled="isDis" :class="{isDaiLis:isDis===false}" @click="upLeve">马上升级店铺</button>
                    <button>如何赚钱</button>
                </div>
                <p class="privilegedTitle">升级店铺特权</p>
                <ul class="privilegeUl">
                    <li>
                        <div class="privilegePic privilegePic1"></div>
                        <div class="privilegePicRight">
                            <p>平台代理权</p>
                            <p>享受优尚汇平台上百万款热销产品的代理权。</p>
                        </div>
                    </li>
                    <li>
                        <div class="privilegePic privilegePic2"></div>
                        <div class="privilegePicRight">
                            <p>推广拿高额奖励</p>
                            <p>每成功推荐一位好友成功加入店铺，或推广销售平台上的任何产品，都可获得高额奖励。</p>
                        </div>
                    </li>
                    <li>
                        <div class="privilegePic privilegePic3"></div>
                        <div class="privilegePicRight">
                            <p>自购拿返利</p>
                            <p>自己购买平台上的任何产品，都可获得高额返利。</p>
                        </div>
                    </li>
                    <li>
                        <div class="privilegePic privilegePic4"></div>
                        <div class="privilegePicRight">
                            <p>轻松享受一键式营销</p>
                            <p>吸睛营销方案公司提供，只需动动手指，就能坐等推广费进兜。</p>
                        </div>
                    </li>
                </ul>
                <p class="remarks">商品统一由平台直接收款，直接发货，并提供产品的售后服务，推广费由平台统一设置。</p>

            </div>
            
        </section>
    </div>
</template>
<script>
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
export default{
    data(){
        return{
            isDis:false,
            activityShop:"",
        }
    },
    created(){
        if(localStorage.getItem('userAgency')==0){
            this.isDis=false
            
        }else if(localStorage.getItem('userAgency')==1){
            this.isDis=true
        }
        this.pullShonp()
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        upLeve(){
            this.$router.push('/commodityDetails/'+this.activityShop+";"+this.$route.params.userId)
        },
        //获取商品信息
        pullShonp(){
            axios
            .post(
                "shopList",
                qs.stringify({
                    itemTypes: 9,
                    pg: 0,
                    sz: 10,
                }),{}
            )
            .then(res => {
                console.log(res.result.items[0].itemId)
                this.activityShop=res.result.items[0].itemId
            });
        },

    }
}
</script>
<style>
/* .shopUpHeader .shopUpNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
} */
.shopUpHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.shopUpHeader .shopUpNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.shopUpHeader .shopUpBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.shopUpHeader .shopUpNavbar-left {
    left: 0;
}
.shopUpHeader .shopUpBtn-navbar .shopUpIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.shopUpIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.shopUpHeader .shopUpNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.broadcast{
    width: 100%;
    height: 130px;
    background: url('../../../static/images/make_money.jpg')no-repeat;
    background-size: 100% 100%;
}
.shopUpMain{
    background: #fff;
}
.congratulationsText{
    text-align: left;
    background: #fff;
    font-size: 12px;
    padding: 10px 0;
    padding-left: 15px;
}
.shopUpButDiv{
    width: 100%;
    padding:0 15px;

}
.shopUpButDiv:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.shopUpButDiv>button{
    border:0;
    margin: 0;
    font-size: 12px;
    padding: 2% 12%;
}
.shopUpButDiv>button:nth-child(1){
    float: left;
    color:#fff;
    background: gray;
}
.shopUpButDiv>button:nth-child(2){
    float: right;
    color:#fff;
    background: #fb4e90;
}
.isDaiLis{
    color:#fff !important;
    background: #fb4e90 !important;
}
.privilegedTitle{
    margin:0 15px;
    padding-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 13px;
}
.privilegeUl{
    margin: 0 15px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
}
.privilegeUl>li:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.privilegeUl>li{
    position: relative;
}
.privilegeUl>li:last-child>div:nth-child(2){
    border:0;
}
.privilegePic{
    width: 15%;
    height: 50px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto
}
.privilegePic1{
    background: url(http://unesmall.b0.upaiyun.com//common/images/ic_privilege4.png) no-repeat;
    background-size: 100% 100%;
}
.privilegePic2{
    /* background: url() no-repeat;
    background-size: 100% 100%; */
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/makeMoney_icon.png);
    background-size: 35px 241px;
    background-repeat: no-repeat;
    background-position: 0 -77px;
    width: 29px;
    height: 29px;
    margin-left: 15px;
}
.privilegePic3{
    /* background: url() no-repeat;
    background-size: 100% 100%; */
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/makeMoney_icon.png);
    background-size: 35px 241px;
    background-repeat: no-repeat;
    background-position: 0 -155px;
    width: 26px;
    height: 31px;
    margin-top: 25px;
    margin-left: 12px;
}
.privilegePic4{
    /* background: url() no-repeat;
    background-size: 100% 100%; */
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/makeMoney_icon.png);
    background-size: 35px 241px;
    background-repeat: no-repeat;
    background-position: 0 0;
    width: 18px;
    height: 25px;
    margin-left: 17px;
}
.privilegePicRight{
    float: left;
    width: 84%;
    padding: 4% 0;
    margin-left: 17%;
    border-bottom:1px solid #dfdfdf;
}
.privilegePicRight>p:nth-child(1){
    font-size: 14px;
    color:#000;
}
.privilegePicRight>p:nth-child(2){
    font-size: 8px;
}
.remarks{
    font-size: 10px;
    text-align: justify;
    line-height: 20px;
    padding: 15px 15px;
    color: gray;
}
</style>