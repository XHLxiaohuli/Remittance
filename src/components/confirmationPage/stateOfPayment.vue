<template>
    <div>
        <div >
            <section class="header">
                <div class="content navbar">
                    <div class="btn-navbar navbar-left">
                        <span class="icon icon-return" @click="jumpCard" v-if="false"></span>
                    </div>
                    <div class="navbar-main">支付状态</div>
                </div>
            </section>
            <div class="page-content">
                <div class="box">
                    <img src="../../../static/images/paySuccess.jpg" alt="">
                    <p>谢谢你的光临，支付成功</p>
                    <div class="btnGroup">
                        <span class="btnE" @click="jumpHome">返回首页</span>
                        <span class="btnF fail" @click="jumpPay">查看订单</span>
                    </div>
                </div>
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
            tradeIdBiography:"",
            dataArr:"",
            GreaterThan:"",
            careaDateCreated:"",
        }
    },
    created(){
        // this.tradeIdBiography=this.$route.params.biography
        // this.dataArr=this.$route.params.dataArr
        // this.GreaterThan=this.$route.params.GreaterThan
        // this.otherFunction()
    },
    methods:{
        jumpCard(){
            this.$router.push('/shopcart')
            localStorage.navselect='tab3';
        },
        jumpHome(){
            this.$router.push('/home');
            localStorage.navselect='tab1'
        },
        jumpPay(){
            // this.$router.push('/paymentMethod/'+this.tradeIdBiography+'/'+this.dataArr+'/'+this.GreaterThan+'/'+this.careaDateCreated);
            this.$router.push('/orderDetails');
        },
        //初始话访问
        // otherFunction(){
        //     axios
        //     .post(
        //         "otherInterface",
        //     qs.stringify({
        //         tradeId:this.tradeIdBiography 
        //     }),{}
        //     )
        //     .then(res => {
        //         if(res.code==0){
        //             console.log(res.result.trade.dateCreated)
        //             this.careaDateCreated=res.result.trade.dateCreated
        //         }else{
        //             Toast(res.msg)
        //         }
        //     });   
        // },
        
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
.page-content {
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
.box {
    text-align: center;
    margin-top: 30%;
}
.box img {
    display: inline-block;
    width: 30%;
    margin-bottom: 5%;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.btnGroup {
    margin-top: 5%;
}
.btnGroup .btnE {
    color: #fb4e90;
    background-color: #f4f4f4;
}
.btnGroup span {
    border-radius: 20px;
    border: 1px solid #fb4e90;
    padding: 6px 0;
    width: 35%;
    margin-right: 8%;
    outline: 0;
    display: inline-block;
}
.btnGroup .btnF {
    color: #fff;
    background-color: #fb4e90;
    margin-right: 0;
}

</style>