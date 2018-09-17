<template>
    <section class="header">
        <div class="content navbar">
            <div class="btn-navbar navbar-left">
                <span @click="banck" class="icon icon-return"></span>
            </div>
            <div class="search-wrap">
                <div class="row search-box">
                    <div class="icon-search search-submit" @click="querySearchOne"></div>
                    <div class="input-wrap">
                        <input type="text" class="search-input" placeholder="搜索" v-model="headerSearch">
                    </div>
                    <div class="icon-wrap">
                        <i class="icon-close"></i>
                    </div>
                </div>
            </div>
            <div class="category-handle cart-bar" @click.stop="jumpCard">
                <span  v-if="cardYesOrNo" class="price" style="visibility: visible;">{{allprice}}</span>
            </div>
        </div>
        <div class="grid navTit">
            <ul class="page-tabs-nav row">
                <li class=" sortFirst sortPrice col">
                    <i class="up" @click="changeUp"></i>
                    <i class="down" @click="changeDown"></i>
                    价格
                </li>
                <li class=" sortFirst sortPrice col">
                    <i class="up" @click="changeSalesvolumeUp"></i>
                    <i class="down" @click="changeSalesvolumeDown"></i>
                    销量
                </li>
                <li class="sortSecond sortBrand col" @click="brand">品牌</li>
                <li class=" sortSecond sortCate col" @click="category">品类</li>
            </ul>
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
                cardYesOrNo:false,
                allprice:"",
                headerSearch:"",
            }
        },
        created(){
            this.shopCare()
        },
        methods:{
            banck(){
                this.$router.go(-1)
            },
            //价格升序排列
            changeUp(){
                this.$emit('risePrice',2); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //价格降序排列
            changeDown(){
                this.$emit('dropPrice',1); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //销售量升序
            changeSalesvolumeUp(){
                this.$emit('binSalesvolumeUp',2); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //销售量降序
            changeSalesvolumeDown(){
                this.$emit('binSalesvolumeDown',1); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //触发选择品牌方法
            brand(){
                this.$emit('binBrand'); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            category(){
                this.$emit('binCategory'); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //搜索查询
            querySearchOne(){
                this.$emit('querySearch',this.headerSearch); //触发showbox方法，'the msg'为向父组件传递的数据
            },
            //跳转购物车
            jumpCard(){
                if(localStorage.getItem('loginstatus')==null||localStorage.getItem('loginstatus')==undefined||localStorage.getItem('loginstatus')==""){
                    this.$router.push('/login')
                }else{
                    this.$router.push('/shopcart')
                    localStorage.navselect='tab3';
                }
                
            },
            //获取购物车数据
            shopCare(){
                if(localStorage.getItem('loginstatus')==null||localStorage.getItem('loginstatus')==undefined||localStorage.getItem('loginstatus')==""){
                    this.cardYesOrNo=false
                }else{
                    axios
                    .post(
                    "shopCartList",
                    qs.stringify({
                        jtoken: "lhom1wgp6m0d2ofda1dhxd"
                    }),{}
                    )
                    .then(res => {
                    if(res.code==0){
                    console.log(res.result.items)
                    if(res.result.items!=undefined){
                        var shopAllprice=0
                        for(var i=0;i<res.result.items.length;i++){
                            shopAllprice+=(res.result.items[i].price/100)*res.result.items[i].cartCount
                        }
                        this.allprice=shopAllprice
                        this.cardYesOrNo=true
                        } 
                    }else{
                        this.cardYesOrNo=false
                        Toast(res.msg)
                    }
                    });
                }
                
            },
        }
    }
</script>
<style>
.header {
    border-bottom-width: 0;
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
.header .content {
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
.search-wrap {
    margin: 0 8px;
    padding: 8px 40px;
    overflow: hidden;
}
.search-wrap .search-box {
    position: relative;
    height: 29px;
    line-height: 29px;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
}
.search-wrap .icon-search {
    left: 0;
}
.search-wrap .icon-search, .search-wrap .icon-wrap {
    position: absolute;
    /* top: 0; */
    width: 30px;
    height: 30px;
    line-height: 29px;
}
.search-wrap .icon-search {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/category_search.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
}
.search-wrap input[type=text] {
    background-color: #f4f4f4;
}
.search-wrap .search-input {
    width: 100%;
    height: 29px;
    line-height: 29px;
    padding: 4px 4px 4px 30px;
    border-radius: 4px;
}
button, input, input[type=password], input[type=button], input[type=reset], input[type=submit], input[type=text], textarea {
    -webkit-appearance: none;
}
input[type=password], input[type=search], input[type=text], input[type=tel] {
    background: #fff;
    color: #666;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
}
.search-wrap .icon-wrap {
    right: 0;
}
.search-wrap .icon-close {
    display: inline-block;
    width: 14px;
    height: 14px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    vertical-align: middle;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon-search-delete.png);
    background-repeat: no-repeat;
    background-size: cover;
}
/*有东西在购物车*/
.category-handle {
    height: 45px;
    width: 45px;
    position: absolute;
    right: 0;
    /* top: 0; */
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_icon_pink.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
}
/*没东西在购物车*/
#listPage .category-handle {
    height: 45px;
    width: 45px;
    position: absolute;
    right: 0;
    /* top: 0; */
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_icon_pink.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
}
/*没东西在购物车*/
#listPage .cart-bar .price {
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
/*有东西在购物车*/
.cart-bar .price {
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
    visibility: hidden;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
#listPage .page-tabs-nav {
    -webkit-transition: -webkit-transform .3s,opacity .3s;
    transition: transform .3s,opacity .3s;
    background-color: #fff;
    line-height: 34px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    left: auto;
    top: auto;
}
.page-tabs-nav {
    position: absolute;
    /* top: 0; */
    left: 0;
    right: auto;
    bottom: auto;
    width: 100%;
    height: auto;
    z-index: 1;
    background: #eee;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
#listPage .page-tabs-nav li {
    color: #2e2e2e;
    text-align: center;
    font-size: 14px;
}
#listPage .page-tabs-nav li.sortFirst .up {
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
#listPage .page-tabs-nav li.sortSecond:before {
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
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
</style>