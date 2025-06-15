import type { CitiesRoot } from "@/types/cities-list.types";
import axios, { type AxiosResponse } from "axios";
import { onMounted, ref, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useCitiesStore } from "@/stores/cities.store";
import { delay } from "@/utils/delay";
import type { Cities } from "@/types/cities.types";
import { useRouter } from "vue-router";

/**
 * Composable that retrieves a list of saved cities from the cities store and updates
 * them with the latest weather data from the OpenWeatherMap API upon mounting.
 *
 * @returns An object containing:
 *   - `savedCities`: A reference to the list of cities, each with updated weather data.
 */

export const useCitiesList = async () => {
  const { cities: savedCities } = storeToRefs(useCitiesStore());
  const router = useRouter()

  const requests: Array<Promise<AxiosResponse<CitiesRoot>>> = [];


  const goToCityView = async ({city, coords, state}: Cities) => {
    await router.push({
      name: "city-view",
      params: {
        city,
        state,
      },
      query: {
        lat: coords.lat,
        lng: coords.lng,
        lang: new Intl.DateTimeFormat().resolvedOptions().locale,
      },
    })
  }

  /**
   * Make a request to the weather API for each city in the user's list
   * and update the user's list with the weather data
   */
  const makeCitiesRequest = async () => {
    await delay(500);

    savedCities.value.forEach(async (city) => {
      requests.push(
        axios.get<CitiesRoot>(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            city.coords.lat
          }&lon=${city.coords.lng}&lang=${
            new Intl.DateTimeFormat().resolvedOptions().locale
          }&units=metric&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach(({ data }, index) => {
      savedCities.value[index].weather = data.weather;
      savedCities.value[index].main = data.main;
    });
  };

  await makeCitiesRequest();

  return {
    savedCities,
    goToCityView
  };
};
