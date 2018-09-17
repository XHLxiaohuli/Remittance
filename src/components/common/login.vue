<template>
    <div id="login">

      <div class="login-content">
        <div class="login-title">
          <img src="../../../static/images/fanhui.png" @click="fanhuiuppage"/>
          登录
          <span class="registbtn" @click="topregistbtn">注册</span>
        </div>
          <div class="logoshow">
              <img class="logoPic" src="http://unesmall.b0.upaiyun.com/ysh/ysh_logo.png">
              <p>优尚汇</p>
          </div>
          <div class="zhanghaoxinxi">
            <div class="label">
                 <img src="../../../static/images/shojihao.png"/>
                  <input type="tel" class="iphone" v-model="loginiphone" placeholder="请输入手机号"/>
            </div>
            <div class="label">
              <img src="../../../static/images/mima.png"/>
              <input type="password" class="iphone" v-model="loginpsw" placeholder="请输入登录密码"/>
            </div>
          </div>
          <div class="wangjimima">
            忘记密码?
          </div>

          <button :disabled="loginDis" class="denglubtn"  @click="goLogin">立 即 登 录</button>
          <div class="disanfangwrap" v-if="false">
            <div class="disanfangtitle">
              <div class="text">第三方账号快速登录</div>

            </div>
          </div>
          <div class="disanfangname">
              <div class="weixin" v-if="false">
                <img src="../../../static/images/weixin.png"/>
                <div>微信登录</div>
              </div>
            <div class="qq" v-if="false">
              <img src="../../../static/images/qq.png"/>
              <div>QQ登录</div>
            </div>
          </div>
      </div>

      <div class="regist-content" id="regist-content">
        <div class="login-title">
           <img src="../../../static/images/fanhui.png" @click="zhuxiaoZhucepage"/>
            注册
        </div>
          <div class="zhucexinxi" id="zhucexinxi" style="display: block">
              <div class="label shoujihao">
                  <input placeholder="请输入手机号码" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="registiphone"/>
              </div>

            <div class="label registJiaoyanMa" v-if="registiphoneyanzheng">
                  <div class="jiaoyanma">
                    <input placeholder="请输入验证码" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="4" v-model="registJiaoyanMa"/>
                  </div>
                  <div class="qrcodeimg"  @click="sendYanzhengma">
                    <button @click="getCode(formData)" class="code-btn" :disabled="!show">
                      <span v-show="show">获取验证码</span>
                      <span v-show="!show" class="count">{{count}} s</span>
                    </button>
                  </div>

            </div>
            <div class="label setpsw" v-if="registJiaoyanMayanzheng">
              <div>
                <input type="text" v-model="registpsw" placeholder="密码必须为6-18位字母、数字"/>
              </div>

            </div>

            <button :disabled="regDisabled" v-if="" class="dianjiregist" :class="registparamOk ? 'registparamOk' : '' " @click="goregist">注册</button>


          </div>

      </div>


    </div>
</template>
<script>
  import { Toast  } from 'mint-ui'
  const TIME_COUNT = 60;
  var apis=require('../../plugins/api')
  import axios from "../../utils/axios";
  import qs from "qs";
    export default {
        name: 'App',
        data() {
            return {
              formData: {
                code:'',
              },
              show: true,
              count: '',
              timer: null,
              //注册手机号
              registiphone:'',
              //注册手机号验证格式是否正确
              registiphoneyanzheng:false,
              //注册校验码(短信验证码)
              registJiaoyanMa:'',
              //注册校验码(短信验证码)验证格式是否正确
              registJiaoyanMayanzheng:false,
              //注册密码
              registpsw:'',
              //注册密码验证格式是否正确
              registpswyanzheng:false,
              //注册所有参数是否正确 正确改变注册按钮显示颜色
              registparamOk:false,
              loginiphone:'',
              loginpsw:'',
              loginparamOk:false,
              loginDis:false,//控制登录按钮重复提交
              regDisabled:false,//控制注册按钮重复提交

            }
        },
      created: function () {

        // console.log(apis.commonapi.checkMobile)




      },
      methods: {

        //手机号码正则表达式
        isPoneAvailable:function (str) {
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(str)) {
            return false;
          } else {
            return true;
          }

        },
        //验证码正则表达式
        isregistJiaoyanMa:function (str) {
          var myreg=/^\d{4,}$/;
          if (!myreg.test(str)) {
            return false;
          } else {
            return true;
          }

        },
        //密码正则表达式
        isregistpsw:function (password) {
          var str = password;
          if (str == null || str.length < 8) {
            return false;
          }
          var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
          if (reg.test(str))
            return true;

        },
        //返回上一个路由
        fanhuiuppage:function () {
          this.$router.go(-1);
        },
        //登录页面 顶部 注册按钮
        topregistbtn:function () {
          $(".login-content").hide()
          $(".regist-content").show()
          $(".regist-content").addClass('animated fadeInUpBig')
        },
        //注册页面 返回按钮
        zhuxiaoZhucepage:function () {
          $(".regist-content").hide()
          $(".login-content").show()
          $(".login-content").addClass('animated fadeInUpBig ');
        },
        // 60s倒计时
        getCode:function(formData){
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        },
        //发送短信验证码
        sendYanzhengma:function () {
          // var formData = new FormData();
          // formData.append("mobile",this.registiphone );
          // formData.append("act",'send' );


          // var that=this;
          // $.ajax({
          //   type: 'post',
          //   url:apis.commonapi.checkMobile,
          //   processData: false,
          //   contentType: false,
          //   data: formData,
          //   xhrFields: { withCredentials: true },
          //   success: function (data) { //返回json结果
          //     console.log(data.code)
          //     if(data.code==0){
          //       console.log("获取到手机验证码了")

          //     }
          //   }
          // });

          axios
          .post(
            "userResObtainCode",
            qs.stringify({
             mobile:this.registiphone,
             act:'send'
            }),{}
          )
          .then(res => {
            if(res.code==0){
              Toast("短信已发送")
            }else{
              Toast("请稍后重试")
            }
          });

        },
        //点击注册
        goregist:function () {
          this.regDisabled=true//点击一次之后控制注册按钮重复提交


          if(this.registparamOk){
            // console.log("3231");

            // var formData = new FormData();
            // formData.append("mobile",this.registiphone );
            // formData.append("checkNO",this.registJiaoyanMa );
            // formData.append("act",'check' );


            // var that=this;
            // $.ajax({
            //   type: 'post',
            //   url:apis.commonapi.checkMobile,
            //   processData: false,
            //   contentType: false,
            //   data: formData,
            //   xhrFields: { withCredentials: true },
            //   success: function (data) { //返回json结果

            //     var formData = new FormData();
            //     formData.append("mobile",that.registiphone );
            //     formData.append("pswd",that.registpsw );

            //     if(data.code==0){
            //       console.log("手机验证码正确")

            //       $.ajax({
            //         type: 'post',
            //         url:apis.commonapi.regist,
            //         processData: false,
            //         contentType: false,
            //         data: formData,
            //         xhrFields: { withCredentials: true },
            //         success: function (data) { //返回json结果

            //           if(data.code==0){
            //             Toast('注册成功');
            //             $(".regist-content").hide();
            //             $(".login-content").show();
            //             $(".login-content").addClass('animated fadeInUpBig ');
            //           }else {
            //             Toast(data.msg);
            //           }
            //         }
            //       })



            //     }else {
            //       Toast('手机验证码错误');
            //     }

            //   }
            // });


          var that=this;
          //先访问获取验证码接口
          axios
          .post(
            "userResObtainCode",
            qs.stringify({
            mobile:this.registiphone,
            checkNO:this.registJiaoyanMa,
            act:"check",
            }),{}
          )
          .then(res => {
            if(res.code==0){
              //验证码接口返回成功后，访问注册接口，别问我为什么这样，我也不知道，之前的前端写的，我没看懂也没开发文档就改了请求方式
              axios
              .post(
                "userRegister",
                qs.stringify({
                 mobile:that.registiphone,
                 pswd:that.registpsw,
                }),{}
              )
              .then(res => {
                if(res.code==0){
                  Toast('注册成功');
                  $(".regist-content").hide();
                  $(".login-content").show();
                  $(".login-content").addClass('animated fadeInUpBig ');
                }else{
                  Toast(res.msg)
                }
              });

            }
          });


          }
          //5秒之后可以再次提交
          setTimeout(()=>{
            this.regDisabled=false
          },5000)

        },
        goLogin:function () {
          this.loginDis=true//控制重复提交
          if(this.loginiphone=='' && this.loginpsw==''){
            Toast('手机号和密码不能为空');
          }else {
            if(this.loginiphone==''){
              Toast('手机号不能为空');
            }
            if(this.loginpsw==''){
              Toast('密码不能为空');
            }
          }
          if(this.loginiphone!='' && this.loginpsw!=''){
                this.loginparamOk=true
          }
          if(this.loginparamOk){
            var that=this;
            // var formData = new FormData();
            // formData.append("m",this.loginiphone );
            // formData.append("p",this.loginpsw );


            // var that=this;
            // $.ajax({
            //   type: 'post',
            //   url:apis.commonapi.login,
            //   processData: false,
            //   contentType: false,
            //   data: formData,
            //   xhrFields: { withCredentials: true },
            //   success: function (data) { //返回json结果

            //     if(data.code==0){
            //       Toast("登录成功")
            //       localStorage.loginstatus=true;
            //       that.$router.push('/usercenter')




            //     }

            //   }
            // });
            axios
            .post(
              "userLogin",
              qs.stringify({
                m:this.loginiphone,
                p:this.loginpsw
              }),{}
            )
            .then(res => {
              if(res.code==0){
                Toast("登录成功")
                localStorage.loginstatus=true;
                localStorage.navselect='tab4';
                that.$router.push('/usercenter')
              }else{
                Toast(res.msg)
              }
            });



          }

          //5秒钟后可以再次提交
          setTimeout(()=>{
            this.loginDis=false
          },5000)

        }
      },
      watch:{
        //监听手机号码格式是否正确，正确则registiphoneyanzheng=true
        registiphone(val, oldVal){
          // console.log("新数据"+val);

          if(this.isPoneAvailable(this.registiphone)){
            this.registiphoneyanzheng=true;


          }else {
            this.registiphoneyanzheng=false;
            this.registJiaoyanMayanzheng=false
          }

        },
        //监听验证码格式是否正确，正确则registJiaoyanMayanzheng=true
        registJiaoyanMa(val, oldVal){

          if(this.isregistJiaoyanMa(this.registJiaoyanMa)){
            this.registJiaoyanMayanzheng=true
          }else {
            this.registJiaoyanMayanzheng=false
          }

        },
        //监听密码格式是否正确，正确则registpswyanzheng=true
        registpsw(val, oldVal){
          if(this.isregistpsw(this.registpsw)){
            this.registpswyanzheng=true
          }else {
            this.registpswyanzheng=false
          }
          //如果 手机号、验证码、密码 格式都正确  则registparamOk=true   注册按钮颜色改变  可以发送注册接口
          if(this.isregistpsw(this.registpsw) && this.registJiaoyanMayanzheng && this.registiphoneyanzheng){
            this.registparamOk=true
          }else {
            this.registparamOk=false
          }

        },
        loginiphone(val, oldVal){

        },
        loginpsw(val, oldVal){

        }

      }
    }
</script>
<style scoped>
  .setpsw{
    margin-top: 15px;
  }
  .setpsw input{
    width: 100%;
    height: 39px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #cccccc;
    font-family: 微软雅黑;
    text-indent: 10px;
  }
    .setloginpsw_content{
      padding: 30px 30px 0;
    }
    .code-btn{
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 5px;
    }
    .zhucexinxi .qrcodeimg{
      border-radius: 5px;
    }
    .login-title{
      height:50px;
      line-height: 50px;
      background-color: #ffffff;

      width: 100%;
      text-align: center;
      font-size: 16px;
      /*box-shadow: 10px 10px ;*/
      z-index: 666;
      box-shadow: 0px 5px 5px -3px #cccccc;
      position: relative;
    }
    #setloginpsw .login-title{
      height:50px;
      line-height: 50px;
      background-color: #ffffff;

      width: 100%;
      text-align: center;
      font-size: 16px;
      /*box-shadow: 10px 10px ;*/
      z-index: 666;
      box-shadow: 0px 5px 5px -3px #cccccc;
      position: relative;
    }
    .login-title img{
      position: absolute;
      left: 5px;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      margin: auto;
      top: 0;
      bottom: 0;
    }
    #setloginpsw .login-title img{
      position: absolute;
      left: 5px;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      margin: auto;
      top: 0;
      bottom: 0;
    }
  .registbtn{
    position: absolute;
    right: 10px;
  }
  .login-content,.regist-content{
    width: 100%;
    height: 100%;
    /* position: absolute;
    top: 0; */
    z-index: 66;
    box-sizing: border-box;
    background-color: #ffffff;
  }


  .logoshow{
    width: 100%;
    text-align: center;
    padding-top:23px;
  }
  .logoshow p{
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 微软雅黑;
  }

  .wangjimima{

    padding: 0 10%;
    text-align: right;
    margin:15px 5px 10px 0px;
    font-family: 微软雅黑;
  }
  .zhanghaoxinxi .label{
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fb4e90;
    padding-bottom: 5px;
  }
    .zhanghaoxinxi .label input{
      border: none;
      outline: none;
      height: 30px;
      width: 80%;
      text-indent: 4px;
    }
    .zhanghaoxinxi .label:nth-child(2){
      margin-top: 5px;
    }

    .zhanghaoxinxi .label img,.zhanghaoxinxi .label input{
      vertical-align: middle;
    }
    .zhanghaoxinxi{
      padding-top: 20px;
    }
  .zhanghaoxinxi,.denglubtn,.disanfangname{
    width: 80%;
    margin: 0 10%;
  }
    .disanfangtitle{
      width: 70%;
      margin: 0 15%;
    }
  .denglubtn{
    margin-top: 10px;
    border-radius: 25px;
    border: none;
    height: 47px;
    font-size: 18px;

    font-weight: bolder;
    color: #ffffff;
    outline: none;
    background-color: #fb4e90;
  }
  .dianjiregist{
    margin-top: 20px;
    border-radius: 25px;
    border: none;
    height: 40px;
    font-size: 18px;
    font-weight: bolder;
    color: #ffffff;
    outline: none;
    width: 100%;
  }
  .disanfangtitle{
    height: 10px;
    /*line-height: 10px;*/
    position: relative;
    font-family: 微软雅黑;
    color: #666666;

    border-bottom: 1px solid #cccccc;
  }
  .disanfangtitle .text{
    width: 50%;
    background-color: #ffffff;
    position: absolute;
    left: 25%;
    text-align: center;

  }
  .disanfangwrap{
    padding: 25px 0;
  }
  .disanfangname .weixin,  .disanfangname .qq{
    width: 50%;
    text-align: center;
    float: left;
  }

  .zhucexinxi{
    padding-left: 30px;
    padding-right: 30px;

  }
  .zhucexinxi{
    margin-top: 40px;
  }

    .zhucexinxi .label{
      width: 100%;
      height: 39px;

    }
    .zhucexinxi .label:nth-child(2){
      margin-top: 15px;
    }
    .zhucexinxi .shoujihao{
      border: 1px solid #cccccc;
      box-sizing: border-box;
    }

    .zhucexinxi .shoujihao input{
      width: 95%;
      height: 34px;
      border: none;
      outline: none;
      margin-top: 2px;
      margin-left: 4px;

    }
    .zhucexinxi .shoujihao input,.zhucexinxi .jiaoyanma input{
      font-family: 微软雅黑;
      text-indent: 10px;
    }
    .zhucexinxi .jiaoyanma{
      width: 62%;
      height: 100%;
    }
    .zhucexinxi .jiaoyanma input{
      width: 100%;
      height: 95%;
      border: none;
      outline: none;
      border: 1px solid #cccccc;
    }
    .zhucexinxi .qrcodeimg{
      width: 30%;
      height: 100%;
      line-height: 39px;
      /*border: 1px solid #cccccc;*/
      text-align: center;
    }

    .zhucexinxi .jiaoyanma{
      float: left;
    }
    .zhucexinxi .qrcodeimg{
      float: right;
    }


    .regist-content{
       opacity: 0;
      display: none;
    }
    #setloginpsw{
      display: none;
      overflow: hidden;
    }
    /*.login-content{*/
        /*z-index: ;*/
    /*}*/
    .qrcodeimg img{
      width: 100%;
      height: 100%;
    }
    .registparamOk{
      background-color: #fb4e90;
    }
    #setloginpsw{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 66;
    }
    .logoPic{
      width: 82px;
    }
</style>
