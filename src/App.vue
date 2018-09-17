<template>
  <div id="app">
    <keep-alive include="classify,isAddress">
        <router-view/>
    </keep-alive>
    <!-- <tabui></tabui> -->
  </div>
</template>

<script>

//底部导航组件
// import tabui from './components/common/tabui'
var wgtVer=null;
import "./script/device";
//import "./script/device"
export default {
  name: 'App',
  data(){
    return {
      //some data
    
    }
  },
  // components:{
  //   tabui
  // },
  created: function () {
    console.log(localStorage.getItem('navselect'))
   // this.ifSystem()


  },
  methods:{
//     ifSystem(){
//         var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
//         var ratio = window.devicePixelRatio || 1;
//         var screen = {
//         width : window.screen.width * ratio,
//         height : window.screen.height * ratio
//         };
//         if (iOS && screen.width == 1242 && screen.height === 2208) {
//            this.ifIphoneX=true
//         alert('iPhone6sP Detected!');
//         }
//     },

    //some function

    plusReady(){

        plus.navigator.setStatusBarBackground("#FFF");
        plus.webview.currentWebview().setStyle({
            statusbar:{background:'#fff'},top:0,bottom: 0
    　　});
        plus.navigator.setStatusBarStyle('dark'); 
        plus.navigator.setFullscreen(false);
        // ......
        // 获取本地应用资源版本号
        var _this=this
        plus.runtime.getProperty(plus.runtime.appid,function(inf){
            wgtVer=inf.version;     
            _this.checkUpdate(); 
        });
    },

    checkUpdate(){
      var _this=this
      
      var checkUrl="http://umc.mikumine.com/h5/ver/version.txt";
//     plus.nativeUI.showWaiting("检测更新...");
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            switch(xhr.readyState){
                case 4:
                plus.nativeUI.closeWaiting();
                if(xhr.status==200){
                    var newVer=xhr.responseText;
                    //newVer = JSON.parse(newVer);
                    if(wgtVer&&newVer&&(wgtVer.substring(0,5) < newVer.substring(0,5))){
                      if(window.confirm('检测到更新,是否更新?')){
                          //this.downWgt(newVer.apk);  // 下载升级包
                          _this.isSystem()
                      }
                    }else{
                        // plus.nativeUI.alert("无新版本可更新！");
                    }
                }else{
                    // plus.nativeUI.alert("检测更新失败！");
                }
                break;
                default:
                break;
            }
        }
        xhr.open('GET',checkUrl);
        xhr.send();
    },


    downWgt(wgtUrl){
    var _this=this
        plus.nativeUI.showWaiting("下载更新文件...");
        plus.downloader.createDownload( wgtUrl, {filename:"_doc/updates/"}, function(d,status){
            if ( status == 200 ) { 
                _this.installWgt(d.filename); // 安装wgt包
            } else {
                plus.nativeUI.alert("下载失败！");
            }
            plus.nativeUI.closeWaiting();
        }).start();
    },


    installWgt(path){
        plus.nativeUI.showWaiting("安装更新文件...");
        plus.runtime.install(path,{},function(){
            plus.nativeUI.closeWaiting();
            plus.nativeUI.alert("应用资源更新完成！",function(){
                plus.runtime.restart();
            });
        },function(e){
            plus.nativeUI.closeWaiting();
            plus.nativeUI.alert("安装更新文件失败["+e.code+"]："+e.message);
            if(e.code == 10){
              console.log('请清除临时目录');
            }
        });
    
    },

    //判断为安卓还是ios
    isSystem(){
      var u = navigator.userAgent, app = navigator.appVersion;   
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
      if(isAndroid){
        this.downWgt("http://umc.mikumine.com/h5/ver/ysh.wgt");
      }else if(isiOS){
        this.downWgt("http://umc.mikumine.com/h5/ver/ysh.wgt");
        
      }
    }




  },
  mounted: function() {
    if(window.plus){
        this.plusReady();
    }else{
        document.addEventListener('plusready',this.plusReady(),false);
    }

  },
//  watch: {
//    $route (to, from) {
//      if(to.name === "classify") {
//
//      }
//    console.log("改变路由")
//    console.log(to);
//    }
//  }
//  beforeRouteLeave (to, from, next) {
//    console.log("改变路由")
//    console.log(to);
//    next();
//  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/

/*}*/
  body{
    margin: 0;
    background: #f6f6f6;
    overflow-x: hidden;
  }
/* body, button, input, select, textarea {
  font: 14px Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
} */
body, button, input, select, textarea {
    font: 14px/1.5 Helvetica,'STHeiti STXihei','Microsoft JhengHei','Microsoft YaHei',Tohoma,Arial;
}

</style>
