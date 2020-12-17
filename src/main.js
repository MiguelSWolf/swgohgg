import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueExcel from "vue-excel-export";

Vue.use(VueResource);
Vue.use(VueExcel);

Vue.filter("formatNumber", function(number) {
  if (!number) number = 0;
  return new Intl.NumberFormat().format(number);
});

Vue.http.options.root =
  "https://cors-anywhere.herokuapp.com/https://swgoh.gg/api/";
Vue.http.headers.common["Access-Control-Allow-Origin"] = "*";
Vue.http.headers.common["Access-Control-Allow-Methods"] =
  "POST, GET, PUT, OPTIONS, DELETE";
Vue.http.headers.common["Access-Control-Allow-Headers"] =
  "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type";
Vue.http.headers.common["Content-Type"] = "application/json";
Vue.http.headers.common["Accept"] = "application/json";
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false;
Window.isDev = process.env.NODE_ENV !== "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
