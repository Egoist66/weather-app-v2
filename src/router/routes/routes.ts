import type { RouterOptions } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    //@ts-ignore
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/weather/:state/:city",
    name: "city-view",
    
    //@ts-ignore

    component: () => import("@/views/CityView.vue"),
  },
] as RouterOptions["routes"];
