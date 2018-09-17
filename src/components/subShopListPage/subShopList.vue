<template>
    <div class="subShopContainer">
        <section class="subHeader">
            <div class="subContent subNavbar">
                <div class="subBtn-navbar subNavbar-left">
                    <span class="subIcon subIcon-return" @click="goBack"></span>
                </div>
                <div class="subNavbar-main">分店铺列表</div>
            </div>
        </section>
        <div class="page-content">
            <div class="page-ally-list grid">
                <div class="search-layout">
                    <div class="row nav">
                        <div class="col zjAlly" v-for="(item,index) in subNavText" @click="moilySubIndex(index)">
                            <span :class="{active:index==subTextIndex}">{{item}}</span>
                        </div>
                    </div>
                    <div class="row search-box" v-if="isSubData">
                        <div class="col col-2 search-submit" @click="moilySubIndex(3)"></div>
                        <div class="col col-23" >
                            <input type="search" class="search-input" placeholder="输入我的粉丝昵称" v-model="subModel">
                        </div>
                    </div>
                </div>
                <div class="total" v-if="isSubData">
                    <p>当前您的直接粉丝人数：<span>{{allAgent}}</span>人</p>
                </div>
                <div class="ally-list clearfix wl-nexter switchNav" v-if="obtainData">
                    <EirectFans v-if="isSubData" :myValue='subShopListData'></EirectFans>
                    <indirectFan v-if="!isSubData"></indirectFan>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EirectFans from '../subShopListPage/EirectFans';
import indirectFan from '../subShopListPage/indirectFan';
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
export default{
    components:{
        EirectFans,
        indirectFan
    },
    data(){
        return{
            subNavText:["直属分店铺","间接分店铺"],
            subTextIndex:0,
            subState:1,
            subModel:"",
            isSubData:true,
            subShopListData:"",
            obtainData:false,
            allAgent:0,
        }
    },
    created(){
        
    },
    mounted(){
        this.initialFans()
    },
    // beforeUpdate(){
    //     this.initialFans()
    // },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        moilySubIndex(index){
            this.subTextIndex=index
            if(index==0){
                this.subState=1
            }else if(index==1){
                this.subState=2
            }
            this.initialFans()
        },
        //初始化粉丝数据
        initialFans(){
            axios
            .post(
                "myInOrDirectAlly",
                qs.stringify({
                    type: this.subState,
                    nickName:this.subModel, 
                    pg: 0,
                    sz: 10,
                }),{}
            )
            .then(res => {
                this.obtainData=true
                if(res.result.list==undefined||res.result.list==null){
                    this.isSubData=false
                }else{
                    this.isSubData=true
                    this.subShopListData=res.result.list
                    this.allAgent=res.result.allyCount
                    
                }
                // console.log(res.result.list)
               
            });
        },
    },
}
</script>
<style>
.subShopContainer{
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.subHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 15;
    border-bottom: 1px solid #e5e5e5;
}
.subHeader .subNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.subHeader .subNavbar-left {
    left: 0;
}
.subHeader .subBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.subHeader .subBtn-navbar .subIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.subHeader .subIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.subHeader .subNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.page-content {
    padding-bottom: 0;
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
.page-ally-list {
    position: relative;
}
.page-ally-list .search-layout {
    position: fixed;
    /* top: 1px; */
    left: 0;
    width: 100%;
    background-color: #f6f6f6;
    z-index: 9;
}
.page-ally-list .nav {
    background-color: #fff;
    height: 36px;
    line-height: 34px;
    text-align: center;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.page-ally-list .nav .col span {
    border-bottom: 2px solid #fff;
    display: inline-block;
    padding: 0 5%;
}
.active{
    border-bottom: 2px solid #fb4e90 !important;
}
.page-ally-list .search-box {
    border: 1px solid #e9e9e9;
    overflow: hidden;
    border-radius: 14px;
    margin: 6px 3% 0;
}
.grid .row .col.col-2 {
    -moz-box-flex: 8;
    width: 8%;
    -ms-flex: 8;
    -webkit-box-flex: 8;
    flex: 8;
}
.page-ally-list .search-submit {
    height: 30px;
    background-color: #fff;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/category_search.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
}
.grid .row .col.col-23 {
    -moz-box-flex: 92;
    width: 92%;
    -ms-flex: 92;
    -webkit-box-flex: 92;
    flex: 92;
}
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.page-ally-list .search-input {
    height: 30px;
    line-height: 20px;
    padding: 5px;
    width: 100%;
    background-color: #FFF;
    border: none;
}
input[type=password], input[type=search], input[type=text], input[type=tel] {
    background: #fff;
    color: #666;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
}
.switchNav{
    padding-top: 74px;
    height: 587px;
    background: #f6f6f6;
}
.total {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    text-align: right;
    line-height: 34px;
    width: 100%;
}
.total p {
    margin-right: 3%;
}
</style>