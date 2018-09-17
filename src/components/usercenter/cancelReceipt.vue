<template>
    <div class="cancelClass">
        <section class="header">
            <div class="content navbar">
                <div class="btn-navbar navbar-left" @click="back">
                    <span class="icon icon-return"></span>
                </div>
                <div class="navbar-main">订单详情</div>
            </div>
        </section>
        <section id="order-detail-page">
            <div id="order-status-layout">
                <h1>
                    <span>订单状态</span>
                </h1>
                <div class="status-detail-layout">
                    <div class="status-detail">
                        <h2>创建订单<span>{{establishTime}}</span></h2>
                        <h2>已备货<span>{{stockUpTime}}</span></h2>
                        <h2>配送时间<span>{{distributionTime}}</span></h2>
                        <p>商品已经送出，请耐心等待哦！</p>
                    </div>
                </div>
            </div>

            <div id="order-detail" class="grid">
                <h1>
                    <span>订单详情</span>
                </h1>

                <div class="detail-info">
                    <p>
                        <span>订单号：</span>{{orderData.trade.tradeId}}
                    </p>
                    <p>
                        <span>下单时间</span>：{{establishTime}}
                    </p>
                    <p>
                        <span>收货人信息：</span>
                    </p>
                    <div class="row">
                        <div class="col col-5">
                            <span>{{orderData.logisticsDO.contactName}}</span>
                        </div>
                        <div class="col col-16">
                            <span>{{orderData.logisticsDO.mobile}}</span>
                        </div>
                    </div>
                    <p>{{orderData.logisticsDO.addr}}</p>
                </div>

                <div class="goods-list-layout ">
                    <ul class="goods-list"></ul>
                </div>
                <div class="logistics  row">
                    <div class="col col-18 fb fvc "></div>
                    <div class="col col-5 fb fvc fac" @click="seeLogistics">查看物流</div>
                </div>
                <div class="payment"></div>
                <div class="suminfo-layout row">
                    <div class="col col-18 fb fvc suminfo">
                        <p>合计：<span class="money">{{totalMoney}}</span></p>
                    </div>
                    <div class="col col-5 fb fvc fac sure-order" @click="confirmCollect">确认收货</div>
                </div>
                <div class="money-detail">
                    <p>
                        <span>商品金额：</span>{{totalMoney}}
                    </p>
                </div>
            </div>
        </section>
        <div id="order-status" class="grid ">
            <img src="http://unesmall.b0.upaiyun.com/common/images/confirm_deliver.png" alt="">待收货
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
            establishTime:"",
            stockUpTime:"",
            distributionTime:"",
            orderData:"",
            totalMoney:"",
        }
    },
    created(){   
        this.initialOrder()
    },
    methods:{
        back(){
            //this.$router.go(-1);
            this.$router.push('/myorder/3');
        },
        //时间搓转换
        timestampToTime(timestamp){
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
            var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
            var m =
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
            var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m;
        },
        //保存两位数
        returnFloat(value){
            var value=Math.round(parseFloat(value)*100)/100;
            var xsd=value.toString().split(".");
            if(xsd.length==1){
            value=value.toString()+".00";
            return value;
            }
            if(xsd.length>1){
            if(xsd[1].length<2){
            value=value.toString()+"0";
            }
            return value;
            }
        },
        initialOrder(){
            axios
            .post(
                "otherInterface",
            qs.stringify({
                tradeId: this.$route.params.tradeId
            }),{}
            )
            .then(res => {
                console.log(res)
                if(res.code==0){
                    this.establishTime=this.timestampToTime(res.result.trade.dateCreated)
                    this.stockUpTime=this.timestampToTime(res.result.trade.consignTime)
                    this.distributionTime=this.timestampToTime(res.result.trade.confirmTime)
                    this.orderData=res.result
                    var allMoney=(res.result.trade.totalFee)/100
                    console.log(allMoney)
                    this.totalMoney=this.returnFloat(allMoney)
                }else{
                    Toast(res.msg)
                }
            });
        },
        seeLogistics(){
            this.$router.push('/lookLogistics/'+this.$route.params.tradeId);
        },
        confirmCollect(){
            axios
            .post(
            "sureOrder",
            qs.stringify({
                tradeId:this.$route.params.tradeId,
            }),{}
            )
            .then(res => {
                console.log(res)
                if(res.code==0){
                    Toast("已确认收货")
                    this.$router.go(-1);
                }else{
                    Toast(res.msg)
                }
            });
        }
    },
}
</script>
<style>
.cancelClass{
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 400;
}
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
#order-detail-page {
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: 50px;
    padding-top: 55px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
}
#order-detail-page h1 {
    font-size: 15px;
    color: #fff;
}
#order-detail-page h1 span {
    display: inline-block;
    background: #fb4e90;
    padding: 2px 18px 2px 10px;
    border-radius: 0 13px 13px 0;
}
#order-status {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    color: #000;
    font-size: 17px;
    line-height: 50px;
    text-align: center;
    background: #f6f6f6;
}
#order-status-layout .status-detail {
    border-left: 1px solid #cbcbcb;
    margin-left: 38px;
    padding: 10px 10px 20px 18px;
}
#order-status-layout .status-detail h2 {
    position: relative;
    font-weight: 400;
    margin-top: 10px;
}
#order-status-layout .status-detail h2:before {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fb4e90;
    content: "-";
    text-indent: -999px;
    position: absolute;
    top: 50%;
    margin-top: -5px;
    left: -24px;
}
#order-status-layout .status-detail h2 span {
    color: #7f7f7f;
    margin-left: 1em;
}
#order-status-layout .status-detail p {
    color: #7f7f7f;
    background-color: #f3f3f3;
    border-radius: 16px;
    padding: 5px 10px;
    margin-top: 5px;
    font-size: 12px;
}
#order-detail {
    background-color: #f6f6f6;
}
#order-detail-page h1 {
    font-size: 15px;
    color: #fff;
}
#order-detail-page h1 span {
    display: inline-block;
    background: #fb4e90;
    padding: 2px 18px 2px 10px;
    border-radius: 0 13px 13px 0;
}
#order-detail .detail-info {
    position: relative;
    font-size: 12px;
    color: #7c7c7c;
    padding: 15px 10px 10px;
}
#order-detail .detail-info span {
    color: #2e2e2e;
    font-size: 14px;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
}
.grid .row .col.col-16 {
    -moz-box-flex: 64;
    width: 64%;
    -ms-flex: 64;
    -webkit-box-flex: 64;
    flex: 64;
}
.goods-list-layout {
    background-color: #fff;
    width: 100%;
    overflow-x: hidden;
}
.logistics {
    padding: 5px 10px;
    background-color: #fff;
    margin-bottom: 5px;
}
.grid .row .col.col-18 {
    -moz-box-flex: 72;
    width: 72%;
    -ms-flex: 72;
    -webkit-box-flex: 72;
    flex: 72;
}
.logistics .col-5 {
    border: 1px solid #2e2e2e;
    color: #2e2e2e;
    height: 32px;
    line-height: 32px;
    border-radius: 3px;
    margin: 5px 0 5px .5em;
}
.fac {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
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
.suminfo-layout {
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
}
.grid .row .col.col-18 {
    -moz-box-flex: 72;
    width: 72%;
    -ms-flex: 72;
    -webkit-box-flex: 72;
    flex: 72;
}

.suminfo-layout .suminfo .money {
    font-size: 20px;
    vertical-align: middle;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.suminfo-layout .product-comment, .suminfo-layout .sure-order {
    border: 1px solid #fb4e90;
    color: #fb4e90;
}
.suminfo-layout .suminfo {
    color: #000;
    border:0;
}
#order-detail .money-detail {
    line-height: 2;
    padding: 0 10px;
    font-size: 12px;
    background: #fff;
}
#order-detail .money-detail p {
    color: #5b5b5b;
}
#order-detail .money-detail p span {
    color: silver;
}
#order-status img {
    display: inline;
    max-width: 27px;
    margin-right: 5px;
    margin-top: -5px;
    vertical-align: middle;
    min-height: 10px;
}
.suminfo-layout .cancel-order, .suminfo-layout .dopay, .suminfo-layout .product-comment, .suminfo-layout .sure-order {
    height: 32px;
    line-height: 32px;
    border-radius: 3px;
    margin: 5px 0 5px .5em;
}
</style>