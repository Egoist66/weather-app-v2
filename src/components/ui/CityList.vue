<script setup lang="ts">
import { useCities } from "@/composables/useCities";
import { useCitiesList } from "../../composables/useCitiesList";
import CityCard from "./CityCard.vue";

const { savedCities, goToCityView } = await useCitiesList();
const { clearCities, removeCity } = useCities();
const lang = navigator.language;
</script>

<template>
  <div v-if="savedCities.length" class="flex flex-col gap-4">
    <div class="flex justify-between items-center flex-wrap">
      <h2 class="text-2xl mb-2">
        {{ lang.startsWith("ru") ? "Сохраненные города" : "Saved cities" }}
      </h2>

      <button
        @click="clearCities"
        class="bg-red-400 py-2 px-4 rounded-md text-white hover:bg-red-500 duration-150"
      >
        {{ lang.startsWith("ru") ? "Удалить все" : "Delete all" }}
      </button>
    </div>

    <TransitionGroup name="list" >
      <CityCard
        v-for="city in savedCities"
        :key="city.id"
        :city="city"
        @clickToView="goToCityView(city)"
        @delete-city="removeCity(city)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
