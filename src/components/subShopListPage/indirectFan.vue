<template>
    <div>
        <ul class="media-list">
            <li class="not-has-goods-msg">
                <i class="icon-ally-null"></i>
                <p>您暂时还没有新粉丝，快去邀请吧！</p>
                <a @click="jumpJoinAndShare">去邀请粉丝</a>
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
        jumpJoinAndShare(){
            this.$router.push('/joinAndShare')
        },
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
.not-has-goods-msg {
    text-align: center;
    padding: 48px 30px;
    font-size: 14px;
}
.not-has-goods-msg .icon-ally-null {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/no_ally.png);
    background-size: contain;
    background-repeat: no-repeat;
}
.not-has-goods-msg p {
    margin: 5% 0;
}
.not-has-goods-msg a {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 5%;
    color: #fb4e90;
    border: 1px solid #fb4e90;
    font-size: 18px;
    text-decoration:none;
}
</style>