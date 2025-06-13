
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: number | string;
  strokeWidth?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  strokeWidth: 4,
});

const sizePx = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size
);
</script>


<template>
  <div class="spinner-container">
    <svg class="spinner" viewBox="0 0 50 50" :width="sizePx" :height="sizePx">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="ghostwhite"
        :stroke-width="strokeWidth"
      />
    </svg>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  height: 50vh;
  align-items: center;
}

.spinner {
  animation: rotate 1.4s linear infinite;
}

.path {
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0;
  animation: dash 1.4s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125;
  }
}
</style>
