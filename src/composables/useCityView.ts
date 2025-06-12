import type { Feature } from "@/types/search-geo-api.types";
import { useRouter } from "vue-router";



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
