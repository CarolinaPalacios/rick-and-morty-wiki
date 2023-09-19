export interface RickAndMortyAPIResponse {
  info: Info
  results: Character[]
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Character {
  id: number
  name: string
  status: Status
  species: Species
  type: string
  gender: Gender
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: Date
  firstSeenIn?: string
}

export type Gender = 'Male' | 'Female' | 'unknown'

export interface Location {
  name: string
  url: string
}

export type Species = 'Human' | 'Alien'

export type Status = 'Alive' | 'unknown' | 'Dead'

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: Character[]
  url: string
  created: Date
}

export interface LocationDetail {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: Date
}

export interface EposideDetail {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: Date
}

export interface SerializedError {
  message: string
  status: number
}