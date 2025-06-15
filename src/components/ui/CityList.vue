<script setup lang="ts">
import { useCitiesList } from "../../composables/useCitiesList";
import CityCard from "./CityCard.vue";

const { savedCities, goToCityView } = await useCitiesList();
const lang = navigator.language;
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl mb-2">
      {{ lang.startsWith("ru") ? "Сохраненные города" : "Saved cities" }}
    </h2>
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
