<template>
    <div>
        <section class="goodsHeader">
            <div class="goodsContent goodsNavbar">
                <div class="goodsBtn-navbar goodsNavbar-left">
                    <span class="goodsIcon goodsIcon-return" @click="goBack"></span>
                </div>
                <div class="goodsNavbar-main">已退款金额</div>
            </div>
        </section>
        <div class="goodsMain grid">
            <!--有数据start-->
            <div v-if="goodsHasData">
                <ul class="presentList">
                    <li v-for="(item,index) in hasGoodsHasData">
                        <div class="row row_border">
                            <div class="col col-15">
                                <p class="ellipsis">{{item.itemName}}</p>
                                <p class="order_num">订单号：{{item.tradeId}}</p>
                                <p class="order_time">退货时间：<span>{{item.time}}</span></p>
                            </div>

                            <div class="col col-5 fb far fvc">
                                <span class="status_img">
                                    <img src="http://unesmall.b0.upaiyun.com/common/images/icon_salesReturn.png" alt="">
                                </span>
                            </div>
                        </div>


                        <div class="row fans_info">
                            <div class="fans">粉丝:<span class="fans_namet">{{item.nickname}}</span></div>
                            <div class="fans_money">退款金额:<span class="money_num">{{item.shareFee/100}}</span></div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--有数据end-->
            <!--没有数据start-->
            <div v-if="!goodsHasData">
                <div>
                    <div class="goodsPic"></div>
                    <p class="noGoodsText">耶耶,没有人退货~</p>
                </div>
            </div>
            <!--没有数据end-->
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
            goodsHasData:true,
            hasGoodsHasData:"",
        }
    },
    created(){
        this.initialRefundList()
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
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
            return Y + M + D + h + m ;
        },
        initialRefundList(){
            axios
            .post(
                "getReturnGoodsVOList",
                qs.stringify({
                    pg: 0,
                    sz: 10
                }),{}
            )
            .then(res => {
                if(res.code==0){
                    // console.log(res.result)
                    if(res.result.list.length>0){
                        for(var i=0;i<res.result.list.length;i++){
                            res.result.list[i]["time"]=this.timestampToTime(res.result.list[i].returnDate)
                        }
                        this.hasGoodsHasData=res.result.list
                        console.log(this.hasGoodsHasData)
                        this.goodsHasData=true
                        
                    }else{
                        this.goodsHasData=false
                    }
                }else{

                }
                    
            });
        },
    }
}
</script>
<style>
.goodsHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.goodsHeader .goodsNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.goodsHeader .goodsBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.goodsHeader .goodsNavbar-left {
    left: 0;
}
.goodsHeader .goodsBtn-navbar .goodsIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.goodsHeader .goodsIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.goodsHeader .goodsNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.goodsMain{
    position: absolute;
    /* top: 0; */
    left: 0;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 100%;
    background: #fff;
}
.goodsPic{
    width: 120px;
    height: 120px;
    margin: auto;
    margin-top: 60%;
    background: url('../../../static/images/noorder.png') no-repeat;
    background-size: 100% 100%;
}
.noGoodsText{
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
}
.presentList {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding-top: 45px;
    position: absolute;
    top: 0;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.presentList li {
    border-bottom: 5px solid #f4f4f4;
    padding: 3% 5% 0;
}
.presentList li .row_border {
    border-bottom: 1px solid #e5e5e5;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
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
.grid .row .col.col-15 {
    -moz-box-flex: 60;
    width: 60%;
    -ms-flex: 60;
    -webkit-box-flex: 60;
    flex: 60;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
}
.presentList li .status_img {
    width: 28px;
    margin-right: 27%;
    position: relative;
    top: -6px;
}
.presentList li .status_img>img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.presentList li .fans_info {
    height: 40px;
    line-height: 40px;
}
.presentList li .fans_info div {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.presentList li .fans_info .fans_namet {
    display: inline-block;
    width: 56%;
    text-align: center;
    height: 14px;
    line-height: 14px;
    margin-right: 6%;
}
.presentList li .fans_info .money_num {
    display: inline-block;
    width: 25%;
    text-align: center;
    height: 14px;
    line-height: 14px;
    margin-right: 6%;
}
.presentList li .money_num {
    color: #fb4e90;
}
.presentList li .fans_money {
    text-align: right;
}
.presentList li .order_time {
    margin-bottom: 16px;
}
</style>