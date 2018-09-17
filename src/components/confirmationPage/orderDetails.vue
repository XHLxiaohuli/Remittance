<template>
    <div>
        <section class="header">
            <div class="content navbar">
                <div class="btn-navbar navbar-left">
                    <span class="icon icon-return" @click="jumpCard" ></span>
                </div>
                <div class="navbar-main">订单详情</div>
            </div>
        </section>
        <div>
            <div class="orderDetailsChil">
                <div class="orderDetailsChil1">
                    <!-- <img src="../../../static/images/ztys.png" alt=""> -->
                    订单状态
                </div>
                <div class="orderDetailsChil2">
                    <div class="orderDetailsChil3">
                        <div class="orderDetailsChil4"></div>
                    </div>
                    <p class="orderDetailsChil5">提交订单 2018-07-13 17:10</p>
                </div>
            </div>
            <div class="orderDetailsChil7">
                <div class="orderDetailsChil6">订单详情</div>
                <p><span>订单号 : </span><span>646468743464646</span></p>
                <p><span>下单时间 : </span><span>2018-07-13 17:10</span></p>
                <p><span>收货人信息 :</span></p>
                <p><span>钟邵鹏</span>18024581092</p>
                <p>广东省 广州市 白云区 江夏牌坊</p>
            </div>
            <div class="orderDetailsChil8">
                <p>合计 ： 89.00</p>
                <p>请等待配送</p>
                <p>支付方式 : 支付宝</p>
                <p>运 费：10:00</p>
                <p>红包抵用 ： 0.00</p>
                <p>积分抵用 : </p>
                <p>商品金额 : 19.00</p>
                <p>敬请耐心等待吧</p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        jumpCard(){
            this.$router.go(-1)
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
    box-shadow: 2px 5px 5px #ccc;
}  
.orderDetailsChil{
    width: 100%;
    background: #fff;
    margin-top: 55px;
}
.orderDetailsChil1{
    width: 100%;
    height: 31px;
    line-height: 31px;
    background: url('../../../static/images/ztys.png') no-repeat;
    background-size:110px 31px;
    color:#fff;
    font-size: 15px;
    padding-left: 25px;
}
/* .orderDetailsChil1>img{
    height: 100%;
} */
.orderDetailsChil2{
    width: 100%;
    height: 188px;
    position: relative;
}
.orderDetailsChil3{
    width: 3px;
    height: 100%;
    background: #CCCCCC;
    position: absolute;
    left: 50px;
}
.orderDetailsChil4{
    width: 15px;
    height: 15px;
    background: #FC4F8F;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -6px;
    margin: auto;
}
.orderDetailsChil5{
    line-height: 188px;
    font-size: 15px;
    padding-left: 70px;
}
.orderDetailsChil6{
    width: 100%;
    height: 31px;
    line-height: 31px;
    background: url('../../../static/images/ztys.png') no-repeat;
    background-size:110px 31px;
    color:#fff;
    font-size: 15px;
    padding-left: 25px;
}
.orderDetailsChil7>p{
    margin-top: 12px;
    font-size:13px;
    padding-left: 25px;
}
.orderDetailsChil7>p:last-child{
    margin-bottom: 12px;
    color: #989898;
}
.orderDetailsChil7 p span:nth-child(2){
    color: #989898;
}
.orderDetailsChil7 p:nth-child(5) span{
    margin-right: 20px;
}
.orderDetailsChil8{
    width: 100%;
    background: #fff;
    padding-left: 25px;
}
.orderDetailsChil8>p{
    padding-top: 10px;
    font-size:14px;
    color: #989898;
}
.orderDetailsChil8>p:last-child{
    padding-bottom: 10px;
}
</style>