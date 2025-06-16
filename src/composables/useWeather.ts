import { useCitiesStore } from "@/stores/cities.store";
import { useWeatherStore } from "@/stores/weather.store";
import type { Cities } from "@/types/cities.types";
import type { WeatherRoot } from "@/types/weather-api.types";
import { delay } from "@/utils/delay";
import axios from "axios";
import { shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";

/**
 * Composable that fetches weather data from the OpenWeatherMap API.
 *
 * @returns An object with the following properties:
 *   - `weatherStore`: The weather store.
 *   - `isWeatherLoading`: A shallow ref of type `boolean` indicating whether the weather data is currently being fetched.
 *   - `isWeatherLoadingError`: A shallow ref of type `boolean` indicating whether an error occurred when fetching the weather data.
 *   - `route`: The current route.
 */
export const useWeather = async () => {
  const route = useRoute();
  const router = useRouter();
  
  const weatherStore = useWeatherStore();
  const citiesStore = useCitiesStore();

  const isWeatherLoading = shallowRef<boolean>(false);
  const isWeatherLoadingError = shallowRef<boolean>(false);

  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${
    route.query.lat
  }&lon=${route.query.lng}&lang=${route.query.lang}&units=metric&appid=${
    import.meta.env.VITE_APP_WEATHER_API_KEY
  }`;

  const getWeatherData = async () => {
    try {
      isWeatherLoadingError.value = false;
      isWeatherLoading.value = true;
      await delay(500);

      const { data } = await axios.get<WeatherRoot>(apiUrl);

      if (data) {
        data.currentTime = new Date(data.current.dt * 1000).getTime();
        data.hourly.forEach((h) => {
          h.currentTime = new Date(h.dt * 1000).getTime();
        });

        weatherStore.setWeatherData(data);

        isWeatherLoading.value = false;
      }
    } catch (e) {
      isWeatherLoading.value = false;
      isWeatherLoadingError.value = true;

      console.log(e);
    }
  };


  await getWeatherData();

 
  const removeCity = async (city: Cities) => {
    citiesStore.removeCities(city.id);

    await router.push({ name: "home" });
  };

  return {
    weatherStore,
    isWeatherLoading,
    isWeatherLoadingError,
    removeCity,
    citiesStore,
    route,
  };
};
