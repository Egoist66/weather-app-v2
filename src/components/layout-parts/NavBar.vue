<script setup lang="ts">
import { shallowRef } from "vue";
import AppInfo from "../ui/AppInfo.vue";
import InfoModal from "../ui/InfoModal.vue";
import { useCities } from "../../composables/useCities";


const isModalVisible = shallowRef<boolean>(false);
const toggleModal = (value: boolean) => {
  window.scrollTo(0, 0);
  isModalVisible.value = value;
};

const { addCity } = useCities();



</script>

<template>
  <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
    <RouterLink :to="{ name: 'home' }">
      <div class="flex items-center gap-3">
        <i
          class="fa-solid fa-sun text-2xl"
        ></i>
        <h1 class="text-2xl">Local Weather</h1>
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

<style scoped>
@media (max-width: 450px) {
  nav {
    padding: 0 !important;
    gap: 5px !important;
  }

  h1 {
    font-size: 1.2rem !important;
  }
  i {
    font-size: 1.2rem !important;
  }
}

  .animate-spin-infinite {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
