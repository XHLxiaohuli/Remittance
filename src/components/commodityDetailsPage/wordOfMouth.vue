<template>
    <div>
         <!--有数据-->
        <div class=" item-comments item-content  grid wl-nexter " data-widget-cid="widget-1" v-if="false">
            <div class="commentsTotal row ">
                <div class="col col-5">
                    <h3>4.5</h3>
                </div>
                <div class="col col-13">
                    <p>好评率100%</p>
                    <p>1口碑，2短评</p>
                </div>
                <div class="col col-8">
                    <div class="starWrap">
                        <div class="star" style="width: 90%;"></div>
                    </div>
                </div>
            </div>

            <ul class="comments-list">
                <li class="grid box">
                    <div></div>
                    <div></div>
                    <p></p>
                    <div></div>
                </li>
            </ul>

            <div></div>              
        </div>

        <!--没数据时的评论区-->
        <div class="not-has-comments-msg">暂时没有评论……</div>
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

        }
    }
</script>
<style>
.tabs-content.visible {
    display: block;
}
.not-has-comments-msg {
    text-align: center;
    padding: 10% 0;
    font-size: 14px;
    background: #fff;
}  

.item-content {
    padding-bottom: 10px;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.commentsTotal {
    width: 70%;
    margin: 5% auto;
}
.grid .row .col.col-5 {
    -moz-box-flex: 20;
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
}
.commentsTotal h3 {
    color: #fb4e90;
    font-size: 24px;
    line-height: 42px;
}
.grid .row .col.col-13 {
    -moz-box-flex: 52;
    width: 52%;
    -ms-flex: 52;
    -webkit-box-flex: 52;
    flex: 52;
}
.commentsTotal .col-13 {
    font-size: 12px;
}
.grid .row .col.col-8 {
    -moz-box-flex: 32;
    width: 32%;
    -ms-flex: 32;
    -webkit-box-flex: 32;
    flex: 32;
}
.commentsTotal .starWrap {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_star_big_n.png);
    background-repeat: repeat;
    background-size: 14px;
    width: 70px;
    height: 14px;
    margin-top: 15px;
}
.commentsTotal .starWrap .star {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_star_big_h.png);
    background-repeat: repeat;
    background-size: 14px;
    width: 60%;
    height: 14px;
}
.comments-list li {
    padding: 17px 13px;
    border-bottom: 1px solid #e5e5e5;
}
</style>