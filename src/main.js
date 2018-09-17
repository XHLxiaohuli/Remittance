// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = 'axios'
import '../static/common.css'
import '../static/icon.css'
import animate from 'animate.css'
import Vuex from 'vuex'
import Mint from 'mint-ui'
import '../static/style.css'

import wx from 'weixin-js-sdk'





import 'lib-flexible/flexible'//px转换rem布局

import VueLazyLoad from 'vue-lazyload'

import $ from 'jquery'




Vue.config.productionTip = false


Vue.use(Vuex)
Vue.use(Mint)


// or with options
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: '../static/error.jpg',
  loading: '../static/default.jpg',
  attempt: 1,
  throttleWait:6500,
  listenEvents: [ 'scroll' ]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
