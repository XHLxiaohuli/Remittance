<template>
    <div>
        <section class="header">
            <div class="content navbar">
                <div class="btn-navbar navbar-left">
                    <span class="icon icon-return" @click="colseQr"></span>
                </div>
                <div class="navbar-main">二维码邀请</div>
            </div>
        </section>
        <div class="Page_wrap wrapQr">
            <img id="firstImg" src="http://unesmall.b0.upaiyun.com//common/images/bg_invite1.png" alt="">
            <img src="http://unesmall.b0.upaiyun.com//common/images/bg_invite2.png" alt="">
            <img src="http://unesmall.b0.upaiyun.com//common/images/bg_invite3.png" alt="">
            <img src="http://unesmall.b0.upaiyun.com//common/images/bg_invite4.png" alt="">
            <div class="page-invite-qrcode QeDiv">
                <div class="qrcode-wrap">
                    <img :src=url alt="">
                </div>
                <p class="text">
                    <span class="title">我是{{userPhone}}</span><br><span class="level">我是米酷{{userLeve}}</span><br>我在这里等你<br>长按二维码识别或扫码进入
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            url:"",
            userPhone:"",
            userLeve:"",
        }
    },
    created(){
        this.startPull()
    },
    methods:{
        colseQr(){
            this.$emit('modQr')
        },
        startPull(){
            // console.log(localStorage.getItem("userPhone"))
            // console.log(localStorage.getItem("userId"))
            this.userPhone=localStorage.getItem("userPhone")
            this.userLeve=localStorage.getItem("userLeve")
            this.url="/api/h/1.0/qrUrl.json?url=http://sp.mikumine.com/api/h/1.0/inviteSpreadMangerPage.htm?pUserId="+localStorage.getItem("userId")+"&isShare=1"
        }
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
.Page_wrap {
    height: 100%;
    text-align: center;
}
.Page_wrap img {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.page-invite-qrcode {
    text-align: center;
    color: #fff;
    width: 65%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -32.5%;
    line-height: 20px;
    padding-bottom: 3%;
}
.page-invite-qrcode .qrcode-wrap {
    margin-bottom: 1%;
}
.page-invite-qrcode .qrcode-wrap img {
    display: inline-block;
    width: 50%;
    border: 3px solid #fff;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.page-invite-qrcode .title {
    font-weight: 400;
    font-size: 13px;
    margin-top: 2%;
}
.wrapQr{
    padding-top: 45px;
    
}
.QeDiv{
    margin-top: 231px;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
</style>