<script setup lang="ts">
import type { Cities } from "../../types/cities.types";

defineProps<{ city: Cities }>();
defineEmits<{ (e: "delete-city", city: Cities): void; (e: "clickToView"): void }>();

const navigator = window.navigator;
</script>

<template>
  <div class="flex items-center card-wrapper gap-2">
    <div
      @click="$emit('clickToView')"
      class="city-card flex-1 flex py-6 cursor-pointer bg-weather-secondary rounded-md px-3"
    >
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
    <div class="p-2">
           <i
        @click.self.prevent="$emit('delete-city', city)"
        :title="navigator.language.startsWith('ru') ? 'Удалить город' : 'Delete city'"
        class="fa-solid fa-trash text-2xl hover:text-red-500 duration-150 cursor-pointer"
      ></i>
    </div>
  </div>
</template>

<style scoped>

  @media (max-width: 450px){
    .card-wrapper{
      flex-direction: column;
    }
  }

</style>
