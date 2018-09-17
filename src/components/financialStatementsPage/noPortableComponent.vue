<template>
    <div>
        <!--有数据start-->
        <div v-if="isNoCanBePresented">
            <div class="grid  presentList wl-nexter">
                <ul>
                    <li v-for="(item,index) in noPortab">
                        <div class="row row_border">
                            <div class="col col-15">
                                <p class="ellipsis">{{item.itemName}}</p>
                                <p class="order_num">订单号：{{item.tradeId}}</p>
                                <p class="order_time">下单时间：<span>{{item.time}}</span></p>
                            </div>
                            <div class="col col-5 fb far fvc">
                                <span class="status_img">
                                    <img src="http://unesmall.b0.upaiyun.com/common/images/icon_withdrawal_n.png" alt="">
                                </span>
                            </div>
                        </div>
                        <div class="row fans_info">
                            <div class="fans">粉丝:<span class="fans_namet">{{item.buyerName}}</span></div>
                            <div class="fans_money">
                                推广费:<span class="money_num">{{item.shareFee}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--有数据end-->

        <!--没有数据start-->
        <div v-if="!isNoCanBePresented">
            <fineNoData></fineNoData>
        </div>
        <!--没有数据end-->
    </div>
</template>
<script>
import fineNoData from "../financialStatementsPage/fineNoData"
export default{
    components:{
      fineNoData
    },
    props:{
        myValue3:{
            type: Array,
            required: true
        }
    },
    data(){
        return{
            isNoCanBePresented:true,
            noPortab:[],
        }
    },
    created(){
        
    },
    mounted(){
        this.noInitialCanBePresented()
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
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
            var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m;
        },
        noInitialCanBePresented(){
            if(this.myValue3.length>0){
                this.isNoCanBePresented=true
                for(var i=0;i<this.myValue3.length;i++){
                    this.myValue3[i]["time"]=this.timestampToTime(this.myValue3[i].dateCreated)
                }
                this.noPortab=this.myValue3
            }else{
                this.isNoCanBePresented=false
            }
        }
    }
}
</script>
<style>
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.presentList {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    /* padding-top: 90px; */
    position: absolute;
    top: 0;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.presentList li {
    border-bottom: 5px solid #f4f4f4;
    padding: 3% 5% 0;
}
.presentList li .row_border {
    border-bottom: 1px solid #e5e5e5;
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
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.presentList li .order_time {
    margin-bottom: 16px;
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
.presentList li .status_img {
    width: 32px;
    margin-right: 27%;
    position: relative;
    top: -6px;
}
.presentList li .status_img>img{
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.presentList li .fans_info {
    height: 40px;
    line-height: 40px;
}
.presentList li .fans_info div {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.presentList li .fans_info .fans_namet {
    display: inline-block;
    width: 56%;
    text-align: center;
    height: 14px;
    line-height: 14px;
    margin-right: 6%;
}
.presentList li .fans_money {
    text-align: right;
}
.presentList li .fans_info .money_num {
    display: inline-block;
    width: 25%;
    text-align: center;
    height: 14px;
    line-height: 14px;
    margin-right: 6%;
}
.presentList li .money_num {
    color: #fb4e90;
}
</style>