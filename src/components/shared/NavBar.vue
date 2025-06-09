<script setup lang="ts">
import { appLinks } from "../../router/links/links";
</script>

<template>
  <nav class="flex flex-col sm:flex-row items-center gap-4 text-white py-6">
    <RouterLink v-for="link in appLinks" :to="link.path" :key="link.id">
      {{ link.name }}
    </RouterLink>
  </nav>
</template>

<style scoped></style>
