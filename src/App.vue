<script setup lang="ts">
import {  RouterView } from "vue-router";
import NavBar from "./components/layout-parts/NavBar.vue";
import Layout from "./layout/Layout.vue";
</script>

<template>
  <Layout>
    <template #header>
      <NavBar />
    </template>

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </Layout>


</template>

<style scoped>

 

</style>
