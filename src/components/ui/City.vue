<script setup lang="ts">
import { useWeather } from "../../composables/useWeather";
import { timeFormatter } from '../../utils/time-formatter';


const { weatherStore, route } = await useWeather();

const isPreviewOn = route.query.preview === "true";
</script>

<template>
  <div class="flex flex-col flex-1 items-center">

    <!-- Banner -->
    <div
      v-if="isPreviewOn"
      class="text-white p-4 bg-weather-secondary rounded-md shadow-md w-full text-center"
    >
      <p>
        You are currently previewing this city, click on <b>"+"</b> icon to start tracking the city
      </p>

    </div>

    <!-- Weather Overview -->

    <div class="flex-col flex items-center gap-8 justify-center text-white py-12">
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
        {{ weatherStore.weatherData?.current.weather[0].description.toUpperCase() || 'N/A' }}
      </p>
      <p>
        {{ route.query.lang === 'ru' ? 'Ощущается как' : 'Feels like' }} - {{ Math.round(weatherStore.weatherData?.current.feels_like!) || 'N/A' }}&deg;
      </p>
    </div>

    
  </div>
</template>

<style scoped></style>
