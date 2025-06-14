import "./assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

//@ts-ignore
import App from "./App.vue";
import { componentsConfig } from "./plugins/components-config";
import { initCitiesLSSaving } from "./plugins/cities-ls-saving";

const app = createApp(App);

app
.use(createPinia())
.use(router)
.use(componentsConfig())
.use(initCitiesLSSaving())
.mount("#app");
