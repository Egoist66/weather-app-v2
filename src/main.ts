import "./assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import { componentsConfig } from "./plugins/components-config";
import { initCitiesLSSaving } from "./plugins/cities-ls-saving";

import { init } from "@telegram-apps/sdk-vue";
import { isTMA, retrieveLaunchParams } from "@telegram-apps/bridge";

const app = createApp(App);

// Инициализация Telegram SDK только внутри TMA
if (isTMA()) {
  try {
    init({
      launchParams: retrieveLaunchParams(),
    });
    console.log("Telegram Mini App initialized!");
  } catch (e) {
    console.error("TMA init error:", e);
  }
} else {
  console.log("Running outside Telegram (local dev mode)");

  app
    .use(createPinia())
    .use(router)
    .use(componentsConfig())
    .use(initCitiesLSSaving())
    .mount("#app");
}
