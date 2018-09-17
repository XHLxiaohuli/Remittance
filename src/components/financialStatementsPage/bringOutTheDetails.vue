<template>
    <div>
        <section class="bringsHeader">
            <div class="bringsContent bringsNavbar">
                <div class="bringsBtn-navbar bringsNavbar-left">
                    <span class="bringsIcon bringsIcon-return" @click="goBack"></span>
                </div>
                <div class="bringsNavbar-main">提现明细</div>
            </div>
        </section>
        <div class="grid main page-main page-content">

            <ul class="row present-button clearfix">
                <li :class="{active:index==bringsIndex}" @click="howPutForward(index)" class="col" v-for="(item,index) in bringsText">{{item}}</li>
            </ul>

            <div class="presentList wl-nexter">

                <!--有数据start-->
                <div v-if="bringsHasData">
                    <ul>
                        <li v-for="(item,index) in resultList">
                            <div class="row">
                                <div class="col col-15">
                                    <p>审核时间：{{item.time}}</p>
                                    <p>提现金额：<span>{{item.getpayFee}}</span></p>
                                </div>
                                <div class="col col-5 fb far fvc">
                                    <span v-if="item.status==0">待审核</span>
                                    <span v-if="item.status==1">已审核</span>
                                    <span v-if="item.status==2">审核异常</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--有数据end-->
                <!--没有数据start-->
                <div v-if="!bringsHasData">
                    <div>
                        <div class="bringsPic"></div>
                    </div>
                </div>
                <!--没有数据end-->

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
            bringsIndex:0,
            bringsHasData:true,
            bringsText:["全部","提现中","已完成","审核异常"],
            putState:0,
            resultList:[],

        }
    },
    created(){
        this.bringsIndex=this.$route.params.stare
        if(this.$route.params.stare==2){
            this.putState=1
            this.initialDetailed()
        }else if(this.$route.params.stare==1){
            this.putState=0
            this.initialDetailed()
        }
        
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        timestampToTime(timestamp){
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
            var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
            var m =
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
            ":";
            var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y + M + D;
        },
        initialDetailed(){
            axios
            .post(
                "getPayList",
                qs.stringify({
                    status:this.putState//this.$route.params.stare   
                }),{}
            )
            .then(res => {
                if(res.code==0){
                    console.log(res.result.list)
                    if(res.result.list.length>0){
                        this.bringsHasData=true
                        for(var i=0;i<res.result.list.length;i++){
                             res.result.list[i]["time"]=this.timestampToTime(res.result.list[i].applyDate)
                        }
                        this.resultList=res.result.list
                    }else{
                        this.bringsHasData=false
                    }
                }else{

                }
                    
            });
        },
        howPutForward(index){
            this.bringsIndex=index
            if(index==0){
                this.putState=""
                this.initialDetailed()
            }else if(index==1){
                this.putState=0
                this.initialDetailed()
            }else if(index==2){
                this.putState=1
                this.initialDetailed()
            }else if(index==3){
                this.putState=2
                this.initialDetailed()
            }
        }
    }
}
</script>
<style>
.bringsHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.bringsHeader .bringsNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
}
.bringsHeader .bringsBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.bringsHeader .bringsNavbar-left {
    left: 0;
}
.bringsHeader .bringsBtn-navbar .bringsIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.bringsHeader .bringsIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.bringsHeader .bringsNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.bringsPic{
    width: 150px;
    height: 150px;
    margin: auto;
    margin-top: 60%;
    background: url('../../../static/images/money_empty.png') no-repeat;
    background-size: 100% 100%;
}
.main {
    padding-top: 46px;
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
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.page-content {
    /* padding: 45px 0; */
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.present-button {
    margin: 0 auto;
    overflow: hidden;
    width: 90%;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
    background-color: #fff;
}
.present-button .col {
    padding: 2% 0;
    width: 25%;
}
.active {
    border-bottom: 2px solid #fb4e90;
}
.presentList {
    overflow-y: auto;
    width: 100%;
    /* height: 100%; */
    /* padding-top: 90px; */
    position: absolute;
    margin-top: 37px;
    /* top: 0; */
}
.presentList li {
    border-bottom: 5px solid #f4f4f4;
    padding: 3% 5%;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.grid .row .col.col-15 {
    -moz-box-flex: 60;
    width: 60%;
    -ms-flex: 60;
    -webkit-box-flex: 60;
    flex: 60;
}
.presentList li span {
    color: #fb4e90;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
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
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
</style>