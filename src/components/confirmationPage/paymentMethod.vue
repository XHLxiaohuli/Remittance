<template>
    <div>
        <section class="wl-trans-dialog wl-bottom-dialog wl-payer-dialog translate-viewport">
            <div class="dialog-mask"></div>
            <div class="dialog-body page-content">
                <span class="icon icon-return"></span>
                <div class="dialog-header tc">请选择支付方式</div>
                <div class="dialog-content">
                    <ul class="payment-list grid">
                        <li class="payment-item row fvc " @click="isWxPay(4)">
                            <div class="col col-3">
                                <img class="wxPic" src="http://unesmall.b0.upaiyun.com/common/images/wechat_icon.png" alt="">
                            </div>
                            <div class="col col-22">微信支付</div>
                        </li>
                        <li class="payment-item row fvc " @click="isWxPay(99)">
                            <div class="col col-3">
                                <img class="wxPic" src="../../../static/images/zfb.png" alt="">
                            </div>
                            <div class="col col-22">支付宝支付</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div></div>
            <div id="payAlipay"></div>
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
            biographyId:"",
            payDataArr:"",
            payGreaterThan:"",
            dateCreated:"",
            userID:"",
        }
    },
    created(){
        this.biographyId=this.$route.params.biographyId
        this.payDataArr=this.$route.params.payDataArr
        this.payGreaterThan=this.$route.params.payGreaterThan
        this.dateCreated=this.$route.params.dateCreated
        console.log(this.biographyId)
        console.log(this.payDataArr)
        console.log(this.payGreaterThan)
        console.log(this.dateCreated)
        this.pullUserIdCard()
    },
    methods:{
        //调取微信支付接口
        isWxPay(payStart){
            if(payStart==4){
                axios
                .post(
                    "wxPayment",
                qs.stringify({
                    pType:4,
                    tradeId:this.biographyId, 
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        console.log(res)
                    }else{
                        Toast(res.msg)
                        this.$router.push('/paymentResults/'+this.biographyId+'/'+this.payDataArr+'/'+this.payGreaterThan);
                    }
                });
            }else if(payStart==99){
                axios
                .post(
                "createAnOrder",
                qs.stringify({
                    msg:"",
                    point: 0,
                    couponId: "",
                    items: this.payDataArr,
                    pType: payStart,
                    adTime: this.dateCreated,
                    orderType: 1,
                    idCard: this.userID,
                    isTaxFree: this.payGreaterThan,
                    pUserId: 0,
                    form:"card"
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        console.log(res.msg)
                        document.getElementById(
                        "payAlipay"
                        ).innerHTML = res.msg.split("<script>")[0];
                        document.forms[0].submit();
                                   
                    }else{
                                    
                        Toast(res.msg)
                        this.$router.push('/paymentResults/'+this.biographyId+'/'+this.payDataArr+'/'+this.payGreaterThan);
                    }
                });
            }
            
        },
        pullUserIdCard(){
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
                                //   console.log(res.result.consignees[i].idCard)
                                this.userID=res.result.consignees[i].idCard
                            }
                        }  
                    }      
                }else{
                    Toast(res.msg)
                }
            });
        },
    }
}
</script>
<style>
.wl-trans-dialog {
    position: fixed;
    z-index: 1;
    /* top: 0; */
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;
}
.wl-bottom-dialog .dialog-mask {
    background: rgba(0,0,0,.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.wl-trans-dialog .dialog-body.page-content {
    padding-top: 0;
}
.wl-bottom-dialog .dialog-body {
    position: absolute;
    bottom: 0;
    height: auto;
    background: #eee;
}
.wl-trans-dialog .dialog-body {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.wl-bottom-dialog .dialog-body .dialog-header {
    background: #333;
    color: #fff;
    font-size: 17px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
}
.tc {
    text-align: center;
}
.wl-trans-dialog .dialog-content {
    height: 100%;
    overflow-y: auto;
}
.wl-payer-dialog .payment-list {
    background: #fff;
    padding: 0 15px;
    -webkit-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242065.png) 2 stretch;
    -o-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242065.png) 2 stretch;
    border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242065.png) 2 stretch;
    border-width: 0 0 1px;
    border-style: solid;
}
.wl-payer-dialog .payment-list li:last-child {
    border-bottom: 0;
}
.wl-payer-dialog .payment-list li {
    padding: 10px 0;
    -webkit-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    -o-border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    border-width: 0 0 4px;
    border-style: solid;
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
.grid .row .col.col-3 {
    -moz-box-flex: 12;
    width: 12%;
    -ms-flex: 12;
    -webkit-box-flex: 12;
    flex: 12;
}
.wxPic{
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
    width: 28px;
}
.grid .row .col.col-22 {
    -moz-box-flex: 88;
    width: 88%;
    -ms-flex: 88;
    -webkit-box-flex: 88;
    flex: 88;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
/* .payment-item{
    border-bottom: 1px solid #000;
} */
</style>