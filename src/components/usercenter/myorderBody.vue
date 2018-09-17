<template>
    <section id="order-list-page">
        <div class="order-list order-list_ wl-nexter">
            <ul class="list">
                <!--有数据的情况下start-->
                <li class="grid order" v-for="(item,index) in isHasOrderData"  v-if="ifOrderHasData">

                    <div class="summary row">
                        <div class="col col-18">
                            <div class="create-time">订单号：{{item.tradeId}}</div>
                            <div class="create-time">下订时间：{{timestampToTime(item.dateCreated)}}</div>
                        </div>

                        <div class="col col-7 fb fvc far order-status" v-if="item.status==2">待付款</div>
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==3">待收货</div>
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==4">备货中</div>
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==5">待收货</div>
                        <!-- <div class="col col-7 fb fvc far order-status" v-if="item.status==6">待评价</div> -->
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==7||item.status==20">待评价</div>
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==8">已退款</div>
                        <div class="col col-7 fb fvc far order-status" v-if="item.status==9">已关闭</div>

                    </div>

                    <div class="goods-list-layout multi-items">
                        <div class="scroll-box">
                            <ul class="goods-list clearfix">
                                <li class="goods row" v-for="childrenItem in item.orderViewDOs" @click="jumpDetails(childrenItem.itemId)">
                                    <div class="thumb">
                                        <img :src="childrenItem.pics" alt="">
                                    </div>
                                    <div class="col fb fvc">
                                        <div>
                                            <h3 class="pb-05">
                                                <span class="title">{{childrenItem.title}}</span><span class="spec">{{childrenItem.specification}}</span>
                                            </h3>
                                            <p>
                                                <span class="money">{{childrenItem.price/100}}</span><span class="count">{{childrenItem.num}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="suminfo-layout ">
                        <div class="suminfo">
                            <p>
                                合计：<span v-if="item.status!=4&&item.status!=5&&item.status!=6&&item.status!=20" class="money">{{item.allPicer}}</span><span v-if="item.status==4||item.status==5||item.status==6||item.status==20" class="money">{{item.allPicer}}</span>
                            </p>
                        </div>
                        <div class="row btnGroups" v-if="item.status!=9&&item.status!=4&&item.status!=5&&item.status!=6&&item.status!=7&&item.status!=20">
                            <div class="col col-11"></div>
                            <div class="col col-5 fb fvc fac cancel-order" @click="cancelOrder(item.tradeId,index)"></div>
                            <div class="col col-5 fb fvc fac dopay" @click="goPayment(item.tradeId,item.orderViewDOs,item.allPicer,item.dateCreated)"></div>
                        </div>
                        <div class="row btnGroups" v-if="item.status==7||item.status==20">
                            <div class="col col-11"></div>
                            <div class="col col-5 fb fvc fac cancel-orderDai" @click="lookLogistics(item.tradeId)"></div>
                            <div @click="jumpImmed(index,item.tradeId)" class="col col-5 fb fvc fac dopayDai">立即评价</div>
                        </div>
                        <div class="row btnGroups" v-if="item.status==5">
                            <div class="col col-11"></div>
                            <div class="col col-5 fb fvc fac cancel-orderDai" @click="lookLogistics(item.tradeId)"></div>
                            <div class="col col-5 fb fvc fac dopayDai" @click="confirmationReceipt(item.tradeId,index)">确认收货</div>
                        </div>
                    </div>

                </li>
                <!--有数据的情况下end-->

                <!--没有数据的情况下start-->
                <li class="not-has-order-msg" v-if="!ifOrderHasData">
                    <div class="empty_img">
                        <img src="http://unesmall.b0.upaiyun.com/common/images/bg_empty_order_list.png" alt="">
                    </div>
                    <div class="empty_msg" @click="jumpHome">去逛逛</div>
                </li>
                <!--没有数据的情况下end-->
            </ul>
        </div>
    </section>
</template>
<script>
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    export default{
        components:{
           
        },
        data(){
            return{
                ifOrderHasData:true,
                varTradeStatus:"",
                isHasOrderData:[],
            }
        },
        props: {
            status: {
                type: String
            }
        },
        created(){
            
            
        },
        // watch: {
		// 	status: function(val) {
        //         console.log(val)
        //         getData()
		// 	}
		// },
        activated(){
            this.hasMyorderData()
        },
        methods:{
            jumpHome(){
                this.$router.push('/home')
                localStorage.navselect='tab1'
            },
            pullorderData(buyerRate,tradeStatus,pg,sz){
                let _this = this
                axios
                .post(
                "orderData",
                qs.stringify({
                    buyerRate:buyerRate,
                    tradeStatus:tradeStatus,
                    pg:pg,
                    sz:sz,
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        //console.log(res.result.trades.length)
                        if(res.result.trades.length>0){
                                    
                            for(var i=0;i<res.result.trades.length;i++){
                                var allPicer=0
                                for(var j=0;j<res.result.trades[i].orderViewDOs.length;j++){
                                    allPicer+=(res.result.trades[i].orderViewDOs[j].price/100)*(res.result.trades[i].orderViewDOs[j].num)
                                }
                                res.result.trades[i]['allPicer']=allPicer
                                this.isHasOrderData=res.result.trades;
                                this.generalMoney
                                this.ifOrderHasData=true;      
                            }
                            //console.log(this.isHasOrderData)
                        }else{
                            this.ifOrderHasData=false
                        }
                    }else{
                        Toast(res.msg)
                    }
                });
            },
            hasMyorderData(iWanan){
                if(iWanan==1){
                    this.varTradeStatus=""
                    this.pullorderData("",this.varTradeStatus,0,10)
                }else if(iWanan==2){
                    this.varTradeStatus="1,2"
                    this.pullorderData("",this.varTradeStatus,0,10)
                }else if(iWanan==3){
                    this.varTradeStatus="3,4,5,6"
                    this.pullorderData("",this.varTradeStatus,0,10)
                }else if(iWanan==4){
                    this.varTradeStatus="7,20"
                    this.pullorderData(0,this.varTradeStatus,0,10)
                }else if(iWanan==5){
                    this.varTradeStatus="7,20"
                    this.pullorderData(1,this.varTradeStatus,0,10)
                }
            },
            //时间搓转换
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
                (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
                var s =
                date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m;
            },
            jumpDetails(itemId){
                this.$router.push("/commodityDetails/"+itemId);
            },
            cancelOrder(tradeId,index){
                axios
                .post(
                "cancellationOfOrder",
                qs.stringify({
                    tradeId:tradeId,
                }),{}
                )
                .then(res => {
                    if(res.code==0){
                        
                        console.log(this.isHasOrderData)
                        this.isHasOrderData.splice(index, 1);
                        console.log(this.isHasOrderData)


                    }else{
                        Toast(res.msg)
                    }
                });
            },
            goPayment(tradeId,orderViewDOs,allPicer,dateCreated){
                var dataArr='['
                var isGreaterThan
                for(var i=0;i<orderViewDOs.length;i++){
                    if(i+1>=orderViewDOs.length){
                        dataArr+='{"item_id":"'+orderViewDOs[i].itemId+'","num":"'+orderViewDOs[i].num+'"}'
                    }else{
                        dataArr+='{"item_id":"'+orderViewDOs[i].itemId+'","num":"'+orderViewDOs[i].num+'"},'
                    }  
                }
                dataArr+=']'
                if(allPicer>=99){
                    isGreaterThan=0
                }else{
                    isGreaterThan=1
                }
                this.$router.push('/paymentMethod/'+tradeId+'/'+dataArr+'/'+isGreaterThan+'/'+dateCreated);
            },
            jumpImmed(item,tradeId){
                var val=this.isHasOrderData[item].orderViewDOs
                this.$router.push({ name: "ImmediateEvaluation", query: { singleOrder: val,oddNumbers:tradeId } });
            },
            //是否确认收货
            confirmationReceipt(tdID,index){
                if(window.confirm('你要确认收货吗?')){
                    axios
                    .post(
                    "sureOrder",
                    qs.stringify({
                        tradeId:tdID,
                    }),{}
                    )
                    .then(res => {
                        console.log(res)
                        if(res.code==0){
                            this.isHasOrderData.splice(index,1)
                            Toast("已确认收货")
                        }else{
                            Toast(res.msg)
                        }
                    });
                    }else{
                        this.$router.push('/cancelReceipt/'+tdID);
                    }
            },
            //查看物流
            lookLogistics(tdID){
                this.$router.push('/lookLogistics/'+tdID);
            }
        }
    }
</script>
<style>
#order-list-page {
    height: 100%;
    width: 100%;
    padding-bottom: 85px;
    background-color: #fff;
}
.order-list {
    height: 100%;
    overflow: auto;
}
.order {
    background: #fff;
    border-bottom: 5px solid #f4f4f4;
    padding: 0 2%;
}
.order .summary {
    padding: 10px;
}
.goods-list-layout, .order .summary {
    border-bottom: 1px solid #e5e5e5;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.grid .row .col.col-18 {
    -moz-box-flex: 72;
    width: 72%;
    -ms-flex: 72;
    -webkit-box-flex: 72;
    flex: 72;
}
.order .create-time {
    font-size: 14px;
    color: #5b5b5b;
}
.grid .row .col.col-7 {
    -moz-box-flex: 28;
    width: 28%;
    -ms-flex: 28;
    -webkit-box-flex: 28;
    flex: 28;
}
.order .order-status {
    font-size: 14px;
    color: #fb4e90;
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
.goods-list-layout {
    padding: 0 10px;
}
.goods-list-layout, .order .summary {
    border-bottom: 1px solid #e5e5e5;
}
.clearfix:after, .layout:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
.goods .thumb {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px 0;
    text-align: center;
    overflow: hidden;
}
.thumb>img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
}
.goods h3 {
    font-weight: 400;
    font-size: 100%;
}
.pb-05 {
    padding-bottom: 5px;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.goods .count {
    margin-left: 1em;
}
.goods .count:before {
    content: "x";
}
.suminfo-layout {
    font-size: 14px;
}
.suminfo-layout .suminfo {
    color: #000;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
}
.suminfo-layout .suminfo p {
    padding: 5px 10px 0;
}
.suminfo-layout .suminfo .money {
    font-size: 18px;
    vertical-align: middle;
    color: #fb4e90;
}
.suminfo-layout .btnGroups {
    padding-right: 10px;
} 
.grid .row .col.col-11 {
    -moz-box-flex: 44;
    width: 44%;
    -ms-flex: 44;
    -webkit-box-flex: 44;
    flex: 44;
}
.suminfo-layout .btnGroups .col {
    min-height: 0;
}
.not-has-order-msg .empty_img {
    height: 130px;
    width: 100%;
    text-align: center;
    margin-top: 20%;
}
.not-has-order-msg .empty_img img {
    width: 125px;
    margin: 0 auto;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
}
.not-has-order-msg .empty_msg {
    width: 120px;
    height: 35px;
    color: #fff;
    line-height: 35px;
    border-radius: 2px;
    margin: 50px auto 0;
    text-align: center;
    background-color: #fb4e90;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
}
.suminfo-layout .cancel-order {
    border: 1px solid #2e2e2e;
    color: #2e2e2e;
}
.suminfo-layout .cancel-order, .suminfo-layout .dopay, .suminfo-layout .logistics, .suminfo-layout .product-comment, .suminfo-layout .sure-order {
    height: 32px;
    line-height: 32px;
    border-radius: 3px;
    margin: 5px 0 5px .5em;
}
.suminfo-layout .cancel-order:after {
    content: "取消订单";
}
.suminfo-layout .dopay {
    border: 1px solid #fb4e90;
    background-color: #fff;
    color: #fb4e90;
}
.suminfo-layout .dopay:after {
    content: " 立即付款";
}
.fac {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.list>li:last-child{
    border-bottom:0;
}
.cancel-orderDai {
    border: 1px solid #2e2e2e;
    color: #2e2e2e;
}

.cancel-orderDai,.dopayDai{
    height: 32px;
    line-height: 32px;
    border-radius: 3px;
    margin: 5px 0 5px .5em;
}
.dopayDai {
    border: 1px solid #fb4e90;
    background-color: #fff;
    color: #fb4e90;
}

.cancel-orderDai:after {
    content: "查看物流";
}
.dopayDai:after {
    content: "";
}

</style>