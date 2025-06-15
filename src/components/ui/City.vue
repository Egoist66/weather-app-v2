<script setup lang="ts">
import { useWeather } from "../../composables/useWeather";
import { timeFormatter } from "../../utils/time-formatter";

const { weatherStore, route } = await useWeather();

const isPreviewOn = route.query.preview === "true";
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview && isPreviewOn"
      class="text-white p-4 bg-weather-secondary rounded-md shadow-md w-full text-center"
    >
      <p v-if="route.query.lang === 'ru'">
        Вы в данный момент просматриваете этот город, нажмите на значок <b>"+"</b>, чтобы
        начать отслеживание
      </p>
      <p v-else>
        You are currently previewing this city, click on <b>"+"</b> icon to start tracking
        the city
      </p>
    </div>

    <!-- Weather Overview -->

    <div class="flex-col flex items-center gap-7 justify-center text-white py-12">
      <h1 class="text-8xl font-bold">
        {{ route.params.city }}
      </h1>
      <p class="text-sm">
        {{ timeFormatter(weatherStore.weatherData?.currentTime!) || 'N/A' }}
      </p>
      <p class="text-4xl">
        {{ Math.round(weatherStore.weatherData?.current.temp!) || 'N/A' }}&deg;
      </p>
      <p class="text-xl">
        {{
          weatherStore.weatherData?.current.weather[0].description.toUpperCase() || "N/A"
        }}
      </p>
      <div>
        <p>
          {{ route.query.lang === "ru" ? "Ощущается как" : "Feels like" }}
          {{ Math.round(weatherStore.weatherData?.current.feels_like!) || 'N/A' }}&deg;
        </p>
        <img
          class="w-[200px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherStore.weatherData?.current.weather[0].icon}@2x.png`"
          :alt="weatherStore.weatherData?.current.weather[0].description"
        />
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weather by hours -->
    <div class="max-w-screen-md w-full p-12">
      <div class="mx-8 text-white">
        <h2 class="text-xl pb-5 font-bold">
          {{ route.query.lang === "ru" ? "Погода по часам" : "Weather by hours" }}
        </h2>
        <ul class="flex gap-10 overflow-x-scroll">
          <li
            class="flex flex-col gap-4 items-center"
            v-for="hour in weatherStore.weatherData?.hourly"
            :key="hour.dt"
          >
            <p class="whitespace-nowrap text-md">
              {{ new Date(hour.currentTime!)
                .toLocaleString(
                  (route.query.lang as string ) ?? 'en-US', 
                  { hour: 'numeric', minute: 'numeric'}
                )

              }}
            </p>

            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
              :alt="hour.weather[0].description"
            />

            <p class="text-xl">{{ Math.round(hour.temp!) || 'N/A' }}&deg;</p>
          </li>
        </ul>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full p-12">
      <div class="mx-8 text-white">
        <h2 class="text-xl pb-5 font-bold">
          {{ route.query.lang === "ru" ? "Погода на неделю" : "Weather by week" }}
        </h2>
        <ul>
          <li
            class="flex items-center weekly-weather-item p-2 rounded-md"
            v-for="(day, index) in weatherStore.weatherData?.daily"
            :key="day.dt"
            :class="{ 'bg-weather-secondary': index === 0 }"
          >
            <p class="flex-1 text-daily">
              {{ new Date(day.dt * 1000)
                .toLocaleString(
                  (route.query.lang as string ) ?? 'en-US', 
                  { weekday: 'long' }
                )

              }}
            </p>

            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              :alt="day.weather[0].description"
            />

            <div class="flex gap-2 flex-1 justify-end">
              <p class="text-daily">
                <span>{{ route.query.lang === "ru" ? "Макс" : "Max" }} - </span
                >{{ Math.round(day.temp.max!) || 'N/A' }}&deg;
              </p>
              <p class="text-daily">
                <span>{{ route.query.lang === "ru" ? "Мин" : "Min" }} - </span
                >{{ Math.round(day.temp.min!) || 'N/A' }}&deg;
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (max-width: 450px) {
  .weekly-weather-item {
    display: block;
  }

  h2 {
    text-align: center;
    font-size: 18px;
  }

  .weekly-weather-item div {
    display: block;
  }
}
p {
  text-align: center;
}

p.text-daily {
  text-align: left;
}
</style>
