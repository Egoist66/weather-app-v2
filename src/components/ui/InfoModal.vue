<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { computed } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits<{ (e: "close-modal"): void }>();
const { isModalVisible } = defineProps<{ isModalVisible: boolean }>();

useEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    emit("close-modal");
  }
});

watch(
  () => isModalVisible,
  (value) => {
    if (value) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  },
  { deep: false, immediate: true }
);

const navigator = window.navigator
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isModalVisible"
        @click.self.prevent="$emit('close-modal')"
        class="absolute w-full bg-black bg-opacity-50 backdrop-blur-sm h-screen items-center top-0 left-0 flex justify-center px-8"
      >
        <div v-if="$slots.default" class="p-4 bg-white rounded-md max-w-screen-md">
          <slot name="default"> Default Content </slot>

          <div class="flex justify-end pt-8">
            <button
              class="bg-weather-primary py-2 px-4 rounded-md text-white hover:bg-weather-secondary duration-150"
              @click="$emit('close-modal')"
            >
              {{ navigator.language.startsWith("ru") ? "Закрыть" : "Close" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped></style>
