import router from "@/router";
import { useCitiesStore } from "@/stores/cities.store";
import { storeToRefs } from "pinia";
import type { Plugin } from "vue";
import { type RouteLocation, type Router } from "vue-router";

export const checkCityIsTracked = (): Plugin => {
    
  return {
    install(app, ...options) {
      const { cities } = storeToRefs(useCitiesStore());


        if (router.currentRoute.value?.params?.city && router.currentRoute.value?.params?.state) {

            const foundCity = cities.value.find(
            (c) =>
              c.city === router.currentRoute.value.params.city && c.state === router.currentRoute.value.params.state
          );


          console.log(foundCity);
          if (foundCity && foundCity.isTracked) {
           
              router.push({
                name: "city-view",
                params: {
                  // @ts-ignore
                  state: state.trim().replaceAll(" ", "-"),
                  // @ts-ignore
                  city: city.trim().replaceAll(" ", "-"),
                },
                query: {
                  lat: foundCity.coords.lat,
                  lng: foundCity.coords.lng,
                  lang: new Intl.DateTimeFormat().resolvedOptions().locale,
                  tracked: true.toString(),
                },
              });
            
          }
        }
      
    },
  };
};
