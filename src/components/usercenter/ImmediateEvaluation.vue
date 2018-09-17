<template>
    <div id="product-comment" class="ievalMain">
      <section class="header">
        <div class="content navbar">
          <div class="btn-navbar navbar-left" @click="back">
            <span class="icon icon-return"></span>
          </div>
          <div class="navbar-main">商品评价</div>
        </div>
      </section>

      <section class="page-content">
        <div class="item-comment" v-for="(item,indexs) in basicInformation">
          <div class="goods-info">
            <div class="goods-cover">
              <img class="cover" :src="item.pics.split(';')[0]" alt="">
            </div>
            <div class="goods-intro">
              <div class="title">{{item.title}}</div>
              <div class="price">{{item.prices}}</div>
            </div>
          </div>

          <div class="goods-photo">
            <div class="icon-wrap">
              <label class="icon-photo" for="file"></label>
              <form id="my_form_10774" action="/api/h/1.0/uploadCommentPic.json" class="form-horizontal" enctype="multipart/form-data">
                <input id="file" class="file" name="file" type="file" index="indexs" multiple @change="upload($event,indexs)" accept="image/*">
              </form>
            </div>
            <div class="photo-label">晒晒自己的宝贝</div>
          </div>

          <div class="goods-preview">
              <img v-for="(item,index) in uploadedPictures[indexs]" :src="item" alt="" class="thumb">
              <!-- <img src="http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151231/vNTT-0-1451541513456.jpg" alt="" class="thumb"> -->
          </div>

          <div class="goods-comment">
              <textarea name="" value="" ref="commentText" id="comment-textarea" class="comment-textarea" cols="30" rows="10" placeholder="你的评价很值钱哟！"></textarea>
          </div>

          <div class="goods-score">
            <span class="label">商品评分</span>
            <span class="star-wrap">
              <i v-for="(item,index) in satisfiedIndex[indexs]"  class="icon-star" :class="{Vactive:item=='y'}"  @click="isSatisfied(indexs,index)"></i><!--:class="{active:(satisfiedIndex[indexs][index])=='good'}"-->
            </span>
          </div>
        </div>
      </section>
      <section class="footer">
        <button class="btn-comment" @click="publishComment">发表评价</button>
      </section>
    </div>
</template>
<script>
import { Toast  } from 'mint-ui'
import axios from "../../utils/axios";
import qs from "qs";
import Exif from "exif-js";
import { compress} from "../../script/PicCompression";
export default{
    data(){
        return{
          picValue:"",
          satisfiedIndex:[],
          basicInformation:"",
          headerImage:"",
          imglength:0,
          uploadedPictures:[],
          allSize:0,
          oddNumbers:"",
          picArrIndex:"",
          picFiles:"",
        }
    },
    created(){
      this.initialAvaluateShop()
    },
    watch:{
        satisfiedIndex(newVal,oldVal){
            this.satisfiedIndex=oldVal
        },
        // uploadedPictures(newVal,oldVal){
        //     this.uploadedPictures=newVal
        // },

    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      returnFloat(value){
            var value=Math.round(parseFloat(value)*100)/100;
            var xsd=value.toString().split(".");
            if(xsd.length==1){
            value=value.toString()+".00";
            return value;
            }
            if(xsd.length>1){
            if(xsd[1].length<2){
            value=value.toString()+"0";
            }
            return value;
            }
        },
      initialAvaluateShop(){
            this.oddNumbers=this.$route.query.oddNumbers
            var singleOrder=this.$route.query.singleOrder
            var money
            var indexArr=["y","y","y","y","y"]
            for(var i=0;i<singleOrder.length;i++){
                money=(singleOrder[i].price)/100
                singleOrder[i]["prices"]=this.returnFloat(money)
                this.satisfiedIndex.push(indexArr)
                this.uploadedPictures.push([])
            }
            this.basicInformation=singleOrder
      },
      isSatisfied(indexs,index){
        var satisfiedIndexs
        satisfiedIndexs=["n","n","n","n","n"]
        for(var i=0;i<=index;i++){
            satisfiedIndexs[i]="y"
        }
        this.satisfiedIndex.splice(indexs,1,satisfiedIndexs)
      },


    


      upload(e,index) {
        this.picArrIndex=index
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.picFiles=files
        this.imglength=files.length; 
        this.filess(this.picValue);
      },

      filess(file) {
        var _this=this
        let Orientation;
        Exif.getData(file, function() {
            Orientation = Exif.getTag(this, "Orientation");
        });
        if (!file || !window.FileReader) return;
        let img = new Image();
        this.headerImage = file;
        if (/^image/.test(file.type)) {
            if (file.size >= 10* 1024 * 1024) {
            this.headerImage =compress(img, Orientation);
            console.log(compress(img, Orientation))
            this.postData(this.headerImage);
            } else {
                console.log(this.headerImage)
            this.postData(this.headerImage);
            }
        } else {
        }
      },

      postData(image) {
        var uploadPicUrl
        var form = new FormData();
        if(this.allSize<=10){
            if (this.imglength > 1) {
                var fileObj = this.picFiles; // js 获取文件对象
                if(((this.allSize)+(fileObj.length))<=10){
                    uploadPicUrl="uploadCommentPics"
                    for(var i=0;i<fileObj.length;i++){
                        form.append("file",fileObj[i]);
                    };
                    
                    
                    this.axiosPull(uploadPicUrl,form)
                }else{
                    Toast("最多只能10张哦") 
                }
                
            } else if(this.imglength == 1){
                if(((this.allSize)+1)<=10){
                    uploadPicUrl="uploadCommentPic"
                    form.append("file", image);
                    this.axiosPull(uploadPicUrl,form)
                }else{
                    Toast("最多只能10张哦") 
                }
            }
            
        }else{
            Toast("最多只能10张哦") 
        }  

      },
      axiosPull(uploadPicUrl,form){
          console.log("开始上传图片")
        axios
        .post(uploadPicUrl,form ,{
            "Content-Type": "multipart/form-data"
        })
        .then(res => {
            console.log("成功返回参数")
            if(res.code==0){
                if(uploadPicUrl=="uploadCommentPic"){
                    this.uploadedPictures[this.picArrIndex].push(res.result.picUrl)
                    this.allSize+=1
                }else if(uploadPicUrl=="uploadCommentPics"){
                    for(var i=0;i<res.result.picUrls.split(";").length;i++){
                        this.uploadedPictures[this.picArrIndex].push(res.result.picUrls.split(";")[i])
                    }
                    this.allSize+=res.result.picUrls.split(";").length
                }
            }else{
                Toast(res.msg)
            }
        });
      },

      //发表评论
      publishComment(){
        var commentNumber=this.$route.query.singleOrder
        var commentsJsonArr="["
        var single="["
        var grade=0
        var gradeArr=[]
        var dismantleDPic=""
        var dismantleDPicArr=[]
        for(var a=0;a<commentNumber.length;a++){
            for(var b=0;b<5;b++){
                if(this.satisfiedIndex[a][b]=="y"){
                    grade+=1
                }
            }
            for(var c=0;c<this.uploadedPictures[a].length;c++){
                if(c<this.uploadedPictures[a].length-1){
                    dismantleDPic+=this.uploadedPictures[a][c]+";"
                }else{
                    dismantleDPic+=this.uploadedPictures[a][c]
                }
            }
            gradeArr.push(grade)
            dismantleDPicArr.push(dismantleDPic)
            grade=0
            dismantleDPic=""
        }
        for(var i=0;i<commentNumber.length;i++){
            single='{"buildingId":'+commentNumber[i].itemId+',"star":'+gradeArr[i]+',"content":"'+this.$refs.commentText[i].value+'","picUrls":"'+dismantleDPicArr[i]+'"}' 
            commentsJsonArr+=single
        }
        commentsJsonArr+="]"

        axios
        .post(
        "addComments",
        qs.stringify({
            buildingType:1,
            tradeId:this.oddNumbers,
            commentsJson:commentsJsonArr
        }),{}
        )
        .then(res => {
            if(res.code==0){
                this.$router.go(-1);
            }else{
                Toast(res.msg)
            }
        });
      }




    }
}
</script>
<style>
.ievalMain{
  font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-transition: background .3s;
    transition: background .3s;
    z-index: 1;
    border-bottom: 1px solid #e5e5e5;
}
.header .navbar {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.header .navbar-left {
    left: 0;
}
.header .btn-navbar {
    position: absolute;
    top: 0;
    height: 45px;
    width: 45px;
    z-index: 9;
}
.header .btn-navbar .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
}
.header .icon-return {
    background-size: 100%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/navBack.png);
}
.header .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
#product-comment .page-content {
    overflow-y: auto;
    background-color: #f6f6f6;
}
.page, .page-content {
    position: absolute;
    top: 0;
    left: 0;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 100%;
    background: #fff;
}
.page-content {
    padding: 45px 0;
}
#product-comment .item-comment {
    padding-left: 3%;
    padding-right: 3%;
    margin-top: 2%;
    background-color: #fff;
}
#product-comment .goods-info {
    padding-top: 4%;
    padding-bottom: 4%;
    border-bottom: 1px solid #e5e5e5;
}
#product-comment .goods-cover {
    padding-right: 5px;
}
#product-comment .goods-cover, #product-comment .goods-intro {
    display: table-cell;
    vertical-align: top;
}
#product-comment .goods-cover .cover {
    width: 62px;
    height: 62px;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
#product-comment .goods-intro {
    padding: 1% 0;
    vertical-align: middle;
    overflow: hidden;
}
#product-comment .goods-intro .title {
    font-size: 15px;
    height: 36px;
    line-height: 18px;
}
#product-comment .goods-intro .price {
    color: #fb4e90;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
#product-comment .goods-photo {
    padding-top: 4%;
    padding-bottom: 4%;
}
#product-comment .icon-photo {
    display: block;
    width: 62px;
    height: 62px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_picture.png);
    background-size: cover;
}
label {
    cursor: default;
}
#product-comment .file {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 62px;
    height: 62px;
}
button, input, input[type=password], input[type=button], input[type=reset], input[type=submit], input[type=text], textarea {
    -webkit-appearance: none;
}
#product-comment .photo-label {
    font-size: 12px;
    vertical-align: middle;
    overflow: hidden;
}
#product-comment .icon-wrap {
    position: relative;
    padding-right: 5px;
}
#product-comment .icon-wrap, #product-comment .photo-label {
    display: table-cell;
    vertical-align: center;
}
#product-comment .goods-preview {
    padding-bottom: 4px;
}
#product-comment #comment-textarea {
    width: 100%;
    height: 100px;
    padding: 2%;
    border: 1px solid #e5e5e5;
}
button, input, select, textarea {
    font-size: 100%;
}
#product-comment .goods-score {
    padding-top: 4%;
    padding-bottom: 4%;
    font-size: 15px;
}
#product-comment .goods-score .label {
    display: inline-block;
    margin-right: 8%;
    vertical-align: top;
}
#product-comment .star-wrap {
    vertical-align: middle;
}
#product-comment .star-wrap .icon-star {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_star_comment_n.png);
    background-size: cover;
}
#product-comment .star-wrap .icon-star.Vactive {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_star_comment_h.png);
    border:0;
}
#product-comment .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: #fff;
}
#product-comment .btn-comment {
    bottom: 2%;
    width: 88%;
    height: 42px;
    margin: 0 6%;
    color: #fff;
    font-size: 15px;
    line-height: 42px;
    text-align: center;
    border-radius: 5px;
    border: none;
    background-color: #fb4e90;
}
#product-comment .thumb {
    display: inline-block;
    width: 62px;
    height: 62px;
    /* width: 20%; */
    margin-right: 5px;
    margin-bottom: 5px;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
</style>