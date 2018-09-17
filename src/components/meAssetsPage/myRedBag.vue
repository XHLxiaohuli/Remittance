<template>
    <div class="redBagMain">
        <ul class="yesOrNoUse">
            <li v-for="(item,index) in yesOrNoUseText" :class="{addLiClass:index==liIndex}" @click="yesOrNoClass(index)">{{item}}</li>
        </ul>
        <!--未使用start-->
        <div v-show="liIndex==0">
            <!--没有数据-->
            <div v-if="!isHasData">
                <div class="noRedBagPic">
                    <img src="../../../static/images/promotion_empty.png" alt="">
                </div>
            </div>

            <!--有数据-->
            <div v-if="isHasData">
                <ul class="beOverdueUl">
                    <li v-for="(item,index) in EffectiveRedEnvelopes">
                        <div>
                            <img :src=item.picUrl alt="">
                        </div>
                        <div>
                            <p>有效期至:</p>
                            <p>{{item.time}}</p>
                            <p style="color:#fb4e90">未使用</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--未使用end-->


        <!--已过期start-->
        <div v-show="liIndex==1">
                <div v-if="!isHasBeOverdue">
                    <div class="noRedBagPic">
                        <img src="../../../static/images/promotion_empty.png" alt="">
                    </div>
                </div>

                <!--有数据-->
                <div v-if="isHasBeOverdue">
                    <ul class="beOverdueUl">
                        <li v-for="(item,index) in beOverdueArr">
                            <div>
                                <img :src=item.picUrl alt="">
                            </div>
                            <div>
                                <p>有效期至:</p>
                                <p>{{item.time}}</p>
                                <p>已过期</p>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
        <!--已过期end-->
    </div>
</template>
<script>
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    export default{
        data(){
            return{
                yesOrNoUseText:["未使用","已过期"],
                liIndex:0,
                isHasData:true,
                isHasBeOverdue:true,
                beOverdueArr:"",
                EffectiveRedEnvelopes:"",
            }
        },
        methods:{
            yesOrNoClass(index){
                this.liIndex=index
                
            },
            initialPull(){
                axios
                .post(
                    "myRedBag",
                    qs.stringify({
                    
                    }),{}
                )
                .then(res => {
                    console.log(res.result)
                    if(res.result.usedCoupons.length>0){
                        this.isHasBeOverdue=true
                    }else{
                        this.isHasBeOverdue=false
                    }
                    if(res.result.unUsedCoupons.length>0){
                        this.isHasData=true
                    }else{
                        this.isHasData=false
                    }



                    for(var i=0;i<res.result.usedCoupons.length;i++){
                        res.result.usedCoupons[i]["time"]=this.timestampToTime( res.result.usedCoupons[i].endTime)
                    }
                    for(var i=0;i<res.result.unUsedCoupons.length;i++){
                        res.result.unUsedCoupons[i]["time"]=this.timestampToTime( res.result.unUsedCoupons[i].endTime)
                    }
                    this.beOverdueArr=res.result.usedCoupons
                    this.EffectiveRedEnvelopes=res.result.unUsedCoupons
                    console.log()
                });
            },
            //时间方法
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
                return Y + M + D ;
            },

        },
        created(){
            this.initialPull()
        },
    }
</script>
<style>
.redBagMain{
    padding-top: 25px;
}
.yesOrNoUse{
    width: 40%;
    margin: auto;
}
.yesOrNoUse:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.yesOrNoUse>li{
    width: 45%;
    text-align: center;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
    border-bottom: 1px solid #fff;
    color: #000;
}
.yesOrNoUse>li:first-child{
    float: left;
}
.yesOrNoUse>li:last-child{
    float: right;
}
.addLiClass{
    border-bottom: 1px solid #fb4e90 !important;
    color: #fb4e90 !important;
}
.noRedBagPic{
    height: 130px;
    width: 100%;
    text-align: center;
    margin-top: 20%;
}
.noRedBagPic>img{
    width: 125px;
    margin: 0 auto;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
    display: block;
}
.beOverdueUl{
    width: 100%;
    margin-top: 20px;
}
.beOverdueUl>li{
    width: 90%;
    margin: auto;
    background: #fff;
    padding: 2% ;
    border-bottom: 5px solid #f2f2f2;
}
.beOverdueUl>li:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.beOverdueUl>li>div:nth-child(1){
    float: left;
    width: 70%;
    height: 100%;
}
.beOverdueUl>li>div:nth-child(1)>img{
    width: 100%;
    height: 100%;
}
.beOverdueUl>li>div:nth-child(2){
    float: right;
    width: 30%;
    height: 100%;
    padding-top: 3%;
}
.beOverdueUl>li>div:nth-child(2)>p{
    font-size: 8px;
    text-align: center;
}
.beOverdueUl>li>div:nth-child(2)>p:nth-child(3){
    font-size: 15px;
}


</style>