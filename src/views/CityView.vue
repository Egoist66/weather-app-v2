
<script setup lang="ts">
import { useRoute } from 'vue-router';


const route = useRoute()

</script>


<template>
    <section>

        {{ route.params }}

    </section>
</template>


<style scoped>

</style>