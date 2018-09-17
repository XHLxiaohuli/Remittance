<template>
    <div id="listPage">
       <div class="head">
         <div class="content navbar">
           <div class="fanhuiuppage">
             <img src="../../../static/images/fanhui.png" @click="fanhuiuppage"/>
           </div>
           <div class="search">
             <div class="search-box">
               <div class="icon-search"></div>
               <div class="input-search">
                 <input type="text" class="search-input" placeholder=" 搜索" onfocus="this.placeholder=''" onblur="this.placeholder=' 搜索'">
               </div>
             </div>
           </div>
           <div class="gogouwuche">
             <span class="price">21311</span>
           </div>
         </div>
         <div class="grid navTit">
            <ul class="page-tabs-nav row">
              <li class=" sortFirst sortPrice col">
                <i class="up"></i>
                <i class="down active"></i>
                价格
              </li>
              <li class="sortFirst sortDiscount col" data-order="3">
                <i class="up"></i>
                <i class="down"></i>
                销量
              </li>
              <li class="sortSecond sortBrand col">品牌</li>
              <li class=" sortSecond sortCate col">品类</li>
            </ul>
         </div>
       </div>
        <div class="main page-content">
            <div class="page-tabs-content">
                <div class="page-tabs-panel wl-nexter">
                    <ul class="goods-list grid ">
                      <li class="row" v-for="img in list">
                        <div class="goods col col-50">
                            <div class="listimg">
                                <img v-lazy="img.src"/>
                            </div>
                            <div class="goods-info">
                              <h1><span class="title">花藏娘正品 pink ol指彩油裸粉 孕妇可用 无毒水性 环保快干 容易上色</span><span class="spec"></span><span class="no-post-fee"></span></h1>
                              <p><span class="price">72</span><span class="refprice">98</span><span class="discount ">7.3折</span></p>
                              <p class="brokeFee hide">推广费：<span class="price"></span></p>
                              <div class="soldnum"><div style="width:89%"></div><p>已售799件</p></div>
                              <a class="add-cart "></a>
                              <div class="count"></div>
                            </div>
                        </div>
                      </li>


                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                msg: 'helloworld',
              list:[
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                },
                {
                  src:"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160227/vNTT-0-1456542238715.jpg!300q75"
                }
               ]
            }
        },
        created: function () {

        },
        methods: {
          //返回上一个路由
          fanhuiuppage:function () {
            this.$router.go(-1);
          }

        },
        watch: {

        }
    }
</script>
<style scoped>
   .page-content{
     padding-top: 81px;
   }
  .goods .goods-info{
    position: relative;
    padding: 0 10px;
  }
  .goods .count, .goods .soldnum{
    min-width: 18px;
    min-height: 18px;
    border-radius: 8px;
    padding: 0 5px;
    text-align: center;
    color: #fff;
    font-size: 10px;
  }
  .goods .count{
    background: #f1377e;
    display: none;
    bottom: 32px;
    right: 13px;
    position: absolute;
  }
  .goods .add-cart{
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/list_icon.png);
    background-size: 48px 320px;
    background-repeat: no-repeat;
    background-position: 0 0;
    width: 27px;
    height: 24px;
    position: absolute;
    top: auto;
    left: auto;
    right: 10px;
    bottom: -5px;
    z-index: 0;
  }
  .goods .soldnum p{
    position: relative;
  }
  .goods .soldnum div{
    min-width: 0;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 89%;
    background: #fb4e90;
  }

  .goods .soldnum{
    background-color: #afafaf;
    color: #fff;
    width: 70%;
    position: relative;
    overflow: hidden;
  }
  .goods{
    position: relative;
    padding-bottom: 10px;
  }
  .goods .discount{
    border: 1px solid #fb4e90;
    color: #fb4e90;
    font-size: .7em;
    padding: 0 1%;
  }
  .goods .refprice:after{
    content: '';
    position: absolute;
    right: 0;
    top: 2px;
    width: 1px;
    background-color: #626262;
    height: 9px;
    display: block;
  }
  .goods .refprice:before{
    content: "￥";
  }
  .refprice{
    color: #626262;
    text-decoration: line-through;

  }
  .goods .refprice{
    font-size: .7em;
    margin-left: .4em;
    margin-right: 3%;
    padding-right: 3%;
    position: relative;
  }
  .money:before, .price:before{
    content: '￥';
    vertical-align: middle;
  }
  .goods .price:before{
    font-size: 1em;
    vertical-align: top;
  }
  .goods .price, .goods .refprice{
    line-height: 21px;
  }
  .goods .price{
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
  .goods .spec{
    line-height: 1.2;
  }
  .goods .title{
    margin-top: 5px;
  }
  .goods .listimg img{
    display: inline-block;
  }
  .goods .listimg{
    position: relative;
    min-height: 124px;
    min-width: 130px;
    margin: 0 auto;
    padding: 5%;
    overflow: hidden;
    line-height: 124px;
    text-align: center;
  }
  /*.goods-list .row div{*/
    /*width: 100%;*/
    /*box-sizing: border-box;*/
  /*}*/
  p{
    margin: 0;
    padding: 0;
  }

  .goods-list .row div img{
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    box-sizing: border-box;
    border: 0;

  }
  .goods h1{
    color: #505050;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
  }
  .goods-list .row{
      width: 50%;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .goods-list{
      width: 100%;
  }
  #listPage{
    position: absolute;
    width: 100%;
    min-height: 100%;
    background-color: #ffffff;
    z-index: 99999;
  }
  #listPage .page-tabs-nav li.sortSecond:before{
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_screen_n.png);
    display: inline-block;
    content: "";
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    margin-left: -16px;
    top: 10px;
  }
  #listPage .page-tabs-nav li.sortFirst .up{
    width: 12px;
    height: 10px;
    display: inline-block;
    content: "";
    position: absolute;
    margin-left: -14px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_rank_up_n.png);
    top: 9px;
  }
  #listPage .page-tabs-nav li.sortFirst .down {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_rank_down_n.png);
    width: 12px;
    height: 10px;
    display: inline-block;
    content: "";
    position: absolute;
    margin-left: -14px;
    background-size: 100%;
    background-repeat: no-repeat;
    top: 18px;
  }
  #listPage .page-tabs-nav{
    transition: transform .3s,opacity .3s;
    background-color: #fff;
    line-height: 34px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    left: auto;
    top: auto;
  }
  .fb, .grid .row{
    display: flex;
    float: left;
  }
  .page-tabs-nav{
    right: auto;
    bottom: auto;
    width: 100%;
    height: auto;
    z-index: 1;
    background: #eee;
  }
  ol, ul{
    list-style: none;
  }
  #listPage .page-tabs-nav li{
    color: #2e2e2e;
    text-align: center;

  }
  .grid .row .col{
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
  }
  .price:before{
    content: '￥';
    vertical-align: middle;
  }
  #listPage .gogouwuche .price{
    display: block;
    padding: 0 1px;
    height: 14px;
    text-align: center;
    border: 1px solid #fb4e90;
    color: #fff;
    border-radius: 10px;
    line-height: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -23px 0 0 -13px;
    font-size: 10px;
    background: #fb4e90;
  }
  .gogouwuche{
    height: 45px;
    width: 45px;
    position: absolute;
    right: 0;
    top: 0;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_icon_pink.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  #listPage .head{
    position: fixed;
    z-index: 99999999999999;
    width: 100%;
  }
  .fanhuiuppage{
    width: 30px;
    height: 45px;
    line-height: 45px;
    position: absolute;
    left: 10px;


  }
  .fanhuiuppage img{
      vertical-align: middle;
  }
  .search{
    background-color: #fff;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 40px;
    padding-right: 40px;
  }

  .search-box{
    position: relative;
    height: 29px;
    line-height: 29px;
    border-radius: 4px;
    overflow: hidden;
    margin: 8px 8px;
    background-color: #f4f4f4;
  }

  .icon-search{
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/category_search.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    line-height: 29px;
  }

  button, input, input[type=password], input[type=button], input[type=reset], input[type=submit], input[type=text], textarea{
    -webkit-appearance: none;
  }
  input[type=password], input[type=search], input[type=text], input[type=tel] {

    color: #666;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
  }
  .search-input{
    background-color: #f4f4f4;
    width: 100%;
    height: 100%;
    padding-left: 30px;
  }
</style>
