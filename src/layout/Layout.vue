
<script setup lang="ts">

</script>

<template>
    <div id="app-layout" class="flex flex-col min-h-screen bg-weather-primary">

        <header class="sticky top-0 bg-weather-primary shadow-lg" v-if="$slots.header">
            <slot name="header" />
        </header>

        <main class="container text-white">
            <slot name="default" />
        </main>

    </div>
</template>
<style scoped>
    header {
        z-index: 2;
    }
</style>