<template>
  <a class="m-tabbar-item" :class="{'is-active':isActive}" @click="$parent.$emit('input',id)">
    <span class="m-tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
    <span class="m-tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
    <span class="m-tabbar-item-text"><slot></slot></span>
  </a>



</template>
<script>
    export default {
        name: 'App',
      props: ['id'],
      created: function () {

      },
      computed: {
        isActive(){
          // console.log("打印值:"+this.$parent.value)
          if(this.$parent.value===this.id){
            return true;
          }

          if(this.$parent.value=='tab1'){
            this.$router.push('/home');
            localStorage.navselect='tab1'
          }
          if(this.$parent.value=='tab2'){
            this.$router.push('/classify');
            localStorage.navselect='tab2'
            console.log(localStorage.getItem('loginstatus'))
          }
          if(this.$parent.value=='tab3'){
            if(localStorage.getItem('loginstatus')){
              this.$router.push('/shopcart'),
              localStorage.navselect='tab3';
              
            }else {
              localStorage.getItem('loginstatus')
              this.$router.push('/login')
            }


          }
          if(this.$parent.value=='tab4'){

            if(localStorage.getItem('loginstatus')){
              this.$router.push('/usercenter'),
                localStorage.navselect='tab4';
            }else {
              this.$router.push('/login')
            }


          }
        }
      },
      data() {
          return {
              msg: 'helloworld'
          }
      },
      created: function () {

      }

    }
</script>
<style scoped>
  .m-tabbar-item {
    flex: 1;
    text-align: center;
    line-height: 14px;
  }
  .m-tabbar-item .m-tabbar-item-icon {
    display: block;
    padding-top: 2px;
  }
  .m-tabbar-item .m-tabbar-item-icon img {
    width: 28px;
    height: 28px;
  }
  .m-tabbar-item .m-tabbar-item-text {
    display: block;
    font-size: 10px;
    color: #949494;
  }
  .m-tabbar-item.is-active .m-tabbar-item-text {
    color: #fb4e90;
  }

</style>
