import { useCitiesStore } from "@/stores/cities.store";
import type { Cities } from "@/types/cities.types";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

/**
 * Composable that provides access to the cities store and an addCity function that adds
 * the current city (from the route) to the cities store.
 *
 * @returns An object with two properties: `citiesStore` and `addCity`.
 *   - `citiesStore`: A reference to the cities store.
 *   - `addCity`: A function that adds the current city to the cities store.
 */
export const useCities = () => {
  const citiesStore = useCitiesStore();
  const route = useRoute();
  const router = useRouter();

  const addCity = () => {
    const isCityAlreadyAdded = citiesStore.cities.some(
      (c) => c.city === route.params.city && c.state === route.params.state
    );

    if (!isCityAlreadyAdded) {
      citiesStore.addCities(route);

      let query = Object.assign({}, route.query);
      delete query.preview;
      Swal.fire({
        icon: "success",
        title:
          route.query.lang === "en"
            ? `City ${route.params.city}  added!`
            : `Город ${route.params.city} добавлен!`,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1000,
        timerProgressBar: true,
      }).then(() => {
        router.replace({ query });
        const foundCity = citiesStore.cities.find(
          (c) => c.city === route.params.city
        );
        if (foundCity) {
          foundCity.isPreviewOn = false;
          foundCity.isTracked = true;
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title:
          route.query.lang === "en"
            ? `City ${route.params.city} already added!`
            : `Город ${route.params.city} уже добавлен!`,
        toast: true,
        showCloseButton: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const clearCities = () => {
    Swal.fire({
      icon: "warning",
      title:
        route.query.lang === "en"
          ? "Are you sure you want to clear all cities?"
          : "Вы уверены, что хотите очистить все города?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText:
        route.query.lang === "en" ? "Yes, clear" : "Да, очистить",
      cancelButtonText: route.query.lang === "en" ? "Cancel" : "Отменить",
      cancelButtonColor: "#EF4444",
      confirmButtonColor: "#00668A",
      timer: 4000,
      timerProgressBar: true,
    }).then((res) => {
      if (res.isConfirmed) {
        citiesStore.clearCities();
        Swal.fire({
          icon: "success",
          title:
            route.query.lang === "en" ? "Cities cleared!" : "Города очищены!",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  const removeCity = (city: Cities) => {
    citiesStore.removeCities(city.id);
    Swal.fire({
      icon: "success",
      title:
        route.query.lang === "en" ? "City removed!" : "Город удален!",
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 1500,
      timerProgressBar: true,
    });
  }
  return { citiesStore, addCity, clearCities, removeCity };
};
