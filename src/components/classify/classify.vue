<template>
    <div id="classify">
      <section class="header">
        <div class="content navbar">
          <div class="search-wrap">
            <div class="row search-box">
              <div class="icon-search search-submit" @click="searchLi"></div>
              <div class="input-wrap">
                <input type="text" class="search-input" placeholder="搜索" v-model="searchText">
              </div>
              <div class="icon-wrap">
                <i class="icon-close"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <headerFill></headerFill>
      <div class="all-cart">
        <div class="cate-sectionItem " v-for="leveClassA in levelOne">
          <h3 class="title">{{leveClassA.name}}</h3>
          <div class="row category-wrap">
            <ul class="list">
              <li class="col col-25 item " @click="jupmListPage(item.categoryId,item.level)" v-for="(item,index) in result.cates" v-if="(item.level==2)&&(leveClassA.categoryId==item.parentId)">
                  <img :src="item.pic"/>
                  <strong class="ellipsis">{{ item.name }}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="cate-section cata-4">
        <h3 class="title">推荐品牌</h3>
        <div class="row brand-wrap">
          <ul class="list">
            <li class="item " v-for="(item,index) in recommendedBrandData" @click="majorSuitJump(item.target)">
              <a class="addHrefParm">
                <img :src=item.picUrl alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
      <tabui></tabui>
      <bufferPage v-if="!(isLoading)"></bufferPage>
    </div>
</template>
<script>
  import { Toast  } from 'mint-ui'
  import axios from "../../utils/axios";
  import qs from "qs";
  import tabui from '../common/tabui'
  import bufferPage from '../bufferPage/bufferPage'
  import headerFill from '../headerFill/headerFill'
    export default {
        name: 'classify',
        components:{
          tabui,
          bufferPage,
          headerFill,
        },
        data() {
            return {
              msg: 'helloworld',
              isLoading:true,
              result:[],
              levelOne:[],
              recommendedBrandData:"",
              searchText:"",
            }
        },
        methods:{
          //获取分类商品数据
          classificationFunction(){
            var that=this;
            axios
            .post(
              "classificationData",
              qs.stringify({
                jtoken:"lwihqcuq7lcl39149ryp8",
              }),{}
            )
            .then(res => {
              if(res.code==0){
                that.result=res.result;
                console.log(res.result.cates.length)
                for(var i=0;i<res.result.cates.length;i++){
                  //console.log(res.result.cates[i].level)
                  if(res.result.cates[i].level==1){
                    this.levelOne.push(res.result.cates[i])
                  }
                }
              }else{
                Toast(res.msg)
              }
            });


            //推荐品牌
            axios
            .post(
              "recommendedBrand",
              qs.stringify({
                categoryId: -1,
                moduleType: 2,
                k: "418,419,420",
                jtoken: "gdxyv017gnok6ekhs5ylna"
              }),{}
            )
            .then(res => {
              this.isLoading=true
              if(res.code==0){
                this.recommendedBrandData=res.result.banners[420]
              }else{
                Toast(res.msg)
              }
            });

          },
          jupmListPage(catId,catLevel){
            this.$router.push('/shopListPage/'+catId+"/"+catLevel);
          },
          //搜索列表
          searchLi(){
            if(this.searchText==""){
              Toast("请输入收索关键字!")
            }else{
              this.$router.push('/shopListPage/'+this.searchText+"/"+7);
            }
          },
          //大牌跳转
          majorSuitJump(target){
            this.$router.push('/shopListPage/'+target+"/"+9);
          },
        },
        created: function () {
          this.isLoading=false
          this.classificationFunction()
        }

    }
</script>
<style scoped>
.header {
    z-index: 2;
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
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.search-wrap {
    margin: 0 8px;
    padding: 8px 0;
    overflow: hidden;
}
.search-wrap .search-box {
    position: relative;
    height: 29px;
    line-height: 29px;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
}
.search-wrap .icon-search {
    left: 0;
}
.search-wrap .icon-search, .search-wrap .icon-wrap {
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 29px;
}
.search-wrap .icon-search {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/category_search.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
}
.search-wrap input[type=text] {
    background-color: #f4f4f4;
}
.search-wrap .search-input {
    width: 100%;
    height: 29px;
    line-height: normal;
    padding: 4px 4px 4px 30px;
    border-radius: 4px;
}
.search-wrap .icon-wrap {
    right: 0;
}
.search-wrap .icon-close {
    display: inline-block;
    width: 14px;
    height: 14px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    vertical-align: middle;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon-search-delete.png);
    background-repeat: no-repeat;
    background-size: cover;
}

  button, input, input[type=password], input[type=button], input[type=reset], input[type=submit], input[type=text], textarea{
    -webkit-appearance: none;
  }
  input[type=password], input[type=search], input[type=text], input[type=tel] {

    color: #666;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
  }
 


  body, button, input, select, textarea {
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
  }

.all-cart{
  /* margin-top: 45px; */
}
#classify{
    margin-bottom: 52px;
}
.title {
    height: 38px;
    line-height: 38px;
    padding: 0 4%;
}
.fb, .grid .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.category-wrap {
    background-color: #fff;
}
.category-wrap .list {
    width: 100%;
}
.category-wrap .item {
    display: inline-block;
    padding: 1% 3%;
    font-size: 14px;
    text-align: center;
    width: 25%;
}
.category-wrap .item img {
    display: block;
    min-height: 70px;
    margin: auto;
    width: 70%;
    max-width: 100%;
    vertical-align: middle;
}
.category-wrap .item strong {
    display: block;
    padding-top: 2px;
    font-weight: 400;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.brand-wrap {
    padding: 0 2%;
    margin-bottom: 10px;
    background-color: #fff;
}
.brand-wrap .list {
    width: 100%;
}

.brand-wrap .item {
    display: inline-block;
    padding: 2% 1%;
}
.brand-wrap .item a {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border: 1px solid #e5e5e5;
    overflow: hidden;
}
a:active, a:hover {
    outline: 0;
}
a:hover {
    text-decoration: none;
}
.brand-wrap .item{
  width: 25%;
}
.brand-wrap .item img {
    display: block;
    min-height: 69px;
    width: 100%;
    margin: auto;
}
</style>
