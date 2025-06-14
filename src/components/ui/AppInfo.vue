<script setup lang="ts">
import { useRoute } from 'vue-router';

const lang = useRoute().query.lang as string
</script>

<template>
  <div class="text-black">
    <template v-if="lang === 'en'">
      <h1 class="text-2xl mb-1">About:</h1>
      <p class="mb-4">
        The Local Weather allows you to track the current and future weather of cities of
        your choosing.
      </p>
      <h2 class="text-2xl">How it works:</h2>
      <ol class="list-decimal list-inside mb-4">
        <li>Search for your city by entering the name into the search bar.</li>
        <li>
          Select a city within the results, this will take you to the current weather for
          your selection.
        </li>
        <li>
          Track the city by clicking on the "+" icon in the top right. This will save the
          city to view at a later time on the home page.
        </li>
      </ol>
      <h2 class="text-2xl">Removing a city</h2>
      <p>
        If you no longer wish to track a city, simply select the city within the home
        page. At the bottom of the page, there will be am option to delete the city.
      </p>
    </template>
    <template v-else-if="lang === 'ru'">
      <h1 class="text-2xl mb-1">О приложении:</h1>
      <p class="mb-4">
        "Local Weather" позволяет отслеживать текущую и прогнозируемую погоду в выбранных вами городах.
      </p>
      <h2 class="text-2xl">Как это работает:</h2>
      <ol class="list-decimal list-inside mb-4">
        <li>Найдите город, введя его название в поисковую строку.</li>
        <li>Выберите город из результатов поиска — откроется страница с текущей погодой для этого города.</li>
        <li>Чтобы добавить город в список отслеживаемых, нажмите на значок "+" в правом верхнем углу. Город сохранится, и вы сможете просматривать его погоду позднее на главной странице.</li>
      </ol>
      <h2 class="text-2xl">Удаление города</h2>
      <p>
        Если вы больше не хотите отслеживать погоду в городе, просто выберите его на главной странице. Внизу страницы будет опция для удаления города.
      </p>
    </template>
  </div>
</template>

<style scoped></style>
