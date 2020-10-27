import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TerritoryBattle from "../views/TerritoryBattle.vue";
import TerritoryWar from "../views/TerritoryWar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tb",
    name: "tb",
    component: TerritoryBattle
  },
  {
    path: "/tw",
    name: "tw",
    component: TerritoryWar
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
