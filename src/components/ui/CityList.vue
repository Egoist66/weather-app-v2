<script setup lang="ts">
import { useCities } from "@/composables/useCities";
import { useCitiesList } from "../../composables/useCitiesList";
import CityCard from "./CityCard.vue";

const { savedCities, goToCityView } = await useCitiesList();
const { clearCities } = useCities();
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
    <template v-for="city in savedCities">
      <CityCard
        :title="`${lang.startsWith('ru') ? 'Посмотреть детально' : 'View details'}, ${
          city.state
        }`"
        role="link"
        :city="city"
        @click="goToCityView(city)"
      />
    </template>
  </div>
</template>

<style scoped></style>
