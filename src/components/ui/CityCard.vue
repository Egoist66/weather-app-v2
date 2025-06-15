<script setup lang="ts">
import type { Cities } from "../../types/cities.types";

defineProps<{ city: Cities }>();
</script>

<template>
  <div class="city-card flex py-6 cursor-pointer bg-weather-secondary rounded-md px-3">
    <div class="flex flex-col flex-1">
      <h3 class="text-3xl">{{ city.city }}</h3>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="self-end text-3xl">{{ Math.round(city.main?.temp!) || 'N/A' }}&deg;</p>
      <div class="flex items-center gap-2">
        <img
          class="w-auto h-[50px] object-cover"
          :src="`http://openweathermap.org/img/wn/${city.weather?.[0].icon}@2x.png`"
          :alt="city.weather?.[0].description"
        />
        <p>
          {{ city.weather?.[0].description.toUpperCase() || "N/A" }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
