<template>
        <div>
            <section class="markHeader">
                <div class="marktent navbar">
                    <div class="btn-navbar navbar-left">
                        <span @click="goBack" class="imark imark-return"></span>
                    </div>
                    <div class="navbar-main">营销推广</div>
                </div>
            </section>
            <ul class="markBody">
                <li>
                    <div class="oinLiPic oinLiPic1"></div>
                    <div class="markLi2">
                        <div class="markLi2Div">
                            <p class="markLi2Title">米酷爆款推荐</p>
                            <p class="markLi2Text">精选各种高利润、高回报、高销量的热销爆款，让你受益丰盛！更为你提供专业文案、精美图片素材，动动手指即可下载转发，让你推广轻松又精彩！</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="oinLiPic oinLiPic2"></div>
                    <div class="markLi2">
                        <div class="markLi2Div">
                            <p class="markLi2Title">海报推广</p>
                            <p class="markLi2Text">平台自动生成你专属的商城二维码，进入后通过截屏或者保存图片的方式获取二维码图片，将图片分享到微信好友、朋友圈等渠道，好友进入商城成功购买任何产品，你就可以获得相应的推广奖励。</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        </template>
        <script>
        export default{
            data(){
                return{
        
                }
            },
            created(){
                    
                },
            methods:{
                goBack(){
                    this.$router.go(-1);
                },
            }
        }
        </script>
        <style>
        .markHeader{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            -webkit-transition: background .3s;
            transition: background .3s;
            z-index: 1;
            border-bottom: 1px solid #e5e5e5;
        }
        .markHeader .navbar {
            position: relative;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background: #fff;
        }
        .markHeader .navbar-left {
            left: 0;
        }
        .markHeader .btn-navbar {
            position: absolute;
            top: 0;
            height: 45px;
            width: 45px;
            z-index: 9;
        }
        .markHeader .btn-navbar .imark {
            display: inline-block;
            width: 45px;
            height: 45px;
        }
        .markHeader .imark-return {
            background-size: 100%;
            background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
        }
        .markHeader .navbar-main {
            margin: 0;
            color: #2e2e2e;
            font-size: 16px;
        }
        .markBody{
            width: 100%;
            background: #fff;
            margin-top: 47px;
        }
        .markLi2{
            float: left;
        }
        .markBody>li{
            position: relative;
            padding-left: 30%;
        }
        .markBody>li:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
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
        .markLi2Div{
            padding: 10% 0;
            border-bottom: 1px solid #dfdfdf;
            padding-right: 12%;
        }
        .markLi2Title{
            font-size: 15px;
            padding-bottom: 10px;
        }
        .markLi2Text{
            font-size: 10px;
            color: #7c7c7c;
        }
        .oinLiPic1{
            background: url(http://unesmall.b0.upaiyun.com/common/images/invite_discover.png) no-repeat;
            background-size: 100% 100%;
        }
        .oinLiPic2{
            background: url(http://unesmall.b0.upaiyun.com/common/images/invite_poster.png) no-repeat;
            background-size: 100% 100%;
        }
        </style>