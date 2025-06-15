import type { Main } from "./cities-list.types";
import type { Weather } from "./weather-api.types";

export type Cities = {
    coords: {
        lat: number;
        lng: number;
    };
    state: string;
    city: string;
    id: string;
    isTracked?: boolean
    isPreviewOn?: boolean
    weather?: Weather[]
    main?: Main
}