import type { GeoRoot } from '@/types/search-geo-api.types'
import type { WeatherRoot } from '@/types/weather-api.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather-store', () => {


  const searchGeoResults = ref<GeoRoot<string, string, string> | null>(null)
  const weatherData = ref<WeatherRoot | null>(null)


  const setSearchGeoResults = (results: GeoRoot<string, string, string>) => {
    if(results){
      searchGeoResults.value = results
    }
  }

  const setWeatherData = (data: WeatherRoot) => {
    if(data){
      weatherData.value = data
    }
  }

  const clearSearchGeoResults = () => {
    searchGeoResults.value = null
  }
 

  return { searchGeoResults, weatherData, setSearchGeoResults, clearSearchGeoResults, setWeatherData }
})
