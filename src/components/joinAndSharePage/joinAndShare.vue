<template>
<div>
    <section class="joinHeader">
        <div class="jointent navbar">
            <div class="btn-navbar navbar-left">
                <span @click="goBack" class="ijoin ijoin-return"></span>
            </div>
            <div class="navbar-main">加盟分享</div>
        </div>
    </section>
    <headerFill></headerFill>
    <ul class="joinBody">
        <li @click="shareToWechat"><!--@click="share"--><!--@click="porShare"-->
            <div class="oinLiPic oinLiPic1"></div>
            <div class="joinLi2">
                <div class="joinLi2Div">
                    <p class="joinLi2Title">直接邀请</p>
                    <p class="joinLi2Text">通过分享到微信好友、朋友圈或复制链接等渠道，好友通过链接成功购买礼包即可成为你的分店铺。</p>
                </div>
            </div>
        </li>
        <li @click="QRcodeShare">
            <div class="oinLiPic oinLiPic2"></div>
            <div class="joinLi2">
                <div class="joinLi2Div">
                    <p class="joinLi2Title">二维码邀请</p>
                    <p class="joinLi2Text">自动生成你的专属的邀请二维码,通过保存图片的方式获取二维码图片,将图片分享到微信好友、朋友圈等渠道,好友通过识别二维码,成功购买礼包即可成为你的分店铺。</p>
                </div>
            </div>
        </li>
    </ul>
    <div class="shareFill" v-show="showShareFill" @click="closeFill">
        <ul class="shareFillUl" >
            <li @click="call('wechatFriend')"><img src="../../../static/images/weixin_share.png" /></li>
            <li @click="call('wechatTimeline')"><img src="../../../static/images/pengyouquan_share.png" /></li>
            <li @click="call('qqFriend')"><img src="../../../static/images/qq_share.png" /></li>
            <li @click="call('qZone')"><img src="../../../static/images/pyq.png" /></li>
            <li @click="call('weibo')"><img src="../../../static/images/weibo_share.png" /></li>
        </ul>
    </div>
    <!-- <img src="http://sp.mikumine.com/api/h/1.0/qrUrl.json?url=http%3A%2F%2Fsp.mikumine.com%2Fapi%2Fh%2F1.0%2FinviteSpreadMangerPage.htm%3FpUserId%3D71320%26isShare%3D1" alt=""> -->
    <QRcodePage class="QrModel" v-show="ifQrPage" @modQr="Qrfunction"></QRcodePage>
</div>
</template>
<script>
var shares = null;
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
//import wx from 'weixin-js-sdk'
import '../../script/nativeShare'
import QRcodePage from "../joinAndSharePage/QRcodePage"
import headerFill from '../headerFill/headerFill'
export default{
    components:{
        QRcodePage,
        headerFill
    },
    data(){
        return{
            showShareFill:false,
            ifQrPage:false,
        }
    },
    created(){
            console.log(window.location.origin)
            if(window.plus){
                this.plusReady();
            }else{
                document.addEventListener('plusready', this.plusReady(), false);
            }
    },
    mounted(){
        // if(window.plus){
        //     plusReady();
        // }else{
        //     document.addEventListener('plusready',plusReady,false);
        // }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        porShare(){
            this.showShareFill=true;
        },
        closeFill(){
            this.showShareFill=false;
        },
        //分享
        call(command){
            var nativeShare = new NativeShare();
            var icon="http://unesmall.b0.upaiyun.com/ysh/ysh_logo.png"
            var links=window.location.origin+"#/buyGiftBag/"+localStorage.getItem("userId")
            var shareData={
                title:"邀请你成为推广经理",
                desc:links,
                link:links,
                icon:icon,
            }
            nativeShare.setShareData(shareData);
            try{
                nativeShare.call(command)
            }catch(err){
                this.shareToWechat()
                //alert("系统繁忙，请稍后重试")
            }
        },
        QRcodeShare(){
            this.ifQrPage=true
        },
        Qrfunction(){
            this.ifQrPage=false
        },
        shareToWechat() {
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
                if(bh){
                    msg.href = "http://192.168.2.99:8081/#/buyGiftBag/"+localStorage.getItem("userId");//window.location.origin
                    msg.title="邀请你成为推广经理";
                    msg.content = "http://192.168.2.99:8081/#/buyGiftBag/"+localStorage.getItem("userId");//window.location.origin
                    msg.thumbs = ["http://unesmall.b0.upaiyun.com/ysh/ysh_logo.png"];
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
            
            
        
        }
}
</script>
<style>
.joinHeader{
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.joinHeader .navbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.joinHeader .navbar-left {
    left: 0;
}
.joinHeader .btn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.joinHeader .btn-navbar .ijoin {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.joinHeader .ijoin-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.joinHeader .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
.joinBody{
    width: 100%;
    background: #fff;
    /* margin-top: 47px; */
}
.joinLi2{
    float: left;
}
.joinBody>li{
    position: relative;
    padding-left: 30%;
}
.joinBody>li:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
.oinLiPic{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6%;
    margin: auto;
    
}
.joinLi2Div{
    padding: 10% 0;
    border-bottom: 1px solid #dfdfdf;
    padding-right: 12%;
}
.joinLi2Title{
    font-size: 15px;
    padding-bottom: 10px;
}
.joinLi2Text{
    font-size: 10px;
    color: #7c7c7c;
}
.oinLiPic1{
    background: url(http://unesmall.b0.upaiyun.com/common/images/invite_directly.png) no-repeat;
    background-size: 100% 100%;
}
.oinLiPic2{
    background: url(http://unesmall.b0.upaiyun.com/common/images/invite_erweima.png) no-repeat;
    background-size: 100% 100%;
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
.QrModel{
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 20;
}
</style>