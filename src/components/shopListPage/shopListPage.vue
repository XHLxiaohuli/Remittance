<template>
    <section class="page" id="listPage">
        <shopListHeader ref="childMou" @querySearch="querySearchTow" @risePrice="changeRisePrice" @dropPrice="changeDropPrice" @binSalesvolumeUp="salesvolumeUp" @binSalesvolumeDown="salesvolumeDown" @binBrand="brandFunction" @binCategory="categoryFunction"></shopListHeader>

        <div class="page-content">
            <div class="page-list-tabs">
                <div class="page-tabs-content">
                    <div class="page-tabs-panel wl-nexter">
                        <v-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                        <ul class="goods-list">
                            
                                <li class="goods" v-for="(item,index) in shopListData" >
                                    <div class="listimg" @click="jumpDetails(item.itemId)">
                                        <img :src="item.pics.split(';')[0]" style="opacity: 1;" alt="">
                                    </div>
                                    <div class="goods-info">
                                        <h1>
                                            <span class="title">{{item.title}}</span>
                                        </h1>
                                        <p>
                                            <span v-if="item.activtyPrice===undefined" class="price">{{item.price/100}}</span>
                                            <span v-if="item.activtyPrice!==undefined" class="price">{{item.activtyPrice/100}}</span>
                                            <span class="refprice">{{item.refPrice/100}}</span>
                                            <span class="discount " v-if="item.activtyPrice===undefined">{{((item.price / item.refPrice) * 10).toFixed(1)}}折</span>
                                            <span class="discount " v-if="item.activtyPrice!==undefined">{{((item.activtyPrice / item.refPrice) * 10).toFixed(1)}}折</span>
                                        </p>
                                        <div class="soldnum">
                                            <!-- <div v-if="(item.activtyBaseSoldQuantity===undefined)" :style="'width:'+item.soldCnt/item.itemNum*100+'%'"></div> -->
                                            <div v-if="item.activtyBaseSoldQuantity!==undefined" :style="'width:'+item.activtyBaseSoldQuantity/item.itemNum*100+'%'"></div>
                                            <div v-if="(item.activtyBaseSoldQuantity===undefined)" :style="'width:'+Math.ceil((((parseInt(item.baseSoldQuantity) + parseInt(item.soldCnt))* parseInt(item.multiple))/(parseInt(item.baseSoldQuantity) + parseInt(item.itemNum) + parseInt(item.soldCnt))* parseInt(item.multiple))*100)+'%'"></div>
                                            <p v-if="item.activtySoldCnt===undefined">已售{{item.baseSoldQuantity+item.soldCnt}}件</p>
                                            <p v-if="item.activtySoldCnt!==undefined">已售{{item.activtySoldCnt+item.activtyBaseSoldQuantity}}件</p>
                                        </div>
                                        <a class="add-cart " :class="{iconSoldOut:(item.activtyStatus==0)||(item.activtyStatus==2)}" @click="addCard(item.activtyStatus,item.itemId)"></a>
                                    </div>
                                    <div class="goods-flag" v-show="item.isTaxFree==1">
                                        <img src="http://unesmall.b0.upaiyun.com/common/images/icon_label_dutyFree.png" class="flag-taxFree" alt=""><!--免不免税-->
                                    </div>
                                </li>
                            
                        </ul>
                        </v-loadmore>
                    </div>
                </div>
            </div>
        </div>


        <!--品牌和品类数据弹框start-->
        <div id="sortPage" class="wl-trans-dialog sortBrandsList translate-viewport" v-show="isBlockBrand">
            <section class="header">
                <div class="content navbars">
                    <div class="btn-navbar navbar-left" @click="closeBrand">取消</div>
                    <div class="navbar-main">{{tostText}}</div>
                </div>
            </section>
            <div class="grid">
                <!--品牌start-->
                <ul class="sortMain " v-if="brandIf">
                    <li class="col theAll">
                        <span class="ellipsis" :class="{activess:brandName=='allBrand'}" @click="allBrandClick">全部</span>
                    </li>
                    <li class="col theAll" v-for="(item,index) in brandData">
                        <span class=" ellipsis" :class="{activess:item.name==brandName}" @click="addBrand(item.id,item.name)">{{item.name}}</span><!--active-->
                    </li>
                </ul>
                <!--品牌end-->
                <!--品类start-->
                <ul class="sortMain " v-if="categoryIf">
                    <li class="col theAll">
                        <span class="ellipsis" :class="{active:brandName=='allBrand'}" @click="allBrandClick">全部</span>
                    </li>
                    <li class="col theAll" v-for="(item,index) in categoryData">
                        <span class=" ellipsis" :class="{active:item.name==brandName}" @click="addCategory(item.name)">{{item.name}}</span><!--active-->
                    </li>
                </ul>
                <!--品类start-->
            </div>
            <footer>
                <a class="sortBrandBtn" @click="selectCompletion">完成</a>
            </footer>
        </div>
        <!--品牌数据弹框end-->

        <bufferPage v-if="!(isLoading)"></bufferPage>
    </section>
   
</template>
<script>
    import { Toast  } from 'mint-ui'
    import {Loadmore} from "mint-ui"
    import axios from "../../utils/axios";
    import qs from "qs";
    import bufferPage from '../bufferPage/bufferPage'
    import shopListHeader from '../shopListPage/shopListHeader'
    export default{
        name:"shopListPage",
        components:{
            shopListHeader,
            'v-loadmore':Loadmore,
            bufferPage
        },
        data(){
            return{
                isLoading:true,
                allLoaded:false,
                dataCode:"",
                noData:true,
                listPg:0,
                listSz:10,
                queryId:this.$route.params.catId,
                brandId:"",//品牌ID
                cateLevel:this.$route.params.catLevel,
                oCol:"",//排序字段 1、权重 2、价格 3、销售数量
                stype:"",//排序类型 1、降序 2、升序
                isBlockBrand:false,//是否显示品牌弹框
                brandData:"",//品牌渲染数据
                categoryData:"",//品牌渲染数据
                brandName:"allBrand",
                tostText:"",
                brandIf:false,
                categoryIf:false,
                shopListData:[],//商品列表数据
            }
        },
        created(){
            this.isLoading=false
            this.pullShopList()
        },
        methods:{
            loadBottom(){
                this.$refs.loadmore.onBottomLoaded();
                if(this.dataCode==0){
                    this.listPg++
                    this.pullShopList();
                }
            },
            pullShopList(){
                this.isLoading=false
                if(this.cateLevel==7){
                    this.searchQuery()
                }else if(this.cateLevel==9){
                    this.queryId=""
                    this.cateLevel=""
                    this.brandId=this.$route.params.catId
                    this.directQuery()
                }else{
                    this.directQuery()
                }
            },
            //搜索查询
            searchQuery(){
                this.isLoading=false
                axios
                .post(
                "searchItems",
                qs.stringify({
                    q:this.queryId,
                    orderColumn:"",
                    sortType:"",
                    pg: this.listPg,
                    sz: this.listSz,
                }),{}
                )
                .then(res => {
                    console.log(res.result.items.length)
                    this.isLoading=true
                if(res.code==0){
                    if(res.result.items.length!=0){
                        for(var j=0;j<res.result.items.length;j++){
                            this.shopListData.push(res.result.items[j])
                        }
                        // this.shopListData=res.result.items
                        this.dataCode=res.code
                    }else{
                        Toast('不存在"'+this.queryId+'"商品')
                        this.cateLevel="",
                        this.queryId="",
                        this.directQuery()
                    }
                    
                }else if(res.code==32){
                    this.dataCode=32
                    Toast(res.msg)
                }else{
                    Toast(res.msg)
                }
                if(this.listPg==0){
                    if(res.code==400){
                        this.noData=false
                    }
                }    
                });
            },
            //直接查询
            directQuery(){
                this.isLoading=false
                axios
                .post(
                "shopList",
                qs.stringify({
                    cateId:this.queryId,
                    brandId: this.brandId,//品牌ID
                    cateLevel:this.cateLevel,
                    orderColumn:this.oCol,//排序字段 1、权重 2、价格 3、销售数量
                    sortType:this.stype,//排序类型 1、降序 2、升序
                    pg: this.listPg,
                    sz: this.listSz,
                }),{}
                )
                .then(res => {
                    console.log(res)
                    this.isLoading=true
                if(res.code==0){

                    for(var j=0;j<res.result.items.length;j++){
                        this.shopListData.push(res.result.items[j])
                    }
                    // this.shopListData=res.result.items
                    this.dataCode=res.code
                }else if(res.code==32){
                    this.dataCode=32
                    Toast(res.msg)
                }else{
                    Toast(res.msg)
                }
                if(this.listPg==0){
                    if(res.code==400){
                        this.noData=false
                    }
                }    
                });
            },
            //价格升序排序
            changeRisePrice(msg){
                console.log(msg)
                this.stype=msg
                this.oCol=2
                this.listPg=0
                this.shopListData=[]
                this.pullShopList()
            },
            //价格降序排序
            changeDropPrice(msg){
                console.log(msg)
                this.stype=msg
                this.listPg=0
                this.shopListData=[]
                this.oCol=2
                this.pullShopList()
            },
            //销量升序排列
            salesvolumeUp(msg){
                console.log(msg)
                this.stype=msg
                this.listPg=0
                this.shopListData=[]
                this.oCol=3
                this.pullShopList()
            },
            //销量降序排序
            salesvolumeDown(msg){
                console.log(msg)
                this.stype=msg
                this.listPg=0
                this.shopListData=[]
                this.oCol=3
                this.pullShopList()
            },
            //选择品牌触发
            brandFunction(){
                this.tostText="品牌"
                this.brandIf=true
                this.categoryIf=false
                this.isBlockBrand=true
                axios
                .post(
                "shopListBrand",
                qs.stringify({
                    cateId: this.$route.params.catId,
                    cateLevel: this.$route.params.catLevel,
                }),{}
                )
                .then(res => {
                if(res.code==0){
                  console.log(res)
                  this.brandData=res.result.brands
                }else{
                    Toast(res.msg)
                }
                });
            },
            //搜索查询
            querySearchTow(msg){
                if(msg==""){
                    Toast("请输入搜索关键字!")
                }else{
                    this.queryId=msg
                    this.cateLevel=7
                    this.shopListData=[]
                    this.searchQuery()
                }
                
            },
            //关闭品牌弹框
            closeBrand(){
                this.isBlockBrand=false
            },
            allBrandClick(){
                this.brandName="allBrand"
            },
            //保存选择产品id并添加class
            addBrand(brandId,name){
                this.brandName=name
                this.brandId=brandId
            },
            //选择品类触发
            categoryFunction(){
                this.tostText="品类"
                this.brandIf=false
                this.categoryIf=true
                this.isBlockBrand=true
                axios
                .post(
                "shopListCategory",
                qs.stringify({
                    cateParentId: this.$route.params.catId,
                    level: 3,
                    brandId: this.brandId
                }),{}
                )
                .then(res => {
                if(res.code==0){
                  console.log(res)
                  this.categoryData=res.result.cates
                }else{
                    Toast(res.msg)
                }
                });
            },
            //保存选择品类添加class
            addCategory(name){
                this.brandName=name
            },
            //关闭弹框并访问后台数据
            selectCompletion(){
                this.isBlockBrand=false
                this.listPg=0
                this.shopListData=[]
                if(this.brandIf){
                    this.pullShopList()
                }else if(this.categoryIf){
                    this.cateLevel=3
                    this.pullShopList()
                }
                
            },
            //加入购物车
            addCard(isCard,shopId){
                if(localStorage.getItem('loginstatus')==null||localStorage.getItem('loginstatus')==undefined||localStorage.getItem('loginstatus')==""){
                    Toast("")
                    this.$router.push('/login')
                }else{
                    var itemss="[{'item_id':"+shopId+",'num':"+1+"}]"
                    if((isCard!==0)&&(isCard!==2)){
                        axios
                        .post(
                        "addShopCard",
                        qs.stringify({
                            items: itemss,
                        }),{}
                        )
                        .then(res => {
                        if(res.code==0){
                        console.log(res)
                        Toast("加入购物车成功")
                        this.$refs.childMou.shopCare();
                            
                        } else if(res.code==1){
                            this.$router.push("/login");
                        }else{
                            Toast(res.msg)
                        }
                        });
                    }
                }
                
            },
            //跳转到详情页
            jumpDetails(baseItemId){
                this.$router.push("/commodityDetails/"+baseItemId);
            }
        }
    }
</script>
<style scoped>
.page, .page-content {
    position: absolute;
    /* top: 0; */
    left: 0;
    right: 0;
    /* bottom: auto; */
    margin: auto;
    width: 100%;
    height: 100%;
    background: #fff;
}
#sortPage {
    background-color: #fff;
}
.wl-trans-dialog {
    /* display: none; */
    position: fixed;
    z-index: 1;
    /* top: 0; */
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;
}
.translate-viewport {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    opacity: 1;
}
.header .content {
    border-bottom: 1px solid #e5e5e5;
}
.header .navbars {
    position: fixed;
    height: 45px;
    width: 100%;
    line-height: 45px;
    text-align: center;
    background: #fff;
}
.header .navbar-left {
    left: 0;
}
.header .btn-navbar {
    position: absolute;
    /* top: 0; */
    height: 45px;
    width: 45px;
    z-index: 9;
}
.header .navbar-main {
    margin: 0;
    color: #2e2e2e;
    font-size: 16px;
}
#sortPage .grid {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 50px;
    display: flex;
}
#sortPage .sortMain {
    margin-top: 60px;
    width: 100%;
    /* overflow: hidden; */
}
#sortPage .sortMain:after{
content:".";
display:block;
height:0;
clear:both;
}
#sortPage .sortMain li {
    width: 33%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
}
#sortPage .sortMain li span.activess {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon_class_choose.png);
    background-position: right bottom;
    background-repeat: no-repeat;
    border:1px solid #fb4e90;
    color: #fb4e90;
    background-size: 20%;
    box-sizing: border-box;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#sortPage .sortMain li span {
    margin: 5px auto;
    border: 1px solid #e5e5e5;
    width: 90%;
    text-align: center;
    /* line-height: 34px; */
    display: block;
    padding:4%;
    box-sizing: border-box;
}
#sortPage footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 5px;
}
#sortPage footer a {
    width: 90%;
    margin: 0 auto;
    display: block;
    color: #fff;
    line-height: 44px;
    text-align: center;
    background-color: #fb4e90;
}
a:active, a:hover {
    outline: 0;
}
a:hover {
    text-decoration: none;
}


#listPage .page-content {
    padding: 80px 0 0;
    overflow-y: auto;
}
.page .page-content {
    color: #666;
    overflow: hidden;
    background-color: #f4f4f4;
}
.page-list-tabs {
    height: 100%;
    position: relative;
}
.page-tabs-content {
    height: 100%;
}
#listPage .page-tabs-panel {
    height: 100%;
    background-color: #fff;
}
.page-tabs-panel {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
}
.goods-list {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
.goods {
    position: relative;
    padding-bottom: 10px;
    /* min-height: 184px; */
    min-height: 257px;
    border-bottom: 1px solid #e5e5e5;
    width: 50%;
    float: left;
}
.goods:nth-child(n) {
    border-right: 1px solid #e5e5e5;
}
.goods .listimg {
    position: relative;
    min-height: 124px;
    min-width: 130px;
    margin: 0 auto;
    padding: 5%;
    overflow: hidden;
    line-height: 124px;
    text-align: center;
}
.goods .listimg img {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.goods .goods-info {
    position: relative;
    padding: 0 10px;
}
.goods h1 {
    color: #505050;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
}
.goods .title {
    margin-top: 5px;
}
.goods .price {
    color: #000;
    font-size: 14px;
    font-weight: 400;
}
.goods .price, .goods .refprice {
    line-height: 21px;
}
.goods .price:before {
    font-size: 1em;
    vertical-align: top;
}
.money:before, .price:before {
    content: '￥';
    vertical-align: middle;
}
.goods .refprice {
    font-size: .7em;
    margin-left: .4em;
    margin-right: 3%;
    padding-right: 3%;
    position: relative;
}
.refprice {
    color: #626262;
    text-decoration: line-through;
    font-size: .8em;
}
.goods .refprice:before {
    content: "￥";
}
.goods .refprice:after {
    content: '';
    position: absolute;
    right: 0;
    /* top: 2px; */
    width: 1px;
    background-color: #626262;
    height: 9px;
    display: block;
}
.goods .discount {
    border: 1px solid #fb4e90;
    color: #fb4e90;
    font-size: .7em;
    padding: 0 1%;
}
.goods .soldnum {
    background-color: #afafaf;
    color: #fff;
    width: 70%;
    position: relative;
    overflow: hidden;
}
.goods .count, .goods .soldnum {
    min-width: 16px;
    min-height: 16px;
    border-radius: 8px;
    padding: 0 5px;
    text-align: center;
    color: #fff;
    font-size: 10px;
}
.goods .soldnum div {
    min-width: 0;
    border-radius: 8px;
    position: absolute;
    /* top: 0; */
    left: 0;
    height: 100%;
    width: 30%;
    background: #fb4e90;
}
.goods .soldnum p {
    position: relative;
}
.goods .add-cart {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/list_icon.png);
    background-size: 48px 320px;
    background-repeat: no-repeat;
    background-position: 0 0;
    width: 27px;
    height: 24px;
    position: absolute;
    /* top: auto; */
    left: auto;
    right: 10px;
    bottom: -5px;
    z-index: 0;
}
.goods .goods-flag {
    position: absolute;
    top: 0;
    left: 0;
}
.goods .flag-taxFree {
    width: 30px;
    max-width: 100%;
    vertical-align: middle;
    min-height: 10px;
}
.iconSoldOut {
    background-image: url(http://unesmall.b0.upaiyun.com/common/images/icon-cart-sold-out.png) !important;
    background-size: 30px 29px !important;
    background-repeat: no-repeat !important;
    background-position: 0 0 !important;
}
</style>