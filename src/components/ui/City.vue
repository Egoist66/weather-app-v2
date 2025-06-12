<script setup lang="ts">
import { useWeather } from '../../composables/useWeather';


const {weatherStore} = await useWeather()

</script>


<template>
    <div>

        <pre>
            {{ weatherStore.weatherData }}
        </pre>

    </div>
</template>


<style scoped>

</style>