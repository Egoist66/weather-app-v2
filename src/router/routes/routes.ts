import type { RouterOptions } from "vue-router";

export default  [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/AboutView.vue"),
    },
] as RouterOptions['routes']