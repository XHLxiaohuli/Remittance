<template>
    <div>
        <section class="header">
            <div class="content navbar">
                <div class="btn-navbar navbar-left">
                    <span class="icon icon-return" @click="goBack"></span>
                </div>
                <div class="navbar-main">购买礼包</div>
            </div>
        </section>

        <div class="page-content buyGift wl-nexter">
            <div class="banner">
                <img id="img" src="http://unesmall.b0.upaiyun.com//common/images/bg_top.png" alt="">
            </div>
            <ul class="grid">
                <li class="row" v-for="(item,index) in activityShopData" @click="jumpDetails(item.itemId)">
                    <div class="thumb">
                        <img :src="item.pics" alt="">
                    </div>
                    <div class="col">
                        <p>{{item.title}}</p>
                        <p>礼包价：<span class="price">{{(item.price/100).toFixed(2)}}</span></p>
                        <p>
                            <del>市场价：<span class="price">{{(item.refPrice/100).toFixed(2)}}</span></del>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="activityRule">
                <div class="title">
                    <img src="http://unesmall.b0.upaiyun.com//common/images/activityRule.png" alt="">
                </div>
                <p>
                    1、购买任意礼包，即可成为推广经理。<br>
                    2、购买的礼包无产品质量问题，均不予退还。<br>
                    3、加盟成功后，如有号码信息变更，请联系平台客服。<br>
                </p>
            </div>
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
            activityShopData:[],
        }
    },
    created(){
        this.judgeAgent()
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        judgeAgent(){
            axios
            .post(
                "myParentUser",
                qs.stringify({
                    pUserId: this.$route.params.userId,
                }),{}
            )
            .then(res => {
                console.log(res.result)

            });
            this.pullShonp()
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
                console.log(res.result.items)
                this.activityShopData=res.result.items
            });
        },
        jumpDetails(itemId){
            this.$router.push('/commodityDetails/'+itemId+";"+this.$route.params.userId)
        },
    }
}
</script>
<style>
.header {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.header .navbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.header .navbar-left {
    left: 0;
}
.header .btn-navbar {
    position: absolute;
    /* top: 0; */
    height: 45px;
    width: 45px;
    z-index: 9;
}
.header .btn-navbar .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.header .icon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.header .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.buyGift {
    background-color: #d61b0f !important;
    color: #fff;
    padding: 45px 0 0;
    overflow-y: auto;
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
.buyGift .banner {
    background-color: #fceabd;
}
.banner {
    width: 100%;
    position: relative;
    overflow: hidden;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.buyGift .grid {
    margin: 2% 5% 0;
    border-top: 1px dashed #fceabd;
}
.buyGift .grid .row {
    border-bottom: 1px dashed #fceabd;
    padding: 2%;
}
.buyGift .thumb {
    width: 100px;
    height: 100px;
}
.buyGift .thumb img {
    background-color: #fceabd;
}
.buyGift .grid .row .col {
    margin-left: 4%;
    margin-top: 15px;
    font-size: 16px;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.buyGift .grid .row .col del {
    font-size: 14px;
}
del {
    text-decoration: line-through;
}
.buyGift .grid .row .col del {
    font-size: 14px;
}
.buyGift .activityRule {
    padding: 2%;
    margin: 0 5%;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.buyGift .title {
    width: 70px;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
</style>