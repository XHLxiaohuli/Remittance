<template>
    <div>
        <section id="placeOrderPage">
            <section class="conHeader">
                <div class="content navbar">
                    <div class="btn-navbar navbar-left">
                        <span @click="back" class="icon icon-return"></span>
                    </div>
                    <div class="navbar-main">确认订单</div>
                </div>
            </section>
            <div class="page-content grid">
                <div class="consignee-layout page-layout grid">
                    <h2 v-if="false" class="page-layout-head row distribution-mode fvc">
                        <div class="col fb fac fvc active">配送上门</div>
                    </h2>

                    <div class="consignee page-layout-content row" @click="jumpMoAddress">
                        <div class="col col-23" v-if="isDefault">
                            <div class="row noBorder">
                                <h2 class="col-10">{{defaultAddress.receiverName}}</h2>
                                <h3 class="col-15">{{defaultAddress.receiverMobile}}</h3>
                            </div>
                            <p class="ellipsis">{{defaultAddress.receiver_state}}{{defaultAddress.receiverCity}}{{defaultAddress.receiverDistrict}}{{defaultAddress.receiverAddress}}</p>
                        </div>
                        <div class="null-msg col col-24" v-if="!isDefault">请设置收货地址！</div>
                        <div class="col col-2 right-icon fb fvc far"></div>
                    </div>
                </div>

                <div class="page-layout distribution-layout grid">
                    <div class="content page-layout-content grid idCardMessage" v-show="isBindingIdcard">
                        <div class="row">
                            <div class="col message-wrap">
                                <span class="ness"></span>
                                <input type="text" class="id-card" placeholder="身份证号码（填写后，我们将加密处理）" v-model="idCard">
                            </div>
                        </div>
                        <div class="moreDetail">
                            <div class="showMore" :class="{openSpan:openAndColse===true}" @click="openOrColse">
                                <span>展开说明</span>
                            </div>
                            <div class="messageBox" v-show="openAndColse">
                                <p>因各海关政策不同，部分海关需对收货人身份信息进行认证，错误信息可能导致无法正常清关。</p>
                                <p>您的身份证信息将加密保管，米酷保证信息安全，绝不对外泄漏！</p>
                                <p>
                                    任何身份认证问题可联系我们<a href="tel:4006-234-336">4006-234-336</a>(9:00-18:00)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="content page-layout-content grid">
                        <div class="row">
                            <div class="col message-wrap">
                                <textarea v-model="userMessage" class="leave-word" rows="1" placeholder="给我们留个言呗~～" maxlength="140"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page-layout buy-detail-layout">
                    <h2 class="page-layout-head">订单详情</h2>
                    <div class="page-layout-content">
                        <div class="goods-list-layout">
                            <ul class="goods-list clearfix">
                                <li class="row goods" v-for="(item,index) in confirmPurchase">
                                    <div class="thumb">
                                        <img :src="item.pics.split(';')[0]" :alt=item.title>
                                    </div>
                                    <div class="col fb fvc">
                                        <div>
                                            <h3 class="pb-10">
                                                <span class="title">{{item.title}}</span>
                                                <span class="spec"></span>
                                            </h3>
                                            <p>
                                                <span class="money">{{item.price/100}}</span>
                                                <span class="count">{{item.num}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="order-sum grid">
                            <div class="paymentWay">
                                <h4>支付方式</h4>
                                <div class="payment row fvc" @click="choicePayStart(4)">
                                    <div class="col col-10">
                                        <img width="20" height="20" src="http://unesmall.b0.upaiyun.com/common/images/wechat_icon.png" alt="">
                                        微信支付
                                    </div>
                                    <div class="col col-12 fb far fvc payment-value ">
                                        <i class="checked" :class="{choicePay:payStart==4}"></i>
                                    </div>
                                </div>
                                <div class="payment row fvc" @click="choicePayStart(3)">
                                    <div class="col col-10">
                                        <img width="20" height="20" src="../../../static/images/zfb.png" alt="">
                                        支付宝支付
                                    </div>
                                    <div class="col col-12 fb far fvc payment-value ">
                                        <i class="checked" :class="{choicePay:payStart==3}"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="sum-price row fvc">
                                <div class="col col-15">商品金额</div>
                                <p class="col col-9 fb far money">{{primaryAllPrice}}</p>
                                <div class="col col-1"></div>
                            </div>
                            
                            <div class="distribution-cost row fvc">
                                <div class="col col-15">配送费用(满99.00免费)</div>
                                <p class="col col-9 fb far money">{{freight}}</p>
                                <div class="col col-1"></div>
                            </div>

                            <div class="distribution-cost row fvc">
                                    <div class="col col-15">可用{{userintegral}}积分抵{{(userintegral/100).toFixed(2)}}元</div>
                                    <div class="col col-pay fb" :class="{addUse:isUse===false,noAddUse:isUse===true}" @click="choiceUse">
                                        <div class="onColPay"></div>
                                    </div>
                                    <div class="col col-1"></div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </section>
        <footer class="grid">
            <div class="row">
                <div class="col col-50 fb fvc fac amount-payable">
                    合计:<span class="money">{{freightAddAllPrice}}</span>
                </div>
                <div class="col col-50 fb fvc fac active-do-pay" @click="create"></div>
            </div>
        </footer>
        <div id="Alipay"></div>
    </div>
</template>
<script>
    var wxChannel = null; // 微信支付
    var aliChannel = null; // 支付宝支付
    var channel = null; 
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    
    export default{
        data(){
            return{
                openAndColse:false,
                confirmPurchase:[],
                primaryAllPrice:0,
                freight:0.00,
                freightAddAllPrice:"",
                idCard:"",
                defaultAddress:"",
                isDefault:true,
                isBindingIdcard:true,
                payStart:4,
                isUse:true,
                userintegral:0,
                userMessage:"",
                integralParameter:0,
            }
        },
        created(){
            // console.log(this.$route.params.ordervalue)
            this.pullConfirmCommodity()
            this.pullUserInformation()
            if(window.plus){
                this.plusReady();
            }else{
                document.addEventListener('plusready', this.plusReady(), false);
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            openOrColse(){
                if(this.openAndColse){
                    this.openAndColse=false
                }else{
                    this.openAndColse=true
                }
            },
            pullConfirmCommodity(){
                axios
                .post(
                "confirmationOfOrder",
                qs.stringify({
                    items:this.$route.params.ordervalue,
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        console.log(res.result.idCard)
                        this.confirmPurchase=res.result.items
                        this.idCard=res.result.idCard
                        this.userintegral=res.result.point
                        console.log(res.result.point)
                          
                        if(this.idCard==""||this.idCard==null||this.idCard==undefined){
                            this.isBindingIdcard=true
                        }else{
                            this.isBindingIdcard=false
                        }
                        for(var i=0;i<res.result.items.length;i++){
                            this.primaryAllPrice+=(res.result.items[i].price/100)*res.result.items[i].num
                        }
                        this.primaryAllPrice=this.primaryAllPrice.toFixed(2)
                        if(this.primaryAllPrice>=99){
                            this.freight=0.00.toFixed(2)
                        }else{
                            this.freight=10.00.toFixed(2)
                        }
                        this.freightAddAllPrice=this.returnFloat((Number( this.primaryAllPrice)+Number( this.freight)))
                    }else if(res.code==1){
                        this.$router.push("/login");
                    }else{
                        Toast(res.msg)
                    }
                });
            },
            //获取用户地址
            pullUserInformation(){
                axios
                .post(
                "saveAddress",
                qs.stringify({
                    op: "sel"
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        if(res.result.consignees.length!=0){
                            for(var i=0;i<res.result.consignees.length;i++){
                                if(res.result.consignees[i].getDef==1){
                                    this.defaultAddress=res.result.consignees[i]
                                }
                            }
                            this.isDefault=true  
                        }else{
                            this.isDefault=false
                        }
                        
                    }else{
                        Toast(res.msg)
                    }
                });
            },
            isSystemss(){              
                var u = navigator.userAgent, app = navigator.appVersion;   
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
                if(isAndroid){
                    return "android"
                }else if(isiOS){
                    return "iPhone"
                }
            },
            //结算
            create(){

                
                var channelValue
                var dataArr='['
                var isGreaterThan
                for(var i=0;i<this.confirmPurchase.length;i++){
                    if(i+1>=this.confirmPurchase.length){
                        dataArr+='{"item_id":"'+this.confirmPurchase[i].itemId+'","num":"'+this.confirmPurchase[i].num+'"}'
                    }else{
                        dataArr+='{"item_id":"'+this.confirmPurchase[i].itemId+'","num":"'+this.confirmPurchase[i].num+'"},'
                    }
                }
                dataArr+=']'
                var establishTime=(new Date()).valueOf() 
                if(this.primaryAllPrice>=99){
                    isGreaterThan=0
                }else{
                    isGreaterThan=1
                }
                if(this.payStart==3){
                    //app支付宝支付
                    axios
                    .post(
                    "appOrderDown",
                    qs.stringify({
                        msg:this.userMessage,
                        orderType:1,
                        idCard:this.idCard,
                        pType:3,
                        from:"cart",
                        items:dataArr,
                        point:0,
                    }),{
                        "welinkagent":this.isSystemss()
                    }
                    )
                    .then(res => {
                        console.log(res)
                        if(res.code==0){    
                            //wabapp支付
                            channelValue=res.result.order_info+"&"+res.result.signStr
                            this.pay(this.payStart,channelValue)                        
                        }else{
                            Toast(res.msg)
                        }
                    });
                }else if(this.payStart==4){
                    //app微信支付
                    axios
                    .post(
                    "appWxOrderDown",
                    qs.stringify({
                        msg:this.userMessage,
                        orderType:1,
                        idCard:this.idCard,
                        pType:4,
                        from:"cart",
                        items:dataArr,
                        point:0,
                    }),{"welinkagent":this.isSystemss()}
                    )
                    .then(res => {
                        console.log(res)
                        if(res.code==0){    
                            //wabapp支付
                            console.log(res.result)
                            channelValue={
                                "appid":res.result.appid,
                                "noncestr":res.result.noncestr,
                                "package":res.result.package,
                                "partnerid":res.result.partnerid,
                                "prepayid":res.result.prepayid,
                                "timestamp":res.result.timestamp,
                                "sign":res.result.sign
                            }
                            this.pay(this.payStart,channelValue)                        
                        }else{
                            Toast(res.msg)
                        }
                    });
                }
                
            },
            // H5 plus事件处理
            plusReady(){
                this.obtainPayment()
            },
            //获取支付通道
            obtainPayment(){
                // 获取支付通道
                var _this=this
                plus.payment.getChannels(function(channels){
                    _this.isSystem(channels)
                },function(e){
                 alert("获取支付通道失败："+e.message);
                });
            },
            //判断为安卓还是ios
            isSystem(channelsValue){
                console.log(1.1)
                var u = navigator.userAgent, app = navigator.appVersion;   
                console.log(1.2)
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                console.log(1.3)
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
                console.log(1.4) 
                if(isAndroid){
                    console.log(1.5)
                    //安卓和微信返回顺序是交换的
                    aliChannel=channelsValue[1];
                    wxChannel=channelsValue[0]; 
                    console.log(aliChannel)
                    console.log(wxChannel) 
                }else if(isiOS){
                    console.log(1.6)
                    aliChannel=channelsValue[0];
                    wxChannel=channelsValue[1];
                    console.log(aliChannel)
                    console.log(wxChannel) 
                }
            },
            // 2. 发起支付请求
            pay(payStart,values){
                var _this=this
                // 从服务器请求支付订单
                if(payStart==3){
                    channel = aliChannel;
                }else if(payStart==4){
                    channel = wxChannel;
                }else{
                    plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
                    return;
                }
                var startData=values
                console.log(channel)
                plus.payment.request(channel,startData,function(result){
                    console.log(startData)
                    plus.nativeUI.alert("支付成功！",function(){
                    back();
                });
                },function(error){
                    plus.nativeUI.alert("支付失败：" + error.code);
                });

            },

            jumpMoAddress(){
                this.$router.push('/address')
            },
            choicePayStart(start){
                    this.payStart=start
            },
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
            choiceUse(){
                var Total
                if(this.isUse===true){
                    this.isUse=false
                    Total=(Number(this.freightAddAllPrice)-Number((this.userintegral/100)))
                    this.freightAddAllPrice=this.returnFloat(Total)
                    this.integralParameter=this.userintegral
                }else{
                    this.isUse=true
                    //this.freightAddAllPrice
                    Total=(Number(this.freightAddAllPrice)+Number((this.userintegral/100)))
                    this.freightAddAllPrice=this.returnFloat(Total)
                    this.integralParameter=0
                    
                }
            }
        }
    }
</script>
<style scoped>
#placeOrderPage {
    padding-bottom: 52px;
    height: 100%;
    color: #666;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.conHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.conHeader .navbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.conHeader .navbar-left {
    left: 0;
}
.conHeader .btn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.conHeader .btn-navbar .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.conHeader .icon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.conHeader .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}

#placeOrderPage .page-content {
    padding: 45px 5px 50px;
    overflow-y: auto;
    overflow-x: hidden;
}
.page-content {
    padding-top: 0;
    background-color: #f4f4f4;
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
.page-layout {
    background: #fff;
}
.consignee-layout .page-layout-head {
    display: none;
}
.page-layout .page-layout-head {
    padding: 5px;
    font-size: 15px;
    color: #5b5b5b;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 400;
}
.distribution-mode .col.active {
    color: #5b5b5b;
    background-color: #fff;
}
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.fac {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
#placeOrderPage .consignee {
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
}
.page-layout .page-layout-content {
    padding: 0 5px;
    color: #666;
    border-bottom: 1px solid #e5e5e5;
}
.grid .row .col.col-23 {
    -moz-box-flex: 92;
    width: 92%;
    -ms-flex: 92;
    -webkit-box-flex: 92;
    flex: 92;
}
.consignee-layout .consignee .row {
    border: 0;
    margin: 0;
}
.page-layout .page-layout-content .row {
    padding: 5px 0;
    border-bottom: 1px solid #e5e5e5;
}
.col-10 {
    -moz-box-flex: 40;
    width: 40%;
    -ms-flex: 40;
    -webkit-box-flex: 40;
    /* flex: 40; */
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#placeOrderPage .right-icon {
    font-size: 18px;
}
.grid .row .col.col-2 {
    -moz-box-flex: 8;
    width: 8%;
    -ms-flex: 8;
    -webkit-box-flex: 8;
    flex: 8;
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
.iconfont.right-icon:after, .right-icon:after {
    display: block;
    content: " ";
    text-indent: -999px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/place_order_icon.png);
    background-size: 26px 470px;
    background-repeat: no-repeat;
    background-position: right -344px;
    width: 13px;
    height: 22px;
}
.noBorder{
    border-bottom:0 !important;
}
.page-layout {
    background: #fff;
}
.page-layout .page-layout-content {
    padding: 0 5px;
    color: #666;
    border-bottom: 1px solid #e5e5e5;
}
.page-layout .page-layout-content .row {
    padding: 5px 0;
    border-bottom: 1px solid #e5e5e5;
}
.page-layout .page-layout-content .message-wrap {
    height: 42px;
}
.page-layout .page-layout-content .ness {
    color: #fb4e90;
    position: absolute;
    line-height: 42px;
    padding-left: 5px;
}
.page-layout .page-layout-content input:active, .page-layout .page-layout-content input:focus, .page-layout .page-layout-content textarea:active, .page-layout .page-layout-content textarea:focus {
    outline: 0;
}
.page-layout .page-layout-content input {
    padding-left: 14px;
}
.page-layout .page-layout-content input, .page-layout .page-layout-content textarea {
    width: 100%;
    height: 42px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    padding: 5px;
    font-size: 12px;
    color: #666;
    background-color: #fff;
    resize: none;
}
button, input, input[type=password], input[type=button], input[type=reset], input[type=submit], input[type=text], textarea {
    -webkit-appearance: none;
}
.showMore {
    text-align: center;
    line-height: 32px;
}
.showMore span:after {
    content: '';
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    vertical-align: middle;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_up.png);
    margin-left: 5px;
}
.openSpan span:after{
    content: '';
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    vertical-align: middle;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_down.png);
    margin-left: 5px;
}
.messageBox {
    color: #7c7c7c;
    background-color: #f4f4f4;
    padding: 5px 10px;
}
.messageBox p {
    padding-bottom: 1%;
    position: relative;
    padding-left: 8px;
}
.messageBox p:before {
    width: 3px;
    height: 3px;
    display: inline-block;
    content: '';
    background-color: #7c7c7c;
    position: absolute;
    top: 9px;
    left: 0;
}
.messageBox p a {
    color: #fb4e90;
    display: inline;
}
.page-layout .page-layout-content {
    padding: 0 5px;
    color: #666;
    border-bottom: 1px solid #e5e5e5;
}
.page-layout .page-layout-content .row:last-child {
    border-bottom: 0;
}
.page-layout .page-layout-content .message-wrap {
    height: 42px;
}
textarea {
    -webkit-appearance: textarea;
    background-color: white;
    -webkit-rtl-ordering: logical;
    flex-direction: column;
    resize: auto;
    cursor: text;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-width: 1px;
    border-style: solid;
    border-color: initial;
    border-image: initial;
    padding: 2px;
}
input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
}
.page-layout {
    background: #fff;
}
#placeOrderPage .buy-detail-layout .page-layout-head {
    min-height: 20px;
}
.page-layout .page-layout-head {
    padding: 5px;
    font-size: 15px;
    color: #5b5b5b;
}
.buy-detail-layout .page-layout-content {
    padding: 0;
    overflow: hidden;
}
.goods-list-layout {
    width: 100%;
    padding: 5px 0;
    border-bottom: 1px solid #e5e5e5;
}
.clearfix:after, .layout:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
.buy-detail-layout .page-layout-content .row {
    line-height: 35px;
    color: #2e2e2e;
}
.page-layout .page-layout-content .row {
    padding: 5px 0;
    border-bottom: 1px solid #e5e5e5;
}
.goods-list .goods .thumb {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 5px;
    text-align: center;
    overflow: hidden;
}
.goods-list .goods img {
    width: 120px;
    border: 1px solid #e2e2e2;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.goods-list .goods h3 {
    padding-bottom: 20px;
}
.goods-list .goods p {
    font-size: 12px;
    line-height: 16px;
}
.money:before {
    content: '￥';
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.count {
    margin-left: 1em;
}
.count:before {
    content: 'x';
}
.paymentWay {
    line-height: 35px;
    border-bottom: 1px solid #e5e5e5;
}
.paymentWay h4 {
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
}
.paymentWay .payment {
    margin: 0 15px;
}
.grid .row .col.col-10 {
    -moz-box-flex: 40;
    width: 40%;
    -ms-flex: 40;
    -webkit-box-flex: 40;
    flex: 40;
}
.paymentWay .payment img {
    display: inline-block;
    margin-right: 7px;
}
.grid .row .col.col-12 {
    -moz-box-flex: 48;
    width: 48%;
    -ms-flex: 48;
    -webkit-box-flex: 48;
    flex: 48;
}
.paymentWay .checked {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border:1px solid #dfdfdf;
    background-size: cover;
    content: '';
    display: block;
    -webkit-transition: background .5s;
    transition: background .5s;
}
.grid .row .col.col-15 {
    -moz-box-flex: 60;
    width: 60%;
    -ms-flex: 60;
    -webkit-box-flex: 60;
    flex: 60;
}
.grid .row .col.col-pay {
    -moz-box-flex: 12;
    width: 36%;
    -ms-flex: 12;
    -webkit-box-flex: 12;
    flex: 12;
    height: 30px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 1px;
}
.onColPay{
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 50%;
}
.addUse{
    background: #fb4e90;
    justify-content: flex-end;
}
.noAddUse{
    background: #7c7c7c;
    
}
.order-sum p {
    color: #2d2d2d;
}
.grid .row .col.col-1 {
    -moz-box-flex: 4;
    width: 4%;
    -ms-flex: 4;
    -webkit-box-flex: 4;
    flex: 4;
}
.grid .row .col.col-15 {
    -moz-box-flex: 60;
    width: 60%;
    -ms-flex: 60;
    -webkit-box-flex: 60;
    flex: 60;
}
.grid .row .col.col-9 {
    -moz-box-flex: 36;
    width: 36%;
    -ms-flex: 36;
    -webkit-box-flex: 36;
    flex: 36;
}
.grid .row .col.col-1 {
    -moz-box-flex: 4;
    width: 4%;
    -ms-flex: 4;
    -webkit-box-flex: 4;
    flex: 4;
}
footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 13px;
    min-height: 50px;
    border-top: 1px solid #e5e5e5;
}
.grid .row .col.col-50 {
    -moz-box-flex: 1;
    width: 50%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
}
footer .money {
    font-size: 18px;
}
footer .money:before {
    vertical-align: middle;
}
.grid .row .active-do-pay {
    background-color: #fb4e90;
    height: 50px;
    color: #fff;
}
footer .active-do-pay:after {
    content: "确认";
    display: block;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/place_order_icon.png);
    background-size: 26px 470px;
    background-repeat: no-repeat;
    background-position: 0 -451px;
    padding-left: 35px;
}
.grid .row .col.col-24 {
    -moz-box-flex: 96;
    width: 96%;
    -ms-flex: 96;
    -webkit-box-flex: 96;
    flex: 100%;
}
.null-msg {
    padding: 10px 0;
    text-align: left;
    color: red;
}
.choicePay{
    background-image: url(http://unesmall.b0.upaiyun.com//common/images/cart_checkbox_selected.png);
}
</style>