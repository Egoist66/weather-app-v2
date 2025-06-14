import { useCitiesStore } from "@/stores/cities.store";
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
        title: "City added",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        router.replace({ query });
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: `City - ${route.params.city} already added!`,
        toast: true,
        showCloseButton: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  return { citiesStore, addCity };
};
