import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TerritoryBattle from "../views/TerritoryBattle.vue";
import TerritoryWar from "../views/TerritoryWar.vue";
import TerritoryWarDefence from "../views/TerritoryWarDefence.vue";
import ModsMap from "../views/ModsMap.vue";
import Contact from "../views/Contact.vue";
import GuildComparator from "../views/GuildComparator.vue";
import GuildHistory from "../views/GuildHistory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tb",
    name: "tbls",
    component: TerritoryBattle
  },
  {
    path: "/comparator",
    name: "comparator",
    component: GuildComparator
  },
  {
    path: "/history",
    name: "history",
    component: GuildHistory
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
    path: "/twdefence",
    name: "twdefence",
    component: TerritoryWarDefence
  },
  {
    path: "/mods",
    name: "mods",
    component: ModsMap
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  },
  {
    path: "/report",
    name: "report",
    component: Contact
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
