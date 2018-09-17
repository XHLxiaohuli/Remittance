<template>
  <div>
    <m-tabbar v-model="select">
      <m-tabbar-item id='tab1'>
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab1N.png" alt="" slot="icon-normal">
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab1H.png" alt="" slot="icon-active">
        购物
      </m-tabbar-item>
      <m-tabbar-item id='tab2'>
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab2N.png" alt="" slot="icon-normal">
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab2H.png" alt="" slot="icon-active">
        分类
      </m-tabbar-item>
      <m-tabbar-item id='tab3'>
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab3N.png" alt="" slot="icon-normal">
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab3H.png" alt="" slot="icon-active">
        购物车
      </m-tabbar-item>
      <m-tabbar-item id='tab4'>
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab4N.png" alt="" slot="icon-normal">
        <img src="http://unesmall.b0.upaiyun.com/common/images/tab4H.png" alt="" slot="icon-active">
        个人中心
      </m-tabbar-item>

    </m-tabbar>
  </div>


</template>
<script>

  import mTabbar from '../../components/common/tabbar'
  import mTabbarItem from '../../components/common/tabbar-item'

  export default {
        name: 'App',
        data() {
            return {
              select:''+localStorage.navselect
            }
        },
      components: {
        mTabbar,
        mTabbarItem
      },
      created: function () {

      },
    watch: {

      $route (to, from) {
        //  console.log("改变路由")
         if(to.fullPath.indexOf("/home")>=0) {
          // console.log('跳转到购物');
           this.select='tab1'

         }else if(to.fullPath.indexOf("/classify")>=0){
          //  console.log('跳转到分类');
           this.select='tab2'

         }else if(to.fullPath.indexOf("/shopcart")>=0){
          //  console.log('跳转到购物车')
           this.select='tab3'

         }else if(to.fullPath.indexOf("/usercenter")>=0){
          //  console.log('跳转到个人中心');
           this.select='tab4'
         }

        //  console.log(to);
      }
    }


    }
</script>
<style scoped>
</style>
