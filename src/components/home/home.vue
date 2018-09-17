
<template>
  
    <div id="home" >
      <div class="homeBigDiv">
      <div class="topsearch">
            <h4>优尚汇</h4>
          <div class="searchbtn" @click="goSearch">
            <img src="http://unesmall.b0.upaiyun.com/common/images/home_search.png"/>
          </div>
      </div>
      <headerFill></headerFill>
      <pull-to :top-load-method="refresh"  :is-bottom-bounce=false :is-top-bounce=isTop >
      <!--网络请求数据加载-->
         <div class="tempWrap" v-if="bannershow">
           <slider class="imgbox">
             <div v-for="(item,index) in recommends" :key="index">

                 <img :src="item.picUrl"></img>

             </div>
           </slider>
         </div>
      <!--默认加载-->
      <!--<div class="tempWrap" v-if="bannershow">
        <slider>
          <div v-for="(item,index) in recommends1" :key="index">

            <img :src="item.picUrl"></img>

          </div>
        </slider>
      </div>-->
      <!--<div style="width: 100%;height: 2px;background-color: #ffffff;">-->

      <!--</div>-->
      <!--//nav分类导航-->
         <div class="cate-nav outer">
              <ul class="outer ">
                <li v-for="(item,index) in banners[419]">
                  <a :href="item.target">
                    <div>
                      <img :src="item.picUrl"/>
                    </div>
                    <div>{{ item.title }}</div>
                  </a>
                </li>
              </ul>
         </div>
        <div class="showcase outer">
            <ul class="outer outerLi">
              <li v-for="(item,index) in guanggao">
              <!--<li v-for="(item,index) in guanggao">-->
                <a @click="jumpCommodityDetails(item.itemId)">
                  <img :src="item.pics.split(';').pop()">
                </a>
                <!--<img src="http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151104/vNTT-0-1446633559547.jpg!300q75">-->

              </li>
            </ul>
        </div>
       
        <!--10点开抢start-->
        <div class="tenPoints" v-if="FourTwentyTwo">
          <div class="tenPointsText">
            <div class="tenPointsTextLeft">每日10点准时开抢</div>
          </div>
          <div class="tenPointsBody" v-for="(item,index) in banners[422]" @click="tenPointsJump(item.target)">
            <div class="tenPointsBodys">
              <div class="tenPointsBodysTop">
                <img class="tenPointsBodysTopPic" :src="item.picUrl"/>
              </div>
            </div>
            <div>
              <countDown :startTime="item.onlineStartTime" :endTime="item.onlineEndTime" :nowtime="result.nowTime" :netText="item.description"></countDown>
            </div>
          </div>
        </div>
        <!--10点开抢end-->
        <div class="huodong-title">
            精选活动
        </div>

        <div class="huodong-content">
           <ul>
             <li v-for="(item,index) in banners[421]" @click="jumpDelm(item.target)">
               <a>
                 <!--<img src="http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160307/vNTT-0-1457352039611.jpg"/>-->
                 <img :src="item.picUrl"/>
               </a>
               <div>
                  <countDown :startTime="item.onlineStartTime" :endTime="item.onlineEndTime" :nowtime="result.nowTime" :netText="item.description"></countDown>
               </div>
             </li>
           </ul>
        </div>
      </pull-to>
      <tabui></tabui>
     
      </div>
      <bufferPage v-if="!(isLoading)"></bufferPage>
    </div>
</template>
<script>


//  import $ from 'jquery'
  import PullTo from 'vue-pull-to'
  var api=require('../../plugins/api');
  import { Toast  } from 'mint-ui'
  import axios from "../../utils/axios";
  import qs from "qs";
  import Slider from '../common/slider'
  import tabui from '../common/tabui'
  import bufferPage from '../bufferPage/bufferPage'
  import headerFill from '../headerFill/headerFill'
  import countDown from '../home/countDown'
  import {Loadmore} from "mint-ui"
    export default {
        name: 'home',
        data() {
            return {
              msg: 'helloworld',
              isTop:false,
              isLoading:true,
              // allLoaded:true,
              activityRanch:"",
              activitySecond:"",
              banners:[],
              bannershow:false,
              recommends: [],
              recommends1: [
                {
                  'linkUrl': 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2185201&g_f=shoujijiaodian',
                  'picUrl': 'http://unesmall.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160918/vNTT-0-1474187035426.jpg',
//                  'picUrl': '',
                  'id': 231
                },
                {
                  'linkUrl': 'https://y.qq.com/msa/264/0_3845.html',
                  'picUrl': 'http://unesmall.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160918/vNTT-0-1474193192525.jpg',
//                  'picUrl': '',
                  'id': 3313
                },
                {
                  'linkUrl': 'http://y.qq.com/w/album.html?albummid=003lJcXW0xXDBI',
                  'picUrl': 'http://unesmall.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20160918/vNTT-0-1474193269228.jpg',
//                  'picUrl': '',
                  'id': 321312
                }
              ],
              result:[],
              guanggao:[],
              // commodityId:"",
              tenPointsData:[],
              FourTwentyTwo:false,
            
            }
        },
        components:{
          Slider,
          tabui,
          'v-loadmore':Loadmore,
          countDown,
          bufferPage,
          PullTo,
          headerFill
        },
        created: function () {
          this.isLoading=false
          this.homeBanner();
          this.advertisementPic();
          
        },
        activated(){
         
        },
        mounted: function () {
          window.addEventListener('scroll', this.handleScroll)
          
          this.$nextTick(function(){

          })
        },
        methods: {
          handleScroll () {
            if(window.location.hash=="#/home"){
              var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
              if(((document.getElementsByClassName("homeBigDiv")[0].scrollHeight)-(scrollTop))>=(document.getElementsByClassName("homeBigDiv")[0].scrollHeight)){
                this.isTop=true
              }
            }
            
          },
          refresh(loaded){
              loaded('done')
              this.isTop=false
              this.isLoading=false
              this.bannershow=false
              this.recommends=[]
              this.isLoading=false
              this.advertisementPic();
          },
          jumpDelm(target){
            this.$router.push("/commodityDetails/"+target);
          },
          goSearch:function () {
            localStorage.navselect='tab2'
            this.$router.push('/classify')
          },
          homeBanner:function () {

          },
          //广告图数据接口
          advertisementPic(){
            var that=this;
            axios
            .post(
              "advertisementPicInterface",
              qs.stringify({
               k:"418,423,419,425,422,420,421",
              }),{}
            )
            .then(res => {
              // console.log(res.code)
              this.isLoading=true
              if(!(res.result.banners[422].length==0)&&!(res.result.banners[422].length=="")&&!(res.result.banners[422].length==null)&&!(res.result.banners[422].length==undefined)){
                this.FourTwentyTwo=true
              }
              that.banners=res.result.banners;
              that.result=res.result;
              // var guanggao=that.result.recItems[0].pics;
              // this.commodityId=res.result.recItems[0].itemId
              // guanggao=guanggao.split(';');
              // that.guanggao=guanggao;
              that.guanggao=that.result.recItems
              for(var i=0;i<res.result.banners[418].length;i++){
                // console.log(res.result)
                that.recommends.push(
                  {
                    id:res.result.banners[418][i].type,
                    picUrl:res.result.banners[418][i].picUrl,
                    linkUrl:res.result.banners[418][i].picUrl,
                  }

                )
                if(i>=res.result.banners[418].length-1){
                  that.bannershow=true;
                }
              }
              

            }).catch(err => {
            console.log(err);
            this.isLoading=true
            Toast("网络错误")
          });
          },
          //跳到商品详情页
          jumpCommodityDetails(conns){
            this.$router.push("/commodityDetails/"+conns);
          },
          //10点抢购跳详情页
          tenPointsJump(target){
            this.$router.push("/commodityDetails/"+target);
          }

        }

    }
</script>
<style>

  .topsearch{
    width: 100%;
    height: 45px;
    line-height: 45px;
    z-index: 20;
    position: fixed;
    background-color: #ffffff;
    /* top: 0px; */
    
  }
  .topsearch h4{
    font-size: 15px;
    text-align: center;
  }
  .searchbtn{
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    text-align: center;
    margin: 0 auto;
  }
  .searchbtn img{
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
  }
  .cate-nav{
    background-color: #ffffff;
    min-height: 40px;
    margin-top: 10px;
  }
  .cate-nav ul{
    width: 95%;
    margin: 0 auto;
    padding: 8px 0;
    box-sizing: content-box;
  }
  .cate-nav li{
    float: left;
    position: relative;
    text-align: center;
    background: #fff;
    width: 25%;
    margin: 5px 0;
    list-style: none;
  }
  .cate-nav li a{
    display: block;
    font-size: 14px;
    text-decoration: none;
    color: #2e2e2e;
  }

  .cate-nav li a>div:nth-child(1){
    height: 60%;
    width: 60%;
    text-align: center;
    margin: 0 auto 7px;
  }
  .cate-nav li img{
    max-width: 100%;
    /*min-height: 46px;*/
    display: block;
  }

  .showcase li{
    width: 49.3%;
    float: left;
    list-style: none;
  }
  .showcase li:nth-child(2),.showcase li:nth-child(3){
    float: right;
  }

  .showcase {
    clear: both;
    padding: 7px 0;
    background: #fff;
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }

  .showcase ul{
    margin: 0;
    padding: 0;
  }

  .showcase li img{
    max-width: 200%;
    width: 100%;
  }
  .showcase li a{
    display: inline-block;
  }
  #home{
    margin-bottom: 56px;
    overflow-x: hidden;
    /* margin-top: 45px; */
  }

  .huodong-title{
    width: 100%;
    margin: 10px auto;
    background: #fff;
    clear: both;
    height: 45px;
    line-height: 45px;
    text-align: left;
    padding-left: 10px;
    color: rgb(46, 46, 46);
    font-size: 16px;
  }

  .huodong-content li{
    width: 97%;
    margin: auto;
  }
  .huodong-content li a{
    display: block;
  }
  .huodong-content li img{
    width: 100%;
  }
  .tenPointsText{
    width: 100%;
    margin: 10px auto;
    background: #fff;
    clear: both;
    height: 45px;
    line-height: 45px;
  }
  .tenPointsTextLeft{
    float: left;
    margin-left: 10px;
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    font-size: 16px;
    width: 50%;
  }
  .tenPointsBody{
    background: #f4f4f4;
  }
  .tenPointsBodys{
    width: 97%;
    margin:auto;
  }
  .tenPointsBodysTop{
    position: relative;
    overflow: hidden;
  }
  .tenPointsBodysTopPic{
    max-width: 200%;
    width: 100%;
    vertical-align: middle;
    min-height: 10px;
  }
  .outerLi>li{
    overflow: hidden;
  }
  .outerLi>li>a{
    width: 100%;
    height: 100%;
  }
  .outerLi>li>a>img{
    /* width: 100%;
    height: 100%; */
  }
  .outerLi>li:nth-child(1){
    height: 220px;
  }
  .outerLi>li:nth-child(2){
    height: 107px;
    margin-bottom: 5px;
  }
  .outerLi>li:nth-child(3){
    height: 108px;
  }
  .scroll-container{
    overflow: hidden;
  }
</style>
