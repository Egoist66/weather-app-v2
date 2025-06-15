<script setup lang="ts">
import Preloader from "@/components/shared/Preloader.vue";
import CityList from "@/components/ui/CityList.vue";
import Search from "@/components/ui/Search.vue";
import { storeToRefs } from "pinia";
import { useCitiesStore } from '../stores/cities.store';


const {cities} = storeToRefs(useCitiesStore())
</script>

<template>
  <section>
    <Search />

    <Suspense v-if="cities.length">
      <CityList />

      <template #fallback>
          <Preloader :size="40" :stroke-width="3" />
      </template>
    </Suspense>
  </section>
</template>
