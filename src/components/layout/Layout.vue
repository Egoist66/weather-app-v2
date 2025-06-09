
<script setup lang="ts">

</script>

<template>
    <div id="app-layout">

        <header v-if="$slots.header">
            <slot name="header" />
        </header>

        <main>
            <slot name="default" />
        </main>

    </div>
</template>
<style scoped>

</style>