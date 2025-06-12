import type { RouterOptions } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    meta: { title: "Home" },
    //@ts-ignore
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/weather/:state/:city",
    meta: { title: "City Weather" },
    name: "city-view",
    //@ts-ignore
    component: () => import("@/views/CityView.vue"),
  },
] as RouterOptions["routes"];
