// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'

//网络请求
Vue.prototype.$http = axios;

//优化移动端300ms点击延迟
fastclick.attach(document.body);

Vue.config.productionTip = false

const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.silent = isDebug_mode;
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
