import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import TerritoryBattle from "../views/TerritoryBattle.vue";
import TerritoryWar from "../views/TerritoryWar.vue";
import TerritoryWarDefence from "../views/TerritoryWarDefence.vue";
import ModsMap from "../views/ModsMap.vue";
// import Contact from "../views/Contact.vue";
import GuildComparator from "../views/GuildComparator.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/tb", name: "tbls", component: TerritoryBattle },
    { path: "/comparator", name: "comparator", component: GuildComparator },
    { path: "/tb", name: "tbds", component: TerritoryBattle },
    { path: "/tw", name: "tw", component: TerritoryWar },
    { path: "/twdefence", name: "twdefence", component: TerritoryWarDefence },
    { path: "/mods", name: "mods", component: ModsMap },
    { path: "/", name: "counters", component: Home }
  ]
});

export default router;
