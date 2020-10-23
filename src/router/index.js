import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TerritoryBattle from "../views/TerritoryBattle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tb",
    name: "tb",
    component: TerritoryBattle
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
