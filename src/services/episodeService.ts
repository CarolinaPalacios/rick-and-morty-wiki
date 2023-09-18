import axios from "axios";
import type { Character, EposideDetail } from '../types/API'
import { formatCollectionWithFirstSeenIn } from './characterService'

const { VITE_API_BASE_URL } = import.meta.env


export const fetchEpisodeDetail = async (id: number): Promise<EposideDetail> => {
  const { data }: { data: EposideDetail } = await axios(`${VITE_API_BASE_URL}/episode/${id}`)

  return data
}

export const fetchEpisodeCharacters = async (charactersUrls: string[]): Promise<Character[]> => {
  const charactersData = await Promise.all(
    charactersUrls.map(async (characterUrl) => {
      const characterId = parseInt(characterUrl.split('/').pop()!)
      const { data }: { data: Character } = await axios.get(
        `${VITE_API_BASE_URL}/character/${characterId}`
      );
      const characterWithFirstSeenIn = await formatCollectionWithFirstSeenIn([data]);
      return characterWithFirstSeenIn[0]
    })
  );
  return charactersData;
}