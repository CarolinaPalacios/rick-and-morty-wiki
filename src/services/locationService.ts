import axios from "axios";
import type { Character, LocationDetail } from '../types/API'
import { formatCollectionWithFirstSeenIn } from './characterService'

const { VITE_API_BASE_URL } = import.meta.env

export const fetchLocationDetail = async (id: number): Promise<LocationDetail> => {
  const { data }: { data: LocationDetail } = await axios.get(
    `${VITE_API_BASE_URL}/location/${id}`
  );
  return data;
};


export const fetchLocationResidents = async (
  residentsUrls: string[]
): Promise<Character[]> => {
  const residentsData = await Promise.all(
    residentsUrls.map(async (residentUrl) => {
      const residentId = parseInt(residentUrl.split("/").pop()!);
      const { data }: { data: Character } = await axios.get(
        `${VITE_API_BASE_URL}/character/${residentId}`
      );
      const characterWithFirstSeenIn = await formatCollectionWithFirstSeenIn([data]);

      return characterWithFirstSeenIn[0];
    })
  );
  return residentsData;
};