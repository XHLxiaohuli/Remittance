<template>
  <div class="m-tabbar" :class="{isIphoneX:ifIphoneX==true}">
    <slot></slot>
  </div>
</template>
<script>
//   import mTabbarItem from '../../components/common/tabbar-item'
   export default {
        name: 'App',
        props: ['value'],
        data() {
            return {
                msg: 'helloworld',
                ifIphoneX:false,
            }
        },
        methods:{
          ifSystem(){
              var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
              var ratio = window.devicePixelRatio || 1;
              var screen = {
              width : window.screen.width * ratio,
              height : window.screen.height * ratio
              };
              if (iOS && screen.width == 1125 && screen.height === 2436) {
                this.ifIphoneX=true
              }
          },
        },
        created(){
          this.ifSystem()
        },
    }
</script>
<style scoped>
  .m-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    z-index: 1;
  }
  .isIphoneX{
    bottom: 34px;
  }


</style>
