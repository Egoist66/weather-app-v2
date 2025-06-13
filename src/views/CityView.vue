<script setup lang="ts">
import City from "@/components/ui/City.vue";
import Preloader from "@/components/shared/Preloader.vue";

</script>

<template>
  <section>
    <Suspense @fallback="() => console.log('Loading...')">
      <City />

      <template #fallback>
        <Preloader :size="90" :stroke-width="3" />
      </template>
    </Suspense>
  </section>
</template>

<style scoped></style>
