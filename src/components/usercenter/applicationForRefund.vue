<template>
    <div>
        <section class="header">
            <div class="content navbar">
                <div class="btn-navbar navbar-left">
                    <span class="icon icon-return" @click="back"></span>
                </div>
                <div class="navbar-main">申请退货</div>
                <div class="btn-navbar navbar-right">
                    <span class="policy">退货政策</span>
                </div>
            </div>
        </section>
        <section class="page-content">
            <div class="returnGoods wl-nexter">
                <ul class="returnList">
                    <li class="not-has-order-msg">
                        <div class="empty_img">
                            <img src="http://unesmall.b0.upaiyun.com/common/images/bg_empty_order_list.png" alt="">
                        </div>
                    </li>
                </ul>
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

          }
      },
      methods:{
          back(){
            this.$router.go(-1);
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
.header .navbar-right {
    width: 80px;
}
.header .navbar-right {
    right: 0;
}
.page-content {
    background-color: #f4f4f4;
    padding-bottom: 0;
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
.returnGoods {
    margin: 10px 0 0;
    height: 100%;
    overflow-y: auto;
}
.not-has-order-msg .empty_img {
    width: 100%;
    text-align: center;
    margin-top: 30%;
}
.not-has-order-msg .empty_img img {
    width: 150px;
    margin: 0 auto;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
}
</style>