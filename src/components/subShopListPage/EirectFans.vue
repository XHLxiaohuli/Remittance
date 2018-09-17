<template>
<div>
    <ul class="media-list">
        <li class="media" v-for="(item,index) in transmissionData">
            <div class="media-left">
                <a href="#">
                    <img class="media-object" src="http://unesmall.b0.upaiyun.com//common/images/avatar-large.png" alt="">
                </a>
            </div>

            <div class="media-body">
                <h4 class="media-heading">
                    <span class="label">昵称：</span>{{item.nickName}}
                    <span class="count label">{{item.time}}</span>
                </h4>
                <p>
                    <span class="label">电话号码：</span><span class="label">{{item.mobile}}</span>
                </p>
            </div>

            <div class="icon-badge-join">
                <img src="../../../static/images/icon_level1.png" alt="" v-if="item.contactsLevel==1">
                <img src="../../../static/images/icon_level2.png" alt="" v-if="item.contactsLevel==2">
                <img src="../../../static/images/icon_level3.png" alt="" v-if="item.contactsLevel==3">
                <img src="../../../static/images/icon_level4.png" alt="" v-if="item.contactsLevel==4">
                <img src="../../../static/images/icon_level5.png" alt="" v-if="item.contactsLevel==5">
                <img src="../../../static/images/icon_level6.png" alt="" v-if="item.contactsLevel==6">
                <img src="../../../static/images/icon_level7.png" alt="" v-if="item.contactsLevel==7">
            </div>
        </li>
    </ul>
</div>
</template>
<script>
export default{
    data(){
        return{
            transmissionData:"",
        }
    },
    props:{
        myValue:{
            type: Array,
            required: true
        }
    },
    created(){
        this.InitializationPage()
    },
    beforeMount(){
        // console.log(this.myValue)
        
    },
    // beforeUpdate(){
    //     this.InitializationPage()
    //     alert(123)
    // },
    watch:{
        myValue: {  // 这监听对象值的改变 和上面的不一样。
            handler(curVal,oldVal){
                console.log(curVal);
                if(curVal.length>0){
                    for(var i=0;i<curVal.length;i++){
                        curVal[i]["time"]=this.timestampToTime(curVal[i].dateCreated)
                    }
                    this.transmissionData=curVal
                }
                
            },
            deep: true, 
        },
    },
    methods:{
        InitializationPage(){
            for(var i=0;i<this.myValue.length;i++){
                this.myValue[i]["time"]=this.timestampToTime(this.myValue[i].dateCreated)
            }
            this.transmissionData=this.myValue
            console.log(this.myValue)
        },
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
            return Y + M + D;
        }
    }
}
</script>
<style>
.media-list {
    background-color: #fff;
    margin-top: 6px;
}
.media-list {
    padding-left: 0;
    list-style: none;
}
.media{
    padding: 15px 0 5px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    margin: 0;
}
.media:first-child {
    margin-top: 0;
}
.media, .media-body {
    zoom: 1;
    overflow: hidden;
}
.media-left {
    width: 60px;
    height: 60px;
    padding: 0 15px;
    overflow: hidden;
}
.media-body, .media-left, .media-right {
    display: table-cell;
    vertical-align: top;
}
.media-left a {
    display: inline-block;
    width: 60px;
    height: 60px;
}
a {
    -webkit-tap-highlight-color: transparent;
}
a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
.media-object {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.media-object {
    display: block;
}
.media-body {
    font-size: 14px;
    color: #2e2e2e;
    padding-bottom: 8px;
}
.media-body {
    width: 10000px;
}
.media-heading {
    margin-top: 6px;
    margin-bottom: 4px;
    padding-bottom: 4px;
    font-weight: 400;
    font-size: 16px;
    color: #2d2d2d;
    border-bottom: 1px solid #e5e5e5;
}
.label {
    font-size: 12px;
    color: #7c7c7c;
}
.count {
    float: right;
    margin-right: 15%;
    line-height: 24px;
}
/* .icon-badge-join.icon-badge-1 {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_level1.png);
} */
.icon-badge-join {
    position: absolute;
    top: 0;
    right: 0;
    width: 41px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
}
.icon-badge-join>img{
    width: 100%;
    height: 100%;
}
</style>