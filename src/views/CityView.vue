<script setup lang="ts">
import { useRoute } from "vue-router";
import City from "@/components/ui/City.vue";

const route = useRoute();
</script>

<template>
  <section>
    <Suspense @fallback="() => console.log('loading...')">
      <template #fallback>
        <p>Loading....</p>
      </template>

      <City />
    </Suspense>
  </section>
</template>

<style scoped></style>
