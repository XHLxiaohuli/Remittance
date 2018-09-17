<template>
    <div>
        <section class="fineHeader">
            <div class="fineContent fineNavbar">
                <div class="fineBtn-navbar fineNavbar-left">
                    <span class="fineIcon fineIcon-return" @click="goBack"></span>
                </div>
                <div class="fineNavbar-main">余额明细</div>
            </div>
        </section>
        <div class="fineNav">
            <ul class="fineNavUl">
                <li v-for="(item,index) in fineNavText" :class="{addfineNavBorder:index==moilyIndex}" @click="moilyIndexs(index)">{{item}}</li>
            </ul>
        </div>

        <div class="fineModuleArea" v-if="myModular">
            <allFineBalance v-if="moilyIndex==0" :myValue1=fineValue1></allFineBalance>
            <portableComponent v-if="moilyIndex==1" :myValue2=fineValue2></portableComponent>
            <noPortableComponent v-if="moilyIndex==2" :myValue3=fineValue3></noPortableComponent>
        </div>
        <p class="finePortableCapital">当前可提资金：<span>￥{{availableFunds}}</span></p>
        <button class="fineWananPut" @click="jumpPresentation">我要提现</button>
    </div>
</template>
<script>
    import allFineBalance from "../financialStatementsPage/allFineBalance"
    import portableComponent from "../financialStatementsPage/portableComponent"
    import noPortableComponent from "../financialStatementsPage/noPortableComponent"
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    export default{
        components:{
            allFineBalance,
            portableComponent,
            noPortableComponent
        },
        data(){
            return{
                fineNavText:["全部","可提现","不可提现"],
                moilyIndex:0,
                myModular:false,
                availableFunds:"0.00",
                fineValue1:"",
                fineValue2:"",
                fineValue3:"",
            }
        },
        created(){
            this.initialBalanceDetailed()
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            moilyIndexs(index){
                this.moilyIndex=index
                this.initialBalanceDetailed()
            },
            initialBalanceDetailed(){
                var stateValue
                if(this.moilyIndex==0){
                    stateValue=3
                }else if(this.moilyIndex==1){
                    stateValue=1
                }else if(this.moilyIndex==2){
                    stateValue=2
                }
                this.myModular=false
                axios
                .post(
                    "salesRecordList",
                    qs.stringify({
                        isCanGetPay:stateValue,
                        pg:0,
                        sz:15
                    }),{}
                )
                .then(res => {
                    // console.log(res.result.list)
                    this.myModular=true
                    if(this.moilyIndex==0){
                        this.fineValue1=res.result.list
                    }else if(this.moilyIndex==1){
                        this.fineValue2=res.result.list
                    }else if(this.moilyIndex==2){
                        this.fineValue3=res.result.list
                    }
                    this.availableFunds=this.$route.params.canBePresented
                });
            },
            jumpPresentation(){
                this.$router.push('/applicationPresentation/'+this.availableFunds)
            }
        }
    }
</script>
<style>
.fineHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    /* border-bottom: 1px solid #e5e5e5; */
    box-shadow: 0px 3px 4px rgba(000, 000, 000, 0.4);
}
.fineHeader .fineNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.fineHeader .fineBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.fineHeader .fineNavbar-left {
    left: 0;
}
.fineHeader .fineBtn-navbar .fineIcon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.fineHeader .fineIcon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.fineHeader .fineNavbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.fineNav{
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    position: fixed;
    top: 45px;
    background: #fff;
}
.fineNavUl{
    width: 90%;
    margin: auto;
}
.fineNavUl:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.fineNavUl>li{
    width: 33%;
    float: left;
    text-align: center;
    font-size: 13px;
    padding: 10px 0;
    border-bottom: 1px solid #f6f6f6;
}
.addfineNavBorder{
    border-bottom: 1px solid #fb4e90 !important;
}
.fineModuleArea{
    width: 100%;
    position: fixed;
    top: 86px;
    bottom: 86px;
    background: #fff;
    overflow: scroll;
}
.finePortableCapital{
    border-top: 1px solid #dfdfdf;
    background: #fff;
    width: 95%;
    text-align: right;
    font-size: 15px;
    padding: 10px 0;
    position: fixed;
    bottom: 43px;
}
.fineWananPut{
    width: 90%;
    height: 40px;
    color:#fff;
    background: #fb4e90;
    border: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>