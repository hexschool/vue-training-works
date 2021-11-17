import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import router from './router';

import 'bootstrap';

Vue.use(VueAxios, axios);
Vue.component('paginate', Paginate);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
