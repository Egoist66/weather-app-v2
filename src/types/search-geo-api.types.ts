export interface GeoRoot<T, Q, A> {
  type: T
  query: Q[]
  features: Feature[]
  attribution: A
}

export interface Feature {
  id: string
  type: string
  place_type: string[]
  relevance: number
  properties: Properties
  text: string
  place_name: string
  bbox: number[]
  center: number[]
  geometry: Geometry
  context: Context[]
  matching_text?: string
  matching_place_name?: string
}

export interface Properties {
  mapbox_id: string
  wikidata: string
  short_code?: string
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Context {
  id: string
  mapbox_id: string
  wikidata: string
  short_code?: string
  text: string
}
