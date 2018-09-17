<template>
  <div id="shopcart">
    <section class="header">
      <div class="title-top">
        购物车({{shopcartData.length}})
      </div>
    </section>
    <headerFill></headerFill>
    <section id="cartPage">
      <div class="cartshoplist cart-item-list-layouts">
        <ul class="cartshoplistuls cart-item-lists grids" v-if="ifHasCard">
          <li class="lists" v-for="(item,index) in shopcartData">
            <div class="cart-items goods rows" >
              <div class="deletes"></div>
              <div class="goods-views rows">
                <div class="cols cols-3 fbs fvcs facs">
                  <div :class="{addCheckbox:item.isAddClass==1,noAddCheckbox:item.isAddClass!=1}" @click="whetherSelect(index)"></div><!--class="checkbox checked"-->
                </div>
                <div class="cols cols-5 fbs fvcs facs imgBoxs" @click="jumpDetailPage(item.baseItemId)"><!--class="col col-5 fb fvc fac imgBox"--><img
                  :src="item.pics.split(';')[0]">
                </div>
                <div class="cols cols-14 pls-10 fbs">
                  <div class="goods-infos"><h3 class="pbs-05">{{item.title}}</h3>
                    <div class="count-boxs"><a class="count-diff" @click="reduceNumber(index,item.itemId)">-</a><a class="counts">{{item.cartCount}}</a><a class="count-add" @click="addNumber(index,item.itemId)">+</a>
                    </div>
                  </div>
                </div>
                <div class="cols col-5 fbs fvcs">
                  <div class="pbs-05 Mon">
                    <del class="price pl-05">{{item.refPrice/100}}</del>
                    <span class="price goodsPrice" data-total="">{{item.price/100}}</span>
                    <div class="deleteIcon" @click="deleteProduct(index,item.itemId,item.cartCount,item.brandName)"></div>
                  </div>
                </div>
              </div>
            </div>

          </li>
        </ul>
        <ul v-if="!ifHasCard" class="cart-item-list grid">
          <li class="cart-empty">
            <img src="http://unesmall.b0.upaiyun.com//common/images/cart_empty.png" alt="">
            <div @click="goShopping">去逛逛</div>
          </li>
        </ul>
      </div>

    </section>

    <footer id="footer" class="grids show footer" v-if="ifHasCard">
      <div class="small-cart rows fvcs">
        <div class="cols cols-6 pls-10"><span class="all-select" :class="{allCheckbox:ifTrue==true,noAllCheckbox:ifTrue==false}" @click="ifAddAll"></span>全选</div><!--checkbox checked -->
        <div class="sumTotal cols cols-10"><span class="label">合计:</span><em class="price">{{cardAllPir}}</em><span
          class="diso hide">已优惠<b class="discountAll"></b></span></div>
        <div @click="jumpConfirmation" class="cols cols-9 enter fbs fvcs facs" href="">
          <div>结算<em class="sum-goods-count">({{allHowMany}})</em></div>
        </div>
      </div>
    </footer>
    <tabui></tabui>
    <div class="againConfirm" v-if="ifAgainConfirm">
      <div class="oneAgainConfirm">
        <p class="oneAgainConfirmText">{{delText}}</p>
        <div class="towAgainConfirm">
          <button @click="cancelDel">取消</button><button @click="determineDel">确定</button>
        </div>
      </div>
    </div>
    <bufferPage v-if="!(isLoading)"></bufferPage>
  </div>
</template>
<script>
  import tabui from '../common/tabui'
  import { Toast  } from 'mint-ui'
  import axios from "../../utils/axios";
  import qs from "qs";
  import bufferPage from '../bufferPage/bufferPage'
  import headerFill from '../headerFill/headerFill'
  export default {
    name: 'shopcart',
    components:{
          tabui,
          bufferPage,
          headerFill,
        },
    data() {
      return {
        msg: 'helloworld',
        isLoading:true,
        ifTrue:true,
        cardAllPir:0,
        allHowMany:0,
        shopcartData:[
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"2","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"3","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"2","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"8","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"2","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
          // {"isAddClass":1,"text":"DUP强力强粘性假眼睫毛胶水EX552防过敏透明款5ml支","number":"4","originalPrice":"99","afterFolding":"63","picUrl":"http://mikumine.b0.upaiyun.com/1/LTE=/SVRFTS1QVUJMSVNI/MA==/20151211/vNTT-0-1449801095946.jpg!300q75"},
        ],
        ifHasCard:true,
        ifAgainConfirm:false,
        delIndex:"",
        delShopId:"",
        elNumber:"",
        delText:"",
      }
    },
    created: function () {
      this.isLoading=false
      this.pullShopCart()
    },
    mounted: function () {
//      $("#footer").animate({bottom:"50px"})
    },
    methods:{
      //购物车点击增加减少按钮修改数量
      addAnDreduceNumber(commodityId,num){
        var itemss="[{'item_id':"+commodityId+",'num':"+num+"}]"
        axios
        .post(
          "addShopCard",
        qs.stringify({
            items: itemss,
        }),{})
        .then(res => {
          if(res.code==0){
            console.log(res)     
          }else{
            Toast(res.msg)
          }
        });
      },
      //购物车里购买数量减法
      reduceNumber(index,commodityIds){
        if(parseInt(this.shopcartData[index].cartCount)>0){
          this.addAnDreduceNumber(commodityIds,-1)
          this.shopcartData[index].cartCount=parseInt(this.shopcartData[index].cartCount)-1
          this.priceChange(2)
        }
      },
      //购物车里购买数量加法
      addNumber(index,commodityIds){
        this.addAnDreduceNumber(commodityIds,1)
        this.shopcartData[index].cartCount=parseInt(this.shopcartData[index].cartCount)+1
        this.priceChange(2)
      },
      cancelDel(){
        this.ifAgainConfirm=false
      },
      determineDel(){
        this.ifAgainConfirm=false
        var itemsData='[{"item_id":'+this.delShopId+',"num":-'+this.delNumber+'}]'
        axios
        .post(
        "addShopCard",
        qs.stringify({
          items: itemsData
        }),{}
        )
        .then(res => {
          if(res.code==0){
                  console.log(res)
                  this.shopcartData.splice(this.delIndex, 1);
                  this.priceChange(1)
                  this.priceChange(2)
          }else{
            Toast(res.msg)
          }
        });
      },
      //购物车里删除功能
      deleteProduct(index,shopId,number,title){
        this.ifAgainConfirm=true
        this.delIndex=index
        this.delShopId=shopId
        this.delNumber=number
        this.delText="你确定删除该物品吗?"
        
      },
      //点击取消或勾上计算价格
      //start==1代表单个选择取消调用该方法，start==2代表加减调用该方法
      priceChange(start){
        if(start==1){
          var priceChanges=0
          var allHowManyChanges=0
          for(var i=0;i<this.shopcartData.length;i++){
              if(this.shopcartData[i].isAddClass==1){
                allHowManyChanges++
                priceChanges+=(this.shopcartData[i].price/100)*this.shopcartData[i].cartCount
              }
          }
          this.cardAllPir=priceChanges
          this.allHowMany=allHowManyChanges
        }else if(start==2){
          var priceChanges=0
          for(var i=0;i<this.shopcartData.length;i++){
              if(this.shopcartData[i].isAddClass==1){
                priceChanges+=(this.shopcartData[i].price/100)*this.shopcartData[i].cartCount
              }
          }
          this.cardAllPir=priceChanges
        }else if(start==3){
          var allArr=[]
          for(var i=0;i<this.shopcartData.length;i++){
              if(this.shopcartData[i].isAddClass==1){
                allArr.push('{"item_id":"'+this.shopcartData[i].itemId+'","num":"'+this.shopcartData[i].cartCount+'"}')
              }
          }
          return allArr
        }
        
      },
      //点击单个选取消选中或重新选中，判断下列全选要不要选上
      whetherSelect(index){
        if(parseInt(this.shopcartData[index].isAddClass)%2==0){
          this.shopcartData[index].isAddClass=1
          this.priceChange(1)
          for(var i=0;i<this.shopcartData.length;i++){
            if(this.shopcartData[i].isAddClass==1){
              this.ifTrue=true
            }else{
              return this.ifTrue=false
            }
          }
        }else{
          this.shopcartData[index].isAddClass=2
          this.priceChange(1)
          for(var i=0;i<this.shopcartData.length;i++){
            if(this.shopcartData[i].isAddClass==1){
              this.ifTrue=true
            }else{
              return this.ifTrue=false
            }
          }
        }
      },
      //下面全选按钮功能
      ifAddAll(){
        if(this.ifTrue){
          this.ifTrue=false
          for(var i=0;i<this.shopcartData.length;i++){
            this.shopcartData[i].isAddClass=2
            this.cardAllPir=0
            this.allHowMany=0
            console.log(this.shopcartData[i].isAddClass)
          }
        }else{
          this.ifTrue=true
          for(var i=0;i<this.shopcartData.length;i++){
            this.shopcartData[i].isAddClass=1
            this.pullShopCart()
            console.log(this.shopcartData[i].isAddClass)
          }
        }
      },
      //保留两位小数函数
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
      //获取购物车数据
      pullShopCart(){
        axios
        .post(
          "shopCartList",
        qs.stringify({
          // jtoken: "l54etjopnaab003eyqzneu"
        }),{})
        .then(res => {
            this.isLoading=true
             if(res.code==0){
              if(res.result.items!=undefined){
                  var carAllPrice=0
                  for(var i=0;i<res.result.items.length;i++){
                    res.result.items[i]["isAddClass"]=1
                    carAllPrice+=(res.result.items[i].price/100)*res.result.items[i].cartCount
                  }
                  this.shopcartData=res.result.items
                  this.cardAllPir=this.returnFloat(carAllPrice) 
                  this.allHowMany=res.result.items.length
                  this.ifHasCard=true
              }else{
                this.ifHasCard=false
              }
             }else if(res.code==1){
              this.$router.push("/login");
             }
             
             
        });
      },
      jumpDetailPage(baseItemId){
        this.$router.push("/commodityDetails/"+baseItemId);
      },
      jumpConfirmation(){
        var ordervalue="["+this.priceChange(3)+"]"
        this.$router.push("/confirmationOfOrder/"+ordervalue);
      },
      goShopping(){
        this.$router.push('/home');
        localStorage.navselect='tab1'
      },
      
    }
  }
</script>
<style scoped>


  @keyframes mymove
  {
    from {bottom:0px;}
    to {bottom:50px;}
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
    from {bottom:0px;}
    to {bottom:50px;}
  }

#footer{
  position: fixed;
  width: 100%;
  bottom: 50px;
  transition: mymove 0.3s ease;
  -webkit-animation:mymove 0.3s ease;

}
  address, caption, cite, code, dfn, em, th, var{
    font-style: normal;
    font-weight: 500;
  }
  .small-cart .enter div{
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_icon.png);
    background-size: 30px 210px;
    background-repeat: no-repeat;
    background-position: -7px -120px;
    height: 21px;
    padding-left: 20px;
  }
  .deleteBtn, .small-cart .enter{
    background-color: #fb4e90;
    height: 54px;
    color: #fff;
  }
  .grids .rows .cols.cols-9{
    width: 36%;
    -ms-flex: 36;
    -webkit-box-flex: 36;
    flex: 36;
  }
  b, strong{
    font-weight: 400;
  }
  .small-cart .discountAll{
    font-size: 14px;
    vertical-align: baseline;
  }
  .diso.hide{
    display: none!important;
  }
  .money:before, .price:before{
    content: '￥';
    vertical-align: middle;
  }
  address, caption, cite, code, dfn, em, th, var{
    font-style: normal;
    font-weight: 500;
  }
  .small-cart .price{
    font-size: 18px;
    color: #fb4e90;
    vertical-align: middle;
  }

  .small-cart .sumTotal .label{
    vertical-align: middle;
  }
  .small-cart .sumTotal{
    height: 34px;
    line-height: 34px;
  }
  .grids .rows .cols.cols-10{
    width: 40%;
    -ms-flex: 40;
    -webkit-box-flex: 40;
    flex: 40;
  }
  .checkbox:after{
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: block;
    -webkit-transition: background .5s;
    transition: background .5s;
  }
  .checkbox.checked:after{
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_selected.png);
    background-size: cover;
  }
  .small-cart .checkbox:after{
    background-color: transparent;
  }
  .small-cart .checkbox.checked:after{
    background-color: #fb4e90;
  }
  .checkbox{
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_unselected.png);
    background-size: cover;
  }
  .small-cart .checkbox{
    margin-right: .3em;
  }
  .pls-10{
    padding-left: 10px;
  }
  .grids .rows .cols{
    min-height: 1em;
  }
  .grids .rows .cols.cols-6{
    width: 24%;
    -ms-flex: 24;
    -webkit-box-flex: 24;
    flex: 24;
  }
  article, aside, blockquote, body, button, code, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, pre, section, td, textarea, th, ul{
    margin: 0;
    padding: 0;
  }
  .fvcs{
    align-items: center;
  }
  .small-cart{
    height: 54px;
    background-size: cover;
    background-color: #fff;
    font-size: 13px;
  }
  .fbs, .grids .rows{
    display: flex;
  }
  .show{
    display: block;
  }
  #cartPage footer.show{
    transform: translateY(0);
    opacity: 1;
  }
  #cartPage footer{
    transition: transform .3s,opacity .3s;
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    border-top: 1px solid #e5e5e5;
  }

  .cart-items .deleteIcon {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_delete.png);
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    background-size: 100%;
  }

  .money:before, .price:before {
    content: '￥';
    vertical-align: middle;
  }

  .cart-items .Mon span {
    color: #fb4e90;
    font-size: 16px;
    display: block;
  }

  .money:before, .price:before {
    content: '￥';
    vertical-align: middle;
  }

  del {
    text-decoration: line-through;
  }

  .pl-05, .pl-5 {
    padding-left: 5px;
  }

  .cart-items .Mon del {
    color: #7c7c7c;
    display: block;
  }

  .pbs-05 {
    padding-bottom: 5px;
  }

  .cart-items .Mon {
    margin: 0 auto;
  }

  .count-boxs a {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 22px;
    line-height: 30px;
    text-align: center;
  }

  a, ins {
    text-decoration: none;
  }

  a {
    -webkit-tap-highlight-color: transparent;
  }

  .count-boxs a {
    line-height: 30px;
    text-align: center;
    display: inline-block;
  }

  .count-boxs .counts {
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    width: 50px;
    font-size: 18px;
  }

  .count-boxs a {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 22px;
    line-height: 30px;
    text-align: center;
  }

  .count-boxs {
    width: 112px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    color: #7c7c7c;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 400;
  }

  .pbs-05 {
    padding-bottom: 5px;
  }

  .cart-items .goods-infos h3 {
    width: 100%;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
  }

  .cart-items .goods-infos {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .pls-10 {
    padding-left: 10px;
  }

  .grids .rows .cols.cols-14 {
    width: 56%;
    -ms-flex: 56;
    -webkit-box-flex: 56;
    flex: 56;
  }

  fieldset, img {
    border: 0;
  }

  .imgBoxs img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
  }

  .grid .row .cols {
    min-height: 1em;
  }

  .cart-items .goods-views .imgBoxs {
    border: 1px solid #e5e5e5;
    position: relative;
  }

  .grids .rows .cols.cols-5 {
    width: 20%;
    -ms-flex: 20;
    -webkit-box-flex: 20;
    flex: 20;
  }

  .fbs, .grids .rows {
    display: flex;
  }

  .cart-items {
    position: relative;
    margin-bottom: 5px;
  }

  .cart-items .goods-views {
    position: relative;
    background-color: #fff;
    padding: 10px 5px;
    -webkit-transition: -webkit-transform .3s;
    transition: transform .3s;
    overflow: hidden;
  }

  .grids .rows .cols.cols-3 {
    width: 12%;
    -ms-flex: 12;
    -webkit-box-flex: 12;
    flex: 12;
  }

  .grids .rows .cols {
    min-height: 1em;
  }

  .facs {
    align-items: center;
  }

  .cart-items .checkbox {
    border-color: #afafaf;
  }

  /* .checkbox {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_unselected.png);
    background-size: cover;
  }

  .checkbox.checked:after {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_selected.png);
    background-size: cover;
  } */

  /* .checkbox:after {
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: block;
    -webkit-transition: background .5s;
    transition: background .5s;
  } */

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

  .title-top {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #fff;
    font-size: 16px;
  }

  #cartPage {
    position: absolute;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    padding: 10px 0 114px;
    overflow-y: auto;
  }

  .cartshoplistuls li {
    display: flex;
    height: 111px;
  }

  .cartshoplistuls li .cart-items {
    width: 100%;
  }

.addCheckbox{
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_selected.png);
  background-size: cover;
  margin-left: 5px;
}
.noAddCheckbox{
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_unselected.png);
  background-size: cover;
  margin-left: 5px;
}
.allCheckbox{
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_selected.png);
  background-size: cover;
}
.noAllCheckbox{
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background-image: url(http://unesmall.b0.upaiyun.com/common/images/cart_checkbox_unselected.png);
  background-size: cover;
}
#cartPage .cart-empty {
    padding-top: 70px;
    text-align: center;
}
#cartPage .cart-empty img {
  display: block;
    margin: 0 auto;
    height: 140px;
}
img {
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
#cartPage .cart-empty div {
    display: inline-block;
    margin: 12px auto;
    height: 40px;
    line-height: 40px;
    padding: 0 5%;
    color: #fb4e90;
    border: 1px solid #fb4e90;
    text-align: center;
    font-size: 18px;
}
.againConfirm{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 20;
}
.oneAgainConfirm{
  width: 60%;
  height: 85px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: #f6f6f6;
  border-radius: 10px;
  overflow: hidden;
  border:1px solid #dfdfdf;
}
.oneAgainConfirmText{
  height: 50px;
  width: 100%;
  font-size: 15px;
  line-height: 50px;
  text-align: center;
}
.towAgainConfirm:after { clear:both;content:'';display:block;width:0;height:0;visibility:hidden; }
.towAgainConfirm{
  border-top:1px solid #dfdfdf;
  height: 35px;
  width: 100%;
  background: #fff;
}
.towAgainConfirm>button{
  width: 50%;
  height: 35px;
  border:0;
  background: #fff;
  box-sizing: border-box;
}
.towAgainConfirm>button:nth-child(1){
  border-right: 1px solid #dfdfdf;
}
</style>
