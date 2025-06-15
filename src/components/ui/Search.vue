<script setup lang="ts">
import { useSearch } from "../../composables/useSearch";
import { useCityView } from "../../composables/useCityView";

const {
  search: searchQuery,
  weatherStore,
  searchUrl,
  searchError,
  isSearching,
} = useSearch();

const { previewCity } = useCityView();
const location = document.location;
const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
</script>

<template>
  <div class="search-bar max-w-[860px] mx-auto pt-2 mb-8 relative">
    <input
      autofocus
      :placeholder="
        locale === 'ru' ? 'Поиск по городу или стране' : 'Search for a city or state'
      "
      :data-value="searchQuery"
      v-model.trim="searchQuery"
      type="search"
      :class="[
        'search',
        'p-2',
        'w-full',
        'text-white',
        'outline-none',
        'focus:outline-non',
        'bg-transparent',
        'border-b',
        'focus:border-weather-secondary',
        'focus:shadow-[0px_1px_0_0_#004E71]',
      ]"
    />

    <p
      v-if="isSearching"
      class="absolute top-[66px] bg-weather-secondary text-center text-xl rounded-md text-white w-full shadow-md p-2"
    >
      {{ locale === "ru" ? "Поиск..." : "Searching..." }}
    </p>

    <p
      class="p-2 w-full text-xl absolute top-[66px] shadow-md rounded-md bg-red-400 text-white"
      v-if="searchError"
    >
      {{ locale === "ru" ? "Ошибка поиска" : "Search error" }}
    </p>

    <template v-else>
      <TransitionGroup
        v-if="weatherStore.searchGeoResults && !isSearching && !searchError"
        name="list"
        tag="ul"
        class="absolute top-[66px] bg-weather-secondary rounded-md text-white w-full shadow-md p-2"
      >
        <template v-if="weatherStore.searchGeoResults?.features.length">
          <li
            role="link"
            class="py-2 cursor-pointer hover:text-gray-200 duration-300 hover:underline"
            v-for="(result, i) in weatherStore.searchGeoResults?.features"
            :data-id="result.id"
            :key="result.id"
            @click="previewCity(result, false)"
          >
            {{ result?.place_name }}
          </li>
        </template>
        <template v-else>
          <li>
            {{
              locale === "ru"
                ? "Ничего не найдено 😔 - попробуйте ещё"
                : "Nothing found - try again"
            }}
          </li>
        </template>
      </TransitionGroup>
    </template>
  </div>
</template>

<style scoped></style>
