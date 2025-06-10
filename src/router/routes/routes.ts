import type { RouterOptions } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    //@ts-ignore
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    //@ts-ignore

    component: () => import("@/views/AboutView.vue"),
  },
] as RouterOptions["routes"];
