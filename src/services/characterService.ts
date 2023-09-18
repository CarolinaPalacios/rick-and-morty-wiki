import axios from "axios";
import type { Character, Episode, RickAndMortyAPIResponse } from '../types/API'

const { VITE_API_BASE_URL } = import.meta.env

export interface FetchCharacterCollectionArgs {
  name?: string | null
  page?: number | null
}

export const formatCollectionWithFirstSeenIn = async (collection: Character[]): Promise<Character[]> => {
  return await Promise.all(
    collection.map(async (character) => {
      const { data }: { data: Episode } = await axios.get(character.episode[0])
      return {
        ...character,
        firstSeenIn: data.name
      }
    })
  )
}

export const buildEndpoint = ({ name, page }: FetchCharacterCollectionArgs) => {
  const url = new URL(`${VITE_API_BASE_URL}/character`)

  if (name) url.searchParams.set('name', name)

  if (page) url.searchParams.set('page', page.toString())

  return url.toString()
}

export const fetchCharacterCollection = async ({ name, page }: FetchCharacterCollectionArgs) => {
  const endpoint = buildEndpoint({ name, page })
  const { data }: { data: RickAndMortyAPIResponse } = await axios.get(endpoint)

  const collection = await formatCollectionWithFirstSeenIn(data.results)

  return { collection, paging: data.info }
}

export const fetchCharacterDetailById = async (id: number): Promise<Character> => {
  const { data }: { data: Character } = await axios.get(`${VITE_API_BASE_URL}/character/${id}`)
  const characterWhitFirstSeenIn = await formatCollectionWithFirstSeenIn([data])

  return characterWhitFirstSeenIn[0]
}