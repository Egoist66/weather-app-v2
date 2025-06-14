import { shallowRef, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";
import type { GeoRoot } from "@/types/search-geo-api.types";
import { useWeatherStore } from "@/stores/weather.store";
import { delay } from "@/utils/delay";

/**
 * Composable that handles searching for geocoding results.
 *
 * @returns Object with two properties: `search` and `searchUrl`.
 *   - `search`: A shallow ref of type `string` that is two-way bound to the search input.
 *   - `searchUrl`: A shallow ref of type `string` that is updated whenever `search` changes.
 *     It is a URL that can be used to fetch the search results from the Mapbox Geocoding API.
 */
export const useSearch = () => {
  const apiKey: string = import.meta.env.VITE_APP_API_KEY;

  const weatherStore = useWeatherStore();


  const search = shallowRef<string>("");
  const searchError = shallowRef<boolean>(false);
  const searchUrl = shallowRef<string>(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${search.value}&access_token=${apiKey}`
  );

  const isSearching = shallowRef<boolean>(false);

  const getSearchGeoResults = async (searchUrl: string) => {
    try {
      searchError.value = false;
      isSearching.value = true;

      await delay(500);
      const { data } = await axios.get<GeoRoot<string, string, string>>(
        searchUrl
      );

      isSearching.value = false;
      return data;
    } catch (error) {
      searchError.value = true;
      isSearching.value = false;

      console.log(error);
    }
  };

  watch(
    search,
    useDebounceFn(() => {
      if (!search.value) {
        weatherStore.clearSearchGeoResults();
        searchUrl.value = "";

        return;
      }

      if (search.value.trim().length) {
        searchUrl.value = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.value}.json?access_token=${apiKey}&types=place`;
      }
    }, 500),
    { deep: false }
  );

  watch(
    searchUrl,
    async () => {
      if (search.value.length) {
        const results = await getSearchGeoResults(searchUrl.value);

        if (results) {
          weatherStore.setSearchGeoResults(results);
        }
      }
    },
    { deep: false }
  );

  return {
    search,
    searchUrl,
    searchError,
    weatherStore,
    isSearching,
  };
};
