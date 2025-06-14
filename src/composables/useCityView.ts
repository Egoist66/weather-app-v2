import type { Feature } from "@/types/search-geo-api.types";
import { useRouter } from "vue-router";



/**
 * Composable that handles city view.
 *
 * @returns Object with two properties: `previewCity` and `redirectToCityViewAsLink`.
 *   - `previewCity`: A function that takes two parameters: a `Feature` object from the
 *     Mapbox Geocoding API and an optional boolean `omitRouterPush` which by default is
 *     true. If `omitRouterPush` is false, it will navigate to the city view page with the
 *     city's name and coordinates as query params. If `omitRouterPush` is true, it will not
 *     navigate to the city view page and instead return an object with the name, params and
 *     query properties.
 *   - `redirectToCityViewAsLink`: A function that takes a string as a parameter and opens it
 *     in a new tab.
 */
export const useCityView = () => {
  
  const router = useRouter();
  const previewCity = async (result: Feature, omitRouterPush = true) => {
    const [city, region] = result.place_name.split(",");
    // @ts-ignore
    const state = result.place_name.split(",")?.at(-1);

    if (!omitRouterPush) {
      await router.push({
        name: "city-view",
        params: {
          // @ts-ignore
          state: state.trim().replaceAll(" ", "-"),
          // @ts-ignore
          city: city.trim().replaceAll(" ", "-"),
        },
        query: {
          lat: result.geometry.coordinates[1],
          lng: result.geometry.coordinates[0],
          lang: new Intl.DateTimeFormat().resolvedOptions().locale,
          preview: true.toString(),
        },
      });
    }

    return {
      name: "city-view",
      params: {
        // @ts-ignore
        state: state.trim().replaceAll(" ", "-"),
        // @ts-ignore
        city: city.trim().replaceAll(" ", "-"),
      },
      query: {
        lat: result.geometry.coordinates[1],
        lng: result.geometry.coordinates[0],
        preview: true.toString(),
      },
    };
  };

  const redirectToCityViewAsLink = (link: string) => {
    window.open(link, "_blank");
  };

  return {
    redirectToCityViewAsLink,
    previewCity,
  };
};
