import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TerritoryBattle from "../views/TerritoryBattle.vue";
import TerritoryWar from "../views/TerritoryWar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tb",
    name: "tbls",
    component: TerritoryBattle
  },
  {
    path: "/tb",
    name: "tbds",
    component: TerritoryBattle
  },
  {
    path: "/tw",
    name: "tw",
    component: TerritoryWar
  },
  {
    path: "/",
    name: "counters",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
