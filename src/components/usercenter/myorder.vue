<template>
    <div id="myorder">
       <div class="head">
           <img src="../../../static/images/fanhui.png" @click="fanhuiuppage"/>
          我的订单
       </div>
      <div class="main">
        <div class="wrap">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1"><span class="mttabtext" @click="myorderAll">全部</span></mt-tab-item>
            <mt-tab-item id="2"><span class="mttabtext" @click="pendingPayment">待付款</span></mt-tab-item>
            <mt-tab-item id="3"><span class="mttabtext" @click="goodsToBeReceived">待收货</span></mt-tab-item>
            <mt-tab-item id="4"><span class="mttabtext" @click="toBeEvaluated">待评价</span></mt-tab-item>
            <mt-tab-item id="5"><span class="mttabtext" @click="completed">已完成</span></mt-tab-item>
          </mt-navbar>
        </div>

        <mt-tab-container v-model="active">
          <!--全部start-->
          <mt-tab-container-item id="tab-container1" >
            <!-- <mt-cell  title="tab-container 1"></mt-cell> -->
            <myorderBody ref="oneChild" ></myorderBody><!--:status='1'-->
          </mt-tab-container-item>
          <!--全部end-->

          <!--待付款start-->
          <mt-tab-container-item id="tab-container2">
            <!-- <mt-cell   title="tab-container 2"></mt-cell> -->
            <myorderBody ref="towChild"></myorderBody>
          </mt-tab-container-item>
          <!--待付款end-->

          <!--待收货start-->
          <mt-tab-container-item id="tab-container3">
            <!-- <mt-cell   title="tab-container 3"></mt-cell> -->
            <myorderBody ref="threeChild"></myorderBody>
          </mt-tab-container-item>
          <!--待收货end-->

          <!--待评价start-->
          <mt-tab-container-item id="tab-container4">
            <!-- <mt-cell   title="tab-container 4"></mt-cell> -->
            <myorderBody ref="fourChild"></myorderBody>
          </mt-tab-container-item>
          <!--待评价end-->

          <!--已完成start-->
          <mt-tab-container-item id="tab-container5">
            <!-- <mt-cell   title="tab-container 5"></mt-cell> -->
            <myorderBody ref="fiveChild"></myorderBody>
          </mt-tab-container-item>
          <!--已完成end-->

        </mt-tab-container>
      </div>
    </div>
</template>
<script>
  import { TabContainer, TabContainerItem , Navbar, TabItem } from 'mint-ui'
  import myorderBody from '../usercenter/myorderBody'
    export default {
        name: 'App',
        components:{
          myorderBody,
        },
        data() {
            return {
              selected:'1',
              active:'tab-container1',
            }
        },
      created: function () {
          // alert(this.$route.params.param)
          
          this.selected=this.$route.params.param;
          
      },
      mounted(){
        this.startIsCalled()
      },
      methods: {
        //返回上一个路由
        fanhuiuppage:function () {
          this.$router.go(-1);
        },
        //开始即调用数据
        startIsCalled(){
          if(this.selected==1){
            this.$refs.oneChild.hasMyorderData(this.selected)
          }else if(this.selected==2){
            this.$refs.towChild.hasMyorderData(2)
          }else if(this.selected==3){
            this.$refs.threeChild.hasMyorderData(3)
          }else if(this.selected==4){
            this.$refs.fourChild.hasMyorderData(4)
          }else if(this.selected==5){
            this.$refs.fiveChild.hasMyorderData(5)
          }
          
        },
        //全部订单
        myorderAll(){
          this.$refs.oneChild.hasMyorderData(1)
        },
        //待付款
        pendingPayment(){
          this.$refs.towChild.hasMyorderData(2)
        },
        //待收货
        goodsToBeReceived(){
          this.$refs.threeChild.hasMyorderData(3)
        },
        //待评价
        toBeEvaluated(){
         this.$refs.fourChild.hasMyorderData(4)
        },
        //已完成
        completed(){
          this.$refs.fiveChild.hasMyorderData(5)
        }

      },
      watch:{
        selected(val, oldVal){
            this.active='tab-container'+this.selected
        }
      }
    }
</script>
<style scoped>
  .mttabtext{
    display: block;
    font-size: 15px !important;
    width: 100%;
    padding: 10px 0;
  }

  .mint-navbar .mint-tab-item{
    padding:0;
    font-size: 15px;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 1px solid #fb4e90;
    color: inherit;
    margin-bottom: 0px;
  }

  .mint-tab-container{
    margin-top: 35px;
  }

  #myorder .main .wrap{
    border-bottom: 1px solid #e5e5e5;
    margin: 0 5px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  #myorder .main{
    position: absolute;
    width: 100%;
    height: 100%;
    /* top: 0; */
    z-index: 66;
    box-sizing: border-box;
    background-color: #ffffff;
    padding-top: 45px;
  }
  #myorder .head{
    position: fixed;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
    font-size: 16px;
    z-index: 100;
    border-bottom: 1px solid #e5e5e5;
  }

  #myorder .head img{
    position: absolute;
    left: 5px;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    margin: auto;
    top: 0;
    bottom: 0;
  }
</style>
