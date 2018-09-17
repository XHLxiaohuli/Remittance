<template>
    <div class="asstsContainer">
        <section class="assetsHeader">
            <div class="assetsContent assetsNavbar">
                <div class="assBtn-navbar assNavbar-left">
                    <span class="icon icon-return" @click="goBack"></span>
                </div>
                <div class="assNavbar-main">
                    <div @click="moilNavClass(index)" v-for="(item,index) in assNavbarText" :class="{addBgcolo:index==assNavbarTextIndex}">{{item}}</div>
                </div>
            </div>
        </section>
        <headerFill></headerFill>
        <div class="switchContainer">
            <myRedBag v-if="assNavbarTextIndex==0"></myRedBag>
            <myPoints v-if="assNavbarTextIndex==1"></myPoints>
            <myWallet v-if="assNavbarTextIndex==2"></myWallet>
        </div>
    </div>
</template>
<script>
    import myRedBag from "../meAssetsPage/myRedBag"
    import myPoints from "../meAssetsPage/myPoints"
    import myWallet from "../meAssetsPage/myWallet"
    import headerFill from '../headerFill/headerFill'
    export default{
        components:{
            myRedBag,
            myPoints,
            myWallet,
            headerFill
        },
        data(){
            return{
                assNavbarText:["我的红包","我的积分","我的钱包"],
                assNavbarTextIndex:0,
            }
        },
        created: function () {
            console.log(this.$route.params.index)
            this.assNavbarTextIndex=this.$route.params.index
            
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            moilNavClass(index){
                this.assNavbarTextIndex=index
            }
        }
    }
</script>
<style>
.assetsHeader {
    position: fixed;
    /* top: 0; */
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.assetsHeader .assetsNavbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
    box-shadow: 3px 5px 5px #ccc;
}
.assetsHeader .assBtn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.assetsHeader .assNavbar-left {
    left: 0;
}
.assetsHeader .assBtn-navbar .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.assetsHeader .icon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.assetsHeader .assNavbar-main {
    margin: 0;
    width: 75%;
    height: 75%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border:1px solid #fb4e90;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
}
.assetsHeader .assNavbar-main>div{
    float: left;
    width: 33.33%;
    border-right:1px solid #fb4e90;
    box-sizing: border-box;
    line-height: 32px;
}
.assetsHeader .assNavbar-main>div:last-child{
    border-right:0;
    
}
.addBgcolo{
    color:#fff;
    background: #fb4e90;
}
.switchContainer{
    width: 100%;
    /* margin-top: 45px; */
    /* padding: 10px 0; */
    /* padding-top: 20px; */
}
</style>