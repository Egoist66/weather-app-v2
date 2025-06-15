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
}