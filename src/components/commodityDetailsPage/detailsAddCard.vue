<template>
    <section class="wl-trans-dialog wl-top-dialog translate-viewport" id="order-popup">
        <section class="headerss">
            <div class="content navbar">
                <div class="btn-navbar navbar-right close" @click="closeAddFill"></div>
                <div class="navbar-main">加入购物车</div>
            </div>
        </section>

        <div class="dialog-body page-content">
            <div class="dialog-header"></div>
            <div class="dialog-content">
                <div class="popup-body">
                    <div class="order-info">
                        <div class="item-pic">
                            <img :src="fillValues.picUrl" alt="">
                        </div>
                        <p class="item-title">{{fillValues.shopText}}</p>
                        <p class="item-price price"><span class="current-price">
                            <span class="figure figurePrice">{{fillValues.price/100}}</span>
                        </span></p>
                    </div>
                    <div class="order-count">
                        <label for="order-count-input">购买数量：</label>
                        <div class="form-control">
                            <button class="btn minus-btn" :disabled="addAndSubDis" @click="reducenumber">-</button><input id="order-count-input" type="tel" v-model="numShop" maxlength="2"><button class="btn plus-btn" :disabled="addAndSubDis" @click="addnumber">+</button>
                        </div>
                    </div>
                </div>
                <div class="popup-footer">
                    <span class="btn confirm-btn" id="order-confirm-btn" @click="joinCardIIsDemure">确认</span>
                </div>
            </div>
        </div>
        <div class="limitFill" v-if="addAndSubDis">
            <div class="limitFills">
                <div class="limitFillText">米酷创业超值大礼包限购1件</div>
                <div class="limitFillFooter">
                    <span @click="colseGiftbag" class="limitFillBtn">确定</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
export default{
    data(){
        return{
            numShop:1,
            fillValues:"",
            addAndSubDis:false,
        }
    },
    props:{
        fillValue:{
            type: Object,
            required: true
        }
    },
    created(){
        this.pullDeliveryValue()
    },
    methods:{
        closeAddFill(){
            this.$emit('msgAdd',"false")
        },
        pullDeliveryValue(){
            this.fillValues=this.fillValue
        },
        reducenumber(){
            if(this.numShop>1){
                this.numShop-=1
            }else{
                Toast('客官留一个吧')
            }
        },
        addnumber(){
            var parameterLength=window.location.hash.split("/")
            //var parameterLengths=parameterLength[3].split(";")
            console.log(parameterLength[2])
            var parameterLengths=parameterLength[2].indexOf(";")
            if(parameterLengths!=-1){
                parameterLengths=parameterLength[2].split(";")
                if(parameterLengths.length>1){
                    this.addAndSubDis=true
                }
            }else{
                if(this.numShop<99){
                    this.numShop+=1
                }else{
                    Toast('客官真是财大气粗啊')
                }
            }
            console.log(parameterLengths)
            // if(parameterLengths.length>1){
            //     this.addAndSubDis=true
            // }else{
            //     if(this.numShop<99){
            //         this.numShop+=1
            //     }else{
            //         Toast('客官真是财大气粗啊')
            //     }
            // }
            
        },
        colseGiftbag(){
            this.addAndSubDis=false
        },
        joinCardIIsDemure(){
            if(this.fillValues.isClass==1){
                var itemss="[{'item_id':"+this.fillValues.itemId+",'num':"+this.numShop+"}]"
                if((this.fillValues.isCard!==0)&&(this.fillValues.isCard!==2)){
                    axios
                    .post(
                    "addShopCard",
                    qs.stringify({
                        items: itemss,
                    }),{}
                    )
                    .then(res => {
                        if(res.code==0){
                        console.log(res)
                        Toast("购买成功")
                        this.$emit('msgAdd',"false")
                        }else{
                            Toast(res.msg)
                        }
                    });
                }
            }else if(this.fillValues.isClass==2){
                var ordervalue='[{"item_id":"'+this.fillValues.itemId+'","num":"'+this.numShop+'"}]'
                this.$router.push("/confirmationOfOrder/"+ordervalue);
            }
            
        }
    }
}
</script>
<style>
.wl-trans-dialog {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.translate-viewport {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    opacity: 1;
}
.headerss {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.headerss .navbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.headerss .navbar-right {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/close-gray.png);
    width: 23px;
    height: 23px;
    margin: 12px 10px;
    background-size: 100%;
    background-repeat: no-repeat;
}
.headerss .navbar-right {
    right: 0;
}
.headerss .btn-navbar {
    position: absolute;
    top: 0;
    z-index: 9;
}
.headerss .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.wl-trans-dialog .dialog-body.page-content {
    padding-top: 45px;
}
.wl-trans-dialog .dialog-body {
    height: 100%;
    width: 100%;
    overflow: hidden;
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
    padding: 45px 0;
}
#order-popup .dialog-header {
    display: none;
}
#order-popup .dialog-content {
    padding: 15px 14px 0;
    background: #fff;
}
.wl-trans-dialog .dialog-content {
    height: 100%;
    overflow-y: auto;
}
#order-popup .order-info .item-pic {
    -webkit-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    -o-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    width: 65px;
    height: 65px;
    float: left;
    margin-right: 10px;
    position: relative;
    border: 1px solid #e5e5e5;
    padding: 5px;
}
#order-popup .order-info .item-pic img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
#order-popup .order-info .item-title {
    margin-top: 6px;
    font-size: 14px;
    line-height: 20px;
}
.price:before {
    font-size: 14px;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
#order-popup .order-info .item-price {
    line-height: 18px;
    color: #fb4e90;
}
#order-popup .order-count {
    margin-top: 15px;
    height: 66px;
    overflow: hidden;
    border-top: 1px solid #e5e5e5;
}
#order-popup .order-count label {
    line-height: 66px;
    font-size: 14px;
    color: #666;
    float: left;
}
#order-popup .order-count .form-control {
    float: right;
    overflow-y: hidden;
    margin-top: 15px;
    height: 34px;
    position: relative;
    text-align: center;
    padding: 0 35px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
}
#order-popup .order-count .form-control .minus-btn {
    left: 0;
    top: 0;
}
#order-popup .order-count .form-control .plus-btn {
    right: 0;
    top: 0;
}
#order-popup .order-count .form-control .minus-btn, #order-popup .order-count .form-control .plus-btn {
    display: block;
    width: 35px;
    height: 32px;
    line-height: 32px;
    font-size: 20px;
    color: #5f5f5f;
    text-align: center;
    position: absolute;
    vertical-align: middle;
    border:0;
    background: #fff;
}
#order-popup .order-count .form-control input {
    font-size: 12px;
    color: #5f5f5f;
    width: 38px;
    height: 32px;
    line-height: normal;
    text-align: center;
    border: none;
    border-right: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-radius: 0;
}
input[type=password], input[type=search], input[type=text], input[type=tel] {
    background: #fff;
    color: #666;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
}
#order-popup .popup-footer {
    margin-top: 6%;
    padding: 5px 0;
}
#order-popup .popup-footer .confirm-btn {
    display: block;
    height: 37px;
    line-height: 37px;
    width: 130px;
    margin: 0 auto;
    text-align: center;
    background: #fb4e90;
    font-size: 16px;
    color: #fff;
}
.limitFill{
    width: 270px;
    position: fixed;
    z-index: 11100;
    left: 50%;
    margin-left: -135px;
    margin-top: 0px;
    top: 50%;
    text-align: center;
    background: #fff;
}
.limitFills{
    background: #fff;
}.limitFillText{
    border-bottom: 1px solid #dedede;
    border-radius: 2px 2px 0 0;
    padding: 15px 10px;
    text-align: center;
}
.limitFillFooter{
    border-collapse: collapse;
    display: table;
    height: 44px;
    overflow: hidden;
    width: 100%;
}
.limitFillBtn{
    box-sizing: border-box !important;
    color: #0e90d2;
    cursor: pointer;
    display: table-cell !important;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    padding: 0 5px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    display: inline-block;
}
</style>