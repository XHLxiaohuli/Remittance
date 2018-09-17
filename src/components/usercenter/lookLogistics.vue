<template>
    <div>
        <section class="headerl">
            <div class="contentl navbarl">
                <div class="btn-navbarl navbar-leftl" @click="back">
                    <span class="iconl icon-returnl"></span>
                </div>
                <div class="navbar-mainl">物流信息</div>
            </div>
        </section>
        <div class="page-contentl gridl logisticsMainl" id="logisticsl" >
            <div v-for="(item,index) in logisticsData.itemist">
                <div class="boxl">
                    <div class=" iteml sub_titlel">
                        <p>
                            物流状态：
                            <span v-if="logisticsData.state==0">在途中</span>
                            <span v-if="logisticsData.state==1">揽件中</span>
                            <span v-if="logisticsData.state==2">疑难物件</span>
                            <span v-if="logisticsData.state==3">已签收</span>
                            <span v-if="logisticsData.state==4">已退签</span>
                            <span v-if="logisticsData.state==5">派件中</span>
                            <span v-if="logisticsData.state==6">退回中</span>
                        </p>
                        <p>物流公司：{{logisticsData.companyName}}</p>
                        <p>物流号：{{logisticsData.companyNum}}</p>
                    </div>

                    <div class="goods-list-layoutl iteml">
                        <ul class="goods-listl">
                            <li class="goodsl rowl" >
                                <div class="coll col-8l">
                                    <img :src="item.picUrls.split(';')[0]" alt="">
                                </div>
                                <div class="coll col-17l fbl fvcl pl-10l">
                                    <div>
                                        <h3 class="pb-10l">
                                            <span class="titlel">{{item.title}}</span>
                                        </h3>
                                        <p>
                                            <span class="moneyl">{{item.money}}</span><span class="countl">{{item.num}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="logistics_infol iteml">
                        <h4>物流信息：</h4>
                        <div class="listl">
                            <ul style="border-bottom-width: 0px; height: auto;">
                                <li class="activel">
                                    <span style="height: 10px;"></span>
                                    <p>正在通知快递公司揽件</p>
                                </li>
                            </ul>
                            <div v-if="!(logisticsData.state==1)"  @click="isOpen" class="showMessagel" :class="{activel:isCloseTitel=='收起物流信息'}">{{isCloseTitel}}</div>
                        </div>
                    </div>
                </div>

                <!-- <div class="box">
                    <div class=" item sub_title">
                        <p>物流状态：<span></span></p>
                        <p>物流公司：</p>
                        <p>物流号：</p>
                    </div>
                    <div class="goods-list-layout item">
                        <ul class="goods-list"></ul>
                    </div>
                    <div class="logistics_info item">
                        <h4>物流信息：</h4>
                        <div class="list">
                            <ul></ul>
                            <div @click="isOpen" class="showMessage" :class="{active:isCloseTitel=='收起物流信息'}">{{isCloseTitel}}</div>
                        </div>
                    </div>
                </div> -->
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
            isCloseTitel:"展开物流信息",
            logisticsData:"",
        }
    },
    created(){   
        this.initialLogistics()
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        isOpen(){
            if(this.isCloseTitel=="展开物流信息"){
                this.isCloseTitel="收起物流信息"
            }else{
                this.isCloseTitel="展开物流信息"
            }
        },
        initialLogistics(){
            axios
            .post(
            "searchLogisticsCallBack",
            qs.stringify({
                tradeId:this.$route.params.tradeIds
            }),{}
            )
            .then(res => {
                console.log(res.result[0])
                if(res.code==0){
                    for(var i=0;i<res.result[0].itemist.length;i++){
                        var money=(res.result[0].itemist[i].price)/100
                        res.result[0].itemist[i]["money"]=this.returnFloat(money)
                    }
                    this.logisticsData=res.result[0]
                }else{
                    Toast(res.msg)
                }
            });
        },
        //价格保留两位小数
        returnFloat(value){
            var value=Math.round(parseFloat(value)*100)/100;
            var xsd=value.toString().split(".");
            if(xsd.length==1){
            value=value.toString()+".00";
            return value;
            }
            if(xsd.length>1){
            if(xsd[1].length<2){
            value=value.toString()+"0";
            }
            return value;
            }
        },

    }
}
</script>
<style scoped>
.logisticsMainl{
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
    padding-top: 45px;
}
.headerl {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
} 
.headerl .navbarl {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.headerl .navbar-leftl {
    left: 0;
}
.headerl .btn-navbarl {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.headerl .btn-navbarl .iconl {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.headerl .icon-returnl {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.headerl .navbar-mainl {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.boxl {
    padding: 0 5px;
    border-bottom: 7px solid #f4f4f4;
    background-color: #fff;
}
.boxl .iteml {
    border-bottom: 1px solid #e5e5e5;
    padding: 2% 3%;
}
.boxl .iteml.sub_titlel span {
    color: #fb4e90;
}
.boxl .goods-list-layoutl {
    background-color: #fff;
    width: 100%;
    padding: 0;
    overflow-x: hidden;
}
.goodsl:last-child {
    border-bottom-width: 0;
}
.fbl, .gridl .rowl {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.goodsl {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 20px;
}
.gridl .rowl .coll.col-8l {
    -moz-box-flex: 32;
    width: 32%;
    -ms-flex: 32;
    -webkit-box-flex: 32;
    flex: 32;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
}
.gridl .rowl .coll.col-17l {
    -moz-box-flex: 68;
    width: 68%;
    -ms-flex: 68;
    -webkit-box-flex: 68;
    flex: 68;
}
.pl-10l {
    padding-left: 10px;
}
.fvcl {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.goodsl h3l {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: 400;
}
.pb-10l {
    padding-bottom: 10px;
}
.goodsl .titlel {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
}
.goodsl .countl, .goodsl .moneyl {
    color: #5b5b5b;
}
.moneyl:before, .pricel:before {
    content: '￥';
    vertical-align: middle;
}
.goodsl .countl {
    margin-left: 1em;
}
.goodsl .count:before {
    content: "x";
}
.boxl .iteml:last-child {
    border-bottom-width: 0;
}
.logistics_infol {
    background-color: #fff;
    padding: 0 8px!important;
}
.logistics_infol h4 {
    font-size: 15px;
    font-weight: 400;
    padding: 2% 0;
}
.logistics_infol .listl {
    position: relative;
    overflow: hidden;
}
.logistics_infol ul {
    margin-left: 7px;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
}
.logistics_infol ul li {
    padding: 0 0 10px;
    margin-left: 10px;
    line-height: 20px;
}
.logistics_infol ul li span {
    display: block;
    width: 1px;
    background-color: #e5e5e5;
    float: left;
    margin-top: 5px;
}
.logistics_infol ul li.activel span:before {
    background-color: #fb4e90;
}
.logistics_infol ul li span:before {
    position: relative;
    display: block;
    float: left;
    z-index: 1;
    margin-left: -5px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #7c7c7c;
    content: '';
}
.logistics_infol ul li.activel p {
    color: #fb4e90;
}
.logistics_infol ul li p {
    margin-left: 20px;
    color: #7c7c7c;
}
.logistics_infol .showMessagel {
    text-align: center;
    line-height: 40px;
}
.logistics_infol .showMessagel:after {
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin: 0 5px 0 2px;
    content: "";
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_down.png);
}
/* .boxl:last-child {
    border-bottom-width: 0;
    margin-bottom: 0;
    padding-bottom: 0;
} */
.logistics_infol .showMessagel.activel:after {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_up.png);
}
</style>