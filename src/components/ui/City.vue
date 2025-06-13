<script setup lang="ts">
import { useWeather } from "../../composables/useWeather";


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

    
  </div>
</template>

<style scoped></style>
