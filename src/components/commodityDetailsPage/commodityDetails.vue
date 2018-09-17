<template>
    <div class="comDetaMain">
        <section class="header">
            <div class="content navbar" id="listPage">
                <div @click.stop="topBack" class="btn-navbar navbar-left">
                    <span  class="icon icon-return"></span>
                </div>
                <div class="navbar-main">商品详情</div>
                <div class="category-handle cart-bar"  @click="jumpCard">
                    <span class=" price" style="visibility:hidden">10.00</span>
                </div>
            </div>
        </section>
        <div>
            <div class="fill"></div>
            <!--轮播图-->
            <div class="tempWrap">
                <slider class="imgbox" v-if="bannershow">
                    <div v-for="(item,index) in commodityPic" :key="index">
             
                        <img :src="item.picUrl"></img>
             
                    </div>
                </slider>
            </div>
            <!--轮播图end-->
            <div class="priceGroup">
                <p class="priceGroup1">
                    ￥<span>{{allDetails.price/100}}</span><span><s>￥{{allDetails.refPrice/100}}</s></span><span class="discount " v-if="allDetails.activtyPrice===undefined">{{((allDetails.price / allDetails.refPrice) * 10).toFixed(1)}}折</span><span class="discount " v-if="allDetails.activtyPrice!==undefined">{{((allDetails.activtyPrice / allDetails.refPrice) * 10).toFixed(1)}}折</span>
                </p>
                <p class="priceGroup2">{{shopText}}</p>
                <div class="priceGroup3">
                    <div class="sold" :style="'width:'+soldRatio"></div>
                    <!-- <div class="soldText">已售{{soldCntNum}}件</div> -->

                    <div class="soldText" v-if="allDetails.activtySoldCnt===undefined">已售{{allDetails.baseSoldQuantity+allDetails.soldCnt}}件</div>
                    <div class="soldText" v-if="allDetails.activtySoldCnt!==undefined">已售{{allDetails.activtySoldCnt+allDetails.activtyBaseSoldQuantity}}件</div>
                    
                </div>
            </div>
            <div class="list_item grid">
                <ul class="row qualityAssurance">
                    <li class="col ">
                        <img src="http://unesmall.b0.upaiyun.com/common/images/icon_detail1.png" alt=""><span>正品保证</span>
                    </li>
                    <li class="col "  v-if="!(shopIdLength.length>1)">
                        <img src="http://unesmall.b0.upaiyun.com/common/images/icon_detail2.png" alt=""><span>7天退换</span>
                    </li>
                    <li class="col ">
                        <img src="http://unesmall.b0.upaiyun.com/common/images/icon_detail3.png" alt=""><span>极速发货</span>
                    </li>    
                </ul>
            </div>
            <div class="list_items aside">
                <ul class="grid">
                    <li class="row " v-if="allDetails.isTaxFree==1">
                        <div class="col col-6 taxFree">保税</div>
                        <div class="col col-12">全球保税</div>
                    </li>
                    <li class="row " v-if="allDetails.isTaxFree==1">
                        <div class="col col-6"></div>
                        <div class="col col-18 taxFreeTip">
                            <p>正常工作日3-5天内可收到货品</p>
                            <p>如遇周末或节假日，收货期约5-7天</p>
                            <p>亲，难道你不知道海关的哥哥姐姐们节假日也不上班的吗？</p>
                        </div>
                    </li>
                    <li class="row">
                        <div class="col col-6 postFee">包邮</div>
                        <div v-if="allDetails.isNeedPostFee!=0" class="col col-12">本商品不包邮</div>
                        <div v-if="allDetails.isNeedPostFee==0" class="col col-12">本商品包邮</div>
                    </li>
                    <li class="row">
                        <div class="col col-6 refund">退货</div>
                        <div v-if="allDetails.isrefund==1" class="col col-12">本商品可支持退货</div>
                        <div v-if="allDetails.isrefund!=1" class="col col-12">本商品不可支持退货</div>
                    </li>
                </ul>
            </div>
            <div class="list_item">
                <p>{{allDetails.desc}}</p>
            </div>

            <div class="main-wrap main-wrapBGcolor">
                <div class="grid tabs-bar">
                    <ul class="row tabs-list">
                        <li v-for="(item,index) in wrapText" class="col  tabs-items" @click="choiceWrap(index)" :class="{active:index==modifyIndex}">{{item}}<i v-if="index!=2" class="icon-line"></i></li>
                    </ul>
                </div>
                <div>
                    <picAndText :picAndTextDatas="picAndTextData" v-if="modifyIndex==0"></picAndText>
                    <commodityParameters :shopParameterss="shopParameters" v-if="modifyIndex==1"></commodityParameters>
                    <wordOfMouth v-if="modifyIndex==2"></wordOfMouth>
                </div>
            </div>
            <div class="paraButtonFill"></div>
        </div>
        <div id="toolbar" class="grid">
            <div class="row fvc">
                <span class=" button" id="share-btn" @click="shareToWechat">分享</span><!--@click="porShare"-->
                <span v-if="!(shopIdLength.length>1)&&allDetails.activtyStatus==1" class="button btn" id="cart-btn" @click="detauksAddShop('true',allDetails.itemId,shopText,allDetails.price,commodityPic[0].picUrl,allDetails.activtyStatus,1)">加入购物车</span>
                <span v-if="!(shopIdLength.length>1)&&allDetails.activtyStatus==1" class="button btn" id="buy-btn" @click="detauksAddShop('true',allDetails.itemId,shopText,allDetails.price,commodityPic[0].picUrl,allDetails.activtyStatus,2)">立即购买</span>
                <span v-if="shopIdLength.length>1||allDetails.activtyStatus!=1" class="onlyBuyBtn"  :class="{isActivityPeriod:(allDetails.activtyStatus)==0||(allDetails.activtyStatus)==2}"    @click="detauksAddShop('true',allDetails.itemId,shopText,allDetails.price,commodityPic[0].picUrl,allDetails.activtyStatus,2)">立即购买</span>
            </div>
        </div>
        <detailsAddCard v-if="addCardFill" @msgAdd=detauksAddShop() :fillValue=addValue></detailsAddCard>
        <div class="shareFill" v-show="showShareFill" @click="closeFill">
            <ul class="shareFillUl" >
                <li @click="call('wechatFriend')"><img src="../../../static/images/weixin_share.png" /></li>
                <li @click="call('wechatTimeline')"><img src="../../../static/images/pengyouquan_share.png" /></li>
                <li @click="call('qqFriend')"><img src="../../../static/images/qq_share.png" /></li>
                <li @click="call('qZone')"><img src="../../../static/images/pyq.png" /></li>
                <li @click="call('weibo')"><img src="../../../static/images/weibo_share.png" /></li>
            </ul>
        </div>
    </div>
</template>

<script>
    var shares = null;
    import '../../script/nativeShare'
    import { Toast  } from 'mint-ui'
    import axios from "../../utils/axios";
    import qs from "qs";
    import Slider from '../common/slider'
    import picAndText from "../commodityDetailsPage/picAndText"
    import wordOfMouth from "../commodityDetailsPage/wordOfMouth"
    import commodityParameters from "../commodityDetailsPage/commodityParameters"
    import detailsAddCard from "../commodityDetailsPage/detailsAddCard"
    export default{
        name:"commodityDetails",
        components:{
          Slider,
          picAndText,
          commodityParameters,
          wordOfMouth,
          detailsAddCard
        },
        data(){
            return{
                bannershow:false,
                commodityPic:[],
                shopText:"",
                soldRatio:"",
                soldCntNum:"",
                wrapText:["图文详情","商品参数","口碑"],
                modifyIndex:0,
                picAndTextData:"",
                shopParameters:[],
                allDetails:"",
                addCardFill:false,
                addValue:{},
                shopIdLength:"",
                showShareFill:false,
            }
        },
        created(){
            this.judgeShop()
            console.log(window.location.origin)
            console.log(window.location.hash)
            if(window.plus){
                this.plusReady();
            }else{
                document.addEventListener('plusready', this.plusReady(), false);
            }
        },
        methods:{
            porShare(){
                this.showShareFill=true;
            },
            closeFill(){
                this.showShareFill=false;
                
            },
            //分享
            call(command){
                var nativeShare = new NativeShare();
                var icon=this.commodityPic[0].picUrl
                var links=window.location.origin+"/"+window.location.hash
                var title=this.shopText;
                var shareData={
                    title:title,
                    desc:links,
                    link:links,
                    icon:icon,
                }
                nativeShare.setShareData(shareData);
                try{
                    nativeShare.call(command)
                }catch(err){
                    alert("系统繁忙，请稍后重试")
                }
            },
            //wabapp分享
            shareToWechat() {
                // console.log([this.commodityPic[0].picUrl])
                var self = this;
                var shareBts=[];
                // 更新分享列表
                var ss=shares['weixin'];
                ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
                shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
                // 弹出分享列表
                shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts},function(e){
                    if(e.index>0){
                        console.log(7.1)
                        self.shareAction(shareBts[e.index-1],true)
                    }
                    //(e.index>0)&&self.shareAction(shareBts[e.index-1],true);
                }):plus.nativeUI.alert('当前环境无法支持分享链接操作!');
            },
            // H5 plus事件处理
            plusReady(){
                this.updateSerivces();
            },
            // 更新分享服务
            updateSerivces () {
                var self = this;
                plus.share.getServices(function(s){
                    shares={};
                    for(var i in s){
                        var t=s[i];
                        shares[t.id]=t;
                    }
                }, function(e){
                    let msg = '获取分享服务列表失败：'+e.message;
                    alert(msg);
                });
            },
            shareAction(sb,bh) {
                var self = this;
                if(!sb||!sb.s){
                    return alert("无效的分享服务！");
                }
                var msg={content:'',extra:{scene:sb.x}};
                var link="http://192.168.2.99:8081/"+window.location.hash
                var titleText=this.shopText
                var thumbsIcons=[]
                var thumbsIcon=this.commodityPic[0].picUrl+"!small"
                thumbsIcons.push(thumbsIcon)
                if(bh){

                    msg.href =link;//"http://192.168.2.99:8081/#/buyGiftBag/"+localStorage.getItem("userId")
                    msg.title=titleText;
                    msg.content =link;//"http://192.168.2.99:8081/#/buyGiftBag/"+localStorage.getItem("userId")
                    msg.thumbs = thumbsIcons;
                }
                // 发送分享
                if(sb.s.authenticated){
                    console.log('---已授权---');
                    this.shareMessage(msg, sb.s);
                }else{
                    console.log('---未授权---');
                    sb.s.authorize(function(){
                        self.shareMessage(msg, sb.s);
                    }, function(e){
                        let msg = '认证授权失败：'+ e.code + ' - ' + e.message;
                        alert(msg);
                    });
                }
            },
            // 发送分享消息
            shareMessage(msg, s) {
                s.send(msg, function(){
                    console.log('分享到"'+s.description+'"成功！');
                }, function(e){
                    let msg = '分享到"'+s.description+'"失败: '+JSON.stringify(e);
                    //alert(msg);
                });
            },








            //判断是购买升级礼包还是商品
            judgeShop(){
                this.shopIdLength=this.$route.params.shopId.split(';')
                console.log(this.shopIdLength.length)
                if(this.shopIdLength.length>1){
                    this.judgeAgent(this.shopIdLength[1])
                    this.initializationPull(this.shopIdLength[0])
                    
                }else{
                    this.initializationPull(this.$route.params.shopId)
                }
            },
            //初始化拉取页面数据
            initializationPull(commodityId){
                axios
                .post(
                    "commodityDetailsInterface",
                    qs.stringify({
                        ids:commodityId,
                    }),{}
                )
                .then(res => {
                    if(res.code==0){
                        this.allDetails=res.result.items[0]

                        this.shopText=res.result.items[0].title
                        if(res.result.items[0].activtyBaseSoldQuantity!==undefined){
                            this.soldRatio=res.result.items[0].activtyBaseSoldQuantity/res.result.items[0].itemNum*100+'%'
                        }else if(res.result.items[0].activtyBaseSoldQuantity===undefined){
                            this.soldRatio=Math.ceil((((parseInt(res.result.items[0].baseSoldQuantity) + parseInt(res.result.items[0].soldCnt))* parseInt(res.result.items[0].multiple))/(parseInt(res.result.items[0].baseSoldQuantity) + parseInt(res.result.items[0].itemNum) + parseInt(res.result.items[0].soldCnt))* parseInt(res.result.items[0].multiple))*100)+'%'
                        }
                        // this.soldRatio=((res.result.items[0].soldCnt)/(res.result.items[0].itemNum)*100)+"%"
                        this.soldCntNum=res.result.items[0].soldCnt
                        this.picAndTextData=res.result.items[0].detail.split(';')
                        // console.log(JSON.parse(res.result.items[0].features))
                        this.shopParameters.push(JSON.parse(res.result.items[0].features))
                        this.shopParameters.push({"text":res.result.items[0].brandName})
                        this.shopParameters.push({"specification":res.result.items[0].specification})
                        var shopPic=res.result.items[0].pics.split(';')
                        for(var i=0;i<shopPic.length;i++){
                            this.commodityPic.push({picUrl:shopPic[i]})
                        }
                        this.bannershow=true;
                    }else{
                        Toast(res.msg)
                    }
                    
                });
                
            },
            //如果购买的礼包，建立关系
            judgeAgent(pUserId){
                axios
                .post(
                    "myParentUser",
                    qs.stringify({
                        pUserId: pUserId,
                    }),{}
                )
                .then(res => {
                    console.log(res.result)

                });
            },
            topBack(){
                this.$router.go(-1);
            },
            choiceWrap(index){
                this.modifyIndex=index
            },
            jumpCard(){
                if(localStorage.getItem('loginstatus')==null||localStorage.getItem('loginstatus')==undefined||localStorage.getItem('loginstatus')==""){
                    this.$router.push('/login')
                }else{
                    this.$router.push('/shopcart')
                    localStorage.navselect='tab3';
                }
                
            },
            detauksAddShop(stats,itemId,shopText,price,picUrl,isCard,isClass){
                if(this.allDetails.activtyStatus==0||this.allDetails.activtyStatus==2){
                    Toast("商品不在活动期间哦")
                }else{
                    if(localStorage.getItem('loginstatus')==null||localStorage.getItem('loginstatus')==undefined||localStorage.getItem('loginstatus')==""){
                        this.$router.push('/login')
                    }else{
                        var deliveryData={'itemId':itemId,'shopText':shopText,'price':price,'picUrl':picUrl,"isClass":isClass}
                        this.addValue=deliveryData
                        this.addCardFill=stats
                    }
                    
                }
                
                
            },
        },
    }
</script>

<style scoped>
.comDetaMain{
    overflow: hidden;
}
.header {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
} 
.header .navbar {
    position: relative;
    height: 1.125rem;
    line-height: 1.125rem;
    text-align: center;
    background: #fff;
}
.header .navbar-left {
    left: 0;
}
.header .btn-navbar {
    position: absolute;
    /* top: 0; */
    height: 1.125rem;
    width: 1.125rem;
    z-index: 9;
}
.header .btn-navbar .icon {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
}
.header .icon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.header .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 0.475rem;
}
.category-handle {
    height: 1.125rem;
    width: 1.125rem;
    position: absolute;
    right: 0;
    top: 0;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_icon_pink.png);
    background-size: 0.75rem 0.75rem;
    background-repeat: no-repeat;
    background-position: center center;
}
.cart-bar .price {
    display: block;
    padding: 0 1px;
    height: 0.35rem;
    text-align: center;
    border: 1px solid #fb4e90;
    color: #fff;
    border-radius: 0.25rem;
    line-height: 0.35rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -0.575rem 0 0 -0.325rem;
    font-size: 0.25rem;
    background: #fb4e90;
    visibility: hidden;
}
.price:before {
    font-size: 0.35rem;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.fill{
    width: 100%;
    height:1.125rem;
}
.priceGroup{
    padding: 0.3rem 0.2rem;
    background: #fff;
    border-top: 1px solid #dfdfdf;
}
.priceGroup>p{
    line-height: 0.625rem;
    font-weight: 400;
    font-size: 0.45rem;
}
.priceGroup1{
    font-size: 0.35rem;
    
}
.priceGroup1>span:nth-child(2){
    margin-left: .8em;
    color: #626262;
    margin-right: .8em;
    padding-right: .8em;
    position: relative;
}
.priceGroup1>span:nth-child(2):after {
    content: '';
    position: absolute;
    right: 0;
    top: 0.1rem;
    width: 1px;
    background-color: #626262;
    height: 0.275rem;
    display: block;
}
.priceGroup3{
    font-size: 0.25rem;
    width: 2.8rem;
    height: 0.4rem;
    background-color: #afafaf;
    overflow: hidden;
    border-radius: 0.25rem;
    position: relative;
}
.sold{
   height: 0.4rem;
   border-radius: 0.25rem;
   background:#fb4e90;
}
.soldText{
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    line-height:0.45rem;
    color: #fff; 
    font-size: 0.25rem;
}
.list_item {
    font-size: 14px;
    margin: 5px 0;
    background: #fff;
}
.list_item ul.qualityAssurance {
    padding: 7px 5%;
    text-align: center;
}
.grid .row .col {
    -moz-box-flex: 1;
    width: 100%;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 1em;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.list_item ul.qualityAssurance img {
    display: inline-block;
    width: 16px;
    vertical-align:bottom;
}
.list_item ul.qualityAssurance span {
    padding-left: 5px;
    font-size: 12px;
}
.list_items ul li {
    border-bottom: 1px solid #e5e5e5;
    line-height: 35px;
    padding: 0 0 0 3%;
    background: #fff;
}
.grid .row .col.col-6 {
    -moz-box-flex: 24;
    width: 24%;
    -ms-flex: 24;
    -webkit-box-flex: 24;
    flex: 24;
}
.list_items.aside .col-6 {
    font-size: 14px;
    color: #7c7c7c;
}
.list_items.aside .col-6.postFee:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_detail_package.png);
}
.grid .row .col.col-12 {
    -moz-box-flex: 72;
    width: 72%;
    -ms-flex: 72;
    -webkit-box-flex: 72;
    flex: 72;
}
.list_items.aside .col-6 {
    font-size: 14px;
    color: #7c7c7c;
}
.list_items.aside .col-6.refund:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_detail_salesReturn.png);
}
.list_items.aside .col-6:before {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 18px;
    height: 18px;
    display: inline-block;
    content: "";
    vertical-align: middle;
    margin-right: 2%;
    margin-top: -2px;
}
.list_item p {
    padding: 0 3%;
    line-height: 34px;
}
.active {
    border-bottom: 1px solid #221f23 !important;
}
.tabs-bar .tabs-items {
    position: relative;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transition: border-bottom .5s linear 0s;
    transition: border-bottom .5s linear 0s;
    background: #fff;
}
.tabs-bar .tabs-items .icon-line {
    position: absolute;
    top: 10px;
    right: 0;
    display: inline-block;
    width: 1px;
    height: 25px;
    background-color: #e5e5e5;
}


#toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    word-spacing: 7px;
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
}
#toolbar .row {
    width: 100%;
}
.fvc {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
#toolbar span#share-btn {
    width: 18%;
    border: none;
    border-radius: 0;
    color: #7c7c7c;
    border-right: 1px solid #e4e4e4;
}
#toolbar span {
    background-color: transparent;
    height: 56px;
    line-height: 44px;
    border: 1px solid #fb4e90;
    border-radius: 5px;
    margin: 0 2%;
    padding: 7px 0;
    width: 35%;
    vertical-align: middle;
    display: block;
}
.button {
    font-weight: 400;
    text-align: center;
    border-radius: 5px;
    background: #fb4e90;
    color: #fff;
    padding: .4em .2em;
}
#toolbar span#share-btn:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon-sold-out.png);
    background-size: 32px 165px;
    background-repeat: no-repeat;
    width: 20px;
    height: 25px;
    display: inline-block;
    background-position: 0 -137px;
}
#toolbar span:before {
    content: "";
    display: inline-block;
    vertical-align: -9px;
    padding-right: 5px;
}
#toolbar span.btn {
    height: 40px;
    line-height: 32px;
    margin: 7px 2%;
    padding: 4px 0;
}
#cart-btn {
    line-height: 36px;
    color: #fb4e90;
}
#cart-btn:before {
    width: 30px;
    height: 30px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/detail_icon.png);
    background-size: 32px 165px;
    background-repeat: no-repeat;
    background-position: 0 4px;
}
#toolbar span.btn {
    height: 40px;
    line-height: 32px;
    margin: 7px 2%;
    padding: 4px 0;
}
#buy-btn {
    line-height: 36px;
    color: #fff!important;
    background-color: #fb4e90!important;
}
#buy-btn:before {
    width: 25px;
    height: 30px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/detail_icon.png);
    background-size: 32px 165px;
    background-repeat: no-repeat;
    background-position: 0 -64px;
}
.paraButtonFill{
    width: 100%;
    height: 56px;
    background: transparent;
}
.discount {
    color: #fb4e90;
    border: 1px solid #fb4e90;
    padding: 0 1%;
}
.list_items.aside .col-6.taxFree:before {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_detail_dutyFree.png);
}
.list_item.aside .col-6:before {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 18px;
    height: 18px;
    display: inline-block;
    content: "";
    vertical-align: middle;
    margin-right: 2%;
    margin-top: -2px;
}
.list_item.aside .col-6:before {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 18px;
    height: 18px;
    display: inline-block;
    content: "";
    vertical-align: middle;
    margin-right: 2%;
    margin-top: -2px;
}
.grid .row .col.col-18 {
    -moz-box-flex: 72;
    width: 72%;
    -ms-flex: 72;
    -webkit-box-flex: 72;
    flex: 72;
}
.list_items.aside .taxFreeTip {
    font-size: 13px;
    color: #7c7c7c;
    line-height: 20px;
    margin: 5px 0;
}
.list_items.aside .taxFreeTip p {
    padding-bottom: 1%;
    position: relative;
    padding-left: 8px;
    line-height: 18px;
}
.list_items.aside .taxFreeTip p:before {
    content: "";
    width: 3px;
    height: 3px;
    background-color: #7c7c7c;
    position: absolute;
    top: 9px;
    left: 0;
}
.onlyBuyBtn{
    width: 72% !important;
    height: 40px !important;
    line-height: 32px !important;
    margin: 7px 2% !important;
    padding: 4px 0 !important;
    border: 1px solid #fb4e90;
    border-radius: 5px;
    vertical-align: middle;
    color: #fff!important;
    background-color: #fb4e90!important;
    display: inline-block;
}
.onlyBuyBtn:before {
    width: 25px;
    height: 30px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/detail_icon.png);
    background-size: 32px 165px;
    background-repeat: no-repeat;
    background-position: 0 -64px;
}
.shareFill{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    z-index:10;
    background:transparent;
}
.shareFillUl{
    position:fixed;
    bottom:0;
    width:100%;
    padding:0 10px;
    z-index:15;
    background:#fff;
}
.shareFillUl>li{
    width:33.33%;
    float:left;
    text-align:center;
    padding:1% 0;
}
.shareFillUl>li>img{
    width:40%;    
}
.isActivityPeriod{
    background: #b0b0b0 !important;
    border:1px solid #b0b0b0 !important;
}
.main-wrapBGcolor{
    background: #fff;
}
</style>