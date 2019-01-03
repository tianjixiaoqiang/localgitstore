import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.prototype.$axios=axios;
router.push('/');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
