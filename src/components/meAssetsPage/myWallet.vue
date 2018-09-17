<template>
    <div>
        <div class="allWallet">
            <p>￥{{allBalance}}</p>
            <p>余额总额</p>
        </div>
        <div id="moneyPage" class="sliderPage wl-nexter">
            <ul class="point-list grid" id="wallet-list">
                <li class="row" v-for="(item,index) in allBalanceList">
                    <div class="col col-20">
                        <h3 class="title" v-if="item.type==0">充值到钱包</h3>
                        <h3 class="title" v-if="item.type==1">退款到钱包</h3>
                        <h3 class="title" v-if="item.type==2">购买使用</h3>
                        <p class="datetime">{{item.time}}</p>
                    </div>
                    <div class="col col-5 fb far fvc value"><span v-if="item.type!=2">+</span><span v-if="item.type==2" >-</span>{{(item.totalFee/1000).toFixed(2)}}</div>
                </li>
            </ul>
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
                allBalance:0,
                allBalanceList:[],
            }
        },
        created(){
            this.initialWallet()
        },
        methods:{
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
                return Y + M + D + h + m + s;
            },
            initialWallet(){
                axios
                .post(
                    "getMyWallet",
                    qs.stringify({
                        pg:0,
                        sz:10,
                    }),{}
                )
                .then(res => {
                    console.log(res)
                    this.allBalance=res.result.balanceFee.toFixed(2)
                    if(res.result.walletOrigins.length>0&&res.result.walletOrigins.length!=""&&res.result.walletOrigins.length!=undefined&&res.result.walletOrigins.length!=null){
                        for(var i=0;i<res.result.walletOrigins.length;i++){
                            res.result.walletOrigins[i]["time"]=this.timestampToTime(res.result.walletOrigins[i].lastUpdated)
                        }
                        this.allBalanceList=res.result.walletOrigins
                    }
                    
                    
                    

                });
            },
        }
    }
</script>
<style>
.allWallet{
     width: 100%;
     text-align: center;
     background: #fff;
     padding: 15px 0;
}
.allWallet>p:nth-child(1){
    color:#fb4e90;
    font-size: 18px;
}
.allWallet>p:nth-child(2){
    font-size: 12px;
    color:#000;
    padding-bottom: 10px;
}
.sliderPage {
    position: relative;
    width: 100%;
    overflow-y: auto;
}
.sliderPage .point-list {
    padding: 0 10px;
    margin: 3% 0;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
}
.sliderPage .point-list .row{
    border-image: url(http://unesmall.b0.upaiyun.com/common/images/vNTT-0-1419559242025.png) 2 stretch;
    border-width: 0 0 1px;
    border-style: solid;
    padding: 10px 0;
}
.grid .row .col.col-20 {
    -moz-box-flex: 80;
    width: 80%;
    -ms-flex: 80;
    -webkit-box-flex: 80;
    flex: 80;
}
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.sliderPage .point-list .title {
    font-size: 16px;
    color: #666;
}
.sliderPage .point-list .datetime {
    font-size: 12px;
    color: #999;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
}
.sliderPage .point-list .value {
    color: #fb4e90;
    font-size: 18px;
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