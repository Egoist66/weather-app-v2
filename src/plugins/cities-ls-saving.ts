import { useLS } from "@/composables/service/useLS";
import { useCitiesStore } from "@/stores/cities.store";
import type { Cities } from "@/types/cities.types";
import type { Plugin } from "vue";

export const initCitiesLSSaving = (): Plugin => {
  return {
    install(app, ...options) {

        const {set} = useLS()

      useCitiesStore().$subscribe(async (mutation, state) => {
        await set<Cities[]>('cities', state.cities)
      });

    },
  };
};
