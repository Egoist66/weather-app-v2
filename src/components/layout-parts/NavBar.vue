<script setup lang="ts">
import { shallowRef } from "vue";
import AppInfo from "../ui/AppInfo.vue";
import InfoModal from "../ui/InfoModal.vue";
import { useCities } from '../../composables/useCities';

const isModalVisible = shallowRef<boolean>(false);
const toggleModal = (value: boolean) => {
  window.scrollTo(0, 0);
  isModalVisible.value = value;
};

const {addCity} = useCities()

</script>

<template>
  <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
    <RouterLink :to="{ name: 'home' }">
      <div class="flex items-center gap-3">
        <i class="fa-solid fa-sun text-2xl"></i>
        <p class="text-2xl">Local Weather</p>
      </div>
    </RouterLink>
    <div class="flex gap-3 flex-1 justify-end">
      <i
        @click="toggleModal(true)"
        class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
      ></i>

      <!-- @vue-ignore -->
      <i
        
        v-if="$route.query.preview"
        @click="addCity"
        class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
      ></i>
    </div>

    <InfoModal :is-modal-visible="isModalVisible" @close-modal="toggleModal(false)">
      <AppInfo />
    </InfoModal>
  </nav>
</template>

<style scoped></style>
