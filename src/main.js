import Vue from "vue";
import VueMeta from "vue-meta";
import VueFragment from "vue-fragment";
import { sync } from "vuex-router-sync";
// import _ from "lodash";

import router from "./router";
import store from "./store";
import http from "./utilities/http";
import App from "./App.vue";
import "./styles.scss";

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(VueFragment.Plugin);
sync(store, router);

// Object.defineProperties(Vue.prototype, {
//   $http: {
//     get() {
//       return http;
//     }
//   }
// });

new Vue({
  router,
  store,
  http,
  render: h => h(App)
}).$mount("#app");
