import type { GeoRoot } from '@/types/search-geo-api.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather-store', () => {


  const searchGeoResults = ref<GeoRoot<string, string, string> | null>(null)


  const setSearchGeoResults = (results: GeoRoot<string, string, string>) => {
    if(results){
      searchGeoResults.value = results
    }
  }

  const clearSearchGeoResults = () => {
    searchGeoResults.value = null
  }
 

  return { searchGeoResults, setSearchGeoResults, clearSearchGeoResults }
})
