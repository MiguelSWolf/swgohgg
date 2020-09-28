import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueResource);

Vue.http.headers.common["Access-Control-Allow-Origin"] = "*";
Vue.http.headers.common["Access-Control-Allow-Methods"] =
  "POST, GET, PUT, OPTIONS, DELETE";
Vue.http.headers.common["Access-Control-Allow-Headers"] =
  "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type";
Vue.http.headers.common["Content-Type"] = "application/json";
Vue.http.headers.common["Accept"] = "application/json";

Vue.config.productionTip = false;
Window.isDev = process.env.NODE_ENV !== "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
