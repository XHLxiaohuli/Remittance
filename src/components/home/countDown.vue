<template>
  <div>
    <div class="countDaoTime">
      <div class="countText">{{text}}</div>
      <div class="countTimenum"><span v-if="ifNoot">仅剩</span><span :class="{contactColor:ifNoot===true}">{{timeText}}</span></div>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      startTime:{
          type: Number,
          required: true
      },
      endTime:{
          type: Number,
          required: true
      },
      nowtime:{
          type: Number,
          required: true
      },
      netText:{
          type: String,
          required: true
      }
    },
    data(){
      return{
        text:"",
        timeText:"",
        ifNoot:false,
      }
    },
    watch:{

    },
    created(){
      this.text=this.netText
      this.countDown(this.startTime,this.endTime,this.nowtime)
    },
    methods:{
      countDown(stateTimes,endTimes,nowTime){
        if(stateTimes>nowTime){
          this.ifNoot=false
          this.timeText="即将开始"
        }else if(nowTime>endTimes){
          this.ifNoot=false
          this.timeText="已结束"
        }else if(nowTime >= stateTimes && nowTime <= endTimes){
          this.ifNoot=true
          var hour
          var minute
          var second
          let leftsecond=(endTimes-nowTime)/1000;
          let day = 0
          let hour = 0
          let minute = 0
          let second = 0
          var timer = setInterval(() => {
            hour = Math.floor(leftsecond /3600);
            minute = Math.floor((leftsecond-hour*3600)/60);
            second = Math.floor(leftsecond-hour*3600-minute*60);
            if (day <= 9) day = '0' + day;
            if (hour <= 9) hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            //console.log(hour + "小时：" + minute + "分钟：" + second + "秒");
            this.timeText=hour + "：" + minute + "：" + second 
            leftsecond--;
            if (leftsecond <= 0) {
              console.log('计时停止')
              clearInterval(timer);
            }
          }, 1000);
        }
      }
    },
  }
</script>
<style>
  .countDaoTime{
    background: #fff;
    width: 100%;
    padding: 0 15px;
    height: 35px;
    line-height: 35px;
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
  }
  .countText{
    float:left;
    overflow:hidden;
    width:65%;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 35px;
  }
  .countTimenum{
    float:right;
    line-height: 35px;
  }
  .contactColor{
    color:#fb4e90;
  }
</style>