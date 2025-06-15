import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import routes from "./routes/routes";
import { storeToRefs } from "pinia";
import { useCitiesStore } from "@/stores/cities.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const RouteMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const { cities } = storeToRefs(useCitiesStore());


  // Проверяем, есть ли параметры города и штата
  if (to.params.city && to.params.state) {
    const foundCity = cities.value.find(
      (c) => c.city === to.params.city && c.state === to.params.state
    );

    if (foundCity && foundCity.isTracked) {
      // Создаем новый query-объект на основе текущего
      const newQuery = { ...to.query };

      // Добавляем/обновляем tracked
      newQuery.tracked = 'true';

      // Удаляем preview, если он есть
      if ('preview' in newQuery) {
        delete newQuery.preview;
      }

      // Проверяем, изменились ли query-параметры
      if (JSON.stringify(to.query) !== JSON.stringify(newQuery)) {
        return {
          name: to.name, // Оставляем то же имя маршрута
          params: to.params, // Оставляем те же параметры
          query: newQuery, // Обновленные query-параметры
        };
      }
    }
  }



  document.title = `${import.meta.env.VITE_APP_NAME} | ${to.meta.title}`;
};

router.beforeEach(RouteMiddleware);

export default router;