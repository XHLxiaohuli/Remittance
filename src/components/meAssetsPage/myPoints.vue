<template>
    <div>
        <div class="pointsTop">
            <p class="allIntegralClass">{{allIntegral}}</p>
            <p class="allIntegralText">您当前可用积分</p>
            <div class="integralRule">积分规则 ></div>
        </div>
        <div class="integralFill"></div>
        <ul class="integralUl">
            <li v-for="item in integralArr">
                <div>
                    <p>{{item.reason}}</p>
                    <p>{{item.time}}</p>
                </div>
                <div><span v-if="item.symbol==1">+</span><span v-if="item.symbol==-1">-</span>{{item.score}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    export default{
        data(){
            return{
                allIntegral:0,
                integralArr:"",
            }
        },
        created(){
            this.initialPoints()
        },
        methods:{
            initialPoints(){
                axios
                .post(
                    "fetchPointList",
                    qs.stringify({
                        pg:0,
                        sz:10,
                    }),{}
                )
                .then(res => {
                    console.log(res.result)
                    var addNumber=0;
                    var reduceNumber=0
                    for(var i=0;i<res.result.pointList.length;i++){
                        res.result.pointList[i]["time"]= this.timestampToTime(res.result.pointList[i].createTime)
                        console.log(res.result.pointList[i].symbol)
                        if(res.result.pointList[i].symbol==1){
                            addNumber+=res.result.pointList[i].score
                        }else{
                            reduceNumber+=res.result.pointList[i].score
                        }

                    }
                    this.integralArr=res.result.pointList
                    this.allIntegral=addNumber-reduceNumber

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
                return Y + M + D +m+s;
            },
        },
    }
</script>
<style>
.pointsTop{
    width: 100%;
    border-bottom: 1px solid #ccc;
    position: relative;
    background: #fff;
    padding: 15px 0;
}
.allIntegralClass{
    color:#fb4e90;
    text-align: center;
    font-size: 18px;
}
.allIntegralText{
    text-align: center;
    color:#000;
    font-size: 8px;
    padding-bottom: 10px;
}
.integralRule{
    height: 15px;
    font-size: 8px;
    position: absolute;
    right: 15px;
    top: 30px;
    /* bottom: 0;
    margin: auto; */
}
.integralFill{
    width: 100%;
    height: 10px;
    background: #dfdfdf;
}
.integralUl{
    width: 100%;
    background: #fff;
}
.integralUl li{
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    padding: 10px 0;
    position: relative;
}
.integralUl li:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.integralUl li>div:nth-child(1){
    padding-left: 15px;
}
.integralUl li>div:nth-child(1)>p:nth-child(1){
    font-size: 15px;
    margin-bottom: 3px;
}
.integralUl li>div:nth-child(1)>p:nth-child(2){
    font-size: 8px;
}
.integralUl li>div:nth-child(2){
    height: 15px;
    position: absolute;
    right: 15px;
    top:0;
    bottom: 0;
    margin: auto;
    font-size: 15px;
    color:#fb4e90;
    font-weight: 500;
}

</style>