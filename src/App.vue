<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Layout from "./components/layout/Layout.vue";
</script>

<template>
  <Layout>
    <template #header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </template>

    <RouterView />
  </Layout>


</template>

<style scoped></style>
