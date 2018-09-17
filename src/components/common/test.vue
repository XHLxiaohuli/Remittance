<template>
  <div id="myDiv">
    <!--<button @click="show = !show">点击我</button>-->
    <!-- 这里要加上 animated 才会有效果 (第一个是我自己写的类名，不用加，但是引入animate.css 需要在前面加animate) -->
    <!--<transition-->
      <!--leave-active-class="achange"-->
      <!--enter-active-class="animated hinge"-->
    <!--&gt;-->
      <!--<p v-if="show">看我的变化</p>-->
    <!--</transition>-->

  </div>
</template>
<script>
  import axios from "../../utils/axios";
  import qs from "qs";
  import { Toast  } from 'mint-ui'
    export default {
        name: 'App',
        data() {
            return {
                msg: 'helloworld',
                show:true
            }
        },
        methods:{
          //我也不知道这个接口是干什么的
          textFunction(){
            var that=this;
            axios
            .post(
              "textAddress",
              qs.stringify({
                k:"418,423,419,425,422,420,421",
                jtoken:"o2g0lne08le1w622bko0xm",
              }),{}
            )
            .then(res => {
              // console.log(res.code)
              
            });
          },
        },
        created: function () {




          // var formData = new FormData();
          // formData.append("k", "418,423,419,425,422,420,421");
          // formData.append("jtoken", "o2g0lne08le1w622bko0xm");
          // var that=this;
          // $.ajax({
          //   type: 'post',
          //   url: 'http://sp.mikumine.com/api/h/1.0/login.json',
          //   processData: false,
          //   contentType: false,
          //   data: formData,
          //   success: function (data) { //返回json结果

          //   }
          // });

          this.textFunction()


        },
    }
</script>
<style scoped>
  .achange{
    animation:Ado .5s ease-in;
  }
  @keyframes Ado{
    0%{transform:scale(0.5,0.5);}
    60%{transform:scale(1,1);}
    80%{transform:scale(1.5,1.5);}
    100%{transform:scale(1,1);}
  }
</style>
