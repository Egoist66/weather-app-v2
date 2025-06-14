import { useLS } from "@/composables/service/useLS";
import type { Cities } from "@/types/cities.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocation } from "vue-router";

export const useCitiesStore = defineStore("cities-store", () => {
  const { getSync } = useLS();

  const cities = ref<Cities[]>(getSync("cities") || []);

  const addCities = (route: RouteLocation) => {
    cities.value.filter(
      (c) => c.city === route.params.city && c.state === route.params.state
    ).length === 0 &&
      cities.value.push({
        coords: {
          lat: route.query.lat as unknown as number,
          lng: route.query.lng as unknown as number,
        },
        state: route.params.state as string,
        city: route.params.city as string,
        id: crypto.randomUUID(),
      });
  };

  const removeCities = (id: string) => {
    cities.value = cities.value.filter((c) => c.id !== id);
  };

  return { cities, addCities, removeCities };
});
