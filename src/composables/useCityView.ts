import type { Feature } from "@/types/search-geo-api.types";
import { useRouter } from "vue-router";

export const useCityView = () => {
  const router = useRouter();
  const previewCity = async (result: Feature) => {
    const [city, region] = result.place_name.split(",");
    // @ts-ignore
    const state = result.place_name.split(",")?.at(-1);

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
        preview: (true).toString()
      }
    });
  };

  return {
    previewCity,
  };
};
